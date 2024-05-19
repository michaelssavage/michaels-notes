import requests
import time
import boto3
import json
import os
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('spotify-access-token')
refreshToken = os.environ['REFRESH_TOKEN']

def refreshTheToken():
    data = {
        'grant_type': 'refresh_token', 
        'refresh_token': refreshToken
    }

    headers = {
        'Authorization': f'Basic {os.environ['BASE64_AUTH']}',
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    p = requests.post('https://accounts.spotify.com/api/token', data=data, headers=headers)
    spotifyToken = p.json()
    
    if 'access_token' in spotifyToken:
        logger.info("Token refreshed successfully")

        # Place the expiration time (current time + almost an hour), and access token into the DB
        table.put_item(Item={
            'spotify': 'prod', 
            'expiresAt': int(time.time()) + 3200,
            'accessToken': spotifyToken['access_token']
        })
    else:
        logger.error("Failed to refresh token: %s", spotifyToken)
        raise Exception("Failed to refresh token")

def lambda_handler(event, context):

    dbResponse = table.get_item(Key={'spotify': 'prod'})
    item = dbResponse.get('Item', {})
    
    expiresAt = item.get('expiresAt', 0)
    accessToken = item.get('accessToken', '')
    
    trackTitle = 'n/a'
    artist = 'n/a'
    isPlaying = False

    # If expired....
    if expiresAt <= time.time() or not accessToken:
        logger.info("Token expired or missing, refreshing token")
        refreshTheToken()
        dbResponse = table.get_item(Key={'spotify': 'prod'})
        accessToken = dbResponse['Item']['accessToken']
    else:
        logger.info("Token is valid")
    
    headers = { 'Authorization': f'Bearer {accessToken}' }

    r = requests.get('https://api.spotify.com/v1/me/player/currently-playing', headers=headers)

    try:
        isPlaying = r.json()['is_playing']
        trackTitle = r.json()['item']['name']
        artist = ', '.join(artist['name'] for artist in r.json()['item']['artists'])
        albumArtUrl = r.json()['item']['album']['images'][0]['url']
        trackUrl = r.json()['item']['external_urls']['spotify']
    except:
        pass

    if not isPlaying:
        try:
            r2 = requests.get('https://api.spotify.com/v1/me/player/recently-played?limit=1',
                                                                        headers=headers)
            last_played = r2.json()['items'][0]
            trackTitle = last_played['track']['name']
            artist = ', '.join(artist['name'] for artist in last_played['track']['artists'])
            albumArtUrl = last_played['track']['album']['images'][0]['url']
            trackUrl = last_played['track']['external_urls']['spotify']
        except:
            pass
    
    return {
        'statusCode': 200,  
        'headers': {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        'body': {
            'isPlaying': isPlaying,
            'trackTitle': trackTitle,
            'artist': artist,
            'albumArtUrl': albumArtUrl,
            'trackUrl': trackUrl,
        }
    }

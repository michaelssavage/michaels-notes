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

    # If expired....
    if expiresAt <= time.time() or not accessToken:
        logger.info("Token expired or missing, refreshing token")
        refreshTheToken()
        dbResponse = table.get_item(Key={'spotify': 'prod'})
        accessToken = dbResponse['Item']['accessToken']
    else:
        logger.info("Token is valid")
    
    headers = { 'Authorization': f'Bearer {accessToken}' }

    r = requests.get(
        'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10', 
        headers=headers
    )
    res = r.json()

    try:
        all_tracks = []
        for item in res.get('items', []):
            track_name = item.get('name')
            track_url = item.get('external_urls')['spotify']
            artist_names = ', '.join(artist['name'] for artist in item.get('artists', []))
            all_tracks.append({
                "name": track_name,
                "artists": artist_names,
                "url": track_url
            })
    except:
      pass
    
    return {
        'statusCode': 200,  
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        'body': all_tracks
    }

---
date: may 19, 2024
description: "On my About Page, you can see what I'm currently listening to and what my top tracks are on Spotify. Setting up the API, retrieving the desired data via Postman requests, and then calling the Spotify API using fetch requests took a bit of time. Here, I just go through briefly how I set it all up."
---

# Spotify Developer API

On my About Page, you can see what I'm currently listening to and what my top tracks are on Spotify. It was a fun challenge to implement, helped by this blog :pretty-link{ link="https://navidanindya.info/writing/spotify-now-playing-nuxt/." external } Setting up the API, retrieving the desired data via Postman requests, and then calling the Spotify API using fetch requests took a bit of time. Here, I just go through briefly how I set it all up.

## Create an App on the Spotify Developer Dashboard

Visit the :pretty-link{ link="https://developer.spotify.com/dashboard/" text="Spotify Developer Dashboard" external } and log in with your Spotify credentials to create a new app.

This generates a `Client ID` and `Client Secret` and which you'll want to save. Set the redirect URI to the local version of your site. It might be something like `http:localhost:3000` for you.

```tex
💡 If you deploy your site later, you will need to update the redirect URI to match the deployed site's URL.
```

## Get an Auth Code

To authorize your account, you need to create a URL that logs into Spotify and grants permission to the required scopes. Here’s what you need to construct the URL:

- Your saved `client_id`.
- The `redirect_uri`.
- The appropriate scopes for the information you want. I needed the current playing track and my top tracks, so I included all three scopes below.

```bash
https://accounts.spotify.com/authorize?client_id=<CLIENT_ID_HERE>&
response_type=code&redirect_uri=<REDIRECT_URI_HERE>&
scope=user-read-currently-playing,user-read-playback-state,user-read-recently-played,user-top-read
```

After authorization, you will be redirected back to your site with a code query parameter in the URL. This code is needed to obtain the refresh token.

```bash
http://localhost:3000/callback?code=AQC7P..gBoDU
```

## Get Refresh Token

The `client_id:client_secret` combination needs to be encoded in Base64 format. You can use a function or a site like :pretty-link{ link="https://www.base64encode.org/." external }

:pic{ src="images/blog/base64.png" alt="base64 of client id and client secret" :isFloat="false" :inPost="true" sizes="1200px" }

I used Postman for sending the requests but here is the URL, Headers, and Body. You can also view the :pretty-link{ link="https://navidanindya.info/writing/spotify-now-playing-nuxt/" text="linked blog" external } for the `curl` request method.

```bash
POST: https://accounts.spotify.com/api/token

Headers: {
  Authorization: Basic <Base64_of_client_id:client_secret>,
  Content-Type: application/x-www-form-urlencoded
}

Body: {
  grant_type: authorization_code,
  code: <Code_From_Redirect_Uri>,
  redirect_uri: http://localhost:3080
}
```

The important field here is the `refresh_token`. This token doesn’t expire, so keep it safe.

## Get Access Token

Obtaining the access token follows the same process as getting the refresh token. Simply replace the code with the `refresh_token`.

```bash
POST: https://accounts.spotify.com/api/token

Headers: {
  Authorization: Basic <Base64_of_client_id:client_secret>,
  Content-Type: application/x-www-form-urlencoded
}

Body: {
  grant_type: authorization_code,
  code: <Refresh_Token>
  redirect_uri: http://localhost:3080
}
```

The important field this time is the `access_token`. This token expires in one hour but can be used to retrieve your data. Below is the JSON response returned from Postman.

```json
{
  "access_token": "BQBYmAESfVG4lfO0xe.......",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "user-read-playback-state user-read-currently-playing user-read-recently-played user-top-read"
}
```

## Get Spotify Now Playing

To get the currently playing track, send a GET request using the `access_token` you received.

```bash
GET: https://api.spotify.com/v1/me/player/currently-playing

Headers: {
  Authorization: Bearer <Access_Token>
}
```

If successful, a large JSON object will be returned with extensive information. The key details we’re interested in are the track title (item name) and the artist (an array).

```json
{
  "item": {
    "artists": [
      {
        "id": "48vDIufGC8ujPuBiTxY8dm",
        "name": "Palace",
        "type": "artist"
      }
    ],
    "explicit": false,
    "name": "Make You Proud"
  },
  "is_playing": true
}
```

## Get Spotify Top Tracks

To get the top tracks you've listened to, send a GET request using the same `access_token` you received. There are two optional query parameters I've included. The long term `time_range` looks at listening history over the past year and the `limit` is set to return 5 items only.

```bash
GET: https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5

Headers: {
  Authorization: Bearer <Access_Token>
}
```

All going well again, the following will be returned:

```json
{
  "items": [
    {
      "album": {
        "artists": [
          {
            "name": "ANOTR"
          },
          {
            "name": "Abel Balder"
          }
        ],
        "name": "Relax My Eyes",
        "release_date": "2022-11-04"
      },
      "external_urls": {
        "spotify": "https://open.spotify.com/track/5u4hhtZ7f4rWkMZEZcTKrH"
      },
      "name": "Relax My Eyes",
      "popularity": 78
    }
  ]
}
```

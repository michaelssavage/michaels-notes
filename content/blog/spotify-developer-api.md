---
date: may 8, 2024
draft: true
---

# Using The Spotify Developer API

You can see what I'm currently listening to and what my top tracks are on my About Page. It was a fun little challenge to complete and was helped by this blog :pretty-link{ link="https://navidanindya.info/writing/spotify-now-playing-nuxt/" external } . To use the API yourself it only takes a few steps. I'll assume you have a working local web app running on localhost.

## Create an App on the Spotify Developer Dashboard

We need to visit the :pretty-link{ link="https://developer.spotify.com/dashboard/" text="Spotify Developer Dashboard" external } and log in with our Spotify credentials to create a new app.

It generates a `Client ID` and `Client Secret` and we'll save these. We set the redirect URI to the local version of our site. It might be something like `http:localhost:3000`.

Down the line, if you deploy your site, you will need to redo this step and set the redirect URI to your deployed site.

## Get an Auth Code

We first need to create a URL to authorize our account by logging into Spotify giving permission to the scopes. You need to get a few things to create the URL:

- Use your client_id that you saved
- Set the redirect_uri
- Set the scope depending on what you information you are looking. I wanted the current playing AND my top tracks so I needed all three below

```bash
https://accounts.spotify.com/authorize?client_id=<CLIENT_ID_HERE>&
response_type=code&redirect_uri=<REDIRECT_URI_HERE>&
scope=user-read-currently-playing,user-read-playback-state,user-read-recently-played,user-top-read
```

After authorization, you will be redirected back to your site. The URL will contain a code query parameter. We want this value to get our refresh token.

```bash
http://localhost:3000/callback?code=AQC7P..gBoDU
```

## Get Refresh Token

First thing we need to do is encode `client_id:client_secret` to Base64 format. I used :pretty-link{ link="https://www.base64encode.org/" external } .

:pic{ src="images/blog/base64.png" alt="base64 of client id and client secret" :isFloat="false" :inPost="true" sizes="1200px" }

I used Postman for sending the requests but here is the URL, Headers, and Body. You can also view the linked blog to see the `curl` request method.

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

The field we are interested in is the `refresh_token`. This token doesn't expire so keep it somewhere safe.

## Get Access Token

To get the access token now is the exact same process as getting the refresh token. Just replace the code with `refresh_token`.

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

The field we are interested in this time is the `access_token`. This token expires in one hour but we can use it to get our data. Below is the JSON response returned from Postman.

:pic{ src="images/blog/accessToken.png" alt="JSON response with access token field" :isFloat="false" :inPost="true" sizes="1200px" }

## Get Spotify Now Playing

To get the currently playing track, send a GET request with your access_token you received.

```bash
GET: https://api.spotify.com/v1/me/player/currently-playing

Headers: {
  Authorization: Bearer <Access_Token>
}
```

---
date: may 8, 2024
draft: true
---

# Using The Spotify Developer API

You can see what I'm currently listening to and what my top tracks are on my About Page. It was a fun little challenge to complete and was helped by this blog: :pretty-link{ link="https://navidanindya.info/writing/spotify-now-playing-nuxt/" external }

## Create App on the Spotify Developer Dashboard

We need to visit :pretty-link{ link="https://developer.spotify.com/dashboard/" text="Spotify Developer Dashboard" external } , log in with our Spotify credentials and create a new app.

We need to save our `Client ID` and `Client Secret`, and set the redirect URI to the local version of our site. It might be something like `http:localhost:3000`.

Down the line, if you deploy your site, you will need to redo this step and set the redirect URI to your deployed site.

## Get auth code

We first need to create a URL to authorize our account by logging into Spotify giving permission to the scopes. You need to get a few things to create the URL:

- use your client_id that you saved
- set the redirect_uri.
- The scope depends on what you information you are looking. I wanted the current playing AND my top tracks so I needed

```bash
https://accounts.spotify.com/authorize?client_id=<CLIENT_ID_HERE>&
response_type=code&redirect_uri=<REDIRECT_URI_HERE>&
scope=user-read-currently-playing,user-read-playback-state,user-read-recently-played,user-top-read
```

After authorization, you will be redirected back to your site. The URL will contain a code query parameter. We want this value to get our refresh token

```bash
http://localhost:3000/callback?code=AQC7P..gBoDU
```

## Get refresh token

First thing we need to do is encode `client_id:client_secret` to Base64 format. I used :pretty-link{ link="https://www.base64encode.org/" external } .

:pic{ src="images/blog/base64.png" alt="base64 of client id and client secret" :isFloat="false" sizes="1200px" }

I used Postman for sending the requests. Here is the URL, Headers, and Body:

```bash
POST: https://accounts.spotify.com/api/token

Headers: {
  Authorization: Basic <Base64_of_client_id:client_secret>
}

Body: {
  grant_type: authorization_code,
  code: <Code_From_Redirect_Uri>
  redirect_uri: http://localhost:3080
}
```

Get access token

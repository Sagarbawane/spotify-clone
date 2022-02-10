import React, { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
const NEXT_PUBLIC_CLIENT_SECRET = 'c1d64ff0252146d19eaf641da96cafc2'
const NEXT_PUBLIC_CLIENT_ID = '017c3da218df46c7b6859a940cfd3956'
const JWT_SECRET = 'VALUEUBHBHBH'

import SpotifyWebApi from 'spotify-web-api-node'
const spotifyApi = new SpotifyWebApi({
  clientId: NEXT_PUBLIC_CLIENT_ID,
  clientSecret: NEXT_PUBLIC_CLIENT_SECRET,
})
function UseSpotify() {
  const { data: session } = useSession()
  useEffect(() => {
    if (session) {
      //if refersh token fail
      if (session.error === 'RefreshAcessTokenError') {
        signIn()
      }
      spotifyApi.setAccessToken(session.user.accessToken)
    }
  }, [session])
  return spotifyApi
}

export default UseSpotify

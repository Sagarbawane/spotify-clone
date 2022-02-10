import React, { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'



import SpotifyWebApi from 'spotify-web-api-node'
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
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

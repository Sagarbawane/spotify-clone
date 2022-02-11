import React, { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'



import SpotifyWebApi from 'spotify-web-api-node'
const spotifyApi = new SpotifyWebApi({
  clientId: '6cdf434e694c4cd79ff15834b40f80c0',
  clientSecret: '9c98fcd196594bc78dacb6030524694c',
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

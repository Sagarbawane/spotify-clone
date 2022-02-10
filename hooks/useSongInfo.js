import React, { useEffect, useState } from 'react'
import useSpotify from './useSpotify'
import { signOut, useSession } from 'next-auth/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'

function useSongInfo() {
  const spotifyApi = useSpotify()

  const { data: session, status } = useSession()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [songInfo, setSongInfo] = useState(null)
  useEffect(() => {
    const fetchSonhInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json())

        setSongInfo(trackInfo)
      }
    }
    fetchSonhInfo()
  }, [currentTrackId, spotifyApi])
  return songInfo
}

export default useSongInfo

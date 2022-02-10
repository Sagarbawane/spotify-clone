import React, { useEffect, useState } from 'react'

import { shuffle } from 'lodash'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import { signOut, useSession } from 'next-auth/react'
import Songs from './Songs'
const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]
function Center() {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [color, setColor] = useState(null)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const playlistId = useRecoilValue(playlistIdState)
  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])
  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [spotifyApi, playlistId])
  return (
    <div className="scollbar-hide h-screen flex-grow overflow-y-scroll">
      <header
        style={{ right: 0, position: 'absolute', padding: '10px' }}
        className="absoulte top-5 right-8"
      >
        <div
          onClick={() => {
            signOut()
          }}
          className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pl-4 pr-4 text-white opacity-90 hover:opacity-80"
        >
          <img
            className="w-100 h-10 rounded-full"
            src={
              session && session.user.image
                ? session.user.image
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbRfia35VrSEJmATnUC2jNXtUxtaPPwcllQ&usqp=CAU'
            }
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        // style={{ width: '100%' }}
        className={` flex h-80 items-end space-x-7 bg-gradient-to-b ${color} to-black p-8 text-white`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Center

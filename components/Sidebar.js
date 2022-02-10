import React, { useEffect, useState } from 'react'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'

function Sidebar() {
  const spotifyApi = useSpotify()
  const [Playlists, setPlaylists] = useState([])
  const [playlistId, setplaylistId] = useRecoilState(playlistIdState)
  const { data: session, status } = useSession()
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])

  return (
    <div
      className="border-rborder-gray-900 scollbar-hide pb-34 hidden h-screen 
    overflow-y-scroll p-5 text-xs text-gray-500 sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem] lg:text-sm"
    >
      <div className="space-y-4">
        <button
          onClick={() => {
            signOut()
          }}
          className="flex items-center space-x-2 hover:text-white"
        >
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {Playlists.map((playlist) => (
          <p
            key={playlist.id}
            onClick={() => {
              setplaylistId(playlist.id)
            }}
            className="cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar

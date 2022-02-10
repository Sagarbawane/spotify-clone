import SpotifyWebApi from 'spotify-web-api-node'
const NEXT_PUBLIC_CLIENT_SECRET = 'c1d64ff0252146d19eaf641da96cafc2'
const NEXT_PUBLIC_CLIENT_ID = '017c3da218df46c7b6859a940cfd3956'
const JWT_SECRET = 'VALUEUBHBHBH'

const scopes = [
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'streaming',
  'user-read-private',
  'user-top-read',
  // 'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-follow-read',
].join(',')

const params = {
  scope: scopes,
}
const queryParamsString = new URLSearchParams(params)

const LOGIN_URL =
  'https://accounts.spotify.com/authorize?' + queryParamsString.toString()

const spotifyApi = new SpotifyWebApi({
  clientId: NEXT_PUBLIC_CLIENT_ID,
  clientSecret: NEXT_PUBLIC_CLIENT_SECRET,
})
export default spotifyApi
export { LOGIN_URL }

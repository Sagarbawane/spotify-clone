import SpotifyWebApi from 'spotify-web-api-node'


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
  clientId: '6cdf434e694c4cd79ff15834b40f80c0',
  clientSecret: '9c98fcd196594bc78dacb6030524694c',
})
export default spotifyApi
export { LOGIN_URL }

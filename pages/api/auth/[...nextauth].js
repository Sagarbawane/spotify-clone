import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

import spotifyApi, { LOGIN_URL } from '../../../lib/spotify'


async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

    return {
      ...token,
      accessToken: refreshedToken.access_token,

      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAcessTokenError',
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: '6cdf434e694c4cd79ff15834b40f80c0',
      clientSecret: '9c98fcd196594bc78dacb6030524694c',
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: 'VALUEUBHBHBH',
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
          //handling expires time in mili secound
        }
      }
      //return previous token if the access token has not expired
      if (Date.now() < token.accessTokenExpires) {
        return token
      }
      //access token expires

      return await refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username

      return session
    },
  },
})

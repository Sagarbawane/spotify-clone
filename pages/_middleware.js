import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

const JWT_SECRET = 'VALUEUBHBHBH'


export async function middleware(req) {
  const token = await getToken({ req, secret: JWT_SECRET })
  const { pathname } = req.nextUrl
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login')
  }
}

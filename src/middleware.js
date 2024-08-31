
import { NextResponse } from 'next/server'

import jwt from 'jsonwebtoken'
import { User } from './lib/models'
import { connectDB } from './lib/utils'

export async function middleware(request) {
  //first get token from client side:

  // const requestHeaders = new Headers(request.headers)

  // const token = requestHeaders.get('Authorization')

  const token = request.headers.get('Authorization')

  if (!token) {
    console.log('token not found')

    return NextResponse.json({ success: false, message: `this token not provided awwwwww ${token}` }, { status: 401 })
  }

  console.log('bearer token', token)

  //removing prefix Bearer:
  const jwToken = token.replace('Bearer ', '')

  console.log('token from middleware', jwToken)

  //now verify token with secret key:
  try {
    const isVerified = jwt.verify(jwToken, process.env.SECRET_KEY)

    console.log('verifiedtoken', isVerified)

    await connectDB()

    const userData = await User.findOne({ email: isverified.email }).select({ password: 0 })

    console.log('my userData', userData)

    req.user = userData
    req.token = token
    req.userId = userData._id

    return NextResponse.next()
  } catch (error) {
    return NextResponse.json({ success: false, message: 'token not provided' }, { status: 401 })
  }
}

export const config = {
  matcher: '/api/user'
}





'use client'

import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
var fetchDefaults = require('fetch-defaults')

//context API without useReducer hook:

//in this store we will make login and logout functions and also get userlogin or not through state:

//we will create store (createContext) who give provider in which any value can be stored and provide this value to all application:

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  //there is no sessionStorage available in backend(serverside) so for passing token to middleware we should put this token in state
  //then we pass this token from clientside to serverside:

  //in cookies case we we have token stored in both sides so we can easily access token in middleware through cookies...we dont need to
  //make state for token

  const [getToken, setGetToken] = useState('')

  const [userData, setUserData] = useState('')

  const router = useRouter()

  useEffect(() => {
    setGetToken(sessionStorage.getItem('jwtoken'))

    if(!getToken){
      router.push('/login')
    }
  }, [])

  console.log(getToken)

  //if getToken is true:
  const isLoggedIn = !!getToken

  console.log(isLoggedIn)

  //function for login:
  const storeTokenInSS = serverToken => {
    sessionStorage.setItem('jwtoken', serverToken)

    setGetToken(sessionStorage.getItem('jwtoken'))
  }

  // function for logout:
  const logoutUser = () => {
    sessionStorage.removeItem('jwtoken')

    setGetToken('')
  }

  //function for getting currently loggedin userData from middleware:
  const userAuthentication = async () => {
    //in headers we will pass bearer token for middleware because we cant access token directly in middleware
    //by sesssionstorage because its a client side material so we pass bearer token:
    try {
      const res = await fetch('/api/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken}`
        }
      })

      if (res.ok) {
        const data = await res.json()
        console.log(data.msg)
        setUserData(data)
      }
    } catch (error) {
      console.log('there is an error')
    }
  }

  useEffect(() => {
    userAuthentication()
  }, [getToken])

  return (
    //agr value men proper funtion ya variable pass ho rhe hen to hm useContext ka use kren ge or
    //agr value men state pass ho rhi he jo baad men change ho skti he to hm useReduer ka use kren ge

    <AuthContext.Provider value={{ storeTokenInSS, logoutUser, isLoggedIn, userData }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const authContextValue = useContext(AuthContext)

  if (!authContextValue) {
    throw new Error('useAuth used outside of the provider')
  }

  return authContextValue
}

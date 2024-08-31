
'use client'

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth} from '@/store/auth'

const Logout = () => {
  const router = useRouter()

  const { logoutUser } = useAuth()

  const {isLoggedIn} = useAuth()

  useEffect(() => {
    logoutUser()
  }, [])

  if (!isLoggedIn) {
    router.push('/login')
  }

  return <h1>LogOut Page</h1>
}

export default Logout

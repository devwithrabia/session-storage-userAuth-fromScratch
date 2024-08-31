'use client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth} from '@/store/auth'

const Login = () => {
  const [error, setError] = useState()

  const router = useRouter()

  const { storeTokenInSS } = useAuth()

  const isValidEmail = email => {
    const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
    return emailRegex.test(email)
  }

  const submitHandler = async e => {
    e.preventDefault()

    const email = e.target[0].value
    const password = e.target[1].value

    if (!isValidEmail(email)) {
      setError('Email is invalid')

      return
    }

    if (!password || password.length < 8) {
      setError('Password is invalid')

      return
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      if (res.status === 400) {
        // const data = await res.json()
        // console.log(data)
        setError('invalid credentials')
      }

      if (res.status === 200) {
        const data = await res.json()
        console.log(data)

        //here we store token in sessionStorage:

        storeTokenInSS(data.token)

        setError('user login successful')

        router.push('/')
      }
    } catch (err) {
      setError('Error,try again')
      console.log(err)
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor='email'>
          <h1>EMAIL</h1>
        </label>
        <input type='email' placeholder='Email' id='email' required />
      </div>

      <div>
        <label htmlFor='password'>
          <h1>PASSWORD</h1>
        </label>
        <input type='password' placeholder='password' id='password' required />
      </div>

      <button type='submit'>LOGIN</button>

      <p style={{ color: 'red' }}>{error && error}</p>
    </form>
  )
}

export default Login

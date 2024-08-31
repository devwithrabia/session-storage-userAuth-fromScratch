'use client'

import { useRouter } from 'next/router'
import { useState } from 'react'

const Register = () => {
  const [error, setError] = useState('')

  const router = useRouter()

  const isValidEmail = email => {
    const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
    return emailRegex.test(email)
  }

  const submitHandler = async e => {
    e.preventDefault()

    const username = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const repeatPassword = e.target[3].value

    console.log(email)

    if (!isValidEmail(email)) {
      setError('Email is invalid')

      return
    }

    if (password !== repeatPassword) {
      setError('password is not matched')

      return
    }

    if (!password || password.length < 8) {
      setError('Password is invalid')

      return
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      })

      console.log(res)

      if (res.status === 400) {
        setError('this email is already registered')
      }

      if (res.status === 200) {
        setError('')
        router.push('/login')
      }
    } catch (err) {
      setError('Error,try again')
      console.log(err)
    }
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='username'>
            <h1>USERNAME</h1>
          </label>
          <input type='text' placeholder='username' id='username' required />
        </div>

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

        <div>
          <label htmlFor='repeatPassword'>
            <h1>REPEAT PASSWORD</h1>
          </label>
          <input type='password' placeholder='repeatPassword' id='repeatPassword' required />
        </div>

        <br />

        <hr />

        <button type='submit'>SUBMIT</button>

        <p style={{ color: 'red' }}>{error && error}</p>
      </form>
    </>
  )
}

export default Register

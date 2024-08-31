import { useAuth} from '@/store/auth'
import Link from 'next/link'

const NavBar = () => {
  const { isLoggedIn } = useAuth()
  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', backgroundColor: 'gray' }}>
      <Link href='/' style={{ color: 'white' }}>
        <h1>Home</h1>
      </Link>
      <Link href='/dashboard' style={{ color: 'white' }}>
        <h1>DashBoard</h1>
      </Link>
      <Link href='/contact' style={{ color: 'white' }}>
        <h1>Contact</h1>
      </Link>
      <Link href='/register' style={{ color: 'white' }}>
        <h1>Register</h1>
      </Link>
      { isLoggedIn ? (
        <Link href='/logout' style={{ color: 'white' }}>
          <h1>LogOut</h1>
        </Link>
      ) : (
        <Link href='/login' style={{ color: 'white' }}>
          <h1>LogIn</h1>
        </Link>
      )}
    </div>
  )
}

export default NavBar

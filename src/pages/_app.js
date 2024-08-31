import NavBar from '@/components/NavBar'
import { AuthProvider } from '@/store/auth'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  )
}

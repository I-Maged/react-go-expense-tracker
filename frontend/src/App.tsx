import AuthPage from './pages/AuthPage'
import Expenses from './pages/Expenses'
import AuthProvider from './context/auth/AuthContext'
import { useAuth } from './context/auth/useAuthContext'

const AppContent = () => {
  const { token } = useAuth()

  if (!token) {
    return <AuthPage />
  }

  return (
    <div className='app-layout animate-fade-in'>
      <Expenses />
    </div>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

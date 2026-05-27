import AuthPage from './pages/AuthPage'
import AuthProvider from './context/auth/AuthContext'
const App = () => {
  return (
    <AuthProvider>
      <div className='app-layout animate-fade-in'>
        <AuthPage />
      </div>
    </AuthProvider>
  )
}

export default App

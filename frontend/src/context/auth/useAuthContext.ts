import { AuthContext } from './AuthContext'
import { useContext } from 'react'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('Auth Context must be used within Auth Provider')
  }
  return context
}

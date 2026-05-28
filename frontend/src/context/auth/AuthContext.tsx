import {
  createContext,
  useEffect,
  useReducer,
  type FC,
  type ReactNode,
} from 'react'
import { authReducer } from './AuthReducer'
import type { AuthContextType, AuthState } from '../../types/types'

type AuthProviderProps = { children: ReactNode }

const initialToken = localStorage.getItem('authToken')
const initialEmail = localStorage.getItem('authUserString')

const initialState: AuthState = {
  token: initialToken,
  userEmail: initialEmail,
  isLoading: true,
  error: null,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [{ token, userEmail, isLoading, error }, dispatch] = useReducer(
    authReducer,
    initialState,
  )

  useEffect(() => {
    if (token && userEmail) {
      localStorage.setItem('authToken', token)
      localStorage.setItem('authUserString', userEmail)
    } else if (token === null && userEmail === null) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('authUserString')
    }
  }, [token, userEmail])

  useEffect(() => {
    dispatch({ type: 'INITIALIZE_AUTH' })
  }, [])

  const authLogin = async (token: string, userEmail: string) => {
    dispatch({ type: 'LOGIN_START' })
    try {
      dispatch({ type: 'LOGIN_SUCCESS', payload: { token, userEmail } })
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch({ type: 'LOGIN_FAILURE', payload: err.message })
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed' })
      }
    }
  }

  const AuthLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider
      value={{ token, userEmail, isLoading, error, authLogin, AuthLogout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export { AuthContext }

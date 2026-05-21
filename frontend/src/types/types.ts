export type AuthState = {
  token: string | null
  userEmail: string | null
  isLoading: boolean
  error: string | null
}

export type AuthContextType = AuthState & {
  login: (token: string, userEmail: string) => Promise<void>
  logout: () => void
}

export type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'INITIALIZE_AUTH' }
  | { type: 'LOGIN_SUCCESS'; payload: { token: string; userEmail: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }

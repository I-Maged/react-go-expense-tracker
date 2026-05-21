import type { AuthState, AuthAction } from '../../types/types'

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null }
    case 'LOGIN_SUCCESS':
      return {
        token: action.payload.token,
        userEmail: action.payload.userEmail,
        isLoading: false,
        error: null,
      }
    case 'LOGIN_FAILURE':
      return {
        token: null,
        userEmail: null,
        isLoading: false,
        error: action.payload,
      }
    case 'LOGOUT':
      return { token: null, userEmail: null, isLoading: false, error: null }
    case 'INITIALIZE_AUTH':
      return { ...state, isLoading: false }
    default:
      return state
  }
}

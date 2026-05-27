import type { ExpenseState, ExpenseAction } from '../../types/types'

export const expenseReducer = (
  state: ExpenseState,
  action: ExpenseAction,
): ExpenseState => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] }

    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        ),
      }

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      }

    case 'SET_CURRENCY':
      return { ...state, currency: action.payload }

    case 'INITIALIZE_STATE':
      return action.payload

    case 'SET_FILTER':
      return {
        ...state,
        filterSettings: { ...state.filterSettings, ...action.payload },
      }

    case 'LOGIN':
      return {
        ...state,
        token: action.payload.token,
        userEmail: action.payload.email,
      }

    case 'LOGOUT':
      return { ...state, token: null, userEmail: null, transactions: [] }

    default:
      return state
  }
}

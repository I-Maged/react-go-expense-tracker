import {
  createContext,
  useEffect,
  useReducer,
  type FC,
  type ReactNode,
} from 'react'
import type {
  ExpenseContextValue,
  ExpenseState,
  FilterSettings,
  Transaction,
} from '../../types/types'
import { expenseReducer } from './ExpenseReducer'
import { api } from '../../services/api'

const initialToken = localStorage.getItem('authToken')
const initialEmail = localStorage.getItem('authUserString')

const initialState: ExpenseState = {
  transactions: [],
  filterSettings: { category: 'ALL', startDate: null, endDate: null },
  currency: '$',
  token: initialToken,
  userEmail: initialEmail,
}

type ExpenseProviderProps = { children: ReactNode }

const ExpenseContext = createContext<ExpenseContextValue | null>(null)

const ExpenseProvider: FC<ExpenseProviderProps> = ({ children }) => {
  const [
    { transactions, filterSettings, currency, token, userEmail },
    dispatch,
  ] = useReducer(expenseReducer, initialState)

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!token) return
      try {
        const data = await api.getTransactions()
        dispatch({
          type: 'INITIALIZE_STATE',
          payload: {
            transactions: data || [],
            filterSettings,
            currency,
            token,
            userEmail,
          },
        })
      } catch (err) {
        console.error('Failed to load transactions:', err)
      }
    }

    fetchTransactions()
  }, [currency, filterSettings, token, userEmail])
  //   }, [token])

  async function addTransaction(transaction: Transaction) {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction })
    try {
      if (token) {
        await api.createTransaction(transaction)
      }
    } catch (err) {
      console.error('Failed to sync added transaction to server:', err)
    }
  }

  async function deleteTransaction(id: string) {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id })
    try {
      if (token) {
        await api.deleteTransaction(id)
      }
    } catch (err) {
      console.error('Failed to sync deleted transaction to server:', err)
    }
  }

  function setFilters(filter: Partial<FilterSettings>) {
    dispatch({ type: 'SET_FILTER', payload: filter })
  }

  return (
    <ExpenseContext.Provider
      value={{
        transactions,
        filterSettings,
        currency,
        token,
        userEmail,
        addTransaction,
        deleteTransaction,
        setFilters,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  )
}

export default ExpenseProvider
export { ExpenseContext }

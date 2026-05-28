export type AuthState = {
  token: string | null
  userEmail: string | null
  isLoading: boolean
  error: string | null
}

export type AuthContextType = AuthState & {
  authLogin: (token: string, userEmail: string) => Promise<void>
  AuthLogout: () => void
}

export type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'INITIALIZE_AUTH' }
  | { type: 'LOGIN_SUCCESS'; payload: { token: string; userEmail: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }

/********************/

export type TransactionType = 'INCOME' | 'EXPENSE'

export type Transaction = {
  id: string
  type: TransactionType
  amount: number
  category: string
  date: string
  note?: string
}

export type FilterSettings = {
  category: string
  startDate: string | null
  endDate: string | null
}

export type ExpenseState = {
  transactions: Transaction[]
  filterSettings: FilterSettings
  currency: string
  token: string | null
  userEmail: string | null
}

export type ExpenseAction =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'EDIT_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_FILTER'; payload: Partial<FilterSettings> }
  | { type: 'SET_CURRENCY'; payload: string }
  | { type: 'INITIALIZE_STATE'; payload: ExpenseState }
  | { type: 'LOGIN'; payload: { token: string; email: string } }
  | { type: 'LOGOUT' }

export type ExpenseContextValue = ExpenseState & {
  addTransaction: (transaction: Transaction) => void
  deleteTransaction: (id: string) => void
  setFilters: (filter: Partial<FilterSettings>) => void
}

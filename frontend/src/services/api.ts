const API_BASE_URL = 'http://localhost:8080/api'

const getHeaders = (): HeadersInit => {
  const token = localStorage.getItem('authToken')
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

export const api = {
  async register(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      throw new Error(errData.error || 'Failed to sign up')
    }

    return response.json() as Promise<{ message: string; email: string }>
  },

  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      throw new Error(errData.error || 'Failed to sign in')
    }

    return response.json() as Promise<{
      token: string
      user: { id: number; email: string }
    }>
  },

  // Transactions API
  async getTransactions() {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'GET',
      headers: getHeaders(),
    })

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('authToken')
        localStorage.removeItem('authUserString')
        window.location.reload()
      }
      const errData = await response.json().catch(() => ({}))
      throw new Error(errData.error || 'Failed to fetch transactions')
    }

    return response.json()
  },

  async createTransaction(transaction: {
    id: string
    type: 'INCOME' | 'EXPENSE'
    amount: number
    category: string
    date: string
    note?: string
  }) {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(transaction),
    })

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('authToken')
        localStorage.removeItem('authUserString')
        window.location.reload()
      }
      const errData = await response.json().catch(() => ({}))
      throw new Error(errData.error || 'Failed to create transaction')
    }

    return response.json()
  },

  async deleteTransaction(id: string) {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    })

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('authToken')
        localStorage.removeItem('authUserString')
        window.location.reload()
      }
      const errData = await response.json().catch(() => ({}))
      throw new Error(errData.error || 'Failed to delete transaction')
    }

    return response.json()
  },
}

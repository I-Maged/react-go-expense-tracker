const API_BASE_URL = 'http://localhost:8080/api'

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
}

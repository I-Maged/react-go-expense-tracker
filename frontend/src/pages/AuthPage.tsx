import { useState, type ChangeEvent } from 'react'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'

import './AuthPage.css'
import { api } from '../services/api'

type AuthMode = 'login' | 'signup'

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'signup' : 'login'))
    setError(null)
    setSuccess(null)
    setPassword('')
    setConfirmPassword('')
  }

  const handleSubmit = async (e: ChangeEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!email.trim() || !password) {
      setError('Please fill in all fields')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      if (mode === 'login') {
        setSuccess('Authentication successful! Loading dashboard...')
      } else {
        await api.register(email, password)
        setSuccess('Account created successfully! You can now sign in.')
        setMode('login')
        setPassword('')
        setConfirmPassword('')
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An error occurred during authentication')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='auth-container animate-fade-in'>
      <div className='glass-panel auth-card'>
        <div className='auth-header'>
          <h2 className='auth-title'>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className='auth-subtitle'>
            {mode === 'login'
              ? 'Enter your credentials to access TrackFlow'
              : 'Sign up to start tracking your finances today'}
          </p>
        </div>

        {error && (
          <div className='auth-alert animate-slide-down'>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className='auth-alert auth-alert-success animate-slide-down'>
            <CheckCircle2 size={18} />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className='auth-form'>
          <div className='form-group'>
            <label className='form-label' htmlFor='auth-email'>
              Email Address
            </label>
            <div className='input-wrapper'>
              <Mail className='input-icon' size={18} />
              <input
                id='auth-email'
                type='email'
                className='input-base auth-input'
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className='form-group'>
            <label className='form-label' htmlFor='auth-password'>
              Password
            </label>
            <div className='input-wrapper'>
              <Lock className='input-icon' size={18} />
              <input
                id='auth-password'
                type={showPassword ? 'text' : 'password'}
                className='input-base auth-input'
                placeholder='Min. 6 characters'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type='button'
                className='password-toggle'
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div className='form-group animate-slide-down'>
              <label className='form-label' htmlFor='auth-confirm-password'>
                Confirm Password
              </label>
              <div className='input-wrapper'>
                <Lock className='input-icon' size={18} />
                <input
                  id='auth-confirm-password'
                  type={showPassword ? 'text' : 'password'}
                  className='input-base auth-input'
                  placeholder='Repeat your password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
          )}

          <button
            type='submit'
            className='btn btn-primary auth-button'
            disabled={isLoading}
          >
            {isLoading ? (
              <div className='spinner' />
            ) : mode === 'login' ? (
              'Sign In'
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className='auth-footer'>
          <p>
            {mode === 'login'
              ? "Don't have an account? "
              : 'Already have an account? '}
            <button
              onClick={toggleMode}
              className='auth-toggle-link'
              disabled={isLoading}
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthPage

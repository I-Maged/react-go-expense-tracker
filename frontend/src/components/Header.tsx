import { useAuth } from '../context/auth/useAuthContext'
import { LogOut, User } from 'lucide-react'

const Header = () => {
  const { userEmail, AuthLogout } = useAuth()
  return (
    <header className='app-header'>
      <div className='header-container'>
        <div className='header-titles'>
          <h1>TrackFlow</h1>
          <p className='subtitle'>Modern Expense Management</p>
        </div>
        {userEmail && (
          <div className='user-profile-badge animate-fade-in'>
            <div className='profile-info'>
              <User size={14} className='user-icon' />
              <span className='user-email'>{userEmail}</span>
            </div>
            <button
              className='btn btn-danger logout-btn'
              onClick={AuthLogout}
              title='Sign Out'
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

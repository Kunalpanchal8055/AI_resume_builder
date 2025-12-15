import './App.css'
import { useState, useEffect } from 'react'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'
import Navbar from './pages/navbar'
import Dashboard from './pages/dashboard'
import MyResume from './pages/myresume'
import Help from './pages/help'
import Analyzer from './pages/analyzer'

function App() {
  const [currentPage, setCurrentPage] = useState('login')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
        setCurrentPage('home')
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setCurrentPage('home')
  }

  const handleSignup = (userData) => {
    setUser(userData)
    setCurrentPage('home')
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
    setUser(null)
    setCurrentPage('login')
  }

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  // Listen for global navigate events from components
  useEffect(() => {
    const handler = (e) => {
      if (e?.detail) setCurrentPage(e.detail)
    }
    window.addEventListener('navigate', handler)
    return () => window.removeEventListener('navigate', handler)
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      {user && <Navbar user={user} onLogout={handleLogout} onNavigate={handleNavigate} />}
      
      {currentPage === 'login' && (
        <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />
      )}
      
      {currentPage === 'signup' && (
        <SignupPage onSignup={handleSignup} onNavigate={handleNavigate} />
      )}
      
      {currentPage === 'home' && user && (
        <HomePage user={user} onNavigate={handleNavigate} />
      )}

      {currentPage === 'dashboard' && user && <Dashboard user={user} onLogout={handleLogout} onNavigate={handleNavigate} />}
      {currentPage === 'myresumes' && user && <MyResume onLogout={handleLogout} onNavigate={handleNavigate} />}
      {currentPage === 'help' && user && <Help onLogout={handleLogout} onNavigate={handleNavigate} />}
      {currentPage === 'analyzer' && user && <Analyzer onLogout={handleLogout} onNavigate={handleNavigate} />}
    </>
  )
}

export default App

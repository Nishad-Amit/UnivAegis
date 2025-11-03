import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Menu,
  X,
  Linkedin,
  Twitter,
  Instagram,
  User,
  LogOut,
  Settings,
  UserCircle
} from 'lucide-react'
import univAegisLogo from '../assets/univAegislogo.png'
import { useAuthStore } from '@/store/auth-store'

interface HeaderProps {
  variant?: 'light' | 'dark'
}

const Header: React.FC<HeaderProps> = ({ variant = 'light' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()

  const bgColor = variant === 'dark' ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm shadow-sm'
  const textColor = variant === 'dark' ? 'text-gray-900' : 'text-gray-900'
  const linkColor = variant === 'dark' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-600 hover:text-gray-900'
  const buttonBg = variant === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
  const buttonText = variant === 'dark' ? 'text-white' : 'text-white'

  const handleLogout = () => {
    logout()
    setIsProfileMenuOpen(false)
    navigate('/login')
  }

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgColor}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with text */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={univAegisLogo} 
              alt="UnivAegis Logo" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-gray-900">UnivAegis</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className={`${linkColor} transition-colors`}>Features</Link>
            <Link to="/how-it-works" className={`${linkColor} transition-colors`}>How It Works</Link>
            <Link to="/universities" className={`${linkColor} transition-colors`}>For Universities</Link>
            <Link to="/about" className={`${linkColor} transition-colors`}>About us</Link>
            <Link to="/contact" className={`${linkColor} transition-colors`}>Contact</Link>
          </div>

          {/* CTA Buttons or User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link
                      to={user.role === 'student' ? '/student-dashboard' : '/dashboard'}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <UserCircle className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}

              </div>
            ) : (
              <>
                <Link to="/login" className={`${linkColor} transition-colors`}>
                  Login
                </Link>
                <a href="#cta" className={`${buttonBg} ${buttonText} px-6 py-2 rounded-lg transition-colors`}>
                  Book a Demo
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <div className="flex flex-col space-y-4">
              <Link to="/features" className={`${linkColor} transition-colors`} onClick={() => setIsMenuOpen(false)}>Features</Link>
              <Link to="/how-it-works" className={`${linkColor} transition-colors`} onClick={() => setIsMenuOpen(false)}>How It Works</Link>
              <Link to="/universities" className={`${linkColor} transition-colors`} onClick={() => setIsMenuOpen(false)}>For Universities</Link>
              <Link to="/about" className={`${linkColor} transition-colors`} onClick={() => setIsMenuOpen(false)}>About us</Link>
              <Link to="/contact" className={`${linkColor} transition-colors`} onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated && user ? (
                  <>
                    <div className="mb-4">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <Link
                      to={user.role === 'student' ? '/student-dashboard' : '/dashboard'}
                      className={`${linkColor} transition-colors mb-2 block`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="text-red-600 hover:text-red-800 transition-colors mb-2 block text-left w-full"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className={`${linkColor} transition-colors mb-2 block`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <a
                      href="#cta"
                      className={`${buttonBg} ${buttonText} px-6 py-2 rounded-lg transition-colors text-center block`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Book a Demo
                    </a>
                  </>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Header
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, ArrowLeft, Loader2, CheckCircle, Eye, EyeOff, User, Building } from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import toast from 'react-hot-toast'
import googleLogo from '../assets/google.png'
import { useGoogleLogin } from '@react-oauth/google'

interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

interface OTPFormData {
  otp: string
}

interface GoogleUser {
  email: string
  name: string
  picture: string
}

const LoginPage: React.FC = () => {
  const [step, setStep] = useState<'role' | 'email' | 'otp' | 'success'>('role')
  const [userType, setUserType] = useState<'student' | 'university'>('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const emailForm = useForm<LoginFormData>()
  const otpForm = useForm<OTPFormData>()

  const handleRoleSelect = (role: 'student' | 'university') => {
    setUserType(role)
    setStep('email')
  }

  const handleEmailSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      // Simulate API call for OTP
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setEmail(data.email)
      setStep('otp')
      toast.success('OTP sent to your email!')
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPSubmit = async (data: OTPFormData) => {
    setIsLoading(true)
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (data.otp === '123456') {
        // Mock user data - in real app, this would come from API
        let mockUser: any = {
          id: '1',
          email: email,
          name: 'John Doe',
          university: 'Stanford University',
          department: 'Admissions',
          avatar: undefined,
          lastLogin: new Date().toISOString()
        }
        
        // Set role based on user type selection
        switch(userType) {
          case 'student':
            mockUser = {
              ...mockUser,
              role: 'student',
              name: 'Amit Kumar'
            }
            break
          case 'university':
            mockUser = {
              ...mockUser,
              role: 'admissions_officer'
            }
            break
        }
        
        login(mockUser)
        setStep('success')
        toast.success('Login successful!')
        
        // Redirect based on user role
        setTimeout(() => {
          switch(userType) {
            case 'student':
              navigate('/student-dashboard')
              break
            case 'university':
              navigate('/dashboard')
              break
            default:
              navigate('/dashboard')
          }
        }, 2000)
      } else {
        toast.error('Invalid OTP. Please try again.')
      }
    } catch (error) {
      toast.error('OTP verification failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('OTP resent to your email!')
    } catch (error) {
      toast.error('Failed to resend OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToEmail = () => {
    setStep('email')
    setEmail('')
    emailForm.reset()
  }

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo`,
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        
        if (!userInfoResponse.ok) {
          throw new Error('Failed to fetch user info from Google');
        }
        
        const userInfo: GoogleUser = await userInfoResponse.json();
        
        // Mock user data - in real app, this would come from your backend
        let mockUser: any = {
          id: 'google_' + userInfo.email,
          email: userInfo.email,
          name: userInfo.name,
          avatar: userInfo.picture,
          lastLogin: new Date().toISOString()
        }
        
        // Set role based on user type selection
        switch(userType) {
          case 'student':
            mockUser = {
              ...mockUser,
              role: 'student'
            }
            break
          case 'university':
            mockUser = {
              ...mockUser,
              role: 'admissions_officer'
            }
            break
        }
        
        login(mockUser)
        setStep('success')
        toast.success('Login successful!')
        
        // Redirect based on user role
        setTimeout(() => {
          switch(userType) {
            case 'student':
              navigate('/student-dashboard')
              break
            case 'university':
              navigate('/dashboard')
              break
            default:
              navigate('/dashboard')
          }
        }, 2000)
      } catch (error) {
        console.error('Google login error:', error);
        toast.error('Google login failed. Please try again.');
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
      toast.error('Google login failed. Please try again.');
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center space-x-2 text-white hover:text-blue-200 transition-colors">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">AI</span>
            </div>
            <span className="text-xl font-bold">UnivAegis</span>
          </Link>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
        >
          {step === 'role' && (
            <div>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-white mb-2">Select Your Role</h1>
                <p className="text-blue-100">Choose the appropriate login option for your account</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleRoleSelect('student')}
                  className="w-full bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg p-4 text-white transition-colors flex items-center space-x-3"
                >
                  <User className="w-5 h-5" />
                  <div className="text-left">
                    <h3 className="font-semibold">Student / Applicant Login</h3>
                    <p className="text-sm text-blue-100">Login as a student or applicant</p>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleSelect('university')}
                  className="w-full bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg p-4 text-white transition-colors flex items-center space-x-3"
                >
                  <Building className="w-5 h-5" />
                  <div className="text-left">
                    <h3 className="font-semibold">University / Admissions Staff Login</h3>
                    <p className="text-sm text-blue-100">Login as university staff or admissions officer</p>
                  </div>
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-blue-100 text-sm">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-white hover:text-blue-200 font-medium">
                    Register now
                  </Link>
                </p>
              </div>
            </div>
          )}

          {step === 'email' && (
            <div>
              <div className="text-center mb-6">
                <button
                  onClick={() => setStep('role')}
                  className="text-blue-200 hover:text-white flex items-center space-x-1 text-sm mb-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Change Role</span>
                </button>
                <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-blue-100">Sign in to your account to continue</p>
              </div>

              <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-200" />
                    <input
                      {...emailForm.register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                  </div>
                  {emailForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-300">{emailForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-white/20"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-white hover:text-blue-200">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <span>Send OTP</span>
                  )}
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/30"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-transparent text-blue-100">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <button
                    type="button"
                    onClick={() => handleGoogleLogin()}
                    className="w-full inline-flex justify-center items-center py-4 px-6 bg-white text-gray-800 rounded-lg shadow-md hover:bg-gray-50 transition-all duration-200 font-medium"
                  >
                    <img src={googleLogo} alt="Google" className="w-5 h-5 mr-3" />
                    <span>Sign in with Google</span>
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-blue-100 text-sm">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-white font-medium hover:text-blue-200 transition-colors">
                    Register now
                  </Link>
                </p>
              </div>
            </div>
          )}

          {step === 'otp' && (
            <div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
                <p className="text-blue-100">
                  We've sent a 6-digit code to <span className="font-medium">{email}</span>
                </p>
              </div>

              <form onSubmit={otpForm.handleSubmit(handleOTPSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-white mb-2">
                    Enter OTP
                  </label>
                  <input
                    {...otpForm.register('otp', {
                      required: 'OTP is required',
                      pattern: {
                        value: /^\d{6}$/,
                        message: 'OTP must be 6 digits'
                      }
                    })}
                    type="text"
                    id="otp"
                    placeholder="123456"
                    maxLength={6}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-center text-2xl tracking-widest"
                  />
                  {otpForm.formState.errors.otp && (
                    <p className="mt-1 text-sm text-red-300">{otpForm.formState.errors.otp.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>Verify OTP</span>
                  )}
                </button>
              </form>

              <div className="mt-6 space-y-4">
                <button
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="w-full text-white hover:text-blue-200 transition-colors disabled:opacity-50"
                >
                  Didn't receive the code? Resend OTP
                </button>
                
                <button
                  onClick={handleBackToEmail}
                  className="w-full flex items-center justify-center space-x-2 text-blue-200 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to email</span>
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
              
              <h1 className="text-2xl font-bold text-white mb-2">Login Successful!</h1>
              <p className="text-blue-100 mb-6">Redirecting to dashboard...</p>
              
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div
                  className="bg-white h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
              </div>
            </div>
          )}
        </motion.div>


      </div>
    </div>
  )
}

export default LoginPage
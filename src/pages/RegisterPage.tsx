import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, ArrowLeft, Loader2, CheckCircle, Eye, EyeOff, User, Building, Phone, MapPin, Globe } from 'lucide-react'
import toast from 'react-hot-toast'
import googleLogo from '../assets/google.png'
import { useGoogleLogin } from '@react-oauth/google'
import { useAuthStore } from '@/store/auth-store'

interface RegisterFormData {
  // Student fields
  fullName?: string
  email?: string
  studentPhone?: string
  
  // University fields
  universityName?: string
  officialEmail?: string
  contactPerson?: string
  universityPhone?: string
  website?: string
  country?: string
  city?: string
  
  // Common fields
  password: string
  confirmPassword: string
  userType: 'student' | 'university'
}

interface GoogleUser {
  email: string
  name: string
  picture: string
}

const RegisterPage: React.FC = () => {
  const [userType, setUserType] = useState<'student' | 'university'>('student')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuthStore()
  
  const form = useForm<RegisterFormData>()

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Registration successful!')
      
      // Redirect to login page
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      toast.error('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleRegister = useGoogleLogin({
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
        
        // For registration, we'll just show a success message and redirect to login
        toast.success('Google registration successful! Please log in.')
        
        // Redirect to login page
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } catch (error) {
        console.error('Google registration error:', error);
        toast.error('Google registration failed. Please try again.');
      }
    },
    onError: (error) => {
      console.error('Google registration error:', error);
      toast.error('Google registration failed. Please try again.');
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

        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
        >
          <div className="text-center mb-6">
            <Link to="/login" className="text-blue-200 hover:text-white flex items-center space-x-1 text-sm mb-4 justify-center">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-blue-100">
              {userType === 'student' 
                ? 'Join UnivAegis to streamline your admissions process' 
                : 'Register your university to join the UnivAegis platform'}
            </p>
          </div>

          <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-6">
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                I am a:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType('student')}
                  className={`py-3 px-4 rounded-lg border transition-colors ${
                    userType === 'student'
                      ? 'bg-white text-blue-600 border-white'
                      : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                  }`}
                >
                  <User className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm font-medium">Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('university')}
                  className={`py-3 px-4 rounded-lg border transition-colors ${
                    userType === 'university'
                      ? 'bg-white text-blue-600 border-white'
                      : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                  }`}
                >
                  <Building className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm font-medium">University</span>
                </button>
              </div>
              <input type="hidden" {...form.register('userType')} value={userType} />
            </div>

            {/* Student Registration Form */}
            {userType === 'student' && (
              <>
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-200" />
                    <input
                      {...form.register('fullName', {
                        required: 'Full name is required'
                      })}
                      type="text"
                      id="fullName"
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                  </div>
                  {form.formState.errors.fullName && (
                    <p className="mt-1 text-sm text-red-300">{form.formState.errors.fullName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-200" />
                    <input
                      {...form.register('email', {
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
                  {form.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-300">{form.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label htmlFor="studentPhone" className="block text-sm font-medium text-white mb-2">
                    Phone Number <span className="text-blue-200">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-200" />
                    <input
                      {...form.register('studentPhone')}
                      type="tel"
                      id="studentPhone"
                      placeholder="Enter your phone number"
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                  </div>
                </div>
              </>
            )}

            {/* University Registration Form */}
            {userType === 'university' && (
              <>
                {/* University Name */}
                <div>
                  <label htmlFor="universityName" className="block text-sm font-medium text-white mb-2">
                    University Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-200" />
                    <input
                      {...form.register('universityName', {
                        required: 'University name is required'
                      })}
                      type="text"
                      id="universityName"
                      placeholder="Enter your university name"
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                  </div>
                  {form.formState.errors.universityName && (
                    <p className="mt-1 text-sm text-red-300">{form.formState.errors.universityName.message}</p>
                  )}
                </div>

                {/* Official Email */}
                <div>
                  <label htmlFor="officialEmail" className="block text-sm font-medium text-white mb-2">
                    Official Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-200" />
                    <input
                      {...form.register('officialEmail', {
                        required: 'Official email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      id="officialEmail"
                      placeholder="Enter your official university email"
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                  </div>
                  {form.formState.errors.officialEmail && (
                    <p className="mt-1 text-sm text-red-300">{form.formState.errors.officialEmail.message}</p>
                  )}
                </div>

                {/* Contact Person */}
                <div>
                  <label htmlFor="contactPerson" className="block text-sm font-medium text-white mb-2">
                    Contact Person
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-200" />
                    <input
                      {...form.register('contactPerson', {
                        required: 'Contact person name is required'
                      })}
                      type="text"
                      id="contactPerson"
                      placeholder="Name of primary contact person"
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                  </div>
                  {form.formState.errors.contactPerson && (
                    <p className="mt-1 text-sm text-red-300">{form.formState.errors.contactPerson.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="universityPhone" className="block text-sm font-medium text-white mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-200" />
                    <input
                      {...form.register('universityPhone', {
                        required: 'Phone number is required'
                      })}
                      type="tel"
                      id="universityPhone"
                      placeholder="Enter university contact number"
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                  </div>
                  {form.formState.errors.universityPhone && (
                    <p className="mt-1 text-sm text-red-300">{form.formState.errors.universityPhone.message}</p>
                  )}
                </div>

                {/* Website (Optional) */}
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-white mb-2">
                    University Website <span className="text-blue-200">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-200" />
                    <input
                      {...form.register('website')}
                      type="url"
                      id="website"
                      placeholder="https://www.youruniversity.edu"
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-white mb-2">
                    Country
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-200" />
                    <input
                      {...form.register('country', {
                        required: 'Country is required'
                      })}
                      type="text"
                      id="country"
                      placeholder="Enter country"
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                  </div>
                  {form.formState.errors.country && (
                    <p className="mt-1 text-sm text-red-300">{form.formState.errors.country.message}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-white mb-2">
                    City
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-200" />
                    <input
                      {...form.register('city', {
                        required: 'City is required'
                      })}
                      type="text"
                      id="city"
                      placeholder="Enter city"
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                  </div>
                  {form.formState.errors.city && (
                    <p className="mt-1 text-sm text-red-300">{form.formState.errors.city.message}</p>
                  )}
                </div>
              </>
            )}

            {/* Password (Common for both) */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...form.register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    form.setValue('password', e.target.value)
                  }}
                  placeholder="Create a password"
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
              {form.formState.errors.password && (
                <p className="mt-1 text-sm text-red-300">{form.formState.errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password (Common for both) */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  {...form.register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === password || 'Passwords do not match'
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    form.setValue('confirmPassword', e.target.value)
                  }}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {form.formState.errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-300">{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>
                  {userType === 'student' ? 'Create Student Account' : 'Register University'}
                </span>
              )}
            </button>

            {/* Google Register */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-blue-100">Or register with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleGoogleRegister()}
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-white/30 rounded-md shadow-sm bg-white text-gray-800 hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              <img src={googleLogo} alt="Google" className="w-5 h-5 mr-3" />
              <span>Register with Google</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-blue-100 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-white hover:text-blue-200 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RegisterPage
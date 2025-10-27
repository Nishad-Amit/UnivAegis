import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Award, 
  FileText, 
  Shield, 
  TrendingUp, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Bell, 
  MessageSquare, 
  HelpCircle, 
  Star, 
  Flag, 
  Globe, 
  BookOpen, 
  Target, 
  Edit, 
  Plus, 
  Eye, 
  Download, 
  ChevronRight, 
  Lock, 
  EyeOff,
  Camera,
  X,
  MoreHorizontal,
  LogOut,
  Settings as SettingsIcon
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth-store'
import Header from '@/components/Header'

interface Document {
  id: string
  type: string
  name: string
  status: 'pending' | 'verified' | 'flagged' | 'rejected'
  uploadDate: string
  size: string
}

interface ApplicationStatus {
  id: string
  program: string
  university: string
  status: 'profile_created' | 'docs_uploaded' | 'ai_review' | 'university_review' | 'decision_issued'
  progress: number
  expectedTime: string
  lastUpdate: string
}

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: 'info' | 'warning' | 'success'
}

const StudentDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'documents' | 'applications' | 'messages' | 'profile'>('dashboard')
  const [showPassword, setShowPassword] = useState(false)
  const [profileCompletion, setProfileCompletion] = useState(75)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [avatar, setAvatar] = useState<string | null>(null)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { logout } = useAuthStore()
  
  // Profile state
  const [profileData, setProfileData] = useState({
    fullName: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1995-01-15',
    nationality: 'Indian',
    studyCountry: 'United States',
    intake: 'Fall 2025',
    gender: 'Male',
    address: 'New Delhi, India',
    university: 'Delhi University',
    degree: 'Computer Science',
    graduationYear: '2023'
  })
  
  // Mock data
  const documents: Document[] = [
    { id: 'DOC-001', type: 'Academic', name: 'Transcript.pdf', status: 'verified', uploadDate: '2024-01-15', size: '2.4 MB' },
    { id: 'DOC-002', type: 'Financial', name: 'Bank_Statement.pdf', status: 'flagged', uploadDate: '2024-01-16', size: '1.8 MB' },
    { id: 'DOC-003', type: 'SOP', name: 'Statement_of_Purpose.docx', status: 'verified', uploadDate: '2024-01-17', size: '0.5 MB' },
    { id: 'DOC-004', type: 'ID', name: 'Passport.pdf', status: 'pending', uploadDate: '2024-01-18', size: '3.2 MB' }
  ]

  const applications: ApplicationStatus[] = [
    {
      id: 'APP-001',
      program: 'Computer Science',
      university: 'Stanford University',
      status: 'ai_review',
      progress: 65,
      expectedTime: 'Within 24 hours',
      lastUpdate: '2 hours ago'
    },
    {
      id: 'APP-002',
      program: 'Business Administration',
      university: 'Harvard Business School',
      status: 'docs_uploaded',
      progress: 40,
      expectedTime: 'Within 48 hours',
      lastUpdate: '1 day ago'
    }
  ]

  const notifications: Notification[] = [
    {
      id: 'NOT-001',
      title: 'Document Review Complete',
      message: 'Your SOP has been reviewed with a score of 85/100',
      time: '2 hours ago',
      read: false,
      type: 'success'
    },
    {
      id: 'NOT-002',
      title: 'Action Required',
      message: 'Your bank statement needs additional verification',
      time: '1 day ago',
      read: true,
      type: 'warning'
    },
    {
      id: 'NOT-003',
      title: 'Application Update',
      message: 'Your Stanford application is under AI review',
      time: '2 days ago',
      read: true,
      type: 'info'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-50'
      case 'flagged':
        return 'text-yellow-600 bg-yellow-50'
      case 'rejected':
        return 'text-red-600 bg-red-50'
      case 'pending':
        return 'text-gray-600 bg-gray-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getApplicationStatusText = (status: string) => {
    switch (status) {
      case 'profile_created':
        return 'Profile Created'
      case 'docs_uploaded':
        return 'Documents Uploaded'
      case 'ai_review':
        return 'AI Review'
      case 'university_review':
        return 'University Review'
      case 'decision_issued':
        return 'Decision Issued'
      default:
        return status
    }
  }

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case 'profile_created':
        return 'bg-gray-100 text-gray-800'
      case 'docs_uploaded':
        return 'bg-blue-100 text-blue-800'
      case 'ai_review':
        return 'bg-purple-100 text-purple-800'
      case 'university_review':
        return 'bg-yellow-100 text-yellow-800'
      case 'decision_issued':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'info':
        return <Bell className="w-5 h-5 text-blue-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const removeAvatar = () => {
    setAvatar(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the profile data to a backend here
    setShowEditProfile(false)
    // Update profile completion based on filled fields
    const filledFields = Object.values(profileData).filter(value => value).length
    const completion = Math.round((filledFields / Object.keys(profileData).length) * 100)
    setProfileCompletion(completion)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">UnivAegis</h1>
                <p className="text-sm text-gray-600">Student Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="relative">
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Amit Kumar</span>
                </button>
                
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Amit Kumar</p>
                      <p className="text-xs text-gray-500">amit.kumar@email.com</p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate('/settings');
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <SettingsIcon className="w-4 h-4 mr-2" />
                      Settings
                    </button>
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
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Amit Kumar</h2>
                  <p className="text-sm text-gray-600">India</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                  <span className="text-sm font-medium text-blue-600">{profileCompletion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" 
                    style={{ width: `${profileCompletion}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Complete your profile to improve recommendations</p>
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'dashboard' 
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Dashboard</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'documents' 
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>Documents</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'applications' 
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Target className="w-5 h-5" />
                  <span>Applications</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'messages' 
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Messages</span>
                </button>
              </nav>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-700 hover:bg-gray-50 transition-colors">
                  <HelpCircle className="w-5 h-5" />
                  <span>Help & Support</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg p-8 text-white">
                  <h1 className="text-3xl font-bold mb-2">Welcome, Amit!</h1>
                  <p className="text-xl text-blue-100 mb-6">Let's begin your AI-based profile evaluation</p>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Start Application
                  </button>
                </div>
                
                {/* AI Evaluation Summary */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Evaluation Summary</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">Eligibility Score</h3>
                        <Award className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold text-blue-600 mb-2">78%</div>
                      <p className="text-gray-600 text-sm">Eligible for University X</p>
                      <button className="mt-3 text-blue-600 text-sm font-medium flex items-center">
                        View Details <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">SOP Quality Score</h3>
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-3xl font-bold text-green-600 mb-2">85/100</div>
                      <p className="text-gray-600 text-sm">Strong & Original</p>
                      <button className="mt-3 text-green-600 text-sm font-medium flex items-center">
                        View Details <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">Fraud Risk Level</h3>
                        <Shield className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="text-3xl font-bold text-yellow-600 mb-2">Low Risk</div>
                      <p className="text-gray-600 text-sm">No tampering detected</p>
                      <button className="mt-3 text-yellow-600 text-sm font-medium flex items-center">
                        View Details <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                    
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{notification.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                          <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'documents' && (
              <div className="space-y-8">
                {/* Document Upload Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Document Upload</h2>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Document
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <GraduationCap className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                      <h3 className="font-medium text-gray-900 mb-1">Academic Documents</h3>
                      <p className="text-sm text-gray-600">Transcripts, marksheets, certificates</p>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <Globe className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                      <h3 className="font-medium text-gray-900 mb-1">English Proficiency</h3>
                      <p className="text-sm text-gray-600">IELTS, TOEFL, PTE scorecards</p>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                      <h3 className="font-medium text-gray-900 mb-1">SOP / LOR / Resume</h3>
                      <p className="text-sm text-gray-600">Personal statements and references</p>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <User className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                      <h3 className="font-medium text-gray-900 mb-1">Passport / ID Proof</h3>
                      <p className="text-sm text-gray-600">Identity validation documents</p>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <Award className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                      <h3 className="font-medium text-gray-900 mb-1">Financial Documents</h3>
                      <p className="text-sm text-gray-600">Bank statements, ITR, loan letters</p>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <Plus className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                      <h3 className="font-medium text-gray-900 mb-1">Other Documents</h3>
                      <p className="text-sm text-gray-600">Additional supporting materials</p>
                    </div>
                  </div>
                  
                  {/* Uploaded Documents */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Uploaded Documents</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {documents.map((doc) => (
                          <tr key={doc.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <FileText className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                                  <div className="text-sm text-gray-500">{doc.size}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(doc.status)}`}>
                                {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploadDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 mr-3">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <Download className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'applications' && (
              <div className="space-y-8">
                {/* Application Status Tracker */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Status Tracker</h2>
                  
                  <div className="space-y-8">
                    {applications.map((app) => (
                      <div key={app.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{app.program}</h3>
                            <p className="text-gray-600">{app.university}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getApplicationStatusColor(app.status)}`}>
                            {getApplicationStatusText(app.status)}
                          </span>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Progress</span>
                            <span className="text-sm font-medium text-gray-700">{app.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" 
                              style={{ width: `${app.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Expected: {app.expectedTime}</span>
                          <span>Last update: {app.lastUpdate}</span>
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-4">
                              <div className="flex items-center">
                                <div className={`w-3 h-3 rounded-full mr-2 ${app.status === 'profile_created' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                <span className="text-sm">Profile Created</span>
                              </div>
                              <div className="flex items-center">
                                <div className={`w-3 h-3 rounded-full mr-2 ${app.status === 'docs_uploaded' || app.status === 'ai_review' || app.status === 'university_review' || app.status === 'decision_issued' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                <span className="text-sm">Docs Uploaded</span>
                              </div>
                              <div className="flex items-center">
                                <div className={`w-3 h-3 rounded-full mr-2 ${app.status === 'ai_review' || app.status === 'university_review' || app.status === 'decision_issued' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                <span className="text-sm">AI Review</span>
                              </div>
                              <div className="flex items-center">
                                <div className={`w-3 h-3 rounded-full mr-2 ${app.status === 'university_review' || app.status === 'decision_issued' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                <span className="text-sm">University Review</span>
                              </div>
                              <div className="flex items-center">
                                <div className={`w-3 h-3 rounded-full mr-2 ${app.status === 'decision_issued' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                <span className="text-sm">Decision</span>
                              </div>
                            </div>
                            <button className="text-blue-600 text-sm font-medium flex items-center">
                              View Details <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'messages' && (
              <div className="space-y-8">
                {/* Communication Panel */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages & Support</h2>
                  
                  <div className="flex">
                    {/* Chat List */}
                    <div className="w-1/3 border-r border-gray-200 pr-4">
                      <div className="mb-4">
                        <input
                          type="text"
                          placeholder="Search messages..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">Admissions Support</h3>
                            <span className="text-xs text-gray-500">2h ago</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">Your bank statement needs additional verification...</p>
                        </div>
                        
                        <div className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">Application Advisor</h3>
                            <span className="text-xs text-gray-500">1d ago</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">Application guidance for Canada...</p>
                        </div>
                        
                        <div className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">Application Advisor</h3>
                            <span className="text-xs text-gray-500">1d ago</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">Application guidance for Canada...</p>
                        </div>
                        
                        <div className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">Document Review</h3>
                            <span className="text-xs text-gray-500">3d ago</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">SOP review completed with score 85/100...</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Chat Window */}
                    <div className="w-2/3 pl-4">
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900">Admissions Support</h3>
                        <button className="text-gray-500 hover:text-gray-700">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="h-96 overflow-y-auto mb-4 space-y-4">
                        <div className="flex">
                          <div className="bg-gray-100 rounded-lg p-4 max-w-xs">
                            <p className="text-gray-800">Hi Amit, I noticed your bank statement needs additional verification. Could you please provide the last 6 months of statements?</p>
                            <p className="text-xs text-gray-500 mt-2">10:30 AM</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <div className="bg-blue-100 rounded-lg p-4 max-w-xs">
                            <p className="text-gray-800">Sure, I'll upload the additional statements by tomorrow.</p>
                            <p className="text-xs text-gray-500 mt-2">10:32 AM</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="bg-gray-100 rounded-lg p-4 max-w-xs">
                            <p className="text-gray-800">Perfect! Once you upload them, our system will automatically re-evaluate your financial documentation.</p>
                            <p className="text-xs text-gray-500 mt-2">10:33 AM</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Notifications */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
                  
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{notification.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                          <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="space-y-8">
                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
                    <button 
                      onClick={() => setShowEditProfile(!showEditProfile)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>{showEditProfile ? 'Cancel' : 'Edit Profile'}</span>
                    </button>
                  </div>
                  
                  {!showEditProfile ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Profile Picture */}
                      <div className="md:col-span-1">
                        <div className="flex flex-col items-center">
                          <div className="relative mb-4">
                            <div className="w-32 h-32 rounded-full overflow-hidden">
                              {avatar ? (
                                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                                  <User className="w-16 h-16 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{profileData.fullName}</h3>
                          <p className="text-gray-600">{profileData.address}</p>
                          <p className="text-sm text-gray-500 mt-1">Student ID: STU-001</p>
                        </div>
                      </div>
                      
                      {/* Profile Details */}
                      <div className="md:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Full Name</h4>
                            <p className="text-gray-900">{profileData.fullName}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Email Address</h4>
                            <p className="text-gray-900">{profileData.email}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Phone Number</h4>
                            <p className="text-gray-900">{profileData.phone}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Date of Birth</h4>
                            <p className="text-gray-900">{profileData.dateOfBirth}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Nationality</h4>
                            <p className="text-gray-900">{profileData.nationality}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Preferred Study Country</h4>
                            <p className="text-gray-900">{profileData.studyCountry}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Preferred Intake</h4>
                            <p className="text-gray-900">{profileData.intake}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Gender</h4>
                            <p className="text-gray-900">{profileData.gender}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Address</h4>
                            <p className="text-gray-900">{profileData.address}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">University</h4>
                            <p className="text-gray-900">{profileData.university}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Degree</h4>
                            <p className="text-gray-900">{profileData.degree}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Graduation Year</h4>
                            <p className="text-gray-900">{profileData.graduationYear}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Profile Picture */}
                      <div className="md:col-span-1">
                        <div className="flex flex-col items-center">
                          <div className="relative mb-4">
                            <div className="w-32 h-32 rounded-full overflow-hidden">
                              {avatar ? (
                                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                                  <User className="w-16 h-16 text-white" />
                                </div>
                              )}
                            </div>
                            <button 
                              onClick={triggerFileInput}
                              className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                            >
                              <Camera className="w-4 h-4 text-gray-600" />
                            </button>
                            {avatar && (
                              <button 
                                onClick={removeAvatar}
                                className="absolute top-2 right-2 bg-red-500 rounded-full p-1 shadow-md hover:bg-red-600"
                              >
                                <X className="w-3 h-3 text-white" />
                              </button>
                            )}
                          </div>
                          <button 
                            onClick={triggerFileInput}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Change Profile Photo
                          </button>
                          <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size of 5MB</p>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            accept="image/*"
                            className="hidden"
                          />
                        </div>
                      </div>
                      
                      {/* Edit Form */}
                      <div className="md:col-span-2">
                        <form onSubmit={handleSaveProfile} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                              <input
                                type="text"
                                value={profileData.fullName}
                                onChange={(e) => handleProfileChange('fullName', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                              <input
                                type="email"
                                value={profileData.email}
                                onChange={(e) => handleProfileChange('email', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                              <input
                                type="tel"
                                value={profileData.phone}
                                onChange={(e) => handleProfileChange('phone', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                              <input
                                type="date"
                                value={profileData.dateOfBirth}
                                onChange={(e) => handleProfileChange('dateOfBirth', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
                              <select 
                                value={profileData.nationality}
                                onChange={(e) => handleProfileChange('nationality', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option>Indian</option>
                                <option>American</option>
                                <option>British</option>
                                <option>Canadian</option>
                                <option>Australian</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Study Country</label>
                              <select 
                                value={profileData.studyCountry}
                                onChange={(e) => handleProfileChange('studyCountry', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option>United States</option>
                                <option>United Kingdom</option>
                                <option>Canada</option>
                                <option>Australia</option>
                                <option>Germany</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Intake</label>
                              <select 
                                value={profileData.intake}
                                onChange={(e) => handleProfileChange('intake', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option>Fall 2025</option>
                                <option>Spring 2025</option>
                                <option>Fall 2026</option>
                                <option>Spring 2026</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                              <select 
                                value={profileData.gender}
                                onChange={(e) => handleProfileChange('gender', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                              <input
                                type="text"
                                value={profileData.address}
                                onChange={(e) => handleProfileChange('address', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                              <input
                                type="text"
                                value={profileData.university}
                                onChange={(e) => handleProfileChange('university', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                              <input
                                type="text"
                                value={profileData.degree}
                                onChange={(e) => handleProfileChange('degree', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                              <input
                                type="text"
                                value={profileData.graduationYear}
                                onChange={(e) => handleProfileChange('graduationYear', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                            <button
                              type="button"
                              onClick={() => setShowEditProfile(false)}
                              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Security Settings */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Change Password</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5 text-gray-400" />
                              ) : (
                                <Eye className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5 text-gray-400" />
                              ) : (
                                <Eye className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5 text-gray-400" />
                              ) : (
                                <Eye className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Update Password
                      </button>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                      <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                    

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboardPage
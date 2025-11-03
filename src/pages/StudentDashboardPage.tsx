import React, { useState, useRef } from 'react'
import { 
  User, 
  FileText, 
  BookOpen, 
  DollarSign, 
  Mic, 
  Upload, 
  ChevronDown, 
  ChevronRight,
  CheckCircle,
  Share2,
  ExternalLink,
  LogOut,
  X
} from 'lucide-react'
import DigiLockerIcon from '@/components/DigiLockerIcon'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth-store'
import univAegisLogo from '@/assets/univAegislogo.png'
import Footer from '@/components/Footer'

// Define types based on the MongoDB schema
interface EducationDocs {
  tenth: string
  twelfth: string
}

interface EnglishTest {
  testType: string
  certificateUrl: string
}

interface UserProfile {
  userId: string
  email: string
  passportVerified: boolean
  aadhaarIssued: boolean
  panIssued: boolean
  educationDocs: EducationDocs
  englishTest: EnglishTest
  financialDocs: string[]
  sop: string
  status: string
}

const StudentDashboardPage: React.FC = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isReportVisible, setIsReportVisible] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [currentUploadType, setCurrentUploadType] = useState<string | null>(null)
  const [sharedUniversities, setSharedUniversities] = useState<string[]>([
    "University of the Sunshine Coast (UniSC), Australia"
  ])
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([])
  
  // Mock user data based on the MongoDB schema
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userId: user?.id || 'STU-001',
    email: user?.email || 'student@example.com',
    passportVerified: false,
    aadhaarIssued: false,
    panIssued: false,
    educationDocs: {
      tenth: '',
      twelfth: ''
    },
    englishTest: {
      testType: '',
      certificateUrl: ''
    },
    financialDocs: [],
    sop: '',
    status: 'incomplete'
  })
  
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  
  // Toggle accordion panels
  const toggleAccordion = (panel: string) => {
    setOpenAccordion(openAccordion === panel ? null : panel)
  }
  
  // Handle file uploads
  const handleFileUpload = (type: string) => {
    // Set the current upload type and trigger file input
    setCurrentUploadType(type);
    
    // Trigger the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  
  // Handle actual file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log(`File selected for ${currentUploadType}:`, file.name);
      
      // Update mock state for demonstration
      switch(currentUploadType) {
        case 'passport':
          setUserProfile({...userProfile, passportVerified: true})
          alert(`Passport file "${file.name}" uploaded successfully!`);
          break
        case 'aadhaar':
          setUserProfile({...userProfile, aadhaarIssued: true})
          alert(`Aadhaar file "${file.name}" uploaded successfully!`);
          break
        case 'pan':
          setUserProfile({...userProfile, panIssued: true})
          alert(`PAN file "${file.name}" uploaded successfully!`);
          break
        case 'english':
          setUserProfile({...userProfile, englishTest: {...userProfile.englishTest, testType: 'IELTS', certificateUrl: 'uploaded'}})
          alert(`English certificate "${file.name}" uploaded successfully!`);
          break
        case 'financial':
          setUserProfile({...userProfile, financialDocs: [...userProfile.financialDocs, file.name]})
          alert(`Financial document "${file.name}" uploaded successfully!`);
          break
        case 'sop':
          setUserProfile({...userProfile, sop: file.name})
          alert(`Statement of Purpose "${file.name}" uploaded successfully!`);
          break
        case 'documents':
          console.log('Linking DigiLocker')
          alert('DigiLocker linking initiated!');
          break
        default:
          alert(`File "${file.name}" uploaded successfully!`);
          break
      }
      
      // Reset the file input
      event.target.value = '';
    }
  }
  
  // Handle logout
  const handleLogout = () => {
    logout()
    setIsProfileMenuOpen(false)
    navigate('/login')
  }
  
  // Share profile with universities
  const shareProfile = () => {
    console.log('Sharing profile with universities')
    // In a real app, this would make an API call to /api/profile/share
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
      />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with text - links to landing page */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={univAegisLogo} 
                alt="UnivAegis Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-gray-900 text-center">UnivAegis</span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>
                <span className="text-gray-700 font-medium hidden md:inline">{user?.name}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link
                    to="/student-dashboard"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Profile
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
          </div>
        </div>
      </header>

      {/* Top Info Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-600 mb-2 sm:mb-0">
              Complete your verifications to unlock your UnivAegis profile
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share with University</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Three Primary Cards (Verification Tiles) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Passport Verification Card */}
          <div className="bg-white rounded-2xl shadow p-5 border border-gray-200 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold">Passport</h2>
            </div>
            
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center text-gray-600">
                <span>• Passport verification</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 mb-4 flex-grow">
              {userProfile.passportVerified ? "Verified" : "Not verified"}
            </div>
            
            <button 
              onClick={() => handleFileUpload('passport')}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors mt-auto"
            >
              VERIFY PASSPORT
            </button>
          </div>
          
          {/* Personal & Educational Verification Card */}
          <div className="bg-white rounded-2xl shadow p-5 border border-gray-200 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold">Personal & Educational</h2>
            </div>
            
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center text-gray-600">
                <span>• Personal profile</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span>• Education records</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span>• English</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 mb-4 flex-grow">
              No DigiLocker account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
            </div>
            
            <button 
              onClick={() => {
                alert('DigiLocker linking initiated! You will be redirected to DigiLocker to authenticate and link your account.');
                console.log('Linking DigiLocker');
              }}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors mt-auto flex items-center justify-center"
            >
              <DigiLockerIcon className="w-4 h-4 mr-2" />
              LINK DIGILOCKER
            </button>
          </div>
          
          {/* Financial Status Verification Card */}
          <div className="bg-white rounded-2xl shadow p-5 border border-gray-200 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                <DollarSign className="w-5 h-5 text-yellow-600" />
              </div>
              <h2 className="text-lg font-semibold">Financial Status</h2>
            </div>
            
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center text-gray-600">
                <span>• Bank account information</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span>• Student Interview</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 mb-4 flex-grow">
              {userProfile.financialDocs.length > 0 ? "Uploaded" : "Not uploaded"}
            </div>
            
            <button 
              onClick={() => handleFileUpload('financial')}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors mt-auto"
            >
              UPLOAD BANK STATEMENT
            </button>
          </div>
        </div>
        
        {/* UniReady Report Section */}
        <div className="bg-white rounded-2xl shadow p-5 border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">UnivAegis Report</h3>
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pending</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">View your complete UnivAegis status and details</p>
          <button 
            onClick={() => setIsReportVisible(!isReportVisible)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            {isReportVisible ? 'HIDE REPORT' : 'SHOW REPORT'}
            <ChevronRight className={`w-4 h-4 ml-1 transform transition-transform ${isReportVisible ? 'rotate-90' : ''}`} />
          </button>
          
          {/* UnivAegis Verification Report Details */}
          {isReportVisible && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold text-lg mb-3">UnivAegis Verification Report</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Generated on</p>
                    <p className="font-medium">{new Date().toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500">UnivAegis Report Number</p>
                    <p className="font-medium">URN-XXXX-XXXX</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500">Verification Status</p>
                    <p className="font-medium text-yellow-600">Pending</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span>Passport Verification</span>
                    <div className="text-right">
                      <p className="font-medium text-yellow-600">Pending</p>
                      <p className="text-xs text-gray-500">Passport verification pending</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span>Personal Verification</span>
                    <div className="text-right">
                      <p className="font-medium text-yellow-600">Pending</p>
                      <p className="text-xs text-gray-500">Personal verification pending</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span>Education Verification</span>
                    <div className="text-right">
                      <p className="font-medium text-yellow-600">Pending</p>
                      <p className="text-xs text-gray-500">Education verification pending</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span>English Certificate Verification</span>
                    <div className="text-right">
                      <p className="font-medium text-yellow-600">Pending</p>
                      <p className="text-xs text-gray-500">English certificate verification pending</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span>Financial Verification</span>
                    <div className="text-right">
                      <p className="font-medium text-yellow-600">Pending</p>
                      <p className="text-xs text-gray-500">Financial verification pending</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>GS Interview Assessment</span>
                    <div className="text-right">
                      <p className="font-medium text-yellow-600">Pending</p>
                      <p className="text-xs text-gray-500">GS Interview pending</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 italic">
                    This is an official verification report generated by UnivAegis
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Detailed Sections (Accordion Panels) - All in Card Format */}
        <div className="grid grid-cols-1 gap-6">
          {/* (A) Passport Section */}
          <div className="bg-white rounded-2xl shadow border border-gray-200">
            <button
              onClick={() => toggleAccordion('passport')}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-600 mr-3" />
                <h2 className="text-lg font-semibold">Passport</h2>
              </div>
              <ChevronRight 
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  openAccordion === 'passport' ? 'rotate-90' : ''
                }`} 
              />
            </button>
            
            {openAccordion === 'passport' && (
              <div className="px-5 pb-5 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600">
                    No passport details. Please verify your passport to continue.
                  </p>
                  {!userProfile.passportVerified && (
                    <button 
                      onClick={() => handleFileUpload('passport')}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Verify Passport
                    </button>
                  )}
                </div>
                
                {userProfile.passportVerified && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* (B) Documents / Certificates Section */}
          <div className="bg-white rounded-2xl shadow border border-gray-200">
            <button
              onClick={() => toggleAccordion('documents')}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-gray-600 mr-3" />
                <h2 className="text-lg font-semibold">Documents / Certificates</h2>
              </div>
              <ChevronRight 
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  openAccordion === 'documents' ? 'rotate-90' : ''
                }`} 
              />
            </button>
            
            {openAccordion === 'documents' && (
              <div className="px-5 pb-5 border-t border-gray-200 pt-4">
                {/* Subsection 1: Personal */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Personal</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Aadhaar Card</span>
                      <span className="text-gray-500 text-sm">not issued</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">PAN Card</span>
                      <span className="text-gray-500 text-sm">not issued</span>
                    </div>
                  </div>
                </div>
                
                {/* Subsection 2: Education */}
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-3">Education</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">10th Marksheet</span>
                      <span className="text-gray-500 text-sm">not uploaded</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">12th Marksheet</span>
                      <span className="text-gray-500 text-sm">not uploaded</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    alert('DigiLocker linking initiated! You will be redirected to DigiLocker to authenticate and link your account.');
                    console.log('Linking DigiLocker');
                  }}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors mb-4 flex items-center justify-center"
                >
                  <DigiLockerIcon className="w-4 h-4 mr-2" />
                  LINK DIGILOCKER
                </button>
                
                <div className="text-sm text-gray-500">
                  No DigiLocker account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
                </div>
              </div>
            )}
          </div>
          
          {/* (C) English Section */}
          <div className="bg-white rounded-2xl shadow border border-gray-200">
            <button
              onClick={() => toggleAccordion('english')}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-gray-600 mr-3" />
                <h2 className="text-lg font-semibold">English</h2>
              </div>
              <ChevronRight 
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  openAccordion === 'english' ? 'rotate-90' : ''
                }`} 
              />
            </button>
            
            {openAccordion === 'english' && (
              <div className="px-5 pb-5 border-t border-gray-200 pt-4">
                <p className="text-gray-600 mb-4">
                  No English test certificate uploaded
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Upload your English proficiency test certificate to complete your profile. We support various English tests including IELTS, TOEFL, PTE Academic, and more. You can upload only one certificate, which will be verified by our verification officers.
                </p>
                <button 
                  onClick={() => handleFileUpload('english')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Upload Your Certificate
                </button>
              </div>
            )}
          </div>
          
          {/* (D) Financial Section */}
          <div className="bg-white rounded-2xl shadow border border-gray-200">
            <button
              onClick={() => toggleAccordion('financial')}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-gray-600 mr-3" />
                <h2 className="text-lg font-semibold">Financial</h2>
              </div>
              <div className="flex items-center">
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mr-2">Pending</span>
                <ChevronRight 
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    openAccordion === 'financial' ? 'rotate-90' : ''
                  }`} 
                />
              </div>
            </button>
            
            {openAccordion === 'financial' && (
              <div className="px-5 pb-5 border-t border-gray-200 pt-4">
                <p className="text-gray-600 mb-4">
                  No Financial Documents Found
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  You haven't uploaded any financial documents. Upload your bank statements and other financial documents to get started.
                </p>
                <button 
                  onClick={() => handleFileUpload('financial')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Upload Your Documents
                </button>
              </div>
            )}
          </div>
          
          {/* (E) Student Interview Section */}
          <div className="bg-white rounded-2xl shadow border border-gray-200">
            <button
              onClick={() => toggleAccordion('interview')}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div className="flex items-center">
                <Mic className="w-5 h-5 text-gray-600 mr-3" />
                <h2 className="text-lg font-semibold">Student Interview</h2>
              </div>
              <ChevronRight 
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  openAccordion === 'interview' ? 'rotate-90' : ''
                }`} 
              />
            </button>
            
            {openAccordion === 'interview' && (
              <div className="px-5 pb-5 border-t border-gray-200 pt-4">
                <p className="text-gray-600 mb-6">
                  The Genuine Student (GS) interview is a key part of the Australian university admissions process. It assesses your motivation, academic preparedness, and intent to study in Australia...
                </p>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Upload Statement of Purpose</h3>
                  <p className="text-sm text-gray-600 mb-4">Step 1 of 2: Upload your SOP before starting the interview.</p>
                  
                  {/* Guidelines checklist */}
                  <div className="space-y-2 mb-4 bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-700 mb-2">SOP Template & Guidelines:</p>
                    <div className="space-y-1">
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">What are your academic and professional goals?</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Why are you interested in studying abroad?</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">What research you have undertaken to understand the university and course?</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">What specific skills and experiences make you a strong candidate?</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">How will this program help you achieve your long-term objectives?</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* File Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-1">Drag & drop your SOP here</p>
                    <p className="text-sm text-gray-500 mb-1">or click to browse files</p>
                    <p className="text-xs text-gray-500 mb-3">Only PDF files are accepted (max 10MB)</p>
                    <button 
                      onClick={() => handleFileUpload('sop')}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Upload SOP
                    </button>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-xs text-yellow-700">
                      Your SOP must be uploaded before you can start the interview. Make sure your document addresses all required questions and is in PDF format.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Bottom Section (Share Profile) */}
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Share Your Profile with Universities</h2>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Complete your verifications and share your UnivAegis profile</h3>
            
            <p className="text-gray-600 mb-4 text-sm">
              Complete passport verification first, then undertake the personal and financial verification. Complete the online interview and you will be ready to share your UnivAegis profile. Remember to click on the share button to share your profile with your selected universities to:
            </p>
            
            <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm mb-4">
              <li>Fast-track your admission process</li>
              <li>Showcase your verified credentials</li>
              <li>Demonstrate your academic and financial readiness</li>
              <li>Stand out from other applicants</li>
              <li>Get priority consideration from universities</li>
            </ul>
            
            <p className="text-gray-600 mb-4 text-sm">
              Use the 'Share with University' button above to select and share your profile with your preferred universities.
            </p>
            
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="w-full bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center"
            >
              <Share2 className="w-5 h-5 mr-2" />
              SHARE WITH UNIVERSITY
            </button>
          </div>
          

        </div>
      </div>
      
      {/* Share with University Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Share Your Profile</h3>
                <button 
                  onClick={() => setIsShareModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-bold text-yellow-800 mb-2">Complete Your Profile First</h4>
                <p className="text-yellow-700 text-sm">
                  Your profile verification is still pending. We recommend completing your Passport, Personal, Education, GS Interview, English Test, and financial verifications before sharing with universities for the best results.
                </p>
              </div>
              
              <p className="text-gray-600 mb-4">
                Share your UnivAegis profile with universities to fast-track your admission process. Select one or more universities below. Already shared universities are marked and cannot be selected again.
              </p>
              
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-2">Already Shared With</h4>
                {sharedUniversities.length > 0 ? (
                  <div className="space-y-2">
                    {sharedUniversities.map((university, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                        <p className="text-gray-700">{university}</p>
                        <button 
                          onClick={() => {
                            setSharedUniversities(sharedUniversities.filter((_, i) => i !== index))
                          }}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-gray-500 text-sm">No universities shared yet. Add universities above to get started.</p>
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-2">Step 1: Select Universities</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Universities</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search and select universities..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) {
                            const newUniversity = (e.target as HTMLInputElement).value.trim()
                            if (!sharedUniversities.includes(newUniversity)) {
                              setSharedUniversities([...sharedUniversities, newUniversity])
                            }
                            ;(e.target as HTMLInputElement).value = ''
                          }
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Press Enter to add university</p>
                  </div>
                  
                  {/* Sample universities for quick selection */}
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Quick Add:</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          const newUniversity = "University of Melbourne, Australia"
                          if (!sharedUniversities.includes(newUniversity)) {
                            setSharedUniversities([...sharedUniversities, newUniversity])
                          }
                        }}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                      >
                        University of Melbourne
                      </button>
                      <button
                        onClick={() => {
                          const newUniversity = "University of Sydney, Australia"
                          if (!sharedUniversities.includes(newUniversity)) {
                            setSharedUniversities([...sharedUniversities, newUniversity])
                          }
                        }}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                      >
                        University of Sydney
                      </button>
                      <button
                        onClick={() => {
                          const newUniversity = "Monash University, Australia"
                          if (!sharedUniversities.includes(newUniversity)) {
                            setSharedUniversities([...sharedUniversities, newUniversity])
                          }
                        }}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                      >
                        Monash University
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsShareModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert(`Profile shared with ${sharedUniversities.length} universities successfully!`)
                    setIsShareModalOpen(false)
                  }}
                  disabled={sharedUniversities.length === 0}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    sharedUniversities.length === 0 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Share Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default StudentDashboardPage
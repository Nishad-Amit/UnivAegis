import React, { useState, useRef } from 'react';
import { 
  User, 
  FileText, 
  Upload, 
  ChevronDown, 
  ChevronRight,
  CheckCircle,
  LogOut,
  X,
  Loader
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth-store';
import univAegisLogo from '@/assets/univAegislogo.png';
import Footer from '@/components/Footer';

// Define application status types
type ApplicationStatus = 
  | 'NOT_STARTED' 
  | 'DOCUMENT_UPLOADED' 
  | 'ELIGIBLE' 
  | 'FINANCIAL_OK' 
  | 'FRAUD_CHECKED' 
  | 'COMPLETED';

// Define application interface
interface Application {
  applicationId: string;
  status: ApplicationStatus;
  extractedProfile?: {
    fullName: string;
    dateOfBirth: string;
    email: string;
    country: string;
    degree: string;
    gpa: string;
  };
  selectedUniversity?: string;
  eligibilityResult?: 'ELIGIBLE' | 'NOT_ELIGIBLE';
  financialStatus?: string;
  fraudStatus?: string;
  finalState?: 'UNDER_REVIEW' | 'NOT_ELIGIBLE';
  createdAt?: Date;
}

const StudentDashboardPage: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Application state
  const [application, setApplication] = useState<Application>({
    applicationId: 'APP-' + Math.floor(1000 + Math.random() * 9000),
    status: 'NOT_STARTED',
    createdAt: new Date()
  });
  
  // Store completed applications
  const [completedApplications, setCompletedApplications] = useState<Application[]>([]);
  
  // UI state for steps
  const [isUploading, setIsUploading] = useState(false);
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false);
  const [isFinancialChecking, setIsFinancialChecking] = useState(false);
  const [isFraudChecking, setIsFraudChecking] = useState(false);
  
  // Form state
  const [selectedUniversity, setSelectedUniversity] = useState('');
  
  // University options
  const universityOptions = [
    'Charles Darwin University',
    'University of Exeter'
  ];
  
  // Handle logout
  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate('/login');
  };
  
  // Start new application
  const startApplication = () => {
    const newApplication: Application = {
      applicationId: 'APP-' + Math.floor(1000 + Math.random() * 9000),
      status: 'DOCUMENT_UPLOADED' as ApplicationStatus, // Change to next step to show progress
      createdAt: new Date()
    };
    setApplication(newApplication);
  };
  
  // Handle file upload
  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Handle actual file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log('File selected:', file.name);
      
      // Start upload process
      setIsUploading(true);
      
      // Update application with current timestamp
      setApplication(prev => ({
        ...prev,
        createdAt: new Date()
      }));
      
      // Simulate file processing (20 seconds)
      setTimeout(() => {
        // Generate the specific applicant data as provided
        const fakeProfile = {
          fullName: "Sudhakar Gautam",
          dateOfBirth: "05/01/2003",
          email: "sudhakargautam44@gmail.com",
          country: "INDIA",
          degree: "Bachelor of Business Administration (Hons)",
          gpa: "3.7/4.0"
        };
        
        // Update application state
        setApplication(prev => ({
          ...prev,
          status: 'DOCUMENT_UPLOADED' as ApplicationStatus,
          extractedProfile: fakeProfile,
          createdAt: new Date() // Ensure we have the latest timestamp
        }));
        
        setIsUploading(false);
        
        // Reset file input
        event.target.value = '';
      }, 20000);
    }
  };
  
  // Check eligibility
  const checkEligibility = () => {
    if (!selectedUniversity) return;
    
    setIsCheckingEligibility(true);
    
    // Simulate eligibility check (5-10 seconds)
    setTimeout(() => {
      // Make Charles Darwin University always eligible
      // Make University of Exeter not eligible
      const isEligible = selectedUniversity === 'Charles Darwin University';
      
      setApplication(prev => ({
        ...prev,
        status: isEligible ? 'ELIGIBLE' : 'DOCUMENT_UPLOADED',
        selectedUniversity: selectedUniversity,
        eligibilityResult: isEligible ? 'ELIGIBLE' : 'NOT_ELIGIBLE'
      }));
      
      setIsCheckingEligibility(false);
    }, 7000);
  };
  
  // Proceed to financial verification
  const proceedToFinancial = () => {
    setIsFinancialChecking(true);
    
    // Simulate financial verification (10-20 seconds)
    setTimeout(() => {
      setApplication(prev => ({
        ...prev,
        status: 'FINANCIAL_OK',
        financialStatus: 'PASSED'
      }));
      
      setIsFinancialChecking(false);
    }, 15000);
  };
  
  // Proceed to fraud detection
  const proceedToFraud = () => {
    setIsFraudChecking(true);
    
    // Simulate fraud detection (5-10 seconds)
    setTimeout(() => {
      setApplication(prev => ({
        ...prev,
        status: 'FRAUD_CHECKED',
        fraudStatus: 'CLEAR'
      }));
      
      setIsFraudChecking(false);
    }, 7000);
  };
  
  // Complete application - Save all applications
  const completeApplication = () => {
    const completedApp: Application = {
      ...application,
      status: 'COMPLETED' as ApplicationStatus,
      finalState: 'UNDER_REVIEW'
    };
    
    // Add to completed applications
    setCompletedApplications(prev => [...prev, completedApp]);
    
    // Update current application
    setApplication(completedApp);
  };
  
  // Save and reset - for saving incomplete applications
  const saveAndReset = () => {
    // Only add to completed applications if the current application is not already completed
    if (application.status !== 'COMPLETED') {
      // Save current application regardless of status
      const savedApp: Application = {
        ...application,
        status: 'COMPLETED' as ApplicationStatus,
        finalState: application.eligibilityResult === 'ELIGIBLE' 
          ? 'UNDER_REVIEW' 
          : application.eligibilityResult === 'NOT_ELIGIBLE' 
            ? 'NOT_ELIGIBLE' 
            : 'NOT_ELIGIBLE' // Default to NOT_ELIGIBLE if no eligibility result
      };
      
      // Add to completed applications
      setCompletedApplications(prev => [...prev, savedApp]);
    }
    
    // Reset to initial state to show Application 1 but keep completed applications
    setApplication({
      applicationId: 'APP-' + Math.floor(1000 + Math.random() * 9000),
      status: 'NOT_STARTED' as ApplicationStatus,
      createdAt: new Date()
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Application Status Tracker */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Application Progress</h2>
            
            <div className="flex items-center justify-between relative">
              {/* Progress line */}
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200 z-0"></div>
              
              {/* Status indicators */}
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  ['NOT_STARTED', 'DOCUMENT_UPLOADED', 'ELIGIBLE', 'FINANCIAL_OK', 'FRAUD_CHECKED', 'COMPLETED'].includes(application.status) 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <span className="text-xs mt-2 text-center">Start</span>
              </div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  ['DOCUMENT_UPLOADED', 'ELIGIBLE', 'FINANCIAL_OK', 'FRAUD_CHECKED', 'COMPLETED'].includes(application.status) 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <span className="text-xs mt-2 text-center">Document<br/>Upload</span>
              </div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  ['ELIGIBLE', 'FINANCIAL_OK', 'FRAUD_CHECKED', 'COMPLETED'].includes(application.status) 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
                <span className="text-xs mt-2 text-center">Eligibility<br/>Check</span>
              </div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  ['FINANCIAL_OK', 'FRAUD_CHECKED', 'COMPLETED'].includes(application.status) 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  4
                </div>
                <span className="text-xs mt-2 text-center">Financial<br/>Check</span>
              </div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  ['FRAUD_CHECKED', 'COMPLETED'].includes(application.status) 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  5
                </div>
                <span className="text-xs mt-2 text-center">Fraud<br/>Check</span>
              </div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  application.status === 'COMPLETED' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  6
                </div>
                <span className="text-xs mt-2 text-center">Complete</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Completed Applications Section - More Prominent Display */}
        {completedApplications.length > 0 && (
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Completed Applications</h2>
              <div className="space-y-4">
                {completedApplications.map((app, index) => (
                  <div key={app.applicationId} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div>
                        <h3 className="font-bold text-gray-900">Application #{app.applicationId}</h3>
                        <p className="text-sm text-gray-600">
                          University: {app.selectedUniversity || 'Not specified'}
                        </p>
                        <p className="text-xs text-gray-500">
                          Submitted: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                        app.finalState === 'UNDER_REVIEW' || app.eligibilityResult === 'ELIGIBLE' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {app.finalState === 'UNDER_REVIEW' || app.eligibilityResult === 'ELIGIBLE' ? 'Eligible' : 'Not Eligible'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content Based on Application Status */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
          {/* 1️⃣ Dashboard – Start Application Screen */}
          {application.status === 'NOT_STARTED' && (
            <div className="text-center py-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Start your application</h1>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Upload your documents and check your eligibility in a few steps.
              </p>
              
              <button
                onClick={startApplication}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
              >
                Start Application
              </button>
              
              <p className="text-gray-500 text-sm mt-6">
                If you have already applied, we'll show your latest status here.
              </p>
            </div>
          )}
          
          {/* 2️⃣ Upload PDF → Fake Data Extraction */}
          {application.status === 'DOCUMENT_UPLOADED' && !isUploading && (
            <div className="py-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Upload your PDF</h1>
              
              {application.extractedProfile ? (
                <>
                  <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile extracted</h2>
                    
                    {/* Program & Application Section */}
                    <div className="mb-6">
                      <h3 className="font-bold text-gray-900 mb-2">🎓 Program & Application</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex">
                          <span className="text-gray-500 w-32">Course Applied:</span>
                          <span className="font-medium">Master of Analytics</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500 w-32">Program Code:</span>
                          <span className="font-medium">MC242</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500 w-32">Intake:</span>
                          <span className="font-medium">Semester 1, 2026</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500 w-32">Campus:</span>
                          <span className="font-medium">City</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500 w-32">Application ID:</span>
                          <span className="font-medium">{application.applicationId}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Personal Details Section */}
                    <div className="mb-6">
                      <h3 className="font-bold text-gray-900 mb-2">👤 Personal Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex">
                          <span className="text-gray-500 w-32">Full Name:</span>
                          <span className="font-medium">{application.extractedProfile.fullName}</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500 w-32">DOB:</span>
                          <span className="font-medium">{application.extractedProfile.dateOfBirth}</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500 w-32">Gender:</span>
                          <span className="font-medium">Male</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500 w-32">Nationality:</span>
                          <span className="font-medium">{application.extractedProfile.country}</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500 w-32">Applying From:</span>
                          <span className="font-medium">{application.extractedProfile.country}</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500 w-32">Region:</span>
                          <span className="font-medium">Bihar</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500 w-32">Email:</span>
                          <span className="font-medium">{application.extractedProfile.email}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Address Section */}
                    <div className="mb-6">
                      <h3 className="font-bold text-gray-900 mb-2">📍 Permanent & Mailing Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex">
                          <span className="text-gray-500 w-32">City:</span>
                          <span className="font-medium">Patna</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500 w-32">Address:</span>
                          <span className="font-medium">Beside Canara Bank Bazar Samiti, Bahadurpur</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500 w-32">Postal Code:</span>
                          <span className="font-medium">800016</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Passport Section */}
                    <div className="mb-6">
                      <h3 className="font-bold text-gray-900 mb-2">🛂 Passport</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex">
                          <span className="text-gray-500 w-32">Number:</span>
                          <span className="font-medium">Y7089757</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500 w-32">Expiry:</span>
                          <span className="font-medium">19/07/2033</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500 w-32">Place of Birth:</span>
                          <span className="font-medium">Patna, Bihar</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Education Section */}
                    <div className="mb-6">
                      <h3 className="font-bold text-gray-900 mb-2">📚 Education</h3>
                      <div className="text-sm space-y-1">
                        <div>✔ Class X (ICSE) — Don Bosco Academy — 2019</div>
                        <div>✔ Class XII (CBSE) — Park Mount Public School — 2021</div>
                        <div>✔ Bachelor of Business Administration (Hons)</div>
                        <div className="ml-4">O.P. Jindal Global University (India)</div>
                        <div className="ml-4">Completed: 01/07/2025</div>
                        <div className="ml-4">Transcript, Migration & Provisional Certificate included</div>
                      </div>
                    </div>
                    
                    {/* Work Experience Section */}
                    <div className="mb-6">
                      <h3 className="font-bold text-gray-900 mb-2">💼 Work / Internship Experience</h3>
                      <div className="text-sm space-y-1">
                        <div>General Marketing & Business Analyst — Onit Services Pvt Ltd — (45 days)</div>
                        <div>Fund Raising & Social Impact Intern — S.M. Sehgal Foundation</div>
                      </div>
                    </div>
                    
                    {/* Supporting Documents Section */}
                    <div className="mb-6">
                      <h3 className="font-bold text-gray-900 mb-2">📄 Extra Supporting Documents</h3>
                      <div className="text-sm space-y-1">
                        <div>Letter of Recommendation</div>
                        <div>Resume Included</div>
                        <div>Offer in Principle (OIP-20250725-482540) received</div>
                        <div className="ml-4">Course: Master of Analytics - 081540A</div>
                        <div className="ml-4">OIP Date: 25/07/2025</div>
                      </div>
                    </div>
                    
                    {/* Final Summary */}
                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="font-bold text-gray-900 mb-2">🧾 Final Summary in One Line</h3>
                      <p className="text-sm">
                        ➡ Candidate Sudhakar Gautam applied for Master of Analytics (Semester 1, 2026) with Bachelor of Business Administration (Hons) background, valid passport, strong internship experience, and already received an OIP.
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setApplication(prev => ({ ...prev, status: 'ELIGIBLE' }))}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Continue to Eligibility Check
                  </button>
                  <button
                    onClick={saveAndReset}
                    className="mt-4 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Save and Exit
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload your application / academic PDF
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Drag and drop your PDF here</p>
                      <p className="text-gray-500 text-sm mb-4">Accepted format: PDF only</p>
                      <button
                        onClick={handleFileUpload}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Select File
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          
          {/* Upload Loading State */}
          {isUploading && (
            <div className="py-12 text-center">
              <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-6" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Extracting your data...</h2>
              <p className="text-gray-600">
                Preparing your profile (about 20 seconds).
              </p>
            </div>
          )}
          
          {/* 3️⃣ University Selection + Eligibility Criteria */}
          {application.status === 'ELIGIBLE' && !isCheckingEligibility && !isFinancialChecking && (
            <div className="py-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Check your eligibility</h1>
              
              {/* Extracted Profile Summary */}
              {application.extractedProfile && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Your extracted profile</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{application.extractedProfile.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Degree</p>
                      <p className="font-medium">{application.extractedProfile.degree}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">GPA</p>
                      <p className="font-medium">{application.extractedProfile.gpa}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Country</p>
                      <p className="font-medium">{application.extractedProfile.country}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* University Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose your target university
                </label>
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a university</option>
                  {universityOptions.map((uni, index) => (
                    <option key={index} value={uni}>{uni}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={checkEligibility}
                disabled={!selectedUniversity}
                className={`px-6 py-3 rounded-lg font-medium ${
                  selectedUniversity 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Check Eligibility
              </button>
              <button
                onClick={saveAndReset}
                className="mt-4 ml-4 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Save and Exit
              </button>
            </div>
          )}
          
          {/* Eligibility Checking State */}
          {isCheckingEligibility && (
            <div className="py-12 text-center">
              <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-6" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Checking your eligibility for {selectedUniversity}...
              </h2>
              <p className="text-gray-600">
                Reviewing your academic profile and basic requirements.
              </p>
            </div>
          )}
          
          {/* Eligibility Result */}
          {application.status === 'ELIGIBLE' && application.eligibilityResult && !isCheckingEligibility && !isFinancialChecking && (
            <div className="py-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                You are eligible for {application.selectedUniversity}
              </h2>
              <p className="text-gray-600 mb-6">
                We are now checking your financial verification through DigiLocker API. This may take 10–20 seconds.
              </p>
              <button
                onClick={proceedToFinancial}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Continue to Financial Check
              </button>
            </div>
          )}
          
          {/* Not Eligible Result */}
          {application.status === 'DOCUMENT_UPLOADED' && application.eligibilityResult === 'NOT_ELIGIBLE' && !isCheckingEligibility && !isFinancialChecking && (
            <div className="py-8 text-center">
              <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                You are not eligible for {application.selectedUniversity}
              </h2>
              <p className="text-gray-600 mb-6">
                Based on our evaluation, you do not meet the eligibility criteria for this university.
                You can try applying for a different university.
              </p>
              <button
                onClick={saveAndReset}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Back to Dashboard
              </button>
            </div>
          )}
          
          {/* 4️⃣ Financial Verification Check */}
          {application.status === 'FINANCIAL_OK' && !isFinancialChecking && !isFraudChecking && (
            <div className="py-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Financial verification complete</h2>
              <p className="text-gray-600 mb-6">
                Your financial verification looks good.
              </p>
              <button
                onClick={proceedToFraud}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Continue to Fraud Detection
              </button>
              <button
                onClick={saveAndReset}
                className="mt-4 ml-4 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Save and Exit
              </button>
            </div>
          )}
          
          {/* Financial Checking State */}
          {isFinancialChecking && (
            <div className="py-12 text-center">
              <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-6" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Financial verification in progress
              </h2>
              <p className="text-gray-600">
                We are checking if your financial profile meets the expected requirements for {application.selectedUniversity}.
                This usually takes 10–20 seconds.
              </p>
            </div>
          )}
          
          {/* 5️⃣ Fraud Detection Check */}
          {application.status === 'FRAUD_CHECKED' && !isFraudChecking && (
            <div className="py-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Fraud detection complete</h2>
              <p className="text-gray-600 mb-6">
                No fraud detected in your submitted documents.
              </p>
              <button
                onClick={completeApplication}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Finish Application
              </button>
              <button
                onClick={saveAndReset}
                className="mt-4 ml-4 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Save and Exit
              </button>
            </div>
          )}
          
          {/* Fraud Checking State */}
          {isFraudChecking && (
            <div className="py-12 text-center">
              <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-6" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Fraud detection checks
              </h2>
              <p className="text-gray-600">
                We are running fraud detection on your documents and profile (5–10 seconds).
                This includes basic checks for document tampering and inconsistencies.
              </p>
            </div>
          )}
          
          {/* 6️⃣ Final Dashboard / Completion Screen */}
          {application.status === 'COMPLETED' && (
            <div className="py-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">You've completed all the steps 🎉</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Thank you for completing your application.
                  Our admissions team will now review your profile in detail.
                  We will contact you by email with the next steps.
                </p>
              </div>
              
              {/* Summary Card */}
              <div className="bg-gray-50 rounded-lg p-6 max-w-2xl mx-auto">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application ID</span>
                    <span className="font-medium">{application.applicationId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Selected University</span>
                    <span className="font-medium">{application.selectedUniversity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application Status</span>
                    <span className="font-medium text-blue-600">Under Review</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Submission Date</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Submission Time</span>
                    <span className="font-medium">{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <button
                  onClick={saveAndReset}
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mr-4"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StudentDashboardPage;
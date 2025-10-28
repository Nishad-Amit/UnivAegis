import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  User, 
  Calendar, 
  MapPin, 
  Trophy, 
  BookOpen, 
  Upload, 
  CheckCircle,
  ArrowLeft
} from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import Header from '../components/Header'
import Footer from '../components/Footer'

const AdmissionFormPage: React.FC = () => {
  const navigate = useNavigate()
  const [formDataState, setFormDataState] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    greGmatScore: '',
    courseSelection: '',
    recommendedCourse: ''
  })
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const courseOptions = [
    'Masters in Computer Science (MSCS)',
    'MBA – Global Program',
    'Masters in Data Science',
    'Masters in Mechanical Engineering',
    'Masters in Public Health (MPH)',
    'BBA International Program'
  ]

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormDataState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Calculate age from date of birth
  const calculateAge = (dateString: string): number => {
    if (!dateString) return 0;
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Validation
    if (!formDataState.fullName || formDataState.fullName.trim() === '') {
      alert('Please enter your full name')
      setIsSubmitting(false)
      return
    }
    
    if (!formDataState.dateOfBirth) {
      alert('Please enter your date of birth')
      setIsSubmitting(false)
      return
    }
    
    const age = calculateAge(formDataState.dateOfBirth)
    if (age < 16) {
      alert('You must be at least 16 years old')
      setIsSubmitting(false)
      return
    }
    
    if (!formDataState.address || formDataState.address.trim() === '') {
      alert('Please enter your address')
      setIsSubmitting(false)
      return
    }
    
    if (!formDataState.courseSelection || formDataState.courseSelection.trim() === '') {
      alert('Please select a course')
      setIsSubmitting(false)
      return
    }
    
    if (files.length === 0) {
      alert('Please upload at least one document')
      setIsSubmitting(false)
      return
    }
    
    // Create FormData to send both text data and files
    const formData = new FormData()
    
    // Append text data from our component state
    formData.append('full_name', formDataState.fullName)
    formData.append('age', age.toString())
    formData.append('address', formDataState.address)
    formData.append('gre_gmat_score', formDataState.greGmatScore)
    formData.append('selected_course', formDataState.courseSelection)
    
    // Append files
    files.forEach((file) => {
      formData.append('documents', file)
    })
    
    try {
      // Send to your backend API
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admission-form`, {
        method: 'POST',
        body: formData
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        console.log('Form submitted successfully:', result)
        setSubmitSuccess(true)
      } else {
        console.error('Submission failed:', result)
        alert(result.message || 'Error submitting form')
      }
    } catch (error) {
      console.error('Network error:', error)
      alert('Network error. Please try again.')
    }
    
    setIsSubmitting(false)
    
    // Reset form after successful submission
    setTimeout(() => {
      setFormDataState({
        fullName: '',
        dateOfBirth: '',
        address: '',
        greGmatScore: '',
        courseSelection: '',
        recommendedCourse: ''
      })
      setFiles([])
      setSubmitSuccess(false)
      navigate('/')
    }, 3000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Admission Inquiry</h1>
              <p className="text-lg text-gray-600">
                Register yourself for admission counseling and submit your documents for evaluation
              </p>
            </div>

            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-lg p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for registering. Our admission team will review your information and contact you shortly.
                </p>
                <div className="animate-pulse text-blue-600">
                  Redirecting to homepage...
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">Admission Registration Form</h2>
                  <p className="text-blue-100">Fill in your details and upload relevant documents</p>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Full Name */}
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="fullName">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formDataState.fullName}
                          onChange={handleInputChange}
                          required
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                    
                    {/* Date of Birth */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="dateOfBirth">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={formDataState.dateOfBirth}
                          onChange={handleInputChange}
                          required
                          max={new Date().toISOString().split('T')[0]} // Prevent future dates
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                        {formDataState.dateOfBirth && (
                          <div className="mt-1 text-sm text-gray-500">
                            Age: {calculateAge(formDataState.dateOfBirth)} years
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* GRE/GMAT Score */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="greGmatScore">
                        GRE/GMAT Score
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Trophy className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="greGmatScore"
                          name="greGmatScore"
                          value={formDataState.greGmatScore}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter score or 'Not Taken'"
                        />
                      </div>
                    </div>
                    
                    {/* Address */}
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formDataState.address}
                          onChange={handleInputChange}
                          required
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your complete address"
                        />
                      </div>
                    </div>
                    
                    {/* Course Selection */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="courseSelection">
                        Course Selection <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <BookOpen className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          id="courseSelection"
                          name="courseSelection"
                          value={formDataState.courseSelection}
                          onChange={handleInputChange}
                          required
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                        >
                          <option value="">Select a course</option>
                          {courseOptions.map((course, index) => (
                            <option key={index} value={course}>{course}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {/* Recommended Course */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="recommendedCourse">
                        Recommended Course Options
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <BookOpen className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          id="recommendedCourse"
                          name="recommendedCourse"
                          value={formDataState.recommendedCourse}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                        >
                          <option value="">Select a recommended course</option>
                          {courseOptions.map((course, index) => (
                            <option key={index} value={course}>{course}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Document Upload */}
                  <div className="mb-8">
                    <label className="block text-gray-700 font-medium mb-2">
                      Documents Upload
                    </label>
                    <div 
                      {...getRootProps()} 
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <input {...getInputProps()} />
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        {isDragActive ? 'Drop files here' : 'Drag & drop files here, or click to select files'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports PDF, JPG, PNG (Max 10MB each, up to 5 files)
                      </p>
                    </div>
                    
                    {/* File List */}
                    {files.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-medium text-gray-700 mb-2">Uploaded Files:</h3>
                        <ul className="space-y-2">
                          {files.map((file, index) => (
                            <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center">
                                <span className="text-gray-600 mr-2">📄</span>
                                <span className="text-gray-700 truncate max-w-xs">{file.name}</span>
                                <span className="text-gray-500 text-sm ml-2">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-cyan-700'
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Registration'
                      )}
                    </button>
                    
                    <Link
                      to="/"
                      className="flex-1 text-center bg-gray-200 text-gray-800 py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default AdmissionFormPage
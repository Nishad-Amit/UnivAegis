import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Award, 
  FileText, 
  Shield, 
  TrendingUp, 
  MoreHorizontal, 
  Plus, 
  User, 
  Star, 
  Flag, 
  Globe, 
  BookOpen, 
  Target, 
  CheckCircle, 
  AlertTriangle, 
  Clock
} from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'

interface Student {
  id: string
  name: string
  email: string
  phone: string
  country: string
  nationality: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  profileImage?: string
  applications: Array<{
    id: string
    program: string
    university: string
    status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'waitlisted'
    applicationDate: string
    eligibilityScore: number
  }>
  academicBackground: {
    degree: string
    institution: string
    graduationYear: string
    gpa: number
    fieldOfStudy: string
  }
  testScores: {
    toefl?: number
    ielts?: number
    gre?: number
    gmat?: number
    sat?: number
  }
  documents: Array<{
    id: string
    type: string
    status: 'verified' | 'pending' | 'rejected'
    uploadDate: string
  }>
  riskProfile: {
    fraudRisk: 'low' | 'medium' | 'high'
    academicRisk: 'low' | 'medium' | 'high'
    financialRisk: 'low' | 'medium' | 'high'
    overallRisk: 'low' | 'medium' | 'high'
  }
  lastActivity: string
  notes?: string
  tags: string[]
}

interface FilterOptions {
  country: string[]
  nationality: string[]
  riskLevel: string[]
  applicationStatus: string[]
  gender: string[]
}

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    country: [],
    nationality: [],
    riskLevel: [],
    applicationStatus: [],
    gender: []
  })
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'risk' | 'applications'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockStudents: Student[] = [
      {
        id: 'STU-001',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1-555-0123',
        country: 'United States',
        nationality: 'American',
        dateOfBirth: '1995-03-15',
        gender: 'male',
        applications: [
          {
            id: 'APP-001',
            program: 'Computer Science',
            university: 'Stanford University',
            status: 'under_review',
            applicationDate: '2024-01-15',
            eligibilityScore: 87
          }
        ],
        academicBackground: {
          degree: 'Bachelor of Science',
          institution: 'University of California',
          graduationYear: '2017',
          gpa: 3.8,
          fieldOfStudy: 'Computer Science'
        },
        testScores: {
          toefl: 110,
          gre: 325,
          sat: 1450
        },
        documents: [
          { id: 'DOC-001', type: 'Transcript', status: 'verified', uploadDate: '2024-01-10' },
          { id: 'DOC-002', type: 'SOP', status: 'verified', uploadDate: '2024-01-12' },
          { id: 'DOC-003', type: 'LOR', status: 'pending', uploadDate: '2024-01-14' }
        ],
        riskProfile: {
          fraudRisk: 'low',
          academicRisk: 'low',
          financialRisk: 'low',
          overallRisk: 'low'
        },
        lastActivity: '2 hours ago',
        notes: 'Strong academic background, excellent SOP',
        tags: ['high-potential', 'scholarship-candidate']
      },
      {
        id: 'STU-002',
        name: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        phone: '+34-555-0456',
        country: 'Spain',
        nationality: 'Spanish',
        dateOfBirth: '1993-07-22',
        gender: 'female',
        applications: [
          {
            id: 'APP-002',
            program: 'Business Administration',
            university: 'Harvard Business School',
            status: 'pending',
            applicationDate: '2024-01-14',
            eligibilityScore: 72
          }
        ],
        academicBackground: {
          degree: 'Bachelor of Business',
          institution: 'Universidad Complutense de Madrid',
          graduationYear: '2015',
          gpa: 3.6,
          fieldOfStudy: 'Business Administration'
        },
        testScores: {
          ielts: 7.5,
          gmat: 680
        },
        documents: [
          { id: 'DOC-004', type: 'Transcript', status: 'verified', uploadDate: '2024-01-08' },
          { id: 'DOC-005', type: 'SOP', status: 'pending', uploadDate: '2024-01-13' },
          { id: 'DOC-006', type: 'Financial Statement', status: 'rejected', uploadDate: '2024-01-11' }
        ],
        riskProfile: {
          fraudRisk: 'medium',
          academicRisk: 'low',
          financialRisk: 'high',
          overallRisk: 'medium'
        },
        lastActivity: '1 day ago',
        notes: 'Financial documentation needs review',
        tags: ['financial-review', 'follow-up-needed']
      },
      {
        id: 'STU-003',
        name: 'Ahmed Hassan',
        email: 'ahmed.hassan@email.com',
        phone: '+20-555-0789',
        country: 'Egypt',
        nationality: 'Egyptian',
        dateOfBirth: '1994-11-08',
        gender: 'male',
        applications: [
          {
            id: 'APP-003',
            program: 'Engineering',
            university: 'MIT',
            status: 'approved',
            applicationDate: '2024-01-13',
            eligibilityScore: 94
          }
        ],
        academicBackground: {
          degree: 'Bachelor of Engineering',
          institution: 'Cairo University',
          graduationYear: '2016',
          gpa: 3.9,
          fieldOfStudy: 'Mechanical Engineering'
        },
        testScores: {
          toefl: 115,
          gre: 335
        },
        documents: [
          { id: 'DOC-007', type: 'Transcript', status: 'verified', uploadDate: '2024-01-05' },
          { id: 'DOC-008', type: 'SOP', status: 'verified', uploadDate: '2024-01-07' },
          { id: 'DOC-009', type: 'LOR', status: 'verified', uploadDate: '2024-01-09' },
          { id: 'DOC-010', type: 'Research Paper', status: 'verified', uploadDate: '2024-01-11' }
        ],
        riskProfile: {
          fraudRisk: 'low',
          academicRisk: 'low',
          financialRisk: 'low',
          overallRisk: 'low'
        },
        lastActivity: '3 hours ago',
        notes: 'Outstanding candidate, full scholarship recommended',
        tags: ['excellent', 'scholarship-approved', 'research-focus']
      }
    ]
    
    setStudents(mockStudents)
    setFilteredStudents(mockStudents)
  }, [])

  // Filter and search logic
  useEffect(() => {
    let filtered = students

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Country filter
    if (filters.country.length > 0) {
      filtered = filtered.filter(student => filters.country.includes(student.country))
    }

    // Nationality filter
    if (filters.nationality.length > 0) {
      filtered = filtered.filter(student => filters.nationality.includes(student.nationality))
    }

    // Risk level filter
    if (filters.riskLevel.length > 0) {
      filtered = filtered.filter(student => filters.riskLevel.includes(student.riskProfile.overallRisk))
    }

    // Application status filter
    if (filters.applicationStatus.length > 0) {
      filtered = filtered.filter(student => 
        student.applications.some(app => filters.applicationStatus.includes(app.status))
      )
    }

    // Gender filter
    if (filters.gender.length > 0) {
      filtered = filtered.filter(student => filters.gender.includes(student.gender))
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'date':
          aValue = new Date(a.applications[0]?.applicationDate || '1900-01-01').getTime()
          bValue = new Date(b.applications[0]?.applicationDate || '1900-01-01').getTime()
          break
        case 'risk': {
          const riskOrder = { high: 3, medium: 2, low: 1 }
          aValue = riskOrder[a.riskProfile.overallRisk]
          bValue = riskOrder[b.riskProfile.overallRisk]
          break
        }
        case 'applications':
          aValue = a.applications.length
          bValue = b.applications.length
          break
        default:
          aValue = a.name
          bValue = b.name
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredStudents(filtered)
  }, [students, searchTerm, filters, sortBy, sortOrder])

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'text-red-600 bg-red-50'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50'
      case 'low':
        return 'text-green-600 bg-green-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'under_review':
        return 'bg-blue-100 text-blue-800'
      case 'waitlisted':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-600'
      case 'pending':
        return 'text-yellow-600'
      case 'rejected':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const StudentCard: React.FC<{ student: Student }> = ({ student }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
              <p className="text-sm text-gray-600">{student.email}</p>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(student.riskProfile.overallRisk)}`}>
            <Shield className="w-3 h-3 inline mr-1" />
            {student.riskProfile.overallRisk} risk
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Country</p>
            <p className="text-sm font-medium text-gray-900">{student.country}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nationality</p>
            <p className="text-sm font-medium text-gray-900">{student.nationality}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Applications</p>
            <p className="text-sm font-medium text-gray-900">{student.applications.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Documents</p>
            <p className="text-sm font-medium text-gray-900">
              {student.documents.filter(doc => doc.status === 'verified').length}/{student.documents.length}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Applications</p>
          <div className="space-y-2">
            {student.applications.map((app, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{app.program}</p>
                  <p className="text-xs text-gray-600">{app.university}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                    {app.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-gray-600">{app.eligibilityScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Last activity: {student.lastActivity}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedStudent(student)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  const StudentListItem: React.FC<{ student: Student }> = ({ student }) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{student.name}</h3>
              <p className="text-xs text-gray-600">{student.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">{student.applications.length}</p>
              <p className="text-xs text-gray-600">Applications</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">
                {student.documents.filter(doc => doc.status === 'verified').length}/{student.documents.length}
              </p>
              <p className="text-xs text-gray-600">Documents</p>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(student.riskProfile.overallRisk)}`}>
              {student.riskProfile.overallRisk} risk
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedStudent(student)}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  const FilterPanel: React.FC = () => {
    const countryOptions = ['United States', 'Spain', 'Egypt', 'China', 'United Kingdom']
    const nationalityOptions = ['American', 'Spanish', 'Egyptian', 'Chinese', 'British']
    const riskLevelOptions = ['low', 'medium', 'high']
    const applicationStatusOptions = ['pending', 'under_review', 'approved', 'rejected', 'waitlisted']
    const genderOptions = ['male', 'female', 'other']

    const toggleFilter = (category: keyof FilterOptions, value: string) => {
      setFilters(prev => ({
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter(item => item !== value)
          : [...prev[category], value]
      }))
    }

    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Country</h4>
            <div className="space-y-2">
              {countryOptions.map(country => (
                <label key={country} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.country.includes(country)}
                    onChange={() => toggleFilter('country', country)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{country}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Nationality</h4>
            <div className="space-y-2">
              {nationalityOptions.map(nationality => (
                <label key={nationality} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.nationality.includes(nationality)}
                    onChange={() => toggleFilter('nationality', nationality)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{nationality}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Risk Level</h4>
            <div className="space-y-2">
              {riskLevelOptions.map(risk => (
                <label key={risk} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.riskLevel.includes(risk)}
                    onChange={() => toggleFilter('riskLevel', risk)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{risk}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Application Status</h4>
            <div className="space-y-2">
              {applicationStatusOptions.map(status => (
                <label key={status} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.applicationStatus.includes(status)}
                    onChange={() => toggleFilter('applicationStatus', status)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{status.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Gender</h4>
            <div className="space-y-2">
              {genderOptions.map(gender => (
                <label key={gender} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.gender.includes(gender)}
                    onChange={() => toggleFilter('gender', gender)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{gender}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => setFilters({ country: [], nationality: [], riskLevel: [], applicationStatus: [], gender: [] })}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Clear all filters
          </button>
          <div className="text-sm text-gray-600">
            {filteredStudents.length} of {students.length} students
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Students</h1>
            <p className="text-gray-600 mt-1">Manage student profiles and track applications</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Student</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  showFilters ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <div className="w-4 h-4 flex flex-col space-y-0.5">
                    <div className="bg-current rounded-sm h-1"></div>
                    <div className="bg-current rounded-sm h-1"></div>
                    <div className="bg-current rounded-sm h-1"></div>
                  </div>
                </button>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="date">Sort by Date</option>
                <option value="risk">Sort by Risk</option>
                <option value="applications">Sort by Applications</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <TrendingUp className={`w-4 h-4 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{students.length}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {students.filter(s => s.riskProfile.overallRisk === 'low').length}
              </div>
              <div className="text-sm text-gray-600">Low Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {students.filter(s => s.riskProfile.overallRisk === 'medium').length}
              </div>
              <div className="text-sm text-gray-600">Medium Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {students.filter(s => s.riskProfile.overallRisk === 'high').length}
              </div>
              <div className="text-sm text-gray-600">High Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {students.reduce((acc, s) => acc + s.applications.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Applications</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && <FilterPanel />}

        {/* Students Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <StudentListItem key={student.id} student={student} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default StudentsPage
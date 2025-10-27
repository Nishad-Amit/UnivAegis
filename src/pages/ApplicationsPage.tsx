import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  FileText,
  Shield,
  TrendingUp,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Star,
  Flag
} from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'

interface Application {
  id: string
  studentName: string
  email: string
  phone: string
  program: string
  university: string
  country: string
  applicationDate: string
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'waitlisted'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  eligibilityScore: number
  documentsCount: number
  documentsVerified: number
  fraudRisk: 'low' | 'medium' | 'high'
  lastActivity: string
  assignedOfficer?: string
  notes?: string
}

interface FilterOptions {
  status: string[]
  priority: string[]
  fraudRisk: string[]
  program: string[]
  university: string[]
}

const ApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    priority: [],
    fraudRisk: [],
    program: [],
    university: []
  })
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'score' | 'priority'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockApplications: Application[] = [
      {
        id: 'APP-001',
        studentName: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1-555-0123',
        program: 'Computer Science',
        university: 'Stanford University',
        country: 'United States',
        applicationDate: '2024-01-15',
        status: 'under_review',
        priority: 'high',
        eligibilityScore: 87,
        documentsCount: 8,
        documentsVerified: 6,
        fraudRisk: 'low',
        lastActivity: '2 hours ago',
        assignedOfficer: 'Sarah Johnson',
        notes: 'Strong academic background, excellent SOP'
      },
      {
        id: 'APP-002',
        studentName: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        phone: '+34-555-0456',
        program: 'Business Administration',
        university: 'Harvard Business School',
        country: 'Spain',
        applicationDate: '2024-01-14',
        status: 'pending',
        priority: 'medium',
        eligibilityScore: 72,
        documentsCount: 7,
        documentsVerified: 3,
        fraudRisk: 'medium',
        lastActivity: '1 day ago',
        assignedOfficer: 'Mike Chen'
      },
      {
        id: 'APP-003',
        studentName: 'Ahmed Hassan',
        email: 'ahmed.hassan@email.com',
        phone: '+20-555-0789',
        program: 'Engineering',
        university: 'MIT',
        country: 'Egypt',
        applicationDate: '2024-01-13',
        status: 'approved',
        priority: 'high',
        eligibilityScore: 94,
        documentsCount: 9,
        documentsVerified: 9,
        fraudRisk: 'low',
        lastActivity: '3 hours ago',
        assignedOfficer: 'Sarah Johnson',
        notes: 'Outstanding candidate, full scholarship recommended'
      },
      {
        id: 'APP-004',
        studentName: 'Li Wei',
        email: 'li.wei@email.com',
        phone: '+86-555-0321',
        program: 'Data Science',
        university: 'UC Berkeley',
        country: 'China',
        applicationDate: '2024-01-12',
        status: 'rejected',
        priority: 'low',
        eligibilityScore: 45,
        documentsCount: 6,
        documentsVerified: 2,
        fraudRisk: 'high',
        lastActivity: '2 days ago',
        assignedOfficer: 'Mike Chen',
        notes: 'Incomplete documentation, suspicious financial records'
      },
      {
        id: 'APP-005',
        studentName: 'Emma Thompson',
        email: 'emma.thompson@email.com',
        phone: '+44-555-0654',
        program: 'Medicine',
        university: 'Oxford University',
        country: 'United Kingdom',
        applicationDate: '2024-01-11',
        status: 'waitlisted',
        priority: 'medium',
        eligibilityScore: 78,
        documentsCount: 10,
        documentsVerified: 8,
        fraudRisk: 'low',
        lastActivity: '4 hours ago',
        assignedOfficer: 'Sarah Johnson'
      }
    ]
    
    setApplications(mockApplications)
    setFilteredApplications(mockApplications)
  }, [])

  // Filter and search logic
  useEffect(() => {
    let filtered = applications

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (filters.status.length > 0) {
      filtered = filtered.filter(app => filters.status.includes(app.status))
    }

    // Priority filter
    if (filters.priority.length > 0) {
      filtered = filtered.filter(app => filters.priority.includes(app.priority))
    }

    // Fraud risk filter
    if (filters.fraudRisk.length > 0) {
      filtered = filtered.filter(app => filters.fraudRisk.includes(app.fraudRisk))
    }

    // Program filter
    if (filters.program.length > 0) {
      filtered = filtered.filter(app => filters.program.includes(app.program))
    }

    // University filter
    if (filters.university.length > 0) {
      filtered = filtered.filter(app => filters.university.includes(app.university))
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.applicationDate).getTime()
          bValue = new Date(b.applicationDate).getTime()
          break
        case 'name':
          aValue = a.studentName
          bValue = b.studentName
          break
        case 'score':
          aValue = a.eligibilityScore
          bValue = b.eligibilityScore
          break
        case 'priority': {
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
          aValue = priorityOrder[a.priority]
          bValue = priorityOrder[b.priority]
          break
        }
        default:
          aValue = a.applicationDate
          bValue = b.applicationDate
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredApplications(filtered)
  }, [applications, searchTerm, filters, sortBy, sortOrder])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'under_review':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'waitlisted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500'
      case 'high':
        return 'bg-orange-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getFraudRiskColor = (risk: string) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />
      case 'rejected':
        return <XCircle className="w-4 h-4" />
      case 'under_review':
        return <Eye className="w-4 h-4" />
      case 'waitlisted':
        return <Clock className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const handleStatusChange = (applicationId: string, newStatus: Application['status']) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: newStatus, lastActivity: 'Just now' }
          : app
      )
    )
  }

  const handlePriorityChange = (applicationId: string, newPriority: Application['priority']) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, priority: newPriority, lastActivity: 'Just now' }
          : app
      )
    )
  }

  const ApplicationCard: React.FC<{ application: Application }> = ({ application }) => {
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
              <h3 className="text-lg font-semibold text-gray-900">{application.studentName}</h3>
              <p className="text-sm text-gray-600">{application.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getPriorityColor(application.priority)}`}></div>
            <span className="text-xs text-gray-500">{application.priority}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Program</p>
            <p className="text-sm font-medium text-gray-900">{application.program}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">University</p>
            <p className="text-sm font-medium text-gray-900">{application.university}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Country</p>
            <p className="text-sm font-medium text-gray-900">{application.country}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Eligibility Score</p>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    application.eligibilityScore >= 80 ? 'bg-green-500' :
                    application.eligibilityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${application.eligibilityScore}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900">{application.eligibilityScore}%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border ${getStatusColor(application.status)}`}>
              {getStatusIcon(application.status)}
              <span className="text-xs font-medium capitalize">{application.status.replace('_', ' ')}</span>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getFraudRiskColor(application.fraudRisk)}`}>
              <Shield className="w-3 h-3 inline mr-1" />
              {application.fraudRisk} risk
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {application.documentsVerified}/{application.documentsCount} docs verified
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Last activity: {application.lastActivity}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedApplication(application)}
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

  const FilterPanel: React.FC = () => {
    const statusOptions = ['pending', 'under_review', 'approved', 'rejected', 'waitlisted']
    const priorityOptions = ['low', 'medium', 'high', 'urgent']
    const fraudRiskOptions = ['low', 'medium', 'high']
    const programOptions = ['Computer Science', 'Business Administration', 'Engineering', 'Data Science', 'Medicine']
    const universityOptions = ['Stanford University', 'Harvard Business School', 'MIT', 'UC Berkeley', 'Oxford University']

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
            <h4 className="text-sm font-medium text-gray-900 mb-3">Status</h4>
            <div className="space-y-2">
              {statusOptions.map(status => (
                <label key={status} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(status)}
                    onChange={() => toggleFilter('status', status)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{status.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Priority</h4>
            <div className="space-y-2">
              {priorityOptions.map(priority => (
                <label key={priority} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.priority.includes(priority)}
                    onChange={() => toggleFilter('priority', priority)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{priority}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Fraud Risk</h4>
            <div className="space-y-2">
              {fraudRiskOptions.map(risk => (
                <label key={risk} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.fraudRisk.includes(risk)}
                    onChange={() => toggleFilter('fraudRisk', risk)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{risk}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Program</h4>
            <div className="space-y-2">
              {programOptions.map(program => (
                <label key={program} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.program.includes(program)}
                    onChange={() => toggleFilter('program', program)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{program}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">University</h4>
            <div className="space-y-2">
              {universityOptions.map(university => (
                <label key={university} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.university.includes(university)}
                    onChange={() => toggleFilter('university', university)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{university}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => setFilters({ status: [], priority: [], fraudRisk: [], program: [], university: [] })}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Clear all filters
          </button>
          <div className="text-sm text-gray-600">
            {filteredApplications.length} of {applications.length} applications
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
            <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
            <p className="text-gray-600 mt-1">Manage and review student applications</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>New Application</span>
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
                  placeholder="Search applications..."
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
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="score">Sort by Score</option>
                <option value="priority">Sort by Priority</option>
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
              <div className="text-2xl font-bold text-blue-600">{applications.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {applications.filter(app => app.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {applications.filter(app => app.status === 'under_review').length}
              </div>
              <div className="text-sm text-gray-600">Under Review</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {applications.filter(app => app.status === 'approved').length}
              </div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {applications.filter(app => app.status === 'rejected').length}
              </div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && <FilterPanel />}

        {/* Applications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredApplications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>

        {/* Empty State */}
        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default ApplicationsPage
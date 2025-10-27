import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity, 
  Target, 
  Zap, 
  Brain, 
  FileText, 
  User, 
  Calendar, 
  Filter, 
  Download, 
  RefreshCw, 
  Settings, 
  Info, 
  XCircle, 
  Clock, 
  Star, 
  Flag, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  GraduationCap
} from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'

interface FraudAlert {
  id: string
  applicationId: string
  studentName: string
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  category: 'document' | 'financial' | 'academic' | 'identity' | 'pattern'
  description: string
  confidence: number
  detectedAt: string
  status: 'new' | 'investigating' | 'resolved' | 'false_positive'
  assignedTo?: string
  evidence: Array<{
    type: string
    description: string
    severity: 'low' | 'medium' | 'high'
  }>
  actions: Array<{
    action: string
    timestamp: string
    user: string
  }>
}

interface RiskMetrics {
  totalAlerts: number
  highRiskAlerts: number
  resolvedAlerts: number
  falsePositives: number
  avgResolutionTime: string
  detectionAccuracy: number
  patternsDetected: number
  documentsFlagged: number
}

interface PatternAnalysis {
  id: string
  pattern: string
  frequency: number
  riskScore: number
  description: string
  examples: string[]
  lastDetected: string
}

const FraudDetectionPage: React.FC = () => {
  const [alerts, setAlerts] = useState<FraudAlert[]>([])
  const [filteredAlerts, setFilteredAlerts] = useState<FraudAlert[]>([])
  const [metrics, setMetrics] = useState<RiskMetrics>({
    totalAlerts: 0,
    highRiskAlerts: 0,
    resolvedAlerts: 0,
    falsePositives: 0,
    avgResolutionTime: '0',
    detectionAccuracy: 0,
    patternsDetected: 0,
    documentsFlagged: 0
  })
  const [patterns, setPatterns] = useState<PatternAnalysis[]>([])
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    riskLevel: [] as string[],
    category: [] as string[],
    status: [] as string[]
  })
  const [timeRange, setTimeRange] = useState('7d')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockAlerts: FraudAlert[] = [
      {
        id: 'FRAUD-001',
        applicationId: 'APP-004',
        studentName: 'Li Wei',
        riskLevel: 'high',
        category: 'financial',
        description: 'Suspicious financial documentation patterns detected',
        confidence: 87,
        detectedAt: '2024-01-20T10:30:00Z',
        status: 'investigating',
        assignedTo: 'Sarah Johnson',
        evidence: [
          {
            type: 'Financial Statement',
            description: 'Bank statements show inconsistent transaction patterns',
            severity: 'high'
          },
          {
            type: 'Income Certificate',
            description: 'Salary figures don\'t match bank deposits',
            severity: 'medium'
          }
        ],
        actions: [
          {
            action: 'Alert created',
            timestamp: '2024-01-20T10:30:00Z',
            user: 'AI System'
          },
          {
            action: 'Assigned to investigator',
            timestamp: '2024-01-20T11:00:00Z',
            user: 'Mike Chen'
          }
        ]
      },
      {
        id: 'FRAUD-002',
        applicationId: 'APP-002',
        studentName: 'Maria Garcia',
        riskLevel: 'medium',
        category: 'document',
        description: 'Document authenticity verification failed',
        confidence: 72,
        detectedAt: '2024-01-19T14:15:00Z',
        status: 'resolved',
        assignedTo: 'Mike Chen',
        evidence: [
          {
            type: 'Transcript',
            description: 'Digital signature verification failed',
            severity: 'medium'
          }
        ],
        actions: [
          {
            action: 'Alert created',
            timestamp: '2024-01-19T14:15:00Z',
            user: 'AI System'
          },
          {
            action: 'Document re-verified',
            timestamp: '2024-01-19T16:30:00Z',
            user: 'Mike Chen'
          },
          {
            action: 'Resolved - False positive',
            timestamp: '2024-01-19T17:00:00Z',
            user: 'Mike Chen'
          }
        ]
      },
      {
        id: 'FRAUD-003',
        applicationId: 'APP-005',
        studentName: 'Emma Thompson',
        riskLevel: 'low',
        category: 'pattern',
        description: 'Unusual application submission pattern',
        confidence: 45,
        detectedAt: '2024-01-18T09:20:00Z',
        status: 'new',
        evidence: [
          {
            type: 'Submission Pattern',
            description: 'Multiple applications submitted within short timeframe',
            severity: 'low'
          }
        ],
        actions: [
          {
            action: 'Alert created',
            timestamp: '2024-01-18T09:20:00Z',
            user: 'AI System'
          }
        ]
      }
    ]

    const mockPatterns: PatternAnalysis[] = [
      {
        id: 'PATTERN-001',
        pattern: 'Duplicate Document Patterns',
        frequency: 12,
        riskScore: 85,
        description: 'Multiple applications using similar document structures',
        examples: ['APP-004', 'APP-007', 'APP-012'],
        lastDetected: '2024-01-20T08:30:00Z'
      },
      {
        id: 'PATTERN-002',
        pattern: 'Financial Inconsistencies',
        frequency: 8,
        riskScore: 78,
        description: 'Bank statements showing unusual transaction patterns',
        examples: ['APP-004', 'APP-009'],
        lastDetected: '2024-01-19T15:45:00Z'
      },
      {
        id: 'PATTERN-003',
        pattern: 'Academic Credential Mismatch',
        frequency: 5,
        riskScore: 65,
        description: 'Academic records inconsistent with claimed qualifications',
        examples: ['APP-002', 'APP-011'],
        lastDetected: '2024-01-18T12:20:00Z'
      }
    ]

    setAlerts(mockAlerts)
    setFilteredAlerts(mockAlerts)
    setPatterns(mockPatterns)
    
    // Calculate metrics
    setMetrics({
      totalAlerts: mockAlerts.length,
      highRiskAlerts: mockAlerts.filter(a => a.riskLevel === 'high' || a.riskLevel === 'critical').length,
      resolvedAlerts: mockAlerts.filter(a => a.status === 'resolved').length,
      falsePositives: mockAlerts.filter(a => a.status === 'false_positive').length,
      avgResolutionTime: '2.3',
      detectionAccuracy: 92.5,
      patternsDetected: mockPatterns.length,
      documentsFlagged: mockAlerts.reduce((acc, alert) => acc + alert.evidence.length, 0)
    })
  }, [])

  // Filter alerts
  useEffect(() => {
    let filtered = alerts

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(alert => 
        alert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.applicationId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Risk level filter
    if (filters.riskLevel.length > 0) {
      filtered = filtered.filter(alert => filters.riskLevel.includes(alert.riskLevel))
    }

    // Category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(alert => filters.category.includes(alert.category))
    }

    // Status filter
    if (filters.status.length > 0) {
      filtered = filtered.filter(alert => filters.status.includes(alert.status))
    }

    setFilteredAlerts(filtered)
  }, [alerts, searchTerm, filters])

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical':
        return 'text-red-700 bg-red-100 border-red-200'
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'false_positive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'document':
        return <FileText className="w-4 h-4" />
      case 'financial':
        return <TrendingUp className="w-4 h-4" />
      case 'academic':
        return <GraduationCap className="w-4 h-4" />
      case 'identity':
        return <User className="w-4 h-4" />
      case 'pattern':
        return <Brain className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const handleStatusChange = (alertId: string, newStatus: FraudAlert['status']) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { 
              ...alert, 
              status: newStatus,
              actions: [
                ...alert.actions,
                {
                  action: `Status changed to ${newStatus}`,
                  timestamp: new Date().toISOString(),
                  user: 'Current User'
                }
              ]
            }
          : alert
      )
    )
  }

  const runAnalysis = async () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsAnalyzing(false)
    // In real app, this would trigger actual AI analysis
  }

  const MetricCard: React.FC<{
    title: string
    value: string | number
    change?: number
    icon: React.ComponentType<any>
    color: string
    trend?: 'up' | 'down' | 'neutral'
  }> = ({ title, value, change, icon: Icon, color, trend }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {change !== undefined && (
            <div className={`flex items-center space-x-1 text-sm ${
              trend === 'up' ? 'text-red-600' : trend === 'down' ? 'text-green-600' : 'text-gray-600'
            }`}>
              {trend === 'up' && <TrendingUp className="w-4 h-4" />}
              {trend === 'down' && <TrendingDown className="w-4 h-4" />}
              <span>{change > 0 ? '+' : ''}{change}%</span>
            </div>
          )}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-gray-600">{title}</p>
      </motion.div>
    )
  }

  const AlertCard: React.FC<{ alert: FraudAlert }> = ({ alert }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              {getCategoryIcon(alert.category)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{alert.studentName}</h3>
              <p className="text-sm text-gray-600">{alert.applicationId}</p>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(alert.riskLevel)}`}>
            {alert.riskLevel} risk
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-900 mb-2">{alert.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                {alert.status.replace('_', ' ')}
              </span>
              <div className="flex items-center space-x-1">
                <Target className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-600">{alert.confidence}% confidence</span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {new Date(alert.detectedAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Evidence ({alert.evidence.length})</p>
          <div className="space-y-1">
            {alert.evidence.slice(0, 2).map((evidence, index) => (
              <div key={index} className="flex items-center space-x-2 text-xs">
                <div className={`w-2 h-2 rounded-full ${
                  evidence.severity === 'high' ? 'bg-red-500' :
                  evidence.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <span className="text-gray-700">{evidence.type}</span>
              </div>
            ))}
            {alert.evidence.length > 2 && (
              <div className="text-xs text-gray-500">+{alert.evidence.length - 2} more</div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {alert.assignedTo ? `Assigned to ${alert.assignedTo}` : 'Unassigned'}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedAlert(alert)}
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

  const PatternCard: React.FC<{ pattern: PatternAnalysis }> = ({ pattern }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{pattern.pattern}</h3>
              <p className="text-sm text-gray-600">{pattern.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">{pattern.frequency}</div>
            <div className="text-xs text-gray-500">occurrences</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Risk Score</span>
            <span className="text-sm font-medium text-gray-900">{pattern.riskScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                pattern.riskScore >= 80 ? 'bg-red-500' :
                pattern.riskScore >= 60 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${pattern.riskScore}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Examples</p>
          <div className="flex flex-wrap gap-1">
            {pattern.examples.map((example, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
                {example}
              </span>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-500">
          Last detected: {new Date(pattern.lastDetected).toLocaleDateString()}
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
            <h1 className="text-3xl font-bold text-gray-900">Fraud Detection</h1>
            <p className="text-gray-600 mt-1">AI-powered fraud detection and risk analysis</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isAnalyzing 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Analyzing...' : 'Run Analysis'}</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Alerts"
            value={metrics.totalAlerts}
            change={15}
            trend="up"
            icon={AlertTriangle}
            color="bg-red-500"
          />
          <MetricCard
            title="High Risk Alerts"
            value={metrics.highRiskAlerts}
            change={8}
            trend="up"
            icon={Shield}
            color="bg-orange-500"
          />
          <MetricCard
            title="Detection Accuracy"
            value={`${metrics.detectionAccuracy}%`}
            change={2}
            trend="up"
            icon={Target}
            color="bg-green-500"
          />
          <MetricCard
            title="Patterns Detected"
            value={metrics.patternsDetected}
            change={-5}
            trend="down"
            icon={Brain}
            color="bg-purple-500"
          />
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Resolved Alerts"
            value={metrics.resolvedAlerts}
            change={12}
            trend="up"
            icon={CheckCircle}
            color="bg-emerald-500"
          />
          <MetricCard
            title="False Positives"
            value={metrics.falsePositives}
            change={-3}
            trend="down"
            icon={XCircle}
            color="bg-gray-500"
          />
          <MetricCard
            title="Avg Resolution Time"
            value={`${metrics.avgResolutionTime} days`}
            change={-10}
            trend="down"
            icon={Clock}
            color="bg-blue-500"
          />
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {filteredAlerts.length} alerts
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>

              {filteredAlerts.length === 0 && (
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
                  <p className="text-gray-600">No fraud alerts match your current filters</p>
                </div>
              )}
            </div>
          </div>

          {/* Patterns */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Pattern Analysis</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {patterns.map((pattern) => (
                  <PatternCard key={pattern.id} pattern={pattern} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Risk Distribution</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details
              </button>
            </div>
            
            {/* Placeholder for chart */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Risk distribution chart will be implemented</p>
              </div>
            </div>
          </motion.div>

          {/* Detection Trends Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Detection Trends</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details
              </button>
            </div>
            
            {/* Placeholder for chart */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Detection trends chart will be implemented</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default FraudDetectionPage
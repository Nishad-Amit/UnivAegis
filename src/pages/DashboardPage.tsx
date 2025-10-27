import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Users, 
  FileText, 
  Shield, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Download,
  Filter,
  Search,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'
import { useAuthStore } from '@/store/auth-store'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  icon: React.ComponentType<any>
  color: string
  trend?: 'up' | 'down' | 'neutral'
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon, color, trend }) => {
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
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {trend === 'up' && <ArrowUpRight className="w-4 h-4" />}
            {trend === 'down' && <ArrowDownRight className="w-4 h-4" />}
            <span>{change > 0 ? '+' : ''}{change}%</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600">{title}</p>
    </motion.div>
  )
}

interface RecentActivityProps {
  activities: Array<{
    id: string
    type: 'application' | 'document' | 'fraud' | 'approval'
    description: string
    time: string
    status: 'success' | 'warning' | 'error'
  }>
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-4 rounded-lg border ${getStatusColor(activity.status)}`}
          >
            <div className="flex items-start space-x-3">
              {getStatusIcon(activity.status)}
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

interface QuickActionsProps {
  onAction: (action: string) => void
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAction }) => {
  const actions = [
    { id: 'new-application', label: 'New Application', icon: FileText, color: 'bg-blue-500' },
    { id: 'review-documents', label: 'Review Documents', icon: Eye, color: 'bg-green-500' },
    { id: 'fraud-check', label: 'Fraud Check', icon: Shield, color: 'bg-red-500' },
    { id: 'export-data', label: 'Export Data', icon: Download, color: 'bg-purple-500' },
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAction(action.id)}
              className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left"
            >
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-900">{action.label}</p>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore()
  const [metrics, setMetrics] = useState({
    totalApplications: 1247,
    pendingReview: 89,
    approved: 1156,
    rejected: 2,
    fraudDetected: 12,
    avgProcessingTime: '2.3',
    documentsVerified: 3847,
    complianceScore: 98.5
  })

  const [recentActivities] = useState<Array<{
    id: string
    type: 'application' | 'document' | 'fraud' | 'approval'
    description: string
    time: string
    status: 'success' | 'warning' | 'error'
  }>>([
    {
      id: '1',
      type: 'application',
      description: 'New application submitted by John Smith for Computer Science',
      time: '2 minutes ago',
      status: 'success'
    },
    {
      id: '2',
      type: 'fraud',
      description: 'Potential fraud detected in application #12345',
      time: '15 minutes ago',
      status: 'warning'
    },
    {
      id: '3',
      type: 'document',
      description: 'Transcript verification completed for Sarah Johnson',
      time: '1 hour ago',
      status: 'success'
    },
    {
      id: '4',
      type: 'approval',
      description: 'Application #12340 approved for admission',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: '5',
      type: 'document',
      description: 'Financial document verification failed for Mike Chen',
      time: '3 hours ago',
      status: 'error'
    }
  ])

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action)
    // Handle quick actions here
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalApplications: prev.totalApplications + Math.floor(Math.random() * 3),
        pendingReview: prev.pendingReview + Math.floor(Math.random() * 2) - 1,
        avgProcessingTime: (Math.random() * 0.5 + 2).toFixed(1)
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white"
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-blue-100">
            Here's what's happening with your admissions process today.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Applications"
            value={metrics.totalApplications.toLocaleString()}
            change={12}
            trend="up"
            icon={FileText}
            color="bg-blue-500"
          />
          <MetricCard
            title="Pending Review"
            value={metrics.pendingReview}
            change={-5}
            trend="down"
            icon={Clock}
            color="bg-yellow-500"
          />
          <MetricCard
            title="Approved"
            value={metrics.approved}
            change={8}
            trend="up"
            icon={CheckCircle}
            color="bg-green-500"
          />
          <MetricCard
            title="Fraud Detected"
            value={metrics.fraudDetected}
            change={2}
            trend="up"
            icon={Shield}
            color="bg-red-500"
          />
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Avg Processing Time"
            value={`${metrics.avgProcessingTime} days`}
            change={-15}
            trend="down"
            icon={TrendingUp}
            color="bg-purple-500"
          />
          <MetricCard
            title="Documents Verified"
            value={metrics.documentsVerified.toLocaleString()}
            change={25}
            trend="up"
            icon={FileText}
            color="bg-indigo-500"
          />
          <MetricCard
            title="Compliance Score"
            value={`${metrics.complianceScore}%`}
            change={1}
            trend="up"
            icon={Shield}
            color="bg-emerald-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <RecentActivity activities={recentActivities} />
          </div>

          {/* Quick Actions */}
          <div>
            <QuickActions onAction={handleQuickAction} />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Applications Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Applications Trend</h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Placeholder for chart */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chart visualization will be implemented</p>
              </div>
            </div>
          </motion.div>

          {/* Processing Status Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Processing Status</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details
              </button>
            </div>
            
            {/* Placeholder for chart */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Status visualization will be implemented</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Performance Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">98.5%</div>
              <p className="text-gray-600">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2.3 days</div>
              <p className="text-gray-600">Avg Processing Time</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
              <p className="text-gray-600">Uptime</p>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage

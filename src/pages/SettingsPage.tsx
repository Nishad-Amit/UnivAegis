import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  User, 
  Shield, 
  Database, 
  Bell, 
  Globe, 
  Key, 
  Save, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Eye, 
  EyeOff, 
  Upload, 
  Download, 
  Trash2, 
  Edit, 
  Plus, 
  X, 
  Search, 
  Filter, 
  Calendar, 
  Activity, 
  BarChart3, 
  FileText, 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Building, 
  Lock, 
  Unlock, 
  Clock, 
  Star, 
  Flag,
  MoreHorizontal
} from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'

interface SystemSettings {
  general: {
    systemName: string
    timezone: string
    language: string
    dateFormat: string
    currency: string
  }
  security: {
    sessionTimeout: number
    passwordPolicy: {
      minLength: number
      requireUppercase: boolean
      requireNumbers: boolean
      requireSymbols: boolean
    }
    twoFactorAuth: boolean
    ipWhitelist: string[]
  }
  notifications: {
    emailNotifications: boolean
    smsNotifications: boolean
    pushNotifications: boolean
    alertThresholds: {
      fraudDetection: number
      applicationReview: number
      systemErrors: number
    }
  }
  integrations: {
    crmEnabled: boolean
    crmUrl: string
    crmApiKey: string
    emailService: string
    emailApiKey: string
    documentStorage: string
    storageApiKey: string
  }
  ai: {
    fraudDetectionEnabled: boolean
    fraudDetectionThreshold: number
    documentAnalysisEnabled: boolean
    sopAnalysisEnabled: boolean
    eligibilityScoringEnabled: boolean
    aiModelVersion: string
  }
}

interface UserRole {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  isActive: boolean
}

interface AuditLog {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  ipAddress: string
  status: 'success' | 'failed' | 'warning'
  details: string
}

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications' | 'integrations' | 'ai' | 'users' | 'audit'>('general')
  const [settings, setSettings] = useState<SystemSettings>({
    general: {
      systemName: 'UnivAegis',
      timezone: 'UTC',
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
      currency: 'USD'
    },
    security: {
      sessionTimeout: 30,
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireNumbers: true,
        requireSymbols: true
      },
      twoFactorAuth: true,
      ipWhitelist: []
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      alertThresholds: {
        fraudDetection: 75,
        applicationReview: 50,
        systemErrors: 90
      }
    },
    integrations: {
      crmEnabled: true,
      crmUrl: 'https://api.crm.example.com',
      crmApiKey: '••••••••••••••••',
      emailService: 'SendGrid',
      emailApiKey: '••••••••••••••••',
      documentStorage: 'AWS S3',
      storageApiKey: '••••••••••••••••'
    },
    ai: {
      fraudDetectionEnabled: true,
      fraudDetectionThreshold: 70,
      documentAnalysisEnabled: true,
      sopAnalysisEnabled: true,
      eligibilityScoringEnabled: true,
      aiModelVersion: 'v2.1.3'
    }
  })
  const [userRoles, setUserRoles] = useState<UserRole[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [showApiKeys, setShowApiKeys] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  useEffect(() => {
    const mockRoles: UserRole[] = [
      {
        id: 'role-1',
        name: 'Administrator',
        description: 'Full system access and configuration',
        permissions: ['all'],
        userCount: 2,
        isActive: true
      },
      {
        id: 'role-2',
        name: 'Admissions Officer',
        description: 'Application review and decision making',
        permissions: ['applications.read', 'applications.write', 'students.read', 'documents.read'],
        userCount: 8,
        isActive: true
      },
      {
        id: 'role-3',
        name: 'Compliance Specialist',
        description: 'Fraud detection and compliance monitoring',
        permissions: ['fraud.read', 'fraud.write', 'audit.read', 'reports.read'],
        userCount: 3,
        isActive: true
      },
      {
        id: 'role-4',
        name: 'Program Coordinator',
        description: 'Program management and student support',
        permissions: ['students.read', 'students.write', 'applications.read'],
        userCount: 5,
        isActive: true
      }
    ]

    const mockAuditLogs: AuditLog[] = [
      {
        id: 'audit-1',
        timestamp: '2024-01-20T10:30:00Z',
        user: 'admin@university.edu',
        action: 'LOGIN',
        resource: 'Authentication',
        ipAddress: '192.168.1.100',
        status: 'success',
        details: 'Successful login from desktop browser'
      },
      {
        id: 'audit-2',
        timestamp: '2024-01-20T09:15:00Z',
        user: 'sarah.johnson@university.edu',
        action: 'UPDATE',
        resource: 'Application APP-001',
        ipAddress: '192.168.1.101',
        status: 'success',
        details: 'Application status changed to under_review'
      },
      {
        id: 'audit-3',
        timestamp: '2024-01-20T08:45:00Z',
        user: 'mike.chen@university.edu',
        action: 'CREATE',
        resource: 'Fraud Alert FRAUD-001',
        ipAddress: '192.168.1.102',
        status: 'success',
        details: 'New fraud alert created for application APP-004'
      },
      {
        id: 'audit-4',
        timestamp: '2024-01-19T16:20:00Z',
        user: 'system@university.edu',
        action: 'SYSTEM',
        resource: 'AI Analysis',
        ipAddress: '127.0.0.1',
        status: 'warning',
        details: 'AI model confidence below threshold for document analysis'
      },
      {
        id: 'audit-5',
        timestamp: '2024-01-19T14:30:00Z',
        user: 'admin@university.edu',
        action: 'CONFIG',
        resource: 'System Settings',
        ipAddress: '192.168.1.100',
        status: 'success',
        details: 'Security settings updated'
      }
    ]

    setUserRoles(mockRoles)
    setAuditLogs(mockAuditLogs)
  }, [])

  const handleSaveSettings = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSaving(false)
    // In real app, this would save to backend
  }

  const handleUpdateSetting = (section: keyof SystemSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  const handleUpdateNestedSetting = (section: keyof SystemSettings, parentKey: string, childKey: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentKey]: {
          ...(prev[section] as any)[parentKey],
          [childKey]: value
        }
      }
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50'
      case 'failed':
        return 'text-red-600 bg-red-50'
      case 'warning':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4" />
      case 'failed':
        return <AlertTriangle className="w-4 h-4" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'integrations', name: 'Integrations', icon: Globe },
    { id: 'ai', name: 'AI Settings', icon: BarChart3 },
    { id: 'users', name: 'User Roles', icon: Users },
    { id: 'audit', name: 'Audit Logs', icon: Activity }
  ]

  const GeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">System Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">System Name</label>
            <input
              type="text"
              value={settings.general.systemName}
              onChange={(e) => handleUpdateSetting('general', 'systemName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              value={settings.general.timezone}
              onChange={(e) => handleUpdateSetting('general', 'timezone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
              <option value="GMT">Greenwich Mean Time</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={settings.general.language}
              onChange={(e) => handleUpdateSetting('general', 'language', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
            <select
              value={settings.general.dateFormat}
              onChange={(e) => handleUpdateSetting('general', 'dateFormat', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const SecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Configuration</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleUpdateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Password Policy</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Length</label>
                <input
                  type="number"
                  value={settings.security.passwordPolicy.minLength}
                  onChange={(e) => handleUpdateNestedSetting('security', 'passwordPolicy', 'minLength', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.passwordPolicy.requireUppercase}
                    onChange={(e) => handleUpdateNestedSetting('security', 'passwordPolicy', 'requireUppercase', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Require uppercase letters</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.passwordPolicy.requireNumbers}
                    onChange={(e) => handleUpdateNestedSetting('security', 'passwordPolicy', 'requireNumbers', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Require numbers</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.passwordPolicy.requireSymbols}
                    onChange={(e) => handleUpdateNestedSetting('security', 'passwordPolicy', 'requireSymbols', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Require symbols</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) => handleUpdateSetting('security', 'twoFactorAuth', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Enable Two-Factor Authentication</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )

  const NotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.emailNotifications}
                onChange={(e) => handleUpdateSetting('notifications', 'emailNotifications', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Email Notifications</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.smsNotifications}
                onChange={(e) => handleUpdateSetting('notifications', 'smsNotifications', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">SMS Notifications</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.pushNotifications}
                onChange={(e) => handleUpdateSetting('notifications', 'pushNotifications', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Push Notifications</span>
            </label>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Alert Thresholds</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fraud Detection (%)</label>
                <input
                  type="number"
                  value={settings.notifications.alertThresholds.fraudDetection}
                  onChange={(e) => handleUpdateNestedSetting('notifications', 'alertThresholds', 'fraudDetection', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application Review (%)</label>
                <input
                  type="number"
                  value={settings.notifications.alertThresholds.applicationReview}
                  onChange={(e) => handleUpdateNestedSetting('notifications', 'alertThresholds', 'applicationReview', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">System Errors (%)</label>
                <input
                  type="number"
                  value={settings.notifications.alertThresholds.systemErrors}
                  onChange={(e) => handleUpdateNestedSetting('notifications', 'alertThresholds', 'systemErrors', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const IntegrationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Integration Configuration</h3>
        <div className="space-y-6">
          <div>
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={settings.integrations.crmEnabled}
                onChange={(e) => handleUpdateSetting('integrations', 'crmEnabled', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Enable CRM Integration</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CRM URL</label>
                <input
                  type="url"
                  value={settings.integrations.crmUrl}
                  onChange={(e) => handleUpdateSetting('integrations', 'crmUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CRM API Key</label>
                <div className="relative">
                  <input
                    type={showApiKeys ? 'text' : 'password'}
                    value={settings.integrations.crmApiKey}
                    onChange={(e) => handleUpdateSetting('integrations', 'crmApiKey', e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowApiKeys(!showApiKeys)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showApiKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Email Service</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Provider</label>
                <select
                  value={settings.integrations.emailService}
                  onChange={(e) => handleUpdateSetting('integrations', 'emailService', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="SendGrid">SendGrid</option>
                  <option value="Mailgun">Mailgun</option>
                  <option value="AWS SES">AWS SES</option>
                  <option value="SMTP">SMTP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                <div className="relative">
                  <input
                    type={showApiKeys ? 'text' : 'password'}
                    value={settings.integrations.emailApiKey}
                    onChange={(e) => handleUpdateSetting('integrations', 'emailApiKey', e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowApiKeys(!showApiKeys)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showApiKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Document Storage</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Storage Provider</label>
                <select
                  value={settings.integrations.documentStorage}
                  onChange={(e) => handleUpdateSetting('integrations', 'documentStorage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="AWS S3">AWS S3</option>
                  <option value="Google Cloud Storage">Google Cloud Storage</option>
                  <option value="Azure Blob Storage">Azure Blob Storage</option>
                  <option value="Local Storage">Local Storage</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                <div className="relative">
                  <input
                    type={showApiKeys ? 'text' : 'password'}
                    value={settings.integrations.storageApiKey}
                    onChange={(e) => handleUpdateSetting('integrations', 'storageApiKey', e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowApiKeys(!showApiKeys)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showApiKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const AISettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Configuration</h3>
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.ai.fraudDetectionEnabled}
                onChange={(e) => handleUpdateSetting('ai', 'fraudDetectionEnabled', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Enable Fraud Detection</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.ai.documentAnalysisEnabled}
                onChange={(e) => handleUpdateSetting('ai', 'documentAnalysisEnabled', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Enable Document Analysis</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.ai.sopAnalysisEnabled}
                onChange={(e) => handleUpdateSetting('ai', 'sopAnalysisEnabled', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Enable SOP Analysis</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.ai.eligibilityScoringEnabled}
                onChange={(e) => handleUpdateSetting('ai', 'eligibilityScoringEnabled', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Enable Eligibility Scoring</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fraud Detection Threshold (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={settings.ai.fraudDetectionThreshold}
              onChange={(e) => handleUpdateSetting('ai', 'fraudDetectionThreshold', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">AI Model Version</label>
            <input
              type="text"
              value={settings.ai.aiModelVersion}
              onChange={(e) => handleUpdateSetting('ai', 'aiModelVersion', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const UserRolesSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">User Roles</h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Role</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {userRoles.map((role) => (
            <div key={role.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-md font-semibold text-gray-900">{role.name}</h4>
                  <p className="text-sm text-gray-600">{role.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{role.userCount} users assigned</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    role.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {role.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const AuditLogsSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Audit Logs</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          {auditLogs
            .filter(log => 
              searchTerm === '' || 
              log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
              log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
              log.resource.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((log) => (
            <div key={log.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(log.status)}`}>
                    {getStatusIcon(log.status)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{log.user}</span>
                      <span className="text-sm text-gray-600">{log.action}</span>
                      <span className="text-sm text-gray-600">{log.resource}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{new Date(log.timestamp).toLocaleString()}</span>
                      <span>IP: {log.ipAddress}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />
      case 'security':
        return <SecuritySettings />
      case 'notifications':
        return <NotificationSettings />
      case 'integrations':
        return <IntegrationSettings />
      case 'ai':
        return <AISettings />
      case 'users':
        return <UserRolesSettings />
      case 'audit':
        return <AuditLogsSettings />
      default:
        return <GeneralSettings />
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Configure system settings and preferences</p>
          </div>
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
              isSaving 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>
          
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default SettingsPage
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ApplicationsPage from './pages/ApplicationsPage'
import ApplicationDetailPage from './pages/ApplicationDetailPage'
import NewApplicationPage from './pages/NewApplicationPage'
import FraudDetectionPage from './pages/FraudDetectionPage'
import StudentsPage from './pages/StudentsPage'
import SettingsPage from './pages/SettingsPage'
import FeaturesPage from './pages/FeaturesPage'
import HowItWorksPage from './pages/HowItWorksPage'
import UniversitiesPage from './pages/UniversitiesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import StudentDashboardPage from '@/pages/StudentDashboardPage'
import AdmissionFormPage from './pages/AdmissionFormPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admission-form" element={<AdmissionFormPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/universities" element={<UniversitiesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/student-dashboard" element={<StudentDashboardPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/applications" element={
            <ProtectedRoute>
              <ApplicationsPage />
            </ProtectedRoute>
          } />
          <Route path="/applications/:id" element={
            <ProtectedRoute>
              <ApplicationDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/applications/new" element={
            <ProtectedRoute>
              <NewApplicationPage />
            </ProtectedRoute>
          } />
          <Route path="/fraud-detection" element={
            <ProtectedRoute>
              <FraudDetectionPage />
            </ProtectedRoute>
          } />
          <Route path="/students" element={
            <ProtectedRoute>
              <StudentsPage />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.main>
    </div>
  )
}

export default App
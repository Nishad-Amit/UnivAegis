import React from 'react'
import DashboardLayout from '@/components/DashboardLayout'

const NewApplicationPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">New Application</h1>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-600">New application form will be implemented here.</p>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default NewApplicationPage

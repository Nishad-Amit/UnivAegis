import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CancellationRefundPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Navigation */}
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Cancellation & Refund Policy
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <p className="text-gray-700 text-lg mb-8">
                UnivAegis is a SaaS platform offering AI-powered admission management services to universities and recruitment partners.
                Since our services are digital and subscription-based, the following policies apply:
              </p>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">1. Subscription Cancellation</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">
                      Clients may cancel their subscription anytime by writing to <a href="mailto:contact@univaegis.com" className="text-blue-600 hover:text-blue-800 font-medium">contact@univaegis.com</a>
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">
                      Cancellation will be effective at the end of the current billing cycle
                    </p>
                  </li>
                </ul>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">2. Refund Policy</h2>
                <p className="text-gray-700 mb-4">Payments made are non-refundable, including:</p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Subscription fees</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Onboarding fees</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">API usage charges</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Setup & integration fees</p>
                  </li>
                </ul>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">3. Duplicate or Accidental Payments</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">
                      If a payment is made twice or by mistake, email us within 48 hours at <a href="mailto:contact@univaegis.com" className="text-blue-600 hover:text-blue-800 font-medium">contact@univaegis.com</a>
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">
                      If verified, refunds will be processed within 7–10 working days
                    </p>
                  </li>
                </ul>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">4. Failed Transactions</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">
                      If the payment is debited but not reflected, your bank will usually reverse the amount within 5–7 business days
                    </p>
                  </li>
                </ul>
              </div>
              
              <div className="border-t border-gray-200 pt-8 mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                      <span className="text-xl">📧</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a href="mailto:contact@univaegis.com" className="text-blue-600 hover:text-blue-800">contact@univaegis.com</a>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                      <span className="text-xl">🌐</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Website</p>
                      <a href="https://univaegis.com/" className="text-blue-600 hover:text-blue-800">https://univaegis.com/</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CancellationRefundPage;
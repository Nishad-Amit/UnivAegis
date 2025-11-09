import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LegalContactPage: React.FC = () => {
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
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Get in touch with our team for any inquiries
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
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">UnivAegis Technologies</h2>
                <p className="text-gray-600 text-lg">We're here to help and answer any questions you might have.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center p-6 bg-blue-50 rounded-xl">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <span className="text-2xl">📧</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                  <a href="mailto:contact@univaegis.com" className="text-blue-600 hover:text-blue-800 font-medium text-center">
                    contact@univaegis.com
                  </a>
                </div>
                
                <div className="flex flex-col items-center p-6 bg-blue-50 rounded-xl">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <span className="text-2xl">🌐</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Website</h3>
                  <a href="https://univaegis.com/" className="text-blue-600 hover:text-blue-800 font-medium text-center">
                    univaegis.com
                  </a>
                </div>
                
                <div className="flex flex-col items-center p-6 bg-blue-50 rounded-xl">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <span className="text-2xl">📍</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-700 text-center">India</p>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-gray-600">
                  For general inquiries, support, or partnership opportunities, please don't hesitate to reach out to us.
                </p>
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

export default LegalContactPage;
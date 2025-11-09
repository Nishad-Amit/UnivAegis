import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ShippingDeliveryPage: React.FC = () => {
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
              Shipping & Service Delivery Policy
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
                UnivAegis is a cloud-based SaaS platform.
                We do not ship any physical products.
              </p>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">1. Digital Service Delivery</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Access to the platform is provided after onboarding and successful payment</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">All features (document verification, eligibility engine, automation tools) are delivered online</p>
                  </li>
                </ul>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">2. Activation Timeline</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Standard activation: 3–7 business days</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Custom integrations: 10–30 business days</p>
                  </li>
                </ul>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">3. Support Availability</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Support is available via email at <a href="mailto:contact@univaegis.com" className="text-blue-600 hover:text-blue-800 font-medium">contact@univaegis.com</a></p>
                  </li>
                </ul>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">4. No Physical Shipping</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">We provide only digital software services</p>
                  </li>
                </ul>
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

export default ShippingDeliveryPage;
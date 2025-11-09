import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicyPage: React.FC = () => {
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
              Privacy Policy
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
                This Privacy Policy describes how UnivAegis collects, uses, and protects your data.
              </p>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">1. Data We Collect</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">University & partner details</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">User login information</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Student documents (transcripts, ID, passports, financial docs, etc.)</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">System activity logs</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Payment information (processed securely by Razorpay)</p>
                  </li>
                </ul>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">2. How We Use Your Data</h2>
                <p className="text-gray-700 mb-4">We use your data to:</p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">To verify documents</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">To automate application workflows</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">To build eligibility results</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">To improve platform performance</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">For internal analytics</p>
                  </li>
                </ul>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">3. Data Sharing</h2>
                <p className="text-gray-700 mb-4">We only share data with:</p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Universities selected by the institution/user</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Verification partners (e.g., financial verification APIs)</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Razorpay for payment processing</p>
                  </li>
                </ul>
                <p className="text-gray-700 mt-4">We never sell or rent personal data.</p>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">4. Data Protection Measures</h2>
                <p className="text-gray-700 mb-4">We use:</p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Encryption</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Secure cloud infrastructure</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Role-based access</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Access logs</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Industry-standard security practices</p>
                  </li>
                </ul>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">5. Your Rights</h2>
                <p className="text-gray-700 mb-4">You may request:</p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Data deletion</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Data correction</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">Access logs</p>
                  </li>
                </ul>
                <p className="text-gray-700 mt-4">by emailing <a href="mailto:contact@univaegis.com" className="text-blue-600 hover:text-blue-800 font-medium">contact@univaegis.com</a>.</p>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">6. Cookies</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-gray-700">We use cookies for login, analytics, and product experience</p>
                  </li>
                </ul>
              </div>
              
              <div className="border-t border-gray-200 pt-8 mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact</h2>
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a href="mailto:contact@univaegis.com" className="text-blue-600 hover:text-blue-800">contact@univaegis.com</a>
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

export default PrivacyPolicyPage;
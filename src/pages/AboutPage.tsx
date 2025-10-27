import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  GraduationCap,
  Users,
  Target,
  Award,
  Globe,
  Heart,
  BookOpen,
  TrendingUp,
  Menu,
  X,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react'

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: "Integrity First",
      description: "We believe in transparent, ethical AI that serves the global education community with honesty and accountability."
    },
    {
      icon: Users,
      title: "Student-Centered",
      description: "Every feature we build prioritizes student success and equitable access to quality education worldwide."
    },
    {
      icon: Target,
      title: "Precision Innovation",
      description: "We combine cutting-edge AI with deep admissions expertise to deliver accurate, actionable insights."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "We're committed to bridging educational gaps and enabling cross-border learning opportunities."
    }
  ]

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen pt-16">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Empowering Global Education Through AI
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Complete AI infrastructure for International Universities. 
              Automations, Verification and AI decisioning in single platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Mission and Vision
            </h2>
            
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto mb-16 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">From the Founder — Rohan</h3>
              <p className="text-gray-600 mb-4 text-center">
                I’ve spent years working inside international admissions — reviewing thousands of student applications, coordinating with universities, and collaborating with government departments.
              </p>
              <p className="text-gray-600 mb-4 text-center">
                One thing became clear: the system is broken and needs an immediate update.
              </p>
              <p className="text-gray-600 mb-4 text-center">
                Genuine students lose opportunities because of missing or fraudulent documents. Universities waste weeks verifying data that should take minutes. And agents, despite their best efforts, are trapped in manual, disconnected workflows.
              </p>
              <p className="text-gray-600 mb-4 text-center">
                I wanted to fix that.
              </p>
              <p className="text-gray-600 mb-4 text-center">
                That’s why we’re building an AI-powered ERP for global admissions — a platform that brings together automation, document verification, and CRM integration into one secure ecosystem.
              </p>
              <p className="text-gray-600 mb-4 text-center">
                Our goal isn’t just to build another software — it’s to build trust and transparency in international education.
              </p>
              <p className="text-gray-600 mb-6 text-center">
                A world where universities can confidently admit students from anywhere, and every genuine student can get the opportunity they deserve.
              </p>
              <p className="text-gray-900 font-semibold text-center">
                — Rohan Singh<br />
                Founder, Univaegis
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto mb-16 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Mission</h3>
              <p className="text-gray-600 text-center">
                Our mission is to empower universities with a full-scale ERP portal that automates applications, verifies academic and financial documents, and seamlessly integrates with existing CRMs — transforming the entire admissions and recruitment process into a faster, fraud-proof, and data-driven experience with AGI.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our Vision</h3>
              <p className="text-gray-600 mb-6 text-center">
                To become the global backbone of trusted international admissions, empowering universities to recruit faster, smarter, and more transparently through AI-driven automation and verification.
              </p>
              <p className="text-gray-600 text-center">
                Our Long term Vision is to evolve from an admissions automation platform into a comprehensive ERP for higher education — managing the entire student journey from application to alumni, powered by AI, analytics, and secure integrations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every feature we build.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-8 rounded-xl hover:bg-gray-100 transition-colors text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Story
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building trust and transparency in international education through AI-powered solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
            id="cta"
          >
            <h2 className="text-4xl font-bold mb-6">
              Join Us in Shaping the Future of Education
            </h2>
            <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              As a university-focused AI platform, we're building the infrastructure for smarter, faster admissions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                Get in Touch
              </Link>
              <Link to="#" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutPage
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import homepageImage from '../assets/homepage.jpg'
import landingPageVideo from '../assets/landingpage.mp4'
import videoThumbnail from '../assets/videothumbnail.png'
import salesforceLogo from '../assets/salesforce.png'
import bannerSisLogo from '../assets/sis.png'
import peoplesoftLogo from '../assets/PeopleSoft-Logo.wine.png'
import slateLogo from '../assets/slate-logo.png'
import Header from '../components/Header'
import Footer from '../components/Footer'

import {
  ArrowRight,
  Brain,
  Zap,
  Shield,
  Users,
  CheckCircle,
  Star,
  TrendingUp,
  ChevronDown,
  Menu,
  X,
  GraduationCap,
  FileText,
  BarChart3,
  Globe,
  Lock,
  Award,
  Clock,
  Target,
  BookOpen,
  MessageSquare,
  Calendar,
  Download,
  Play,
  Upload,
  Linkedin,
  Twitter,
  Instagram,
  User
} from 'lucide-react'

const LandingPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    university: ''
  });

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Use the backend API instead of Firebase
      const response = await fetch('http://localhost:5001/api/demo-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        alert("Thank you! Your demo request has been submitted successfully.");
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          university: ''
        });
      } else {
        throw new Error(result.message || "Failed to submit demo request");
      }
    } catch (err: any) {
      console.error("Error submitting demo request: ", err);
      const errorMessage = err.message || "Sorry, there was an error submitting your request. Please try again.";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: CheckCircle,
      title: 'Eligibility & Program Fit Engine',
      description: 'Matches student profile (GPA, IELTS, etc.) to university program requirements with precision.'
    },
    {
      icon: FileText,
      title: 'Document Automation & Data Extraction',
      description: 'AI-powered processing of academic and financial documents with real-time data extraction.'
    },
    {
      icon: Zap,
      title: 'Automated Workflow Processing',
      description: 'Streamline application processing with intelligent automation that handles routine tasks and decision routing.'
    },
    {
      icon: Users,
      title: 'Role-Based Access Control',
      description: 'Secure multi-user platform with granular permissions for admissions officers, compliance specialists, and program coordinators.'
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Comprehensive dashboards with live metrics, performance tracking, and data visualization for informed decision-making.'
    },
    {
      icon: Globe,
      title: 'CRM Integration',
      description: 'Seamless integration with existing university systems, student portals, and compliance APIs for unified data management.'
    }
  ]

  const workflowSteps = [
    {
      step: '1',
      title: 'Document Upload',
      description: 'Students submit applications with documents through your portal',
      icon: Upload
    },
    {
      step: '2',
      title: 'Eligibility Check',
      description: 'System automatically checks student profile against university program requirements',
      icon: CheckCircle
    },
    {
      step: '3',
      title: 'AI Processing',
      description: 'Automated verification and data extraction from academic documents',
      icon: Brain
    },
    {
      step: '4',
      title: 'Dashboard Review',
      description: 'Admissions staff review AI-generated insights and recommendations',
      icon: BarChart3
    },
    {
      step: '5',
      title: 'Automation',
      description: 'Eliminate 70% of manual review work with intelligent automation',
      icon: Zap
    },
    {
      step: '6',
      title: 'Decision Support',
      description: 'AI-powered insights empower staff to make confident decisions',
      icon: Award
    }
  ]

  const integrations = [
    { name: 'Salesforce CRM', logo: salesforceLogo },
    { name: 'Banner SIS', logo: bannerSisLogo },
    { name: 'PeopleSoft', logo: peoplesoftLogo },
    { name: 'Slate CRM', logo: slateLogo }
  ]

  const addOns = [
    {
      name: 'SOP Pro',
      description: 'Advanced AI-powered Statement of Purpose review with plagiarism detection and scoring.',
      price: '$0.50 per review'
    },
    {
      name: 'Custom Integration',
      description: 'Tailored integration with your existing systems and custom API development.',
      price: 'Starting at $5,000'
    }
  ]

  const resources = [
    { name: 'Case Studies', href: '#', icon: FileText },
    { name: 'Product Guides', href: '#', icon: BookOpen },
    { name: 'Blog', href: '#', icon: MessageSquare },
    { name: 'Webinars', href: '#', icon: Calendar }
  ]

  // Stats array removed as per requirements

  return (
    <div className="min-h-screen pt-16">
      {/* Navigation */}
      <Header variant={isScrolled ? 'dark' : 'light'} />

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
              AI-Powered University
              <span className="block text-cyan-300">Admissions Automation</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              World's first AI-powered admissions CRM, built for international universities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/login"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/admission-form"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <User className="w-5 h-5" />
                <span>Register Yourself</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-blue-200">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>ISO 27001 Certified</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Document Automation Demo Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
            id="document-demo"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Document Automation in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our AI-powered system automatically processes and extracts data from academic documents
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white text-center">
              <h3 className="text-2xl font-bold mb-2">Live Document Processing Demo</h3>
              <p className="text-blue-100">Watch our AI extract data from academic transcripts in real-time</p>
            </div>
            <div className="p-8">
              <div className="rounded-lg overflow-hidden aspect-video bg-black">
                <video
                  src={landingPageVideo}
                  controls
                  className="w-full h-full object-contain rounded-lg"
                  poster={videoThumbnail}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Academic Document Processing</h4>
                  <p className="text-gray-600 text-sm">Automatically extract GPA, courses, and academic history</p>
                </div>
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Financial Document Analysis</h4>
                  <p className="text-gray-600 text-sm">Verify bank statements and financial capacity</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Real-time Data Extraction</h4>
                  <p className="text-gray-600 text-sm">Structured data ready for university systems</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for admissions officers, compliance specialists, and program coordinators
              to process applications faster with intelligent automation and fraud detection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, automated workflow from application to decision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex"
                >
                  <div className="bg-white p-8 rounded-xl shadow-lg text-center flex flex-col flex-1">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-blue-600 mb-4 text-center">{step.step}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex-1 text-center">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed flex-1 text-center">
                      {step.description}
                    </p>
                  </div>

                  {/* Connection Line */}
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transform -translate-y-1/2"></div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* For Universities Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Built for Universities
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Solve the biggest challenges in university admissions with AI-powered automation
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <X className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Manual Processing Bottlenecks</h3>
                    <p className="text-gray-600">Slow, error-prone manual document verification and eligibility checking</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <X className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Fraud & Risk Management</h3>
                    <p className="text-gray-600">Difficulty detecting fraudulent applications and managing compliance risks</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <X className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">System Integration Challenges</h3>
                    <p className="text-gray-600">Complex integration with existing CRM and student information systems</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">UnivAegis Solutions</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Automated Processing</h3>
                    <p className="text-gray-600">Faster application processing with AI-powered document verification</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Advanced Fraud Detection - Under Development</h3>
                    <p className="text-gray-600">Accurate fraud detection with multi-layer verification and risk scoring</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Seamless Integration</h3>
                    <p className="text-gray-600">Pre-built connectors for major CRM systems and compliance APIs</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* College Students Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white text-center rounded-2xl shadow-xl">
              <h3 className="text-4xl font-bold mb-4 drop-shadow-lg">Streamline Your Admissions Process</h3>
              <p className="text-2xl mb-6 max-w-3xl mx-auto drop-shadow-md">Experience the power of AI-powered admissions automation</p>
              <div className="flex justify-center">
                <div className="bg-white/10 rounded-xl p-4 inline-block border border-white/20 max-w-2xl">
                  <img
                    src={homepageImage}
                    alt="College students using UnivAegis platform"
                    className="rounded-lg w-full h-auto max-w-full shadow-lg"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integrations Section */}
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
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with your existing systems and workflows for unified data management
            </p>
          </motion.div>

          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl">
              {integrations.map((integration, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-8 rounded-xl text-center hover:bg-gray-100 transition-all duration-300 flex flex-col items-center justify-center shadow-md hover:shadow-lg"
                >
                  <div className="w-24 h-24 mb-4 flex items-center justify-center">
                    <img
                      src={integration.logo}
                      alt={integration.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 text-center">{integration.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                About UnivAegis
              </h2>
              <p className="text-xl text-gray-600">
                Transforming university admissions with cutting-edge AI technology
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 mb-6">
                  To revolutionize university admissions by providing AI-powered automation that
                  makes the process faster, more accurate, and more secure for institutions worldwide.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  A world where every qualified student has equal access to higher education
                  through streamlined, transparent, and fraud-free admissions processes.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why We Built This</h3>
                <p className="text-gray-600 mb-6">
                  After witnessing the challenges universities face with manual processing,
                  fraud detection, and system integration, we created UnivAegis to
                  solve these problems with intelligent automation.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h3>
                <p className="text-gray-600">
                  Comprised of AI researchers, education technology experts, and former
                  admissions officers who understand both the technical and practical
                  challenges of university admissions.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Book a Demo Section */}
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
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Admissions Process?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Book a personalized demo and see how UnivAegis can revolutionize your university's admissions workflow.
            </p>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  placeholder="University Name"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Book a Demo'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LandingPage

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import salesforceLogo from '../assets/salesforce.png'
import bannerSisLogo from '../assets/sis.png'
import peoplesoftLogo from '../assets/PeopleSoft-Logo.wine.png'
import slateLogo from '../assets/slate-logo.png'
import { 
  GraduationCap,
  Database,
  Cloud,
  MessageSquare,
  BarChart3,
  Globe,
  Play,
  BookOpen,
  Users,
  Zap,
  Lock,
  Award,
  ArrowRight,
  Menu,
  X,
  Building, 
  TrendingUp, 
  Shield, 
  CheckCircle,
  FileText,
  MessageSquare as MessageSquareIcon,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const UniversitiesPage: React.FC = () => {
  const integrations = [
    {
      category: "Core University CRM Integrations",
      icon: Database,
      items: [
        {
          title: "University Admissions CRMs",
          description: "Direct integration with leading university admissions systems.",
          systems: ["Slate CRM", "Salesforce Education Cloud", "Merrito", "Ellucian Banner", "Element451", "TargetX"],
          outcome: "Student applications are automatically imported into UnivAegis for verification, eligibility scoring, and data extraction — no manual uploads needed."
        },
        {
          title: "University ERPs & Student Systems",
          description: "Integrate with your university's ERP or student information systems for complete data consistency.",
          systems: ["PeopleSoft", "SAP SuccessFactors", "Banner SIS"],
          outcome: "Admission decisions and student data auto-sync with academic databases, streamlining onboarding and compliance."
        }
      ]
    },
    {
      category: "Communication & Collaboration Integrations",
      icon: MessageSquare,
      items: [
        {
          title: "Notifications & Alerts",
          description: "Real-time updates and reminders where your team already works.",
          systems: ["Microsoft Teams", "Slack", "Email & SMS Gateways"],
          outcome: "Receive instant alerts on processed applications, AI decision summaries, and student status changes — directly in your preferred communication channel."
        }
      ]
    },
    {
      category: "Analytics & Reporting Integrations",
      icon: BarChart3,
      items: [
        {
          title: "Business Intelligence Dashboards",
          description: "Push data directly into your analytics stack.",
          systems: ["Google Data Studio", "Power BI", "Tableau"],
          outcome: "Aggregate metrics like eligibility rate, processing time, and decision turnaround time — all visualized in real-time."
        }
      ]
    },
    {
      category: "API & Custom Integration Options",
      icon: Cloud,
      items: [
        {
          title: "API & Custom Integration Options",
          description: "For universities with custom workflows, UnivAegis offers flexible integration via REST APIs and secure webhooks.",
          systems: ["Push/pull student application data", "Access AI reports programmatically", "Webhook triggers for status updates", "Support for JSON, XML formats"],
          outcome: "All API calls use AES-256 encryption, OAuth 2.0 authentication, and GDPR-ready data policies.",
          isSecurity: true
        }
      ]
    }
  ]

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "AI-Powered Screening",
      description: "Automatically evaluate applications using advanced AI algorithms to identify the best candidates."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Fraud Detection",
      description: "Protect your institution with our advanced document verification and fraud prevention system."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Predictive Analytics",
      description: "Forecast enrollment trends and student success rates with our machine learning models."
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: "Global Reach",
      description: "Access a diverse pool of international applicants from over 100 countries."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Real-Time Insights",
      description: "Monitor application trends and recruitment metrics with our comprehensive dashboard."
    },
    {
      icon: <MessageSquareIcon className="w-8 h-8 text-blue-600" />,
      title: "Communication Hub",
      description: "Streamline interactions with applicants through our integrated messaging platform."
    }
  ]

  const benefits = [
    {
      stat: "75%",
      description: "Reduction in manual screening time"
    },
    {
      stat: "98%",
      description: "Accuracy in document verification"
    },
    {
      stat: "3x",
      description: "Faster decision-making process"
    },
    {
      stat: "24/7",
      description: "Automated support availability"
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
              "Seamless Integrations. Effortless Automation."
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              UnivAegis plugs directly into your existing university CRMs and student management systems — so you don't have to change a thing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                <span>View Compatible Systems</span>
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Book a Demo</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section (from ForUniversitiesPage) */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features for Modern Admissions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides everything your admissions team needs to efficiently manage applications 
              while maintaining the highest standards of accuracy and security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section (from ForUniversitiesPage) */}
      <div className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Measurable Results</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Universities using our platform report significant improvements in efficiency and decision accuracy.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{benefit.stat}</div>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Integration Section (from ForUniversitiesPage) */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 md:p-12 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Seamless Integration</h2>
                  <p className="text-blue-100 mb-6">
                    Our platform integrates with your existing systems including student information systems, 
                    CRM platforms, and communication tools.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">SIS</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">CRM</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">API</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">LMS</span>
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      <span>Single Sign-On (SSO)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      <span>RESTful API</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      <span>Data Export/Import</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      <span>Custom Webhooks</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CRM Logos Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Leading University Systems
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seamless integration with the platforms your team already uses
            </p>
          </motion.div>

          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl">
              {[
                { name: 'Salesforce CRM', logo: salesforceLogo },
                { name: 'Banner SIS', logo: bannerSisLogo },
                { name: 'PeopleSoft', logo: peoplesoftLogo },
                { name: 'Slate CRM', logo: slateLogo }
              ].map((crm, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl text-center hover:bg-gray-100 transition-all duration-300 flex flex-col items-center justify-center shadow-md hover:shadow-lg"
                >
                  <div className="w-24 h-24 mb-4 flex items-center justify-center">
                    <img 
                      src={crm.logo} 
                      alt={crm.name} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 text-center">{crm.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Sections */}
      {integrations.map((category, categoryIndex) => {
        const CategoryIcon = category.icon
        return (
          <section key={categoryIndex} className={`py-20 ${categoryIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <CategoryIcon className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {category.category}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 gap-8">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: itemIndex * 0.1 }}
                    viewport={{ once: true }}
                    className={`bg-white p-8 rounded-xl shadow-lg ${item.title === "Notifications & Alerts" || item.title === "Business Intelligence Dashboards" || item.title === "API & Custom Integration Options" ? 'max-w-none text-center' : 'max-w-4xl mx-auto'}`}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 mb-6">{item.description}</p>
                    
                    <div className={`space-y-3 mb-6 ${item.title === "Notifications & Alerts" || item.title === "Business Intelligence Dashboards" || item.title === "API & Custom Integration Options" ? 'flex flex-col items-center' : ''}`}>
                      {item.systems.map((system, systemIndex) => (
                        <div key={systemIndex} className={`flex items-start space-x-2 ${item.title === "Notifications & Alerts" || item.title === "Business Intelligence Dashboards" || item.title === "API & Custom Integration Options" ? 'justify-center' : ''}`}>
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">{system}</p>
                        </div>
                      ))}
                    </div>
                    
                    {item.outcome && (
                      <div className={`p-4 rounded-lg ${item.isSecurity ? 'bg-red-50' : 'bg-blue-50'} ${item.title === "Notifications & Alerts" || item.title === "Business Intelligence Dashboards" || item.title === "API & Custom Integration Options" ? 'max-w-4xl mx-auto' : ''}`}>
                        <h4 className="font-semibold text-gray-900 mb-2">What Happens:</h4>
                        <p className="text-gray-700">{item.outcome}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA Footer Section */}
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
              "Plug UnivAegis Into Your Admissions Stack — in Hours, Not Weeks."
            </h2>
            <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              No-code setup, full API flexibility, and enterprise-grade security.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link to="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                Request API Access
              </Link>
              <Link to="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors">
                View Integration Docs
              </Link>
              <Link to="/contact" className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors">
                Book Technical Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional CTA Section (from ForUniversitiesPage) */}
      <div className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Admissions Process?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Join hundreds of universities worldwide that are using AI to streamline their admissions process 
            and improve decision accuracy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </Link>
            <Link 
              to="/login" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              University Login
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default UniversitiesPage
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Upload, 
  Shield, 
  FileText, 
  CheckCircle, 
  BarChart3, 
  Globe,
  ArrowRight,
  Play,
  Users,
  Zap,
  Lock,
  Award,
  MessageSquare,
  Calendar,
  Download,
  GraduationCap,
  Menu,
  X,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react'
import sopScorecard from '../assets/SOP Scorecard.png'
import documentViewer from '../assets/Document Viewer.png'
import eligibilityMatrix from '../assets/Eligibility Matrix.png'
import decisionPanel from '../assets/Decision Panel.png'
import Header from '../components/Header'
import Footer from '../components/Footer'

const FeaturesPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)

  const workflowSteps = [
    {
      id: 2,
      title: "Student Uploads Application",
      icon: Upload,
      description: "Through university portal or CRM integrations",
      details: [
        "Uploads: transcripts, SOP, financial docs, ID, test scores",
        "File formats: PDF, JPEG, DOCX, etc."
      ],
      outcome: "Secure data upload → Sent to AI pipeline instantly"
    },
    {
      id: 1,
      title: "Eligibility & Program Fit Engine",
      icon: CheckCircle,
      description: "Matches student profile (GPA, IELTS, etc.) to university program requirements",
      details: [
        "Eligibility Score",
        "Program Fit Score",
        "Recommends alternatives if needed"
      ],
      outcome: "UnivAegis recommends: ✅ Eligible / 🔄 Uneligible (UnivAegis will mark the application as incomplete or ineligible after human intervention it will be denied) / 🟡 Admissions officer review required"
    },
    {
      id: 3,
      title: "Document AI & Data Extraction",
      icon: Shield,
      description: "OCR reads and parses academic + financial documents",
      details: [
        "Document processing (e.g. bank letters, transcripts)",
        "Data extraction and structuring",
        "Format validation"
      ],
      outcome: "Clean structured data generated",
      riskLevels: ["✅ Low", "⚠️ Medium", "🚨 High"]
    },
    {
      id: 4,
      title: "SOP Analysis (NLP Engine)",
      icon: FileText,
      description: "AI reviews Statement of Purpose or Personal Essays",
      details: [
        "Plagiarism",
        "AI-generated writing (ChatGPT etc.)",
        "Poor coherence / grammar / originality"
      ],
      outcome: "SOP score (0–100) + AI use likelihood % + improvement suggestions"
    },
    {
      id: 5,
      title: "Dashboard + CRM Integration",
      icon: BarChart3,
      description: "Admissions officer sees:",
      details: [
        "Full AI Report (SOP score, eligibility, document analysis)",
        "Flagged documents",
        "Recommended decision"
      ],
      outcome: "Results auto-sync to StudyLink / Slate / Salesforce",
      actions: ["Accept", "Review", "Reject"],
      decisions: ["Accept", "Conditional Review", "Manual Review", "Reject"]
    }
  ]

  const benefits = [
    {
      icon: Zap,
      title: "60–70% faster application review",
      description: "Process applications in minutes, not months"
    },
    {
      icon: Users,
      title: "Focus staff on strategic student engagement",
      description: "Let AI handle routine tasks so staff can focus on what matters"
    },
    {
      icon: Lock,
      title: "Secure, compliant & fraud-resistant admissions",
      description: "Enterprise-grade security with compliance certifications"
    },
    {
      icon: Award,
      title: "No disruption to current workflow",
      description: "Seamless CRM/API integration with your existing systems"
    },
    {
      icon: Globe,
      title: "Global Ecosystem Compatibility",
      description: "Connect with every part of your admissions pipeline — from first application to final enrollment."
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
              "Smarter admissions in minutes not in days."
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              UnivAegis plugs into your existing systems and automates eligibility checks, document verification, and data extraction — all in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/#document-demo"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>See Demo</span>
              </Link>
              <Link 
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
              >
                <span>Talk to Our Team</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Step-by-Step Workflow */}
      <section id="workflow" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Step-by-Step Workflow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how UnivAegis transforms your admissions process with intelligent automation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Workflow Visualization */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="space-y-8">
                {workflowSteps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div 
                      key={step.id}
                      className={`flex items-start space-x-4 p-4 rounded-lg cursor-pointer transition-all ${
                        activeStep === index ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveStep(index)}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activeStep === index ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Workflow Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              {workflowSteps[activeStep] && (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      {React.createElement(workflowSteps[activeStep].icon, { className: "w-6 h-6" })}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {workflowSteps[activeStep].title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    {workflowSteps[activeStep].description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {workflowSteps[activeStep].details?.map((detail, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700">{detail}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">What Happens:</h4>
                    <p className="text-gray-700">{workflowSteps[activeStep].outcome}</p>
                  </div>
                  
                  {workflowSteps[activeStep].riskLevels && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Flag Risk Levels:</h4>
                      <div className="flex space-x-4">
                        {workflowSteps[activeStep].riskLevels.map((level, index) => (
                          <span key={index} className="px-3 py-1 rounded-full text-sm font-medium">
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {workflowSteps[activeStep].decisions && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Final AI Decision Recommendation:</h4>
                      <div className="flex flex-wrap gap-2">
                        {workflowSteps[activeStep].decisions.map((decision, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                            {decision}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {workflowSteps[activeStep].actions && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">One-click Actions:</h4>
                      <div className="flex flex-wrap gap-2">
                        {workflowSteps[activeStep].actions.map((action, index) => (
                          <button 
                            key={index} 
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visual Workflow Diagram */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Visual Workflow
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 rounded-2xl text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <span className="font-semibold">Student Uploads</span>
              </div>
              <div className="hidden md:block text-2xl">→</div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <span className="font-semibold">Eligibility Check</span>
              </div>
              <div className="hidden md:block text-2xl">→</div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <span className="font-semibold">Document AI Processing</span>
              </div>
              <div className="hidden md:block text-2xl">→</div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <span className="font-semibold">SOP/NLP Review</span>
              </div>
              <div className="hidden md:block text-2xl">→</div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <span className="font-semibold">Dashboard Decision</span>
              </div>
              <div className="hidden md:block text-2xl">→</div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <span className="font-semibold">CRM Update + Notifications</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Admin Dashboard Sneak Peek */}
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
              Admin Dashboard Sneak Peek
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how admissions officers interact with AI-powered insights
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={sopScorecard} 
                  alt="SOP Scorecard" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">SOP Scorecard</h3>
              <p className="text-gray-600 text-sm">AI-generated SOP score with improvement suggestions</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={documentViewer} 
                  alt="Document Viewer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Document Viewer</h3>
              <p className="text-gray-600 text-sm">AI Flagged Tampered Transcript</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={eligibilityMatrix} 
                  alt="Eligibility Matrix" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Eligibility Matrix</h3>
              <p className="text-gray-600 text-sm">Program matching with eligibility scores</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={decisionPanel} 
                  alt="Decision Panel" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Decision Panel</h3>
              <p className="text-gray-600 text-sm">SOP Plagiarism Score: 83%</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your admissions process with intelligent automation
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-8 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

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
              Want to See It Live in Action?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link to="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                Book a Demo
              </Link>
              <Link to="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors">
                Request Sample AI Report
              </Link>
              <Link to="/contact" className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors">
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default FeaturesPage
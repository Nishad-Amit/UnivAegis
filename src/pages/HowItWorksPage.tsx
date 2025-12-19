import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import miniVideoDemo from '../assets/Mini Video Demo.mp4';
import howItWorksThumbnail from '../assets/howitworkpagevideothumbnail.png';
import { 
  CheckCircle,
  Upload,
  Shield,
  BarChart3,
  Globe,
  Play,
  Zap,
  Lock,
  Award,
  GraduationCap,
  ArrowRight,
  Database,
  Code,
  Timer,
  Menu,
  X,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HowItWorksPage: React.FC = () => {
  interface WorkflowStep {
    id: number;
    title: string;
    icon: React.ComponentType<any>;
    description: string;
    details: string[];
    outcome: string;
    riskLevels?: string[];
    decisions?: string[];
    actions?: string[];
  }

  const workflowSteps: WorkflowStep[] = [
    {
      id: 1,
      title: "Document Upload",
      icon: Upload,
      description: "Students submit applications with documents through your portal",
      details: [
        "Files supported: PDF, JPEG, DOCX, etc.",
        "OCR + NLP pipelines extract data such as:",
        "Institution Name, Degree Type, Grades, and Issue Dates",
        "Bank balance, transaction patterns (for financial capacity)"
      ],
      outcome: "Extracted data is normalized into a structured format — ready for AI-based authenticity checks."
    },
    {
      id: 2,
      title: "Eligibility Check",
      icon: CheckCircle,
      description: "System automatically checks student profile against university program requirements",
      details: [
        "Cross-checks with each program's specific requirements (e.g., course prerequisites, grade cutoffs)",
        "Uses rule-based + ML logic to calculate Eligibility Score (0–100)",
        "Categorizes applications: ✅ Qualified / 🔄 Conditional / ❌ Rejected"
      ],
      outcome: "Unqualified or incomplete applications are automatically flagged → Only qualified profiles move forward for verification."
    },
    {
      id: 3,
      title: "AI Processing",
      icon: Shield,
      description: "Cut manual review work by 70% with intelligent AI automation that instantly verifies and extracts academic data.",
      details: [
        "Detects tampered or altered transcripts",
        "Identifies forged bank letters or certificates",
        "Flags duplicate submissions",
        "Recognizes suspicious format anomalies"
      ],
      outcome: "Each document receives a Verification Confidence Score and Fraud Risk Level: ✅ Authentic / ⚠️ Suspicious / 🚨 Tampered",
      riskLevels: ["✅ Authentic", "⚠️ Suspicious", "🚨 Tampered"]
    },
    {
      id: 4,
      title: "Verification",
      icon: BarChart3,
      description: "Admissions staff review AI-verified insights and eligibility results in one dashboard.",
      details: [
        "✅ Approved (Ready for human review)",
        "⚠️ Needs Officer Cross-Check (Flagged or borderline)",
        "❌ Denied (Ineligible or fraudulent)"
      ],
      outcome: "Universities instantly see only validated, eligible, and high-quality applications — improving admission turnaround by 60–70%."
    },
    {
      id: 5,
      title: "Decision Support",
      icon: Award,
      description: "AI-driven insights empower admissions teams to make faster, smarter decisions.",
      details: [
        "Automated document processing and data extraction",
        "AI-powered eligibility checking and program matching",
        "Smart triage of applications based on verification results",
        "Automatic syncing with university CRM systems"
      ],
      outcome: "Reduce manual processing time by up to 70% while maintaining accuracy and compliance."
    },
    {
      id: 6,
      title: "Dashboard Review",
      icon: Globe,
      description: "Gain complete visibility into applications with real-time AI insights in one dashboard.",
      details: [
        "Comprehensive fraud risk scoring and verification",
        "Detailed eligibility analysis with program matching",
        "Actionable insights for borderline applications",
        "Data-driven recommendations for admissions decisions"
      ],
      outcome: "Empower admissions staff with AI-powered insights to make faster, more confident decisions."
    },
    {
      id: 7,
      title: "Integration & Sync to University CRM",
      icon: Globe,
      description: "Works with any major CRM: Slate, Salesforce, Meritto, Ellucian, Element451, TargetX",
      details: [
        "API triggers verification for each new submission → returns decision instantly",
        "Webhooks update the CRM record with:",
        "Verification Status",
        "Eligibility Result",
        "AI Decision Tag"
      ],
      outcome: "Real-time sync ensures university teams don't leave their CRM. UnivAegis functions as a plug-and-play verification layer — no migration or disruption needed."
    }
  ];

  const integrationDetails = [
    {
      title: "RESTful & GraphQL APIs",
      description: "Ready for CRMs like Meritto, Slate, Ellucian, Salesforce, TargetX, Element451",
      icon: Code
    },
    {
      title: "No UI Overhaul",
      description: "Simply configure triggers and endpoints",
      icon: Zap
    },
    {
      title: "Custom Webhooks",
      description: "Deliver verified results, eligibility scores, and fraud flags",
      icon: Database
    },
    {
      title: "Lightweight Dashboard",
      description: "For analytics, overrides, and performance tracking",
      icon: BarChart3
    }
  ];

  const keyHighlights = [
    {
      title: "Eligibility-first workflow",
      description: "Demonstrates logical screening order (real-world process view)",
      icon: CheckCircle
    },
    {
      title: "Document extraction demo",
      description: "Opportunity to showcase AI's live extraction capability via video or GIF",
      icon: Play
    },
    {
      title: "API + Webhook architecture",
      description: "Technical depth showing investor-readiness",
      icon: Code
    },
    {
      title: "Smart Triage logic",
      description: "Simplifies decision engine for investor explanation",
      icon: BarChart3
    },
    {
      title: "Modular integration message",
      description: "Reinforces 'add-on layer' value without CRM replacement",
      icon: Globe
    }
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

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
              UnivAegis automates eligibility, verification, and decisioning — delivering verified, ready-to-review applications directly inside your CRM.
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
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                <span>Talk to Our Team</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Step-by-Step Workflow */}
      <section id="workflow" className="py-20 bg-gradient-to-br from-gray-50 to-white">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Workflow Visualization */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="space-y-6">
                {workflowSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div 
                      key={step.id}
                      className={`flex items-start space-x-4 p-6 rounded-xl transition-all duration-300 cursor-pointer ${
                        activeStep === index 
                          ? 'bg-blue-50 border-l-4 border-blue-600 shadow-sm' 
                          : 'hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                      onClick={() => setActiveStep(index)}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        activeStep === index 
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-gray-900 text-lg">{step.title}</h3>
                          <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">
                            Step {index + 1}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-2">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Workflow Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              {workflowSteps[activeStep] && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      {React.createElement(workflowSteps[activeStep].icon, { className: "w-8 h-8" })}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">
                          Step {activeStep + 1}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {workflowSteps[activeStep].title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                    {workflowSteps[activeStep].description}
                  </p>
                  
                  {workflowSteps[activeStep].details && (
                    <div className="mb-8">
                      <h4 className="font-bold text-gray-900 text-lg mb-4">What's Included:</h4>
                      <div className="space-y-3">
                        {workflowSteps[activeStep].details.map((detail, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-700">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl mb-8 border border-blue-100">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                      Key Outcome
                    </h4>
                    <p className="text-gray-700">
                      {workflowSteps[activeStep].outcome}
                    </p>
                  </div>
                  
                  {workflowSteps[activeStep].riskLevels && (
                    <div className="mb-8">
                      <h4 className="font-bold text-gray-900 mb-4">Risk Assessment Levels:</h4>
                      <div className="flex flex-wrap gap-3">
                        {workflowSteps[activeStep].riskLevels.map((level, index) => (
                          <span 
                            key={index} 
                            className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200"
                          >
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {workflowSteps[activeStep].decisions && (
                    <div className="mb-8">
                      <h4 className="font-bold text-gray-900 mb-4">AI Decision Recommendations:</h4>
                      <div className="flex flex-wrap gap-3">
                        {workflowSteps[activeStep].decisions.map((decision, index) => (
                          <span 
                            key={index} 
                            className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
                          >
                            {decision}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {workflowSteps[activeStep].actions && (
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 mb-4">Available Actions:</h4>
                      <div className="flex flex-wrap gap-3">
                        {workflowSteps[activeStep].actions.map((action, index) => (
                          <button 
                            key={index} 
                            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-md"
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

      {/* Core Systems Integration */}
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
              Integrates Seamlessly with Your Existing Systems
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No disruption to your current workflow — simply add AI-powered verification and decision automation
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {integrationDetails.map((detail, index) => {
              const Icon = detail.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{detail.title}</h3>
                  <p className="text-gray-600">{detail.description}</p>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 rounded-2xl text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Outcome</h3>
            <p className="text-xl">
              Universities can continue using their existing CRM while adding AI verification and decision automation — reducing manual screening by up to 70%.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Highlights */}
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
              Why This Approach Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unique features that make UnivAegis the ideal solution for university admissions
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyHighlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-lg"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{highlight.title}</h3>
                  <p className="text-gray-600">{highlight.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Optional Additions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mini Video Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Play className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Mini Video Demo</h3>
              </div>
              <div className="rounded-lg overflow-hidden aspect-video bg-black mb-4">
                <video 
                  src={miniVideoDemo} 
                  controls 
                  className="w-full h-full object-contain rounded-lg"
                  poster={howItWorksThumbnail}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-gray-600">
                Showing extraction from a mark sheet → structured table output
              </p>
            </motion.div>
            
            {/* Under the Hood */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Code className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Under the Hood</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">OCR → Data Extraction</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">NLP → Content Analysis</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Risk Scoring → Fraud Detection</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">API Return → CRM Integration</p>
                </div>
              </div>
            </motion.div>
            
            {/* Before vs After */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Timer className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Before vs. After</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Manual Process</h4>
                  <p className="text-gray-600">5 days average processing time</p>
                </div>
                <div className="text-center text-2xl font-bold text-gray-400">→</div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Automated Process</h4>
                  <p className="text-gray-600">1 hour average processing time</p>
                </div>
              </div>
            </motion.div>
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
              Ready to Transform Your Admissions Process?
            </h2>
            <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              UnivAegis automates eligibility, verification, and decisioning — delivering verified, ready-to-review applications directly inside your CRM.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                Book a Demo
              </Link>
              <Link to="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
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
  );
};

export default HowItWorksPage;
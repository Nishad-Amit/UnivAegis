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
  const workflowSteps = [
    {
      id: 1,
      title: "Document Upload & Data Extraction",
      icon: Upload,
      description: "Universities receive academic + financial docs via student's CRM submission (Slate, Meritto, etc.)",
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
      title: "Eligibility & Program Match Engine",
      icon: CheckCircle,
      description: "AI reads student academic data (GPA, course history, IELTS, etc.)",
      details: [
        "Cross-checks with each program's specific requirements (e.g., course prerequisites, grade cutoffs)",
        "Uses rule-based + ML logic to calculate Eligibility Score (0–100)",
        "Categorizes applications: ✅ Qualified / 🔄 Conditional / ❌ Rejected"
      ],
      outcome: "Unqualified or incomplete applications are automatically flagged → Only qualified profiles move forward for verification."
    },
    {
      id: 3,
      title: "AI Verification & Fraud Detection",
      icon: Shield,
      description: "AI verifies documents against trusted data sources (DigiLocker, EduVerifi, AU10TIX, etc.)",
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
      title: "AI Decision Layer (Smart Triage)",
      icon: BarChart3,
      description: "Combines Eligibility Score + Verification Score to classify each application",
      details: [
        "✅ Approved (Ready for human review)",
        "⚠️ Needs Officer Cross-Check (Flagged or borderline)",
        "❌ Denied (Ineligible or fraudulent)"
      ],
      outcome: "Universities instantly see only validated, eligible, and high-quality applications — improving admission turnaround by 60–70%."
    },
    {
      id: 5,
      title: "Automation",
      icon: Zap,
      description: "Eliminate 70% of manual review work with intelligent automation",
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
      title: "Decision Support",
      icon: Award,
      description: "AI-powered insights empower staff to make confident decisions",
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Workflow Visualization */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="space-y-8">
                {workflowSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div 
                      key={step.id}
                      className="flex items-start space-x-4 p-4 rounded-lg"
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-100 text-blue-600">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Workflow Visual Diagram */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Visual Workflow</h3>
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-2xl text-white">
                <div className="flex flex-col items-center space-y-6">
                  {workflowSteps.map((step, index) => (
                    <React.Fragment key={step.id}>
                      <div className="text-center p-4 bg-white/10 rounded-lg w-full">
                        <span className="font-semibold">{step.title}</span>
                      </div>
                      {index < workflowSteps.length - 1 && (
                        <div className="text-2xl">↓</div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Key Outcome</h4>
                <p className="text-gray-700">
                  UnivAegis automates eligibility, verification, and decisioning — delivering verified, ready-to-review applications directly inside your CRM.
                </p>
              </div>
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
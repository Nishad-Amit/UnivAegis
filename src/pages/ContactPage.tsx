import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Users,
  MessageSquare,
  Headphones,
  Menu,
  X,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Use the backend API instead of Firebase
      const response = await fetch('http://localhost:5001/api/contact-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', university: '', message: '' });
      } else {
        throw new Error(result.message || "Failed to submit contact message");
      }
    } catch (err: any) {
      console.error("Error submitting contact message: ", err);
      const errorMessage = err.message || "Sorry, there was an error submitting your message. Please try again.";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoRequest = async () => {
    // For demo requests from the CTA section, we can either:
    // 1. Redirect to the landing page form
    // 2. Show a modal to collect info
    // 3. Or submit a minimal request
    
    // For now, we'll just show an alert
    alert('Thank you for your interest! We will contact you shortly to schedule your demo.');
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "contact@univaegis.com",
      description: "For general inquiries and support"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 98765 43210",
      description: "Monday to Friday, 9AM to 6PM IST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "New Delhi, India",
      description: "Global headquarters and support center"
    }
  ]

  const supportOptions = [
    {
      icon: Users,
      title: "Sales Inquiries",
      description: "Learn about our platform and pricing",
      email: "contact@univaegis.com"
    },
    {
      icon: MessageSquare,
      title: "Technical Support",
      description: "Get help with implementation and integration",
      email: "contact@univaegis.com"
    },
    {
      icon: Headphones,
      title: "Customer Success",
      description: "Ongoing support for existing clients",
      email: "contact@univaegis.com"
    }
  ]

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            className="text-center max-w-5xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Have questions? We're here to help. Reach out to our team for sales inquiries, technical support, or general questions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
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
              Contact Information
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're here to help and answer any questions you might have.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-lg text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {info.title}
                  </h3>
                  <p className="text-xl text-gray-900 mb-2">
                    {info.content}
                  </p>
                  <p className="text-gray-600">
                    {info.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form and Support Options */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="your.email@university.edu"
                  />
                </div>
                
                <div>
                  <label htmlFor="university" className="block text-gray-700 font-medium mb-2">
                    University/Organization
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Your university or organization"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </motion.div>
            
            {/* Support Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                How Can We Help?
              </h2>
              
              <div className="space-y-6">
                {supportOptions.map((option, index) => {
                  const Icon = option.icon
                  return (
                    <div key={index} className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {option.title}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            {option.description}
                          </p>
                          <p className="text-blue-600 font-medium">
                            {option.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-xl text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Support Hours</h3>
                </div>
                <p className="mb-2">Monday to Friday: 9:00 AM - 6:00 PM IST</p>
                <p>Saturday: 10:00 AM - 2:00 PM IST</p>
                <p className="mt-4 text-blue-100">Average response time: 2-4 hours</p>
              </div>
            </motion.div>
          </div>
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
              Ready to Transform Your Admissions Process?
            </h2>
            <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Experience the power of AI-powered admissions automation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleDemoRequest}
                disabled={isSubmitting}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Book a Demo'}
              </button>
              <Link to="/features" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
                View Features
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ContactPage
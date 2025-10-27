import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react'
import univAegisLogo from '../assets/univAegislogo.png'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Company Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <img 
                src={univAegisLogo} 
                alt="UnivAegis Logo" 
                className="h-6 w-auto"
              />
              <span className="text-lg font-bold">UnivAegis</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Complete AI infrastructure for International Universities. Automations, Verification and AI decisioning in single platform.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.linkedin.com/in/univaegis/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://x.com/Univaegis" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/univaegis/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-base mb-3">Quick Links</h3>
            <ul className="space-y-1">
              <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors text-xs">Features</Link></li>
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors text-xs">How It Works</Link></li>
              <li><Link to="/universities" className="text-gray-400 hover:text-white transition-colors text-xs">For Universities</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-base mb-3">Support</h3>
            <ul className="space-y-1">
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-xs">Contact Us</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-xs">About Us</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs">Career</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base mb-3">Contact</h3>
            <div className="space-y-2">
              <p className="text-gray-400 text-xs">support@aiadmissionsbot.com</p>
              <p className="text-gray-400 text-xs">+91 98765 43210</p>
              <p className="text-gray-400 text-xs">New Delhi, India</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-3 text-center">
          <p className="text-gray-400 text-xs">
            © 2025 UnivAegis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
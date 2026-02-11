import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* 1. Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="bg-medical-600 p-1.5 rounded-lg group-hover:bg-medical-700 transition-colors">
                <Pill className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900">Prescriptly</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Your trusted AI-powered pharmacy assistant. We make managing medication simple, safe, and efficient with instant prescription analysis and home delivery.
            </p>
            <div className="flex items-center gap-4">
                <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-medical-600 hover:bg-medical-50 transition-all" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-medical-600 hover:bg-medical-50 transition-all" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-medical-600 hover:bg-medical-50 transition-all" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-slate-500 hover:text-medical-600 text-sm transition-colors block py-1 hover:translate-x-1 duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/medicines" className="text-slate-500 hover:text-medical-600 text-sm transition-colors block py-1 hover:translate-x-1 duration-200">
                  Browse Medicines
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-slate-500 hover:text-medical-600 text-sm transition-colors block py-1 hover:translate-x-1 duration-200">
                  Upload Prescription
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-slate-500 hover:text-medical-600 text-sm transition-colors block py-1 hover:translate-x-1 duration-200">
                  My Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Support & Legal */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-slate-500 hover:text-medical-600 text-sm transition-colors block py-1 hover:translate-x-1 duration-200">
                  Help Center & FAQs
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-500 hover:text-medical-600 text-sm transition-colors block py-1 hover:translate-x-1 duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-500 hover:text-medical-600 text-sm transition-colors block py-1 hover:translate-x-1 duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-slate-500 hover:text-medical-600 text-sm transition-colors block py-1 hover:translate-x-1 duration-200">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-500 text-sm group">
                <Phone className="h-4 w-4 text-medical-600 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <a href="tel:+919876543210" className="hover:text-medical-600 transition-colors block font-medium">+91 98765 43210</a>
                  <span className="text-xs text-slate-400">Mon-Sat, 9am - 9pm</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-slate-500 text-sm group">
                <Mail className="h-4 w-4 text-medical-600 mt-0.5 group-hover:scale-110 transition-transform" />
                <a href="mailto:support@prescriptly.com" className="hover:text-medical-600 transition-colors">support@prescriptly.com</a>
              </li>
              <li className="flex items-start gap-3 text-slate-500 text-sm">
                <MapPin className="h-4 w-4 text-medical-600 mt-0.5 flex-shrink-0" />
                <span>123 Health Avenue, Med Tech Park,<br/>Bangalore, India 560001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">
            © {currentYear} Prescriptly Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-red-400 fill-current animate-pulse" />
            <span>for better health.</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-slate-50 p-4 rounded-lg border border-slate-100">
            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                <span className="font-semibold text-slate-700">Medical Disclaimer:</span> Prescriptly is a technology platform connecting users with licensed pharmacies. We do not provide medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
        </div>
      </div>
    </footer>
  );
};
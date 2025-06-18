import { Heart, Sparkles } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="relative z-10 border-t border-gray-800/50 bg-slate-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                CodeAtik Agent
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Transform your ideas into stunning websites instantly with our
              AI-powered code assistant. Build beautiful, responsive designs
              with HTML, CSS, Tailwind, and JavaScript.
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>for developers worldwide</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/app"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  Launch App
                </Link>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#modes"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  Device Modes
                </a>
              </li>
              <li>
                <a
                  href="#developer"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  About Developer
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/admin-panel"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  Admin
                </a>
              </li>
              <li>
                <a
                  href="#watch-demo"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#contacts"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 CodeAtik Agent. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="/privacy"
              className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="/cookie-policy"
              className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-300"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

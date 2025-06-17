import { Shield, Cookie, Settings, Server } from "lucide-react";
import { Link } from "react-router-dom";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Cookie className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Cookie Policy
            </span>
          </Link>
          <Link 
            to="/" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-slate-700/50">
          <div className="flex items-center justify-center mb-6">
            <Cookie className="w-12 h-12 text-purple-400 mr-4" />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Cookie Policy
              </h1>
              <p className="text-gray-400 text-center">
                Last Updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Shield className="mr-2 w-6 h-6 text-purple-300" />
                1. Introduction
              </h2>
              <p className="text-gray-300 mb-4">
                This Cookie Policy explains how CodeAtik ("we", "us", or "our") uses cookies and similar tracking technologies when you visit our AI website generator application. By using our service, you consent to our use of cookies as described in this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Cookie className="mr-2 w-6 h-6 text-purple-300" />
                2. What Are Cookies?
              </h2>
              <p className="text-gray-300 mb-4">
                Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the site owners.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Settings className="mr-2 w-6 h-6 text-purple-300" />
                3. How We Use Cookies
              </h2>
              <p className="text-gray-300 mb-4">
                Our application uses cookies for several purposes:
              </p>
              <ul className="text-gray-300 list-disc pl-6 mb-4 space-y-2">
                <li><strong>Essential Cookies:</strong> Necessary for the website to function properly (e.g., authentication, security)</li>
                <li><strong>Preference Cookies:</strong> Remember your choices and preferences</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our service</li>
                <li><strong>Performance Cookies:</strong> Improve the performance and user experience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Server className="mr-2 w-6 h-6 text-purple-300" />
                4. Types of Cookies We Use
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700/50">
                  <thead className="bg-slate-800/70">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cookie Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Purpose</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="bg-slate-800/30 divide-y divide-slate-700/50">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-300 font-mono">auth_token</td>
                      <td className="px-4 py-3 text-sm text-gray-300">Maintains your authenticated session</td>
                      <td className="px-4 py-3 text-sm text-gray-300">Session or 7 days (if "Remember Me" is selected)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-300 font-mono">user_prefs</td>
                      <td className="px-4 py-3 text-sm text-gray-300">Stores your UI preferences</td>
                      <td className="px-4 py-3 text-sm text-gray-300">1 year</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-300 font-mono">_ga</td>
                      <td className="px-4 py-3 text-sm text-gray-300">Google Analytics tracking</td>
                      <td className="px-4 py-3 text-sm text-gray-300">2 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Shield className="mr-2 w-6 h-6 text-purple-300" />
                5. Managing Cookies
              </h2>
              <p className="text-gray-300 mb-4">
                You can control and/or delete cookies as you wish. Most web browsers allow some control of cookies through browser settings. However, if you disable essential cookies, some parts of our service may not work properly.
              </p>
              <p className="text-gray-300">
                To learn more about managing cookies, visit <Link to="/privacy" className="text-purple-400 hover:text-purple-300">our Privacy Policy</Link> or the help section of your browser.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Shield className="mr-2 w-6 h-6 text-purple-300" />
                6. Changes to This Policy
              </h2>
              <p className="text-gray-300 mb-4">
                We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Shield className="mr-2 w-6 h-6 text-purple-300" />
                7. Contact Us
              </h2>
              <p className="text-gray-300">
                For questions about this Cookie Policy, please contact us at <Link to="/contact" className="text-purple-400 hover:text-purple-300">privacy@codeatik.com</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-purple-500/30 rounded-full animate-pulse"></div>
      <div 
        className="absolute top-1/3 right-20 w-6 h-6 bg-pink-500/20 rounded-full animate-pulse" 
        style={{ animationDelay: '0.5s' }}
      ></div>
      <div 
        className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-purple-400/40 rounded-full animate-pulse" 
        style={{ animationDelay: '1s' }}
      ></div>
    </div>
  );
};

export default CookiePolicy;
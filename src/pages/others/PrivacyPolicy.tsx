import { Link } from "react-router-dom";
import { Shield, Lock, Server, Database } from "lucide-react";

const PrivacyPolicy = () => {
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
            <Shield className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Privacy Policy
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
            <Lock className="w-12 h-12 text-purple-400 mr-4" />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-gray-400 text-center">
                Last Updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Server className="mr-2 w-6 h-6 text-purple-300" />
                1. Introduction
              </h2>
              <p className="text-gray-300 mb-4">
                CodeAtik Agent ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered website generator service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Database className="mr-2 w-6 h-6 text-purple-300" />
                2. Data We Collect
              </h2>
              <h3 className="text-xl font-medium text-gray-300 mb-2">a. Information You Provide</h3>
              <ul className="text-gray-300 list-disc pl-6 mb-4 space-y-2">
                <li>Account registration details (name, email, etc.)</li>
                <li>Website generation prompts and inputs</li>
                <li>Content you upload or input into the system</li>
                <li>Payment information for premium services</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-300 mb-2">b. Automatically Collected Information</h3>
              <ul className="text-gray-300 list-disc pl-6 mb-4 space-y-2">
                <li>Usage data (features accessed, time spent, etc.)</li>
                <li>Device information (browser type, IP address)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-300 mb-2">c. AI-Specific Data</h3>
              <ul className="text-gray-300 list-disc pl-6 space-y-2">
                <li>Input prompts provided to our AI models</li>
                <li>Generated output content and designs</li>
                <li>User feedback on AI-generated results</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Shield className="mr-2 w-6 h-6 text-purple-300" />
                3. How We Use Your Data
              </h2>
              <ul className="text-gray-300 list-disc pl-6 mb-4 space-y-2">
                <li>To provide and maintain our AI website generation service</li>
                <li>To improve and train our AI models (anonymized where possible)</li>
                <li>To personalize your experience and recommendations</li>
                <li>To communicate with you about service updates</li>
                <li>To detect and prevent fraud or security issues</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Lock className="mr-2 w-6 h-6 text-purple-300" />
                4. Data Sharing and Disclosure
              </h2>
              <p className="text-gray-300 mb-4">
                We may share information in the following circumstances:
              </p>
              <ul className="text-gray-300 list-disc pl-6 mb-4 space-y-2">
                <li><strong>Service Providers:</strong> With vendors who help operate our service (hosting, analytics, etc.)</li>
                <li><strong>AI Model Providers:</strong> With third-party AI platforms necessary for content generation</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger or acquisition</li>
              </ul>
              <p className="text-gray-300">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Shield className="mr-2 w-6 h-6 text-purple-300" />
                5. Data Security
              </h2>
              <p className="text-gray-300 mb-4">
                We implement appropriate technical and organizational measures to protect your data:
              </p>
              <ul className="text-gray-300 list-disc pl-6 mb-4 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and monitoring</li>
                <li>Access controls and authentication measures</li>
              </ul>
              <p className="text-gray-300">
                However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Database className="mr-2 w-6 h-6 text-purple-300" />
                6. AI-Specific Data Handling
              </h2>
              <p className="text-gray-300 mb-4">
                Due to the nature of AI services:
              </p>
              <ul className="text-gray-300 list-disc pl-6 mb-4 space-y-2">
                <li>Input prompts may be used to improve our AI models</li>
                <li>Generated content may be stored to maintain service functionality</li>
                <li>We implement measures to anonymize training data where possible</li>
                <li>You may opt out of data being used for model improvement (contact support)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Shield className="mr-2 w-6 h-6 text-purple-300" />
                7. Your Rights
              </h2>
              <p className="text-gray-300 mb-4">
                Depending on your jurisdiction, you may have rights to:
              </p>
              <ul className="text-gray-300 list-disc pl-6 mb-4 space-y-2">
                <li>Access, correct, or delete your personal data</li>
                <li>Restrict or object to certain processing</li>
                <li>Data portability</li>
                <li>Withdraw consent (where processing is based on consent)</li>
              </ul>
              <p className="text-gray-300">
                To exercise these rights, please contact us at <Link to="/contact" className="text-purple-400 hover:text-purple-300">privacy@codeatik.com</Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Shield className="mr-2 w-6 h-6 text-purple-300" />
                8. Children's Privacy
              </h2>
              <p className="text-gray-300">
                Our service is not directed to children under 13 (or 16 in some jurisdictions). We do not knowingly collect personal information from children.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Shield className="mr-2 w-6 h-6 text-purple-300" />
                9. Changes to This Policy
              </h2>
              <p className="text-gray-300 mb-4">
                We may update this Privacy Policy periodically. We will notify you of significant changes through the Service or via email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Shield className="mr-2 w-6 h-6 text-purple-300" />
                10. Contact Us
              </h2>
              <p className="text-gray-300">
                For questions about this Privacy Policy, please contact our Data Protection Officer at <Link to="/contact" className="text-purple-400 hover:text-purple-300">privacy@codeatik.com</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-purple-500/30 rounded-full animate-pulse"></div>
      <div 
        className="absolute top-1/3 right-20 w-6 h-6 bg-pink-500/20 rounded-full animate-pulse" 
        style={{ animationDelay: '1.5s' }}
      ></div>
      <div 
        className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-purple-400/40 rounded-full animate-pulse" 
        style={{ animationDelay: '2s' }}
      ></div>
    </div>
  );
};

export default PrivacyPolicy;
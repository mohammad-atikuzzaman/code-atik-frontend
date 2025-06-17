import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CodeAtik Agent
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 text-center">
            Terms of Service
          </h1>
          <p className="text-gray-400 mb-8 text-center">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-300 mb-4">
                By accessing or using the CodeAtik Agent AI Website Generator
                ("Service"), you agree to be bound by these Terms of Service
                ("Terms"). If you do not agree to all of these Terms, do not use
                the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                2. Description of Service
              </h2>
              <p className="text-gray-300 mb-4">
                CodeAtik Agent provides an AI-powered website generation service
                that automatically creates website content, designs, and layouts
                based on user inputs. The Service may include, but is not
                limited to:
              </p>
              <ul className="text-gray-300 list-disc pl-6 mb-4 space-y-2">
                <li>AI-generated website templates</li>
                <li>Automated content creation</li>
                <li>Design suggestions and layout generation</li>
                <li>Code generation and export functionality</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                3. AI-Generated Content
              </h2>
              <p className="text-gray-300 mb-4">
                The Service utilizes artificial intelligence to generate website
                content and designs. You acknowledge that:
              </p>
              <ul className="text-gray-300 list-disc pl-6 mb-4 space-y-2">
                <li>
                  All AI-generated content is provided "as is" without
                  warranties of accuracy
                </li>
                <li>
                  You are responsible for reviewing and verifying any
                  AI-generated content before use
                </li>
                <li>
                  The Service may produce unexpected or inaccurate results
                </li>
                <li>You retain all ownership of your input data and prompts</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                4. User Responsibilities
              </h2>
              <p className="text-gray-300 mb-4">
                When using the Service, you agree not to:
              </p>
              <ul className="text-gray-300 list-disc pl-6 mb-4 space-y-2">
                <li>Generate illegal, harmful, or offensive content</li>
                <li>Use the Service to violate intellectual property rights</li>
                <li>Attempt to reverse engineer or misuse the AI models</li>
                <li>
                  Use automated systems to excessively request content
                  generation
                </li>
                <li>Impersonate others or provide false information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-gray-300 mb-4">
                The Service and its original content, features, and
                functionality are owned by CodeAtik and are protected by
                international copyright, trademark, and other intellectual
                property laws.
              </p>
              <p className="text-gray-300 mb-4">
                For content generated by the AI:
              </p>
              <ul className="text-gray-300 list-disc pl-6 mb-4 space-y-2">
                <li>
                  You retain ownership of websites you create using the Service
                </li>
                <li>
                  You grant CodeAtik a license to use generated content for
                  improving our services
                </li>
                <li>
                  AI-generated content may not be eligible for copyright
                  protection in some jurisdictions
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                6. Data Privacy
              </h2>
              <p className="text-gray-300 mb-4">
                Your use of the Service is subject to our Privacy Policy. By
                using the Service, you consent to:
              </p>
              <ul className="text-gray-300 list-disc pl-6 mb-4 space-y-2">
                <li>
                  Collection and processing of your input data to generate
                  outputs
                </li>
                <li>
                  Storage of your generated content for service functionality
                </li>
                <li>Use of anonymized data to improve our AI models</li>
              </ul>
              <p className="text-gray-300">
                We implement reasonable security measures but cannot guarantee
                absolute data security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-gray-300 mb-4">
                CodeAtik shall not be liable for any indirect, incidental,
                special, consequential or punitive damages resulting from:
              </p>
              <ul className="text-gray-300 list-disc pl-6 mb-4 space-y-2">
                <li>Use or inability to use the Service</li>
                <li>Any AI-generated content or its accuracy</li>
                <li>Unauthorized access to or alteration of your data</li>
                <li>Any third-party conduct related to the Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                8. Modifications to Terms
              </h2>
              <p className="text-gray-300 mb-4">
                We reserve the right to modify these Terms at any time. We will
                provide notice of significant changes through the Service or via
                email. Your continued use after changes constitutes acceptance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                9. Governing Law
              </h2>
              <p className="text-gray-300">
                These Terms shall be governed by the laws of [Your Jurisdiction]
                without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                10. Contact Information
              </h2>
              <p className="text-gray-300">
                For questions about these Terms, please contact us at{" "}
                <a
                  href="mailto:akash203037@gmail.com"
                  className="text-purple-400 hover:text-purple-300"
                >
                  akash203037@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-purple-500/30 rounded-full animate-pulse"></div>
      <div
        className="absolute top-1/3 right-20 w-6 h-6 bg-pink-500/20 rounded-full animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-purple-400/40 rounded-full animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
};

export default TermsOfService;

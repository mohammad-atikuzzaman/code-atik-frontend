import {
  HelpCircle,
  Code,
  Palette,
  Cpu,
  Zap,
  Shield,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqs = [
    {
      question: "What technologies does this website generator support?",
      answer:
        "Our generator creates websites using modern technologies including HTML5, CSS3, JavaScript (ES6+), and Tailwind CSS for styling. You can also export React components if needed.",
      icon: <Code className="w-5 h-5 text-purple-400" />,
    },
    {
      question: "Do I need coding experience to use this tool?",
      answer:
        "No coding experience is required! Our intuitive interface allows anyone to create beautiful websites. However, if you do know how to code, you'll have access to advanced customization options.",
      icon: <HelpCircle className="w-5 h-5 text-purple-400" />,
    },
    {
      question: "Can I customize the color scheme of my generated website?",
      answer:
        "Absolutely! You can choose from our pre-designed color palettes or create your own custom color scheme using our color picker tool. All colors are automatically applied throughout your site.",
      icon: <Palette className="w-5 h-5 text-purple-400" />,
    },
    {
      question: "How does the AI-powered design work?",
      answer:
        "Our AI analyzes thousands of design patterns and best practices to suggest optimal layouts, color combinations, and typography for your specific content and purpose.",
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
    },
    {
      question: "Can I export the code to use elsewhere?",
      answer:
        "Yes! You can download the complete source code (HTML, CSS, JS) or export it directly to GitHub. We also provide Tailwind CSS configuration files.",
      icon: <Zap className="w-5 h-5 text-purple-400" />,
    },
    {
      question: "Is my website content secure and private?",
      answer:
        "We take security seriously. Your content is encrypted and stored securely. You maintain full ownership of all your designs and content.",
      icon: <Shield className="w-5 h-5 text-purple-400" />,
    },
  ];

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
            <Cpu className="w-8 h-8 text-purple-400" />
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
          <div className="flex items-center justify-center mb-6">
            <HelpCircle className="w-12 h-12 text-purple-400 mr-4" />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h1>
              <p className="text-gray-400 text-center">
                Everything you need to know about our website generator
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group bg-slate-800/30 hover:bg-slate-800/50 rounded-xl p-6 transition-all duration-300 border border-slate-700/50 hover:border-purple-500/30"
              >
                <div className="flex items-start space-x-4">
                  <div className="mt-1">{faq.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {faq.question}
                    </h3>
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Help Section */}
          <div className="mt-12 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-700/30">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Mail className="w-8 h-8 text-purple-300 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Still have questions?
                  </h3>
                  <p className="text-gray-300">We're here to help!</p>
                </div>
              </div>
              <Link
                to="/#contacts"
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                <span>Contact Support</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-purple-500/30 rounded-full animate-pulse"></div>
      <div
        className="absolute top-1/3 right-20 w-6 h-6 bg-pink-500/20 rounded-full animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-purple-400/40 rounded-full animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
    </div>
  );
};

export default FAQ;

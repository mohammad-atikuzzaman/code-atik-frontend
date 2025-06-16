import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Zap,
  Sparkles,
  Download,
  Palette,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Github,
  Linkedin,
  Heart,
  Facebook,
} from "lucide-react";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "AI-Powered Code Generation",
      description: "Generate clean, modern websites with just a simple prompt",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Tailwind CSS Integration",
      description:
        "Beautiful, responsive designs using the latest Tailwind CSS",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Preview",
      description: "See your website come to life in real-time as you type",
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "One-Click Download",
      description: "Download your complete website as a ready-to-use ZIP file",
    },
  ];

  const modes = [
    {
      icon: <Monitor className="w-12 h-12" />,
      title: "Desktop Mode",
      description:
        "Create stunning desktop experiences with full-screen layouts and advanced interactions",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Tablet className="w-12 h-12" />,
      title: "Tablet Mode",
      description:
        "Optimize for tablet devices with touch-friendly interfaces and responsive grids",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "Mobile Mode",
      description:
        "Build mobile-first designs that work perfectly on smartphones and small screens",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CodeAtik Agent
            </span>
          </div>
          <Link
            to="/app"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div
            className={`text-center transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              Build Websites
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                with AI Magic
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into stunning websites instantly. Our AI
              assistant creates beautiful, responsive designs with HTML, CSS,
              Tailwind, and JavaScript.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/app"
                className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center space-x-2"
              >
                <span>Start Creating</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#watch-demo"
                className="px-8 py-4 rounded-full border-2 border-gray-600 hover:border-purple-400 transition-all duration-300 hover:bg-purple-900/20 text-lg font-semibold"
              >
                Watch Demo
              </a>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
          <div
            className={`transition-all duration-1000 delay-500 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Powerful Features
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    isLoaded ? "animate-fade-in" : ""
                  }`}
                  style={{ animationDelay: `${index * 100 + 800}ms` }}
                >
                  <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modes Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
          <div
            className={`transition-all duration-1000 delay-700 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Multi-Device Modes
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {modes.map((mode, index) => (
                <div
                  key={index}
                  className={`group relative p-8 rounded-3xl bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-transparent transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden ${
                    isLoaded ? "animate-scale-in" : ""
                  }`}
                  style={{ animationDelay: `${index * 150 + 1200}ms` }}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className={`text-white mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r ${mode.gradient} p-4 rounded-2xl w-fit`}
                    >
                      {mode.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                      {mode.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      {mode.description}
                    </p>
                  </div>

                  {/* Decorative elements */}
                  <div
                    className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${mode.gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>
                  <div
                    className={`absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br ${mode.gradient} rounded-full opacity-5 group-hover:opacity-15 transition-opacity duration-500`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Developer Section */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
          <div
            className={`transition-all duration-1000 delay-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Meet the Developer
            </h2>

            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 md:p-12 text-center hover:border-purple-500/50 transition-all duration-500">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden">
                <img src="https://i.ibb.co/qMNR2Fvt/IMG-20220704-201428.png" />
              </div>

              <h3 className="text-2xl font-bold mb-4 text-white">
                Passionate AI Developer
              </h3>

              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                Dedicated to creating innovative AI-powered tools that make web
                development accessible to everyone. Combining cutting-edge
                artificial intelligence with modern web technologies to
                transform ideas into reality.
              </p>

              <div className="flex justify-center space-x-6">
                <a
                  href="https://github.com/mohammad-atikuzzaman"
                  className="p-3 bg-gray-800/50 rounded-full hover:bg-purple-600/20 transition-colors duration-300 hover:scale-110 transform"
                >
                  <Github className="w-6 h-6 text-gray-300 hover:text-white" />
                </a>
                <a
                  href="https://www.facebook.com/mohammadakash20"
                  className="p-3 bg-gray-800/50 rounded-full hover:bg-purple-600/20 transition-colors duration-300 hover:scale-110 transform"
                >
                  <Facebook className="w-6 h-6 text-gray-300 hover:text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/in/matikuzzaman/"
                  className="p-3 bg-gray-800/50 rounded-full hover:bg-purple-600/20 transition-colors duration-300 hover:scale-110 transform"
                >
                  <Linkedin className="w-6 h-6 text-gray-300 hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Watch Demo section */}

        <div
          id="watch-demo"
          className="relative z-10 max-w-4xl mx-auto px-6 pb-20"
        >
          <div
            className={`rounded-3xl overflow-hidden border border-purple-500/20 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm shadow-2xl transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative pt-[56.25%]">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                poster="/poster.png"
              >
                <source src="/demo.mp4" type="video/mp4" />
                <source src="/demo.mp4" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Optional caption */}
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                See CodeAtik Agent in Action
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Watch how our platform helps developers build stunning websites
                in record time.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
          <div
            className={`text-center p-12 rounded-3xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 transition-all duration-1000 delay-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Globe className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Create Amazing Websites?
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Join thousands of developers who are already building with
              CodeAtik Agent
            </p>
            <Link
              to="/app"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
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
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
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
                href="#"
                className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

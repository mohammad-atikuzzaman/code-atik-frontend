
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
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
            <Sparkles className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CodeCraft AI
            </span>
          </Link>
          <Link 
            to="/" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Go Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="text-center px-6 max-w-2xl mx-auto">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
              404
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-300 mb-2">
              Oops! The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <p className="text-gray-400">
              Route: <code className="bg-gray-800 px-2 py-1 rounded text-purple-300">{location.pathname}</code>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/" 
              className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
            
            <Link 
              to="/app" 
              className="px-8 py-4 rounded-full border-2 border-gray-600 hover:border-purple-400 transition-all duration-300 hover:bg-purple-900/20 text-lg font-semibold flex items-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Launch App</span>
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center space-x-8 opacity-60">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <div 
              className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" 
              style={{ animationDelay: '0.5s' }}
            ></div>
            <div 
              className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" 
              style={{ animationDelay: '1s' }}
            ></div>
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

export default NotFound;

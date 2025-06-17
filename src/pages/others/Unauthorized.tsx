import { useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowLeft, Home, Lock } from "lucide-react";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-red-500/30">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-500/20 mb-6">
            <ShieldAlert className="h-10 w-10 text-red-400" />
          </div>

          {/* Header */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Unauthorized Access
          </h1>
          
          {/* Divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full mb-6"></div>

          {/* Message */}
          <div className="mb-8">
            <p className="text-xl text-gray-300 mb-4">
              You don't have permission to access this page.
            </p>
            <div className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-800 border border-slate-700">
              <Lock className="h-5 w-5 text-red-400 mr-2" />
              <span className="text-gray-400">Required permissions not granted</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center justify-center px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
            
            <button
              onClick={() => navigate("/")}
              className="group flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              <Home className="h-5 w-5 mr-2" />
              Return Home
            </button>
          </div>

          {/* Contact Support */}
          <div className="mt-8 text-sm text-gray-500">
            <p>Need access? Contact your administrator or</p>
            <button 
              onClick={() => navigate("/contact")}
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              contact support
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-red-500/30 rounded-full animate-pulse"></div>
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

export default Unauthorized;
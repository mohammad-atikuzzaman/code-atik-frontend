import { Sparkles } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const IndexNav = () => {
  return (
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
  );
};

export default IndexNav;

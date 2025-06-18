import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const HeroSection = ({isLoaded}) => {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
      <div
        className={`text-center transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
  );
};

export default HeroSection;

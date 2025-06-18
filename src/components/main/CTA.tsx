import { ArrowRight, Globe } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const CTA = ({isLoaded}) => {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
      <div
        className={`text-center p-12 rounded-3xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 transition-all duration-1000 delay-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Globe className="w-16 h-16 mx-auto mb-6 text-purple-400" />
        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Ready to Create Amazing Websites?
        </h3>
        <p className="text-gray-300 mb-8 text-lg">
          Join thousands of developers who are already building with CodeAtik
          Agent
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
  );
};

export default CTA;

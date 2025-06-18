import { Code, Download, Palette, Zap } from "lucide-react";
import React from "react";
const features = [
  {
    icon: <Code className="w-8 h-8" />,
    title: "AI-Powered Code Generation",
    description: "Generate clean, modern websites with just a simple prompt",
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Tailwind CSS Integration",
    description: "Beautiful, responsive designs using the latest Tailwind CSS",
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
const FeaturesSection = ({ isLoaded }) => {
  return (
    <div id="features" className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
      <div
        className={`transition-all duration-1000 delay-500 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
  );
};

export default FeaturesSection;

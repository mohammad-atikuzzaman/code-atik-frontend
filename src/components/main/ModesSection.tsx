import { Monitor, Smartphone, Tablet } from "lucide-react";
import React from "react";
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
const ModesSection = ({ isLoaded }) => {
  return (
    <div id="modes" className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
      <div
        className={`transition-all duration-1000 delay-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
  );
};

export default ModesSection;

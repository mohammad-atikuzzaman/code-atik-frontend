import { Facebook, Github, Linkedin } from "lucide-react";
import React from "react";

const DeveloperSection = ({isLoaded}) => {
  return (
    <div id="developer" className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
      <div
        className={`transition-all duration-1000 delay-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
            artificial intelligence with modern web technologies to transform
            ideas into reality.
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
  );
};

export default DeveloperSection;

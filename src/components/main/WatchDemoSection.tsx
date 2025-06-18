import React from "react";

const WatchDemoSection = ({isLoaded}) => {
  return (
    <div id="watch-demo" className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
      <div
        className={`rounded-3xl overflow-hidden border border-purple-500/20 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm shadow-2xl transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
            Watch how our platform helps developers build stunning websites in
            record time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WatchDemoSection;

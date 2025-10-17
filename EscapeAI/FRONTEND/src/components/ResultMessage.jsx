import React, { useState, useEffect } from "react";
import { Scroll } from "lucide-react";

const ResultMessage = ({ message, onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!message) {
      setIsVisible(false);
      return;
    }
    setIsVisible(true); // Show the message

    // Hide after 4 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    // Call onComplete after fade-out animation (500ms)
    const completeTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 3500); // 4000ms display + 500ms fade-out

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(completeTimer);
    };
  }, [message, onComplete]);

  if (!message) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundColor: isVisible ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0)",
      }}
    >
      {/* Flying Paper Card */}
      <div
        className={`relative max-w-2xl mx-4 p-8 bg-gradient-to-r from-[#0a0d14]/95 to-[#0c101c]/95 
              border-4 border-orange-400/80 rounded-lg shadow-2xl bg-opacity-95
              transform ${isVisible ? "animate-fly-in" : "animate-fly-out"}`}
      >
        {/* Decorative Scroll Icon */}
        <div
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 
                        bg-orange-500 rounded-full p-3 border-4 border-orange-300
                        shadow-[0_0_20px_rgba(255,140,0,0.6)]"
        >
          <Scroll className="w-8 h-8 text-white" />
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-orange-600/50"></div>
        <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-orange-600/50"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-orange-600/50"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-orange-600/50"></div>

        {/* Message Content */}
        <div className="mt-4 text-center">
          <div className="inline-block px-4 py-1 mb-4 bg-orange-500/20 border border-orange-400/50 rounded-full">
            <span className="text-xs font-bold text-orange-800 tracking-wider">
              OUTCOME
            </span>
          </div>

          <p className="text-lg md:text-xl text-gray-400 font-serif leading-relaxed tracking-wide">
            {message}
          </p>
        </div>

        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-50 rounded-lg pointer-events-none"></div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fly-in {
          0% {
            transform: translateX(-100vw) translateY(-50vh) rotate(-45deg) scale(0.3);
            opacity: 0;
          }
          50% {
            transform: translateX(10px) translateY(-10px) rotate(5deg) scale(1.05);
          }
          70% {
            transform: translateX(-5px) translateY(5px) rotate(-2deg) scale(0.98);
          }
          100% {
            transform: translateX(0) translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes fly-out {
          0% {
            transform: translateX(0) translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(100vw) translateY(-50vh) rotate(45deg) scale(0.3);
            opacity: 0;
          }
        }

        .animate-fly-in {
          animation: fly-in 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-fly-out {
          animation: fly-out 0.6s cubic-bezier(0.6, -0.28, 0.74, 0.05) forwards;
        }
      `}</style>
    </div>
  );
};

export default ResultMessage;

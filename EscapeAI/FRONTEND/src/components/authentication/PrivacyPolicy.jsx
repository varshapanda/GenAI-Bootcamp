import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[url('assets/brick.jpg')] bg-cover bg-center relative overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {/* Grid overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-cyan-500/5"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Glowing border container */}
          <div className="relative">
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-xl opacity-0 hover:opacity-100 blur-xl transition-opacity duration-300"></div>
            
            {/* Main card */}
            <div className="relative bg-slate-950/80 backdrop-blur-xl border border-orange-500/30 rounded-xl p-8 space-y-6 shadow-2xl">
              {/* Close button */}
              <button 
                onClick={() => navigate(-1)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                <X className="w-5 h-5 text-orange-400" />
              </button>

              {/* Header */}
              <div className="space-y-3">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
                  Privacy Policy
                </h1>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Last updated: October 27, 2025
                </p>
              </div>

              {/* Content sections */}
              <div className="space-y-6 text-slate-300">
                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-orange-400">Information We Collect</h2>
                  <p className="text-sm leading-relaxed">
                    When you use EscapeAI, we collect certain information to provide and improve our services:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-slate-400">
                    <li>Google account information for authentication</li>
                    <li>Game progress and session data</li>
                    <li>User preferences and settings</li>
                    <li>Device and browser information</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-orange-400">How We Use Your Information</h2>
                  <p className="text-sm leading-relaxed">
                    We use the collected information to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-slate-400">
                    <li>Provide and maintain EscapeAI services</li>
                    <li>Improve user experience and game content</li>
                    <li>Track progress and save game states</li>
                    <li>Ensure security and prevent fraud</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-orange-400">Data Security</h2>
                  <p className="text-sm leading-relaxed">
                    We implement industry-standard security measures to protect your personal information. 
                    Your data is encrypted during transmission and storage. Access to user data is strictly 
                    limited to authorized personnel.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-orange-400">Third-Party Services</h2>
                  <p className="text-sm leading-relaxed">
                    EscapeAI uses Google Authentication for user login. Please refer to Google's privacy 
                    policy for information about how they handle your data during the authentication process.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-orange-400">Contact Us</h2>
                  <p className="text-sm leading-relaxed">
                    If you have any questions about our Privacy Policy, please contact us at:
                    <br />
                    <span className="text-orange-400">varshavpanda006@gmail.com</span>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated lights */}
      <div className="absolute top-10 right-20 w-40 h-40 bg-orange-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-red-500 rounded-full blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default PrivacyPolicy;
import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
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
                  Terms of Service
                </h1>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Last updated: October 27, 2025
                </p>
              </div>

              {/* Content sections */}
              <div className="space-y-6 text-slate-300">
                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-orange-400">Acceptance of Terms</h2>
                  <p className="text-sm leading-relaxed">
                    By accessing and using EscapeAI, you agree to be bound by these Terms of Service 
                    and our Privacy Policy. If you do not agree to these terms, please do not use our services.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-orange-400">User Accounts</h2>
                  <ul className="list-disc list-inside space-y-2 text-sm text-slate-400">
                    <li>You must use a valid Google account to access EscapeAI</li>
                    <li>You are responsible for maintaining the security of your account</li>
                    <li>You must be at least 13 years old to use our services</li>
                    <li>You agree not to share your account credentials with others</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-orange-400">Game Rules and Conduct</h2>
                  <p className="text-sm leading-relaxed">
                    When using EscapeAI, you agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-slate-400">
                    <li>Play fairly and not exploit any bugs or glitches</li>
                    <li>Respect other players and maintain appropriate conduct</li>
                    <li>Not use automated tools or bots</li>
                    <li>Not attempt to bypass security measures</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-orange-400">Intellectual Property</h2>
                  <p className="text-sm leading-relaxed">
                    All content in EscapeAI, including but not limited to text, graphics, logos, 
                    images, audio clips, digital downloads, and data compilations, is the property 
                    of EscapeAI or its content suppliers and is protected by international copyright laws.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-orange-400">Limitation of Liability</h2>
                  <p className="text-sm leading-relaxed">
                    EscapeAI and its developers shall not be liable for any indirect, incidental, 
                    special, consequential, or punitive damages resulting from your use or inability 
                    to use the service.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-orange-400">Changes to Terms</h2>
                  <p className="text-sm leading-relaxed">
                    We reserve the right to modify these terms at any time. We will notify users 
                    of any material changes via email or through the application.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xl font-semibold text-orange-400">Contact</h2>
                  <p className="text-sm leading-relaxed">
                    For any questions regarding these Terms of Service, please contact us at:
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

export default Terms;
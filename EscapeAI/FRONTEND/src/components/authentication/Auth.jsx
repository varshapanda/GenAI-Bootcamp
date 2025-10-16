import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "../../api/axios";
import { Chrome, ArrowRight } from "lucide-react";

const GoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async (credentialResponse) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/auth/login", {
        access_token: credentialResponse.access_token,
      });

      const data = response.data;
      const { accessToken, user } = data;
      
      localStorage.setItem("accessToken", accessToken);
      console.log("Login successful:", user);
      
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: () => {
      setError("Google authentication failed");
    },
  });

  return (
    <div className="min-h-screen w-full bg-[url('assets/brick.jpg')] bg-cover bg-center relative overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {/* Grid overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-cyan-500/5"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Glowing border container */}
          <div className="relative">
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-xl opacity-0 hover:opacity-100 blur-xl transition-opacity duration-300"></div>
            
            {/* Main card */}
            <div className="relative bg-slate-950/80 backdrop-blur-xl border border-orange-500/30 rounded-xl p-8 space-y-8 shadow-2xl">
              {/* Header */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {/* <Zap className="w-6 h-6 text-orange-500 animate-pulse" /> */}
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
                    EscapeAI
                  </h1>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Step into the digital frontier. Connect, create, and conquer.
                </p>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-950/40 border border-red-500/50 rounded-lg p-4 flex items-gap-3 animate-pulse">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Auth button */}
              <button
                onClick={() => googleLogin()}
                disabled={loading}
                className="w-full group relative overflow-hidden rounded-lg bg-gradient-to-r from-orange-600 to-red-600 p-0.5 transition-all duration-300 hover:from-orange-500 hover:to-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="relative bg-slate-950 rounded-lg px-6 py-3 flex items-center justify-center gap-3 transition-all duration-200 group-hover:bg-slate-900">
                  {!loading ? (
                    <>
                      <Chrome className="w-5 h-5 text-orange-400 group-hover:text-orange-300 transition-colors" />
                      <span className="font-semibold text-white group-hover:text-orange-100 transition-colors">
                        Continue with Google
                      </span>
                      <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                    </>
                  ) : (
                    <>
                      <div className="w-5 h-5 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin"></div>
                      <span className="font-semibold text-white">Authenticating...</span>
                    </>
                  )}
                </div>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
                <span className="text-xs text-slate-500 uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
              </div>

              {/* Info */}
              <div className="space-y-2 text-center text-xs text-slate-400">
                <p className="leading-relaxed">
                  By continuing, you agree to our <span className="text-orange-400 hover:text-orange-300 cursor-pointer transition-colors">Terms</span> and <span className="text-orange-400 hover:text-orange-300 cursor-pointer transition-colors">Privacy Policy</span>
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
            </div>
          </div>

          {/* Footer text */}
          <p className="text-center text-slate-500 text-xs mt-6">
            Secure authentication powered by Google
          </p>
        </div>
      </div>

      {/* Animated lights */}
      <div className="absolute top-10 right-20 w-40 h-40 bg-orange-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-red-500 rounded-full blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default GoogleAuth;
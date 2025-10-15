import React, { useState } from "react";
import {
  Play,
  Zap,
  ArrowRight,
  Flame,
  Shield,
  Compass,
  Brain,
  Lightbulb,
  Target,
  Lock,
} from "lucide-react";

export default function Landing() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const scenarios = [
    {
      id: 1,
      name: "Medieval Dungeon",
      icon: Shield,
      desc: "Ancient stone walls hide forgotten secrets",
    },
    {
      id: 2,
      name: "Cyber Prison",
      icon: Zap,
      desc: "Break free from digital constraints",
    },
    {
      id: 3,
      name: "Haunted Mansion",
      icon: Compass,
      desc: "Uncover mysteries in the shadows",
    },
    {
      id: 4,
      name: "Futuristic Lab",
      icon: Flame,
      desc: "Escape before time runs out",
    },
    {
      id: 5,
      name: "Lost Temple",
      icon: ArrowRight,
      desc: "Discover what lies within",
    },
  ];

  const features = [
    {
      icon: Brain,
      title: "Infinite Variations",
      desc: "Every game is completely different. No two escapes are the same.",
    },
    {
      icon: Lightbulb,
      title: "Smart Hints",
      desc: "Stuck? Get hints that guide you without spoiling the solution.",
    },
    {
      icon: Target,
      title: "Adaptive Puzzles",
      desc: "Challenges that learn from you and adjust difficulty on the fly.",
    },
    {
      icon: Lock,
      title: "Your Choices Matter",
      desc: "Every decision shapes your story and leads to different endings.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[url('assets/robo3.jpg')] bg-cover bg-center relative overflow-hidden">
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-transparent to-red-600/10 opacity-40"></div>

      {/* Navigation */}
      <nav className="relative z-20 px-8 py-6 flex items-center justify-between border-b border-orange-500/20">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-3xl font-black tracking-widest bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
              ESCAPEAI
            </h1>
            <p className="text-xs text-gray-500 tracking-widest">
              Dynamic Escape Experience
            </p>
          </div>
        </div>
        <div className="text-xs text-gray-400 tracking-widest uppercase">
          Digital Frontier
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="space-y-8">
            {/* Main Title */}
            <div className="text-center space-y-6">
              <div className="inline-block">
                <div className="h-1.5 w-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-6"></div>
              </div>
              <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-tight text-white">
                Every Escape
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
                  Is a New Adventure
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                Welcome to a world where puzzles are never the same twice. Solve
                mind-bending challenges, uncover hidden clues, and race against
                time. Every choice you make changes everything.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center pt-4">
              <a
                href="/auth"
                className="inline-block group relative overflow-hidden rounded-lg bg-gradient-to-r from-orange-600 to-red-600 p-0.5 transition-all duration-300 hover:from-orange-500 hover:to-red-500 shadow-lg hover:shadow-orange-500/50"
              >
                <div className="relative bg-black rounded-lg px-10 py-5 flex items-center justify-center gap-3 transition-all duration-200 group-hover:bg-black/80">
                  <Play className="w-6 h-6 text-orange-400 group-hover:text-orange-300 transition-colors" />
                  <span className="font-bold text-white group-hover:text-orange-100 transition-colors text-lg">
                    Enter Now
                  </span>
                  <ArrowRight className="w-6 h-6 text-orange-400 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black text-white mb-3">
              Why You'll Love It
            </h3>
            <p className="text-gray-400">Experience escape rooms reimagined</p>
          </div>

          <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 hover:border-orange-500/60 p-0.5 transition-all duration-300"
                >
                  <div className="relative bg-slate-950/80 backdrop-blur rounded-lg p-6 space-y-4 group-hover:bg-slate-950 transition-all duration-200">
                    <Icon className="w-8 h-8 text-orange-400 group-hover:text-orange-300 group-hover:scale-110 transition-all" />
                    <div>
                      <h4 className="font-bold text-white mb-2 text-lg">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                    <div className="h-0.5 w-0 bg-gradient-to-r from-orange-400 to-red-400 group-hover:w-12 transition-all duration-300"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Game Details Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black text-white mb-3">
              How It Works
            </h3>
            <p className="text-gray-400">Master the art of escape</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-orange-600/10 to-transparent border border-orange-500/30 p-8 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                <span className="text-white font-black text-lg">1</span>
              </div>
              <h4 className="text-xl font-bold text-white">
                Choose Your Scenario
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Pick from multiple worlds - each with its own atmosphere, story,
                and challenges. Medieval dungeons, cyber prisons, haunted
                mansions, and more.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-orange-600/10 to-transparent border border-orange-500/30 p-8 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                <span className="text-white font-black text-lg">2</span>
              </div>
              <h4 className="text-xl font-bold text-white">Solve & Discover</h4>
              <p className="text-gray-300 leading-relaxed">
                Explore interactive environments, find hidden clues, and solve
                puzzles that adapt to your skill level. Every playthrough is
                completely unique.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-orange-600/10 to-transparent border border-orange-500/30 p-8 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                <span className="text-white font-black text-lg">3</span>
              </div>
              <h4 className="text-xl font-bold text-white">Escape or Fail</h4>
              <p className="text-gray-300 leading-relaxed">
                Race against time, make critical choices, and discover multiple
                endings. Your decisions shape the story and determine your fate.
              </p>
            </div>
          </div>
        </div>

        {/* Scenarios Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black text-white mb-3">
              Choose Your Path
            </h3>
            <p className="text-gray-400">
              Countless unique worlds await your escape
            </p>
          </div>

          <div className="grid md:grid-cols-5 grid-cols-1 gap-4">
            {scenarios.map((scenario, idx) => {
              const Icon = scenario.icon;
              return (
                <div
                  key={scenario.id}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-orange-600 to-red-600 p-0.5 transition-all duration-300 h-full hover:shadow-lg hover:shadow-orange-500/50">
                    <div className="relative bg-slate-950/90 backdrop-blur rounded-lg p-6 h-full flex flex-col items-center justify-center text-center space-y-4 group-hover:bg-slate-900 transition-all duration-200">
                      <Icon className="w-10 h-10 text-orange-400 group-hover:text-orange-300 group-hover:scale-110 transition-all" />
                      <h3 className="font-bold text-white text-base leading-tight">
                        {scenario.name}
                      </h3>
                      <p className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 leading-tight">
                        {scenario.desc}
                      </p>
                      <div className="h-0.5 w-0 bg-gradient-to-r from-orange-400 to-red-400 group-hover:w-8 transition-all duration-300 mt-2"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-4 grid-cols-2 gap-6 text-center">
            <div className="space-y-3">
              <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                ∞
              </div>
              <p className="text-gray-400 text-sm">Unique Scenarios</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                10+
              </div>
              <p className="text-gray-400 text-sm">Multiple Endings</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                AI
              </div>
              <p className="text-gray-400 text-sm">Smart Learning</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                24/7
              </div>
              <p className="text-gray-400 text-sm">Always Available</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/40 p-12 text-center space-y-6">
            <h4 className="text-3xl font-black text-white">Ready to Escape?</h4>
            <p className="text-gray-300 text-lg">
              Your first escape awaits. Enter the unknown and prove you have
              what it takes.
            </p>
            <a
              href="/auth"
              className="inline-block group relative overflow-hidden rounded-lg bg-gradient-to-r from-orange-600 to-red-600 p-0.5 transition-all duration-300 hover:from-orange-500 hover:to-red-500"
            >
              <div className="relative bg-black rounded-lg px-8 py-4 flex items-center justify-center gap-3 transition-all duration-200 group-hover:bg-black/80">
                <Play className="w-5 h-5 text-orange-400" />
                <span className="font-bold text-white text-base">
                  Start Your Adventure
                </span>
                <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-all" />
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-6xl mx-auto text-center space-y-4 pt-8 border-t border-orange-500/20">
          <p className="text-sm text-gray-400">Created by Team EscapeAI</p>
          <p className="text-xs text-gray-600">
            Nidhish • Varsha • Yash • Shravya • Karthik
          </p>
        </div>
      </div>

      {/* Ambient lights */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-5 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl opacity-5 pointer-events-none"></div>
    </div>
  );
}
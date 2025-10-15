import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const [showFeatures, setShowFeatures] = useState(true); // toggle features

  return (
    <div
      className="relative min-h-screen flex flex-col justify-center items-center text-white px-8 bg-[url('assets/robo3.jpg')] bg-cover bg-center"
    >

      {/* Features Toggle Button */}
      <button
        className="absolute top-16 right-8 px-4 py-2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white rounded-lg z-20 shadow-lg"
        onClick={() => setShowFeatures(!showFeatures)}
      >
        {showFeatures ? "Hide Features" : "Show Features"}
      </button>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl space-y-8 animate-fadeIn">
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-7xl font-bold tracking-widest animate-flicker">
            ESCAPE:AI
          </h1>
          <p className="text-lg italic opacity-80">
            by <span className="text-gray-300">escape.ai</span> (temporary team name)
          </p>
        </div>

        {/* Features */}
        {showFeatures && (
          <div className=" p-6 rounded-2xl shadow-lg backdrop-blur-md animate-slideUp text-left max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 underline underline-offset-4">
              Features
            </h2>
            <ul className="space-y-4 list-disc list-inside">
              <li>
                <span className="font-semibold text-gray-200">Dynamic AI-Generated Scenarios:</span> 
                Every time you play, the game’s LLM crafts a brand-new escape scenario — no two sessions are ever the same.
              </li>
              <li>
                <span className="font-semibold text-gray-200">Multiple Storylines:</span> 
                Choose your path: a medieval dungeon, futuristic lab, haunted mansion, cyber prison, and more.
              </li>
              <li>
                <span className="font-semibold text-gray-200">Puzzles & Hints:</span> 
                Solve cleverly placed clues and riddles that adapt with each playthrough.
              </li>
              <li>
                <span className="font-semibold text-gray-200">Puzzle-Driven Gameplay:</span> 
                Solve logic puzzles, riddles, and pattern challenges to progress. Each puzzle gives small clues that combine to unlock the main escape path. Puzzles adapt to the scenario the player chose.
              </li>
              <li>
                <span className="font-semibold text-gray-200">Hidden Clues & Interactive Environment:</span> 
                Explore rooms to find hints, keys, or codes. Subtle storytelling encourages observation. Some clues are misleading on purpose 👀.
              </li>
              <li>
                <span className="font-semibold text-gray-200">Branching Choices & Multiple Outcomes:</span> 
                Players make decisions that influence how the scenario unfolds. Different choices lead to different rooms, puzzles, and endings.
              </li>
              <li>
                <span className="font-semibold text-gray-200">Smart Hints System:</span> 
                AI offers contextual hints. Hints are progressive: subtle first, clearer if needed, helping players think critically without getting stuck.
              </li>
            </ul>
          </div>
        )}
            {/* play button */}
        <div className="animate-fadeInSlow">
          <button
            className="mt-4 px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white text-lg font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
            onClick={() => navigate("/Login")}
          >
            Play
          </button>
        </div>

        <div className="text-sm text-gray-400 mt-8  bg-opacity-70 p-3 rounded-lg inline-block animate-slideUp">
          <p>Credits: Team Escape.AI — Karthik | Nideesh | Shravaya | Varsha | Yash </p>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes flicker {
            0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; }
            20%, 24%, 55% { opacity: 0.3; }
          }
          .animate-flicker { animation: flicker 3s infinite; }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 1.5s ease-out forwards; }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideUp { animation: slideUp 1.2s ease-out forwards; }

          @keyframes fadeInSlow {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeInSlow { animation: fadeInSlow 2.5s ease-out forwards; }
        `}
      </style>
    </div>
  );
}

export default Landing;

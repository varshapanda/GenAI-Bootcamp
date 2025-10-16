import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState("win"); // TEMP toggle win/lose
  const [loading, setLoading] = useState(false);

  // TEMP: toggle win/lose
  function toggleResult() {
    setResult(result === "win" ? "lose" : "win");
  }

  // Navigation
  function handleRestartGame() {
    // TODO: Reset backend/context and restart game
    navigate("/GameScreen");
  }

  function handleGoToMenu() {
    navigate("/RoomSelect");
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden font-['Press_Start_2P',monospace] flex items-center justify-center text-gray-100">
      {/* Main Background with dark overlay */}
      <div className="absolute inset-0 bg-[url('assets/brick.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/85" />

      {/* Floating lanterns/light balls */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-orange-400/70 blur-xl animate-floaty opacity-90 shadow-[0_0_25px_rgba(255,165,0,0.8)]"
          style={{
            width: `${Math.random() * 20 + 8}px`,
            height: `${Math.random() * 20 + 8}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        />
      ))}

      {/* Result Card */}
      <div className="relative z-10 max-w-5xl w-11/12 p-10 bg-black/50 backdrop-blur-md border-4 border-orange-400/40 rounded-3xl shadow-[0_0_60px_rgba(255,140,0,0.7)] flex flex-col md:flex-row items-center justify-between gap-10">
        {loading ? (
          <div className="text-gray-400 animate-pulse text-xl">Loading result...</div>
        ) : (
          <>
            {/* Text Section */}
            <div className="flex-1 text-center md:text-left">
              <h1
                className={`text-5xl md:text-6xl font-bold mb-4 ${
                  result === "win" ? "text-orange-400" : "text-orange-300"
                } drop-shadow-[0_0_20px_rgba(255,140,0,0.9)] transition-colors duration-300`}
              >
                {result === "win" ? "Victory Achieved!" : "Defeat Encountered"}
              </h1>
              
              <div className="flex flex-wrap gap-6 justify-center md:justify-start mt-4">
                <button
                  onClick={handleRestartGame}
                  className="px-8 py-3 bg-gradient-to-br from-orange-500 to-orange-700 border border-orange-400/60 rounded-lg shadow-[0_0_20px_rgba(255,165,0,0.7)] text-white font-bold text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(255,165,0,1)] hover:brightness-125 transition-all duration-300"
                >
                  Try Again
                </button>
                <button
                  onClick={handleGoToMenu}
                  className="px-8 py-3 bg-gradient-to-br from-orange-500 to-orange-700 border border-orange-400/60 rounded-lg shadow-[0_0_20px_rgba(255,165,0,0.7)] text-white font-bold text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(255,165,0,1)] hover:brightness-125 transition-all duration-300"
                >
                  Select New Scenario
                </button>
                {/* TEMP toggle button */}
                <button
                  onClick={toggleResult}
                  className="px-6 py-2 text-sm bg-orange-600/50 border border-orange-400 rounded hover:bg-orange-500/60 hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(255,165,0,0.6)]"
                >
                  Toggle Win/Lose
                </button>
              </div>
            </div>

            {/* Mood Image Section */}
            <div
              className={`w-48 h-48 md:w-64 md:h-64 bg-[url('assets/mood-${result}.jpg')] bg-center bg-cover rounded-2xl shadow-[0_0_40px_rgba(255,165,0,0.8)] animate-fade-in`}
            ></div>
          </>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes floaty {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-25px) translateX(12px); opacity: 1; }
          100% { transform: translateY(0) translateX(0); }
        }
        .animate-floaty { animation: floaty 7s ease-in-out infinite; }

        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 1.2s ease-out forwards; }
      `}</style>
    </div>
  );
}

export default Result;

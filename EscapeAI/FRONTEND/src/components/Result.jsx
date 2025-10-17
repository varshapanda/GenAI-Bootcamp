import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect } from "react";
import { Trophy, Clock, Lightbulb, XCircle, Star, Target } from "lucide-react";
import LoseImage from "../assets/mood-lose.jpg";
import WinImage from "../assets/mood-win.jpg";

function Result() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [summary, setSummary] = useState({}); // TEMP toggle win/lose
  const [loading, setLoading] = useState(false);
  const { sessionId } = useParams();
  const [error, setError] = useState(null);

  function handleGoToMenu() {
    navigate("/RoomSelect");
  }

  useEffect(() => {
    const fetchGameSummary = async (sessionId) => {
      setLoading(true);
      try {
        const response = await axiosPrivate.post(`/game/summary/${sessionId}`);
        const data = response.data;

        setSummary(data.summary);
      } catch (error) {
        console.error("Error fetching game summary:", error);
        setError(
          "Failed to fetch game summary" +
            (error.response?.data?.error
              ? `: ${error.response.data.error}`
              : "")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGameSummary(sessionId);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

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
      <div className="relative z-10 max-w-6xl w-11/12 p-8 md:p-10 bg-black/50 backdrop-blur-md border-4 border-orange-400/40 rounded-3xl shadow-[0_0_60px_rgba(255,140,0,0.7)] overflow-y-auto max-h-[90vh]">
        {loading ? (
          <div className="text-gray-400 animate-pulse text-xl text-center py-20">
            Loading result...
          </div>
        ) : error ? (
          <div className="text-red-400 text-xl text-center py-20">{error}</div>
        ) : (
          <>
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1
                className={`text-4xl md:text-6xl font-bold mb-4 ${
                  summary.escaped === true ? "text-orange-400" : "text-red-400"
                } drop-shadow-[0_0_20px_rgba(255,140,0,0.9)] transition-colors duration-300`}
              >
                {summary.escaped === true
                  ? "Victory Achieved!"
                  : "Defeat Encountered"}
              </h1>

              {/* Mood Image */}
              <div className="flex justify-center mb-6">
                <img
                  src={summary.escaped === true ? WinImage : LoseImage}
                  alt={summary.escaped === true ? "Victory" : "Defeat"}
                  className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-[0_0_40px_rgba(255,165,0,0.8)] animate-fade-in border-4 border-orange-400/60"
                />
              </div>

              {/* Summary Text */}
              <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-3xl mx-auto px-4">
                {summary.summary_text}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
              {/* Score */}
              <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-2 border-orange-400/50 rounded-xl p-4 md:p-6 shadow-[0_0_20px_rgba(255,140,0,0.4)] hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col items-center gap-2">
                  <Star className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />
                  <div className="text-2xl md:text-4xl font-bold text-orange-400">
                    {summary.score}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">SCORE</div>
                </div>
              </div>

              {/* Rooms Completed */}
              <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-2 border-orange-400/50 rounded-xl p-4 md:p-6 shadow-[0_0_20px_rgba(255,140,0,0.4)] hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col items-center gap-2">
                  <Target className="w-8 h-8 md:w-10 md:h-10 text-orange-400" />
                  <div className="text-2xl md:text-4xl font-bold text-orange-400">
                    {summary.rooms_completed}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">ROOMS</div>
                </div>
              </div>

              {/* Time Taken */}
              <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-2 border-orange-400/50 rounded-xl p-4 md:p-6 shadow-[0_0_20px_rgba(255,140,0,0.4)] hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col items-center gap-2">
                  <Clock className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
                  <div className="text-xl md:text-3xl font-bold text-orange-400">
                    {formatTime(summary.time_taken_seconds)}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">TIME</div>
                </div>
              </div>

              {/* Hints Used */}
              <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-2 border-orange-400/50 rounded-xl p-4 md:p-6 shadow-[0_0_20px_rgba(255,140,0,0.4)] hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col items-center gap-2">
                  <Lightbulb className="w-8 h-8 md:w-10 md:h-10 text-yellow-300" />
                  <div className="text-2xl md:text-4xl font-bold text-orange-400">
                    {summary.hints_used}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">HINTS</div>
                </div>
              </div>

              {/* Wrong Attempts */}
              <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-2 border-orange-400/50 rounded-xl p-4 md:p-6 shadow-[0_0_20px_rgba(255,140,0,0.4)] hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col items-center gap-2">
                  <XCircle className="w-8 h-8 md:w-10 md:h-10 text-red-400" />
                  <div className="text-2xl md:text-4xl font-bold text-orange-400">
                    {summary.wrong_attempts}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    MISTAKES
                  </div>
                </div>
              </div>

              {/* Victory Badge (spans remaining space) */}
              <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-2 border-orange-400/50 rounded-xl p-4 md:p-6 shadow-[0_0_20px_rgba(255,140,0,0.4)] hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col items-center gap-2">
                  <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />
                  <div className="text-lg md:text-2xl font-bold text-orange-400">
                    {summary.escaped === true ? "ESCAPED" : "CAPTURED"}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">STATUS</div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              <button
                onClick={handleGoToMenu}
                className="px-8 py-4 bg-gradient-to-br from-orange-500 to-orange-700 border-2 border-orange-400/60 rounded-lg shadow-[0_0_20px_rgba(255,165,0,0.7)] text-white font-bold text-base md:text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(255,165,0,1)] hover:brightness-125 transition-all duration-300"
              >
                Select New Scenario
              </button>
            </div>
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

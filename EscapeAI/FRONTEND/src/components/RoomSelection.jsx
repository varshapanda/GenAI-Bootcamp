import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Loader2, AlertCircle } from "lucide-react";

function RoomSelection() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    difficulty: "",
    theme: "",
    roomType: "",
    numberOfRooms: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        !formData.difficulty ||
        !formData.theme ||
        !formData.roomType ||
        !formData.numberOfRooms
      ) {
        setError("Please fill in all fields before starting the game.");
        setLoading(false);
        return;
      }

      const res = await axiosPrivate.post("/game/start", formData);

      console.log("Backend response:", res.data);
      setError(null);

      // Pass data to GameScreen
      navigate("/GameScreen", { state: { sessionData: res.data } });
    } catch (err) {
      console.error("Failed to start game session:", err);
      setError("Failed to start game. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const gearPositions = [
    { top: "10%", left: "15%", size: 50, speed: 6 },
    { top: "25%", left: "60%", size: 40, speed: 5 },
    { top: "45%", left: "20%", size: 60, speed: 8 },
    { top: "60%", left: "75%", size: 50, speed: 7 },
    { top: "70%", left: "35%", size: 45, speed: 6 },
    { top: "85%", left: "65%", size: 55, speed: 9 },
    { top: "35%", left: "45%", size: 35, speed: 5 },
    { top: "55%", left: "55%", size: 50, speed: 6 },
  ];

  return (
    <div className="min-h-screen flex bg-[url('assets/robo2.png')] bg-cover bg-center text-white overflow-hidden">
      {/* LEFT PANEL */}
      <div className="w-full md:w-1/3 bg-[#0a0f24]/80 backdrop-blur-lg p-8 flex flex-col justify-center animate-slideInLeft shadow-2xl border-r-2 border-orange-500 relative overflow-hidden group">
        <div className="absolute inset-0 bg-white/5 pointer-events-none transform -rotate-12 scale-125 opacity-0 group-hover:opacity-20 transition-opacity duration-700 animate-shine"></div>

        <h1 className="text-3xl font-bold mb-8 text-center tracking-wider text-orange-400 drop-shadow-[0_0_10px_rgba(255,140,0,0.8)]">
          ⚡ Escape Room Setup
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Difficulty */}
          <div className="group">
            <label className="block mb-2 text-sm font-semibold uppercase tracking-wider text-orange-400 group-hover:text-orange-300 transition">
              Difficulty Level
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[#111936]/70 border border-orange-500 focus:ring-2 focus:ring-orange-400 focus:outline-none transition hover:shadow-[0_0_10px_rgba(255,140,0,0.5)]"
              required
            >
              <option value="">Select</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Theme */}
          <div className="group">
            <label className="block mb-2 text-sm font-semibold uppercase tracking-wider text-orange-400 group-hover:text-orange-300 transition">
              Theme
            </label>
            <select
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[#111936]/70 border border-orange-500 focus:ring-2 focus:ring-orange-400 focus:outline-none transition hover:shadow-[0_0_10px_rgba(255,140,0,0.5)]"
              required
            >
              <option value="">Select</option>
              <option value="Ancient Temple">Ancient Temple</option>
              <option value="Haunted Mansion">Haunted Mansion</option>
              <option value="Detective Mystery">Detective Mystery</option>
              <option value="Fantasy Dungeon">Fantasy Dungeon</option>
              <option value="Post-Apocalyptic Lab">Post-Apocalyptic Lab</option>
              <option value="Futuristic">Futuristic</option>
            </select>
          </div>

          {/* Room Type */}
          <div className="group">
            <label className="block mb-2 text-sm font-semibold uppercase tracking-wider text-orange-400 group-hover:text-orange-300 transition">
              Room Type
            </label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[#111936]/70 border border-orange-500 focus:ring-2 focus:ring-orange-400 focus:outline-none transition hover:shadow-[0_0_10px_rgba(255,140,0,0.5)]"
              required
            >
              <option value="">Select</option>
              <option value="Logic & Riddles">Logic & Riddles</option>
              <option value="Observation based">Observation based</option>
              <option value="Pattern recognition">Pattern recognition</option>
              <option value="Story deduction">Story deduction</option>
              <option value="Mixed">Mixed (random combo)</option>
            </select>
          </div>

          {/* Number of Rooms */}
          <div className="group">
            <label className="block mb-2 text-sm font-semibold uppercase tracking-wider text-orange-400 group-hover:text-orange-300 transition">
              Number of Rooms
            </label>
            <select
              name="numberOfRooms"
              value={formData.numberOfRooms}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[#111936]/70 border border-orange-500 focus:ring-2 focus:ring-orange-400 focus:outline-none transition hover:shadow-[0_0_10px_rgba(255,140,0,0.5)]"
              required
            >
              <option value="">Select</option>
              <option value="2">2</option>
              <option value="4">3-4</option>
              <option value="6">5+</option>
            </select>
          </div>

          {/* Generate Adventure Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            type="submit"
            className="w-full mt-4 relative overflow-hidden rounded-md font-semibold text-lg tracking-wider text-orange-400
                       border border-orange-500 p-3 transition-all duration-300
                       bg-gradient-to-r from-[#1a1f3a] via-[#0c132e] to-[#1a1f3a]
                       shadow-[0_0_20px_rgba(255,140,0,0.5)]
                       hover:shadow-[0_0_30px_rgba(255,165,0,0.9)] hover:scale-105"
          >
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent
                             transform -translate-x-full hover:translate-x-full transition-transform duration-700 pointer-events-none"
            ></span>
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Loader2
                    className="w-5 h-5"
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                  Generating...
                </>
              ) : (
                "Generate Adventure"
              )}
            </span>
          </button>
          {/* Error Message */}
          {error && (
            <div
              className="mt-3 p-3 rounded-md border border-red-500/50 bg-gradient-to-r from-red-950/30 via-red-900/20 to-red-950/30
                  shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse"
            >
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* RIGHT PANEL */}
      <div className="hidden md:flex flex-1 relative overflow-hidden items-center justify-center animate-slideInRight">
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-lg p-8 bg-[#0a0f24]/80 backdrop-blur-md rounded-2xl border-2 border-orange-500 animate-float transition-colors duration-300 hover:bg-[#0a0f24]/95 group">
          <h1 className="text-4xl font-bold text-orange-400/90 mb-2 drop-shadow-[0_0_8px_rgba(255,140,0,0.5)]">
            Welcome, Adventurer
          </h1>
          <div className="text-gray-300 text-sm space-y-2">
            <p>
              Customize your escape room experience using the left panel
              options.
            </p>
            <p>
              Select difficulty, theme, room type, and number of rooms to
              generate a unique AI-crafted adventure.
            </p>
            <p>
              Each room is filled with puzzles, riddles, and challenges to test
              your wits and observation.
            </p>
            <p>Time is precious, clues are limited, and teamwork is key!</p>
            <p>
              Prepare to solve, explore, and escape. Your journey begins now…
            </p>
          </div>
        </div>

        {/* Floating Glowing Orbs */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-orange-400/30 blur-xl animate-floatSlow"
            style={{
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
            }}
          />
        ))}

        {/* Realistic Gears */}
        {gearPositions.map((gear, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: `${gear.size}px`,
              height: `${gear.size}px`,
              top: gear.top,
              left: gear.left,
              borderRadius: "50%",
              border: "3px solid rgba(255,165,0,0.5)",
              boxSizing: "border-box",
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
              animation: `spin ${gear.speed}s linear infinite`,
            }}
          />
        ))}

        {/* Tiny Spark Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full animate-pulseGlow"
            style={{
              top: `${Math.random() * 90 + 5}%`,
              left: `${Math.random() * 90 + 5}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Central Glowing Portal */}
        <div className="absolute top-1/2 left-1/2 w-56 h-56 rounded-full bg-gradient-to-r from-orange-400/50 via-yellow-300/30 to-orange-500/20 blur-2xl animate-floatSlow -translate-x-1/2 -translate-y-1/2 z-0"></div>

        <style>
          {`
            @keyframes floatSlow {
              0% { transform: translateY(0) translateX(0); }
              50% { transform: translateY(-15px) translateX(10px); }
              100% { transform: translateY(0) translateX(0); }
            }
            @keyframes pulseGlow {
              0%, 100% { opacity: 0.6; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.1); }
            }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes shine {
              0% { transform: translateX(-50%) rotate(-12deg); opacity: 0; }
              50% { transform: translateX(50%) rotate(-12deg); opacity: 0.2; }
              100% { transform: translateX(150%) rotate(-12deg); opacity: 0; }
            }
            .animate-floatSlow { animation: floatSlow 6s ease-in-out infinite; }
            .animate-pulseGlow { animation: pulseGlow 3s ease-in-out infinite; }
            .animate-spin { animation: spin linear infinite; }
            .animate-shine { animation: shine 2.5s linear infinite; }
          `}
        </style>
      </div>
    </div>
  );
}

export default RoomSelection;

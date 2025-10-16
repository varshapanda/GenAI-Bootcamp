import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function GameScreen() {
  const axiosPrivate = useAxiosPrivate();
  const [inventory, setInventory] = useState([]);
  const [dialogue, setDialogue] = useState("Loading scenario...");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGameState();
  }, []);

  async function fetchGameState() {
    try {
      setLoading(true);
      const res = await axiosPrivate.get("/api/game/start");
      const data = res.data;
      setDialogue(data.dialogue);
      setOptions(data.options || []);
      setInventory(data.inventory || []);
    } catch (err) {
      console.error("Error fetching game state:", err);
      setDialogue("⚠️ Failed to load the scenario. Please refresh.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOptionClick(opt) {
    try {
      setLoading(true);
      const res = await axiosPrivate.post("/api/game/choice", {
        choiceId: opt.id,
        choiceText: opt.text,
      });
      const data = res.data;
      setDialogue(data.dialogue);
      setOptions(data.options || []);
      if (data.addItem) {
        setInventory((prev) =>
          prev.includes(data.addItem) ? prev : [...prev, data.addItem]
        );
      }
    } catch (err) {
      console.error("Error sending choice:", err);
      setDialogue("⚠️ Something went wrong while processing your action.");
    } finally {
      setLoading(false);
    }
  }

  const mainSceneStyle = {
    backgroundImage: "url('/assets/your-ai-scene.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden text-gray-100 font-['Press_Start_2P',monospace]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-center bg-cover scale-105 transition-transform duration-[6000ms] ease-linear animate-bg-pan"
        style={mainSceneStyle}
      ></div>
      <div className="absolute inset-0 bg-[url('assets/robo2.png')] backdrop-blur-[1px]" />

      {/* Inventory Panel (Modernized) */}
      <aside className="absolute top-0 left-0 h-full w-64 bg-gradient-to-b from-[#0b0d16]/95 to-[#05070d]/90 border-r-4 border-orange-600/40 shadow-xl p-3 flex flex-col z-20">
        <h2 className="text-base mb-3 text-orange-400 tracking-widest">INVENTORY</h2>
        <div className="flex-1 overflow-auto space-y-2 pr-1">
          {inventory.length === 0 && (
            <div className="text-xs text-gray-500">— Empty —</div>
          )}
          {inventory.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 bg-black/30 px-2 py-1 rounded-md border border-orange-400/20 hover:border-orange-400/50 hover:shadow-[0_0_10px_rgba(255,140,0,0.3)] transition-all duration-200"
            >
              <div className="w-6 h-6 flex items-center justify-center bg-gradient-to-b from-orange-500/80 to-orange-700/60 rounded-sm text-xs font-bold">
                {item.charAt(0)}
              </div>
              <div className="text-xs md:text-sm truncate">{item}</div>
            </div>
          ))}
        </div>
        <button className="mt-4 py-1.5 text-xs bg-gradient-to-r from-[#111827] to-[#1f2937] border border-orange-400/20 rounded hover:from-[#1f2937] hover:to-[#111827]">
          Save / Load
        </button>
      </aside>

      {/* Center Scene */}
      <main className="absolute left-64 right-0 top-0 bottom-28 p-6 flex items-center justify-center z-10">
        <div className="relative w-full max-w-3xl h-3/5 flex items-center justify-center border-4 border-orange-400/20 rounded-2xl bg-black/30 backdrop-blur-md overflow-hidden">
          {loading ? (
            <div className="text-center text-xs text-gray-400 animate-pulse">Loading...</div>
          ) : (
            <div className="text-center text-xs text-gray-400">
              <div className="mb-2 font-mono opacity-70">[ AI Scene Placeholder ]</div>
              <div className="text-lg tracking-wider">Your generated environment</div>
            </div>
          )}
        </div>
      </main>

      {/* Dialogue Box */}
      <div className="absolute left-64 right-0 bottom-0 p-8 z-30">
        <div className="border-4 border-orange-400/60 rounded-2xl bg-gradient-to-r from-[#0a0d14]/95 to-[#0c101c]/95 p-8 shadow-[0_0_40px_rgba(255,140,0,0.35)]">
          <div className="flex gap-5">
            <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-orange-500 to-orange-800 flex items-center justify-center rounded-md font-bold text-black text-3xl shadow-md">
              S
            </div>
            <div className="flex-1 flex flex-col">
              <p className="text-lg text-gray-200 leading-relaxed tracking-wide mb-5 typewriter">
                {dialogue}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {options.map((opt, index) => (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionClick(opt)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    className="text-base py-3 px-5 bg-gradient-to-br from-[#1a1d2b]/90 to-[#2a2e44]/90 border border-orange-400/50 rounded-lg shadow-md hover:scale-[1.06] hover:border-orange-300 hover:shadow-[0_0_20px_rgba(255,140,0,0.45)] transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-orange-400 animate-option-pop opacity-0"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes bg-pan {
          0% { transform: scale(1.05) translateX(0); }
          50% { transform: scale(1.05) translateX(-20px); }
          100% { transform: scale(1.05) translateX(0); }
        }
        .animate-bg-pan { animation: bg-pan 40s ease-in-out infinite; }

        .typewriter {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 2.5s steps(40, end) 1;
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes option-pop {
          0% { transform: scale(0.9); opacity: 0; }
          60% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-option-pop {
          animation: option-pop 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default GameScreen;

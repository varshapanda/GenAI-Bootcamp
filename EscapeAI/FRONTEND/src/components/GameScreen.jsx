import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ResultMessage from "./ResultMessage";
import { useCallback } from "react";

function GameScreen() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  // Game states
  const [sessionId, setSessionId] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [hintUsed, setHintUsed] = useState(false);
  const [dialogue, setDialogue] = useState("Loading scenario...");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hints, setHints] = useState([]);

  // UI-only states
  const [timer, setTimer] = useState(0);
  const [resultMessage, setResultMessage] = useState(null);

  // Elapsed timer effect
  useEffect(() => {
    const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTimer = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;

  // Fetch initial game state
  useEffect(() => {
    const fetchData = async () => {
      await getCurrentSession();
    };

    fetchData();
  }, []);

  async function getCurrentSession() {
    setLoading(true);
    try {
      const res = await axiosPrivate.get("/game/current");
      const data = res.data;

      if (data.status === "completed") {
        navigate(`/Result/${data.sessionId}`);
        return;
      }

      setResultMessage(
        data?.currentRoom?.result_message || "Welcome to the adventure!"
      );
      setSessionId(data.sessionId);
      setDialogue(data.currentRoom.room_description || "...");
      setOptions(data.currentRoom.options || []);
      setInventory(data.inventory || []);
      setHints(data.currentRoom.hints || []);
    } catch (err) {
      console.error("Error fetching game session:", err);
      setDialogue("⚠️ Failed to load the scenario. Please refresh.");
    } finally {
      setLoading(false);
    }
  }

  // Handle choice selection
  async function handleOptionClick(opt) {
    try {
      setLoading(true);

      const res = await axiosPrivate.post("/game/choose", {
        selectedOptionId: opt.id,
        sessionId: sessionId,
        hintUsed: hintUsed,
        timeTaken: timer,
      });
      const data = res.data;

      // Update dialogue, options
      setDialogue(data.room.room_description || dialogue);
      setOptions(data.room.options || []);
      setInventory(data.inventory || []);
      setHints(data.room.hints || []);
      setHintUsed(false);
      setTimer(0); // Reset timer for new room

      if (data.gameEnding !== "continue") {
        console.log("Game ended with:", data);
        setResultMessage(data?.room?.result_message || "The End.");
        setTimeout(() => {
          navigate(`/Result/${sessionId}`);
        }, 2000);

        return;
      }

      setResultMessage(data?.room?.result_message || "Choice made!");
    } catch (err) {
      console.error("Error sending choice:", err);
      setDialogue("⚠️ Something went wrong while processing your action.");
    } finally {
      setLoading(false);
    }
  }

  function handleShowHint() {
    setHintUsed(true);
  }

  const onComplete = useCallback(() => {
    setResultMessage(null);
  }, []);

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

      {/* Inventory Panel */}
      <aside className="absolute top-0 left-0 h-full w-64 bg-gradient-to-b from-[#0b0d16]/95 to-[#05070d]/90 border-r-4 border-orange-600/40 shadow-xl p-3 flex flex-col z-20">
        <h2 className="text-base mb-3 text-orange-400 tracking-widest">
          INVENTORY
        </h2>
        <div className="flex-1 overflow-auto space-y-2 pr-1">
          {inventory.length === 0 && (
            <div className="text-xs text-gray-500">— Empty —</div>
          )}
          {inventory.map((item) => (
            <div
              key={item.item_id}
              className="relative group flex items-center gap-2 bg-black/30 px-2 py-1 rounded-md border border-orange-400/20 hover:border-orange-400/50 hover:shadow-[0_0_10px_rgba(255,140,0,0.3)] transition-all duration-200 cursor-help"
            >
              <div className="w-6 h-6 flex items-center justify-center bg-gradient-to-b from-orange-500/80 to-orange-700/60 rounded-sm text-xs font-bold">
                {item.item_name.charAt(0)}
              </div>
              <div className="text-sm md:text-base truncate">
                {item.item_name}
              </div>

              {/* Hover Tooltip */}
              <div
                className="absolute left-0 top-full mt-2 w-64 p-3 rounded-md border border-orange-400/50 
                    bg-gradient-to-r from-[#1a1f3a] via-[#0c132e] to-[#1a1f3a]
                    shadow-[0_0_20px_rgba(255,140,0,0.5)]
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
                    transition-all duration-300 z-50 pointer-events-none"
              >
                <div className="text-xs md:text-sm text-orange-100/90 leading-relaxed">
                  {item.item_description}
                </div>
                {/* Arrow pointer */}
                <div className="absolute -top-1 left-4 w-2 h-2 bg-[#1a1f3a] border-l border-t border-orange-400/50 transform rotate-45"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Timer, Score, Hint */}
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex justify-between items-center px-5 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg shadow-md text-base text-black font-bold tracking-widest hover:scale-105 animate-glow-soft transition-all duration-200">
            <span>⏱ Timer:</span>
            <span>{formattedTimer}</span>
          </div>

          <button
            onClick={handleShowHint}
            className="w-full py-3 text-base bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold rounded-lg shadow-md hover:from-yellow-400 hover:to-orange-500 hover:scale-105 animate-glow-soft transition-all duration-200"
          >
            💡 Show Hint
          </button>
          <div className="text-yellow-300 text-base mt-2 px-2">
            {hintUsed && hints[0]}
          </div>
        </div>
      </aside>

      {/* Center Scene */}
      {/* Uncomment when ready - AI Scene will display here */}
      {/* <main className="absolute left-64 right-0 top-0 bottom-0 pb-[280px] md:pb-[320px] p-4 md:p-6 flex items-center justify-center z-10 overflow-hidden">
        <div className="relative w-full max-w-4xl h-full max-h-[calc(100vh-400px)] flex items-center justify-center border-4 border-orange-400/20 rounded-2xl bg-black/30 backdrop-blur-md overflow-hidden">
          {loading ? (
            <div className="text-center text-xs text-gray-400 animate-pulse">
              Loading...
            </div>
          ) : (
            <div className="text-center text-xs text-gray-400">
              <div className="mb-2 font-mono opacity-70">
                [ AI Scene Placeholder ]
              </div>
              <div className="text-lg tracking-wider">
                Your generated environment
              </div>
            </div>
          )}
        </div>
      </main> */}

      {/* Dialogue Box */}
      <div className="absolute left-64 right-0 top-0 bottom-0 p-4 md:p-6 lg:p-8 z-30 flex items-center justify-center">
        <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="border-4 border-orange-400/60 rounded-2xl bg-gradient-to-r from-[#0a0d14]/95 to-[#0c101c]/95 p-4 md:p-6 lg:p-8 shadow-[0_0_40px_rgba(255,140,0,0.35)]">
            <div className="flex gap-3 md:gap-5">
              <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 bg-gradient-to-br from-orange-500 to-orange-800 flex items-center justify-center rounded-md font-bold text-black text-2xl md:text-3xl shadow-md">
                S
              </div>
              <div className="flex-1 flex flex-col min-w-0">
                <p className="text-sm md:text-base lg:text-lg text-gray-200 leading-relaxed tracking-wide mb-3 md:mb-5 break-words">
                  {dialogue}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-5">
                  {options.map((opt, index) => (
                    <button
                      disabled={loading}
                      key={index}
                      onClick={() => handleOptionClick(opt)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      className="text-sm md:text-base lg:text-lg py-3 md:py-4 px-4 md:px-6 bg-gradient-to-br from-[#1a1d2b]/90 to-[#2a2e44]/90 border border-orange-400/50 rounded-lg shadow-md hover:scale-[1.03] md:hover:scale-[1.06] hover:border-orange-300 hover:shadow-[0_0_20px_rgba(255,140,0,0.45)] transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-orange-400 animate-option-pop opacity-0 break-words disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-6 p-8 rounded-2xl border-2 border-orange-400/50 bg-gradient-to-br from-[#0a0d14]/95 to-[#0c101c]/95 shadow-[0_0_40px_rgba(255,140,0,0.5)]">
            {/* Animated Loading Icon */}
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-orange-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-orange-500 rounded-full animate-spin"></div>
              <div
                className="absolute inset-2 border-4 border-transparent border-t-yellow-400 rounded-full animate-spin"
                style={{
                  animationDuration: "1s",
                  animationDirection: "reverse",
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                ✨
              </div>
            </div>

            {/* Loading Text */}
            <div className="text-center">
              <div className="text-xl text-orange-400 font-bold tracking-widest mb-2 animate-pulse">
                CONJURING ADVENTURE
              </div>
              <div className="text-sm text-gray-400 tracking-wide">
                The AI weaves your tale...
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Result Message Overlay */}
      {resultMessage && (
        <ResultMessage message={resultMessage} onComplete={onComplete} />
      )}

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
        .animate-option-pop { animation: option-pop 0.4s ease-out forwards; }

        @keyframes glowPulseSoft {
          0%, 100% { box-shadow: 0 0 6px rgba(255,165,0,0.4), 0 0 12px rgba(255,200,0,0.2); }
          50% { box-shadow: 0 0 12px rgba(255,165,0,0.5), 0 0 18px rgba(255,200,0,0.3); }
        }
        .animate-glow-soft { animation: glowPulseSoft 2s infinite ease-in-out; }
      `}</style>
    </div>
  );
}

export default GameScreen;

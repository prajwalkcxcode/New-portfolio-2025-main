import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, RotateCcw, Trophy, Zap, ShieldAlert, Award, Sparkles } from "lucide-react";

const BUG_TYPES = [
  { id: "null_pointer", name: "NullPointer", icon: "🐛", points: 10, speed: 2.5, color: "from-amber-500 to-yellow-400" },
  { id: "syntax_error", name: "SyntaxError", icon: "🐞", points: 15, speed: 3.2, color: "from-rose-500 to-pink-500" },
  { id: "not_found", name: "404 NotFound", icon: "👾", points: 25, speed: 4.0, color: "from-purple-500 to-indigo-500" },
  { id: "memory_leak", name: "MemoryLeak", icon: "⚡", points: 50, speed: 5.0, color: "from-cyan-400 to-blue-600" },
  { id: "infinite_loop", name: "InfiniteLoop", icon: "💣", points: -30, speed: 2.0, color: "from-red-600 to-red-800", isTrap: true },
];

export default function BugSmasherModal({ isOpen, onClose }) {
  const [gameState, setGameState] = useState("idle"); // idle, playing, gameover
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("bug_smasher_highscore") || "0", 10);
  });
  const [combo, setCombo] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [bugs, setBugs] = useState([]);
  const [pops, setPops] = useState([]);
  const [unlockedBadge, setUnlockedBadge] = useState(false);

  const gameAreaRef = useRef(null);
  const timerRef = useRef(null);
  const spawnRef = useRef(null);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem("bug_smasher_highscore");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("bug_smasher_highscore", score.toString());
      if (score >= 500 && !unlockedBadge) {
        setUnlockedBadge(true);
      }
    }
  }, [score, highScore, unlockedBadge]);

  // Main game loop timer & spawning
  useEffect(() => {
    if (gameState !== "playing") return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    spawnRef.current = setInterval(() => {
      spawnBug();
    }, 700);

    return () => {
      clearInterval(timerRef.current);
      clearInterval(spawnRef.current);
    };
  }, [gameState]);

  const startGame = () => {
    setScore(0);
    setCombo(1);
    setTimeLeft(30);
    setBugs([]);
    setPops([]);
    setGameState("playing");
  };

  const endGame = () => {
    setGameState("gameover");
    clearInterval(timerRef.current);
    clearInterval(spawnRef.current);
  };

  const spawnBug = () => {
    if (!gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const type = BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)];
    const id = Math.random().toString(36).substring(2, 9);
    
    // Spawn position inside container
    const x = Math.random() * (rect.width - 60) + 10;
    const y = Math.random() * (rect.height - 60) + 10;

    const newBug = {
      id,
      type,
      x,
      y,
      vx: (Math.random() - 0.5) * type.speed,
      vy: (Math.random() - 0.5) * type.speed,
    };

    setBugs((prev) => [...prev.slice(-12), newBug]);
  };

  const handleSmashBug = (e, bug) => {
    e.stopPropagation();
    if (gameState !== "playing") return;

    // Create explosion animation
    const popId = Math.random().toString(36).substring(2, 9);
    setPops((prev) => [...prev, { id: popId, x: bug.x, y: bug.y, text: bug.type.isTrap ? "-30!" : `+${bug.type.points * combo}` }]);
    setTimeout(() => {
      setPops((prev) => prev.filter((p) => p.id !== popId));
    }, 800);

    // Remove smashed bug
    setBugs((prev) => prev.filter((b) => b.id !== bug.id));

    if (bug.type.isTrap) {
      setScore((prev) => Math.max(0, prev - 30));
      setCombo(1);
    } else {
      const addedPoints = bug.type.points * combo;
      setScore((prev) => prev + addedPoints);
      setCombo((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleMissClick = () => {
    if (gameState === "playing") {
      setCombo(1);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden text-white"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/60">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/30">
                <Zap size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-none tracking-wide text-zinc-100 flex items-center gap-2">
                  BUG SMASHER <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-mono">ARCADE</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">Smash bugs before your production crashes!</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              aria-label="Close Bug Smasher"
            >
              <X size={20} />
            </button>
          </div>

          {/* Game Dashboard Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-4 sm:px-6 py-3 bg-zinc-900/90 border-b border-zinc-800 font-mono text-xs text-zinc-300">
            <div className="flex flex-col items-center p-2 rounded-lg bg-zinc-950/80 border border-zinc-800">
              <span className="text-zinc-500 text-[10px]">TIME LEFT</span>
              <span className={`text-base font-bold ${timeLeft <= 5 ? "text-red-400 animate-ping" : "text-amber-400"}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-zinc-950/80 border border-zinc-800">
              <span className="text-zinc-500 text-[10px]">SCORE</span>
              <span className="text-base font-bold text-emerald-400">{score}</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-zinc-950/80 border border-zinc-800">
              <span className="text-zinc-500 text-[10px]">COMBO MULTIPLIER</span>
              <span className="text-base font-bold text-cyan-400">{combo}x</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-zinc-950/80 border border-zinc-800">
              <span className="text-zinc-500 text-[10px]">HIGH SCORE</span>
              <span className="text-base font-bold text-yellow-400 flex items-center gap-1">
                <Trophy size={12} /> {highScore}
              </span>
            </div>
          </div>

          {/* Main Game Play Area */}
          <div
            ref={gameAreaRef}
            onClick={handleMissClick}
            className="relative h-[360px] bg-zinc-950 overflow-hidden cursor-crosshair select-none flex items-center justify-center"
            style={{
              backgroundImage: "radial-gradient(circle at 50% 50%, #18181b 0%, #09090b 100%)",
            }}
          >
            {/* Grid line background overlay */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* IDLE STATE OVERLAY */}
            {gameState === "idle" && (
              <div className="relative z-20 text-center max-w-sm px-6 py-8 rounded-2xl bg-zinc-900/90 border border-zinc-700/60 shadow-2xl backdrop-blur">
                <div className="text-4xl mb-3 animate-bounce">🐛</div>
                <h4 className="text-xl font-bold text-white mb-2">Ready to Clean the Codebase?</h4>
                <p className="text-xs text-zinc-400 mb-6">
                  Smash code bugs as fast as you can. Build up your combo multiplier, but watch out for <span className="text-red-400 font-bold">Infinite Loops 💣</span>!
                </p>
                <button
                  onClick={startGame}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 font-bold hover:brightness-110 active:scale-95 transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <Play size={18} /> START BUG SMASHER
                </button>
              </div>
            )}

            {/* GAMEOVER STATE OVERLAY */}
            {gameState === "gameover" && (
              <div className="relative z-20 text-center max-w-sm px-6 py-8 rounded-2xl bg-zinc-900/95 border border-zinc-700/60 shadow-2xl backdrop-blur">
                <div className="text-4xl mb-2">🎉</div>
                <h4 className="text-xl font-bold text-white mb-1">Session Complete!</h4>
                <p className="text-xs text-zinc-400 mb-4">Your final score: <span className="text-emerald-400 font-bold text-sm">{score} pts</span></p>

                {score >= 500 && (
                  <div className="mb-4 p-2.5 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs flex items-center justify-center gap-2">
                    <Award size={16} /> <span>UNLOCKED: <strong>Bug Hunter Certified 🏆</strong></span>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={startGame}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 text-zinc-950 font-bold hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <RotateCcw size={16} /> PLAY AGAIN
                  </button>
                  <button
                    onClick={onClose}
                    className="py-2.5 px-4 rounded-xl bg-zinc-800 text-zinc-300 font-semibold hover:bg-zinc-700 transition text-sm"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            )}

            {/* ACTIVE BUGS */}
            {gameState === "playing" &&
              bugs.map((bug) => (
                <motion.button
                  key={bug.id}
                  onClick={(e) => handleSmashBug(e, bug)}
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.15, 1], x: bug.x, y: bug.y }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className={`absolute z-10 p-2.5 rounded-full border shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-gradient-to-br ${bug.type.color} ${
                    bug.type.isTrap ? "border-red-500 shadow-red-500/40" : "border-white/20 shadow-emerald-500/20"
                  }`}
                  style={{ top: 0, left: 0 }}
                  title={`${bug.type.name} (${bug.type.points} pts)`}
                >
                  <span className="text-2xl leading-none">{bug.type.icon}</span>
                </motion.button>
              ))}

            {/* POP / SMASH PARTICLES */}
            {pops.map((pop) => (
              <motion.div
                key={pop.id}
                initial={{ opacity: 1, scale: 0.8, y: pop.y }}
                animate={{ opacity: 0, scale: 1.5, y: pop.y - 40 }}
                transition={{ duration: 0.7 }}
                className="absolute z-30 font-extrabold font-mono text-sm pointer-events-none text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                style={{ left: pop.x, top: pop.y }}
              >
                {pop.text}
              </motion.div>
            ))}
          </div>

          {/* Footer Legend */}
          <div className="px-6 py-3 bg-zinc-950/80 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="text-sm">🐛</span> +10</span>
              <span className="flex items-center gap-1"><span className="text-sm">🐞</span> +15</span>
              <span className="flex items-center gap-1"><span className="text-sm">👾</span> +25</span>
              <span className="flex items-center gap-1"><span className="text-sm">⚡</span> +50</span>
              <span className="flex items-center gap-1 text-red-400 font-semibold"><span className="text-sm">💣</span> -30 (Trap!)</span>
            </div>
            {unlockedBadge && (
              <span className="text-yellow-400 flex items-center gap-1 font-semibold">
                <Sparkles size={12} /> Bug Hunter Pro
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

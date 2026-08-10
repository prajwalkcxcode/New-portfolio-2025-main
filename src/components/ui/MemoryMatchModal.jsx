import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { X, RotateCcw, Trophy, Clock, Zap } from 'lucide-react'

// ---------------------------------------------------------------------------
// Tech card data — 8 pairs
// ---------------------------------------------------------------------------
const TECH_CARDS = [
  { id: 'react',      label: 'React',      emoji: '⚛️',  bg: 'from-cyan-500/20 to-blue-600/20',    border: 'border-cyan-500/40'   },
  { id: 'typescript', label: 'TypeScript', emoji: '🔷',  bg: 'from-blue-500/20 to-blue-700/20',    border: 'border-blue-500/40'   },
  { id: 'nodejs',     label: 'Node.js',    emoji: '🟩',  bg: 'from-green-500/20 to-green-700/20',  border: 'border-green-500/40'  },
  { id: 'git',        label: 'Git',        emoji: '🔶',  bg: 'from-orange-500/20 to-red-600/20',   border: 'border-orange-500/40' },
  { id: 'tailwind',   label: 'Tailwind',   emoji: '💨',  bg: 'from-sky-400/20 to-cyan-600/20',     border: 'border-sky-400/40'    },
  { id: 'vite',       label: 'Vite',       emoji: '⚡',  bg: 'from-purple-500/20 to-indigo-600/20',border: 'border-purple-500/40' },
  { id: 'nextjs',     label: 'Next.js',    emoji: '▲',   bg: 'from-slate-500/20 to-slate-700/20',  border: 'border-slate-400/40'  },
  { id: 'mongodb',    label: 'MongoDB',    emoji: '🍃',  bg: 'from-emerald-500/20 to-green-600/20',border: 'border-emerald-500/40'},
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function createDeck() {
  return shuffle([...TECH_CARDS, ...TECH_CARDS].map((card, i) => ({ ...card, uid: `${card.id}-${i}` })))
}

function fmt(s) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

// ---------------------------------------------------------------------------
// FlipCard sub-component
// ---------------------------------------------------------------------------
function FlipCard({ card, isFlipped, isMatched, onClick }) {
  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ perspective: '800px', aspectRatio: '1' }}
      onClick={onClick}
    >
      <motion.div
        animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
      >
        {/* Back face */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 transition-colors"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-slate-600 font-bold text-lg">?</span>
        </div>

        {/* Front face */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center rounded-xl border ${card.border} bg-gradient-to-br ${card.bg} transition-all`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-xl mb-0.5 leading-none">{card.emoji}</span>
          <span className="text-[8px] font-mono font-bold text-slate-200 tracking-wide text-center px-1 leading-tight">
            {card.label}
          </span>
          {/* Matched check overlay */}
          {isMatched && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center rounded-xl bg-emerald-500/25 border border-emerald-500/60"
            >
              <span className="text-emerald-300 text-lg font-bold">✓</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// MemoryMatchModal
// ---------------------------------------------------------------------------
export default function MemoryMatchModal({ isOpen, onClose }) {
  const [deck, setDeck] = useState(createDeck)
  const [flipped, setFlipped] = useState([])       // indices of currently face-up unmatched cards
  const [matched, setMatched] = useState([])        // ids of matched pairs
  const [moves, setMoves] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [started, setStarted] = useState(false)
  const [won, setWon] = useState(false)
  const [bestMoves, setBestMoves] = useState(() => parseInt(localStorage.getItem('mm_best_moves') || '9999'))
  const [bestTime,  setBestTime]  = useState(() => parseInt(localStorage.getItem('mm_best_time')  || '9999'))

  // Timer — only runs while game is started and not won
  useEffect(() => {
    if (!started || won) return
    const t = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [started, won])

  // Escape to close
  useEffect(() => {
    if (!isOpen) return
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [isOpen, onClose])

  const restart = useCallback(() => {
    setDeck(createDeck())
    setFlipped([])
    setMatched([])
    setMoves(0)
    setSeconds(0)
    setStarted(false)
    setWon(false)
  }, [])

  const handleCardClick = (index) => {
    if (won) return
    if (flipped.includes(index)) return
    if (matched.includes(deck[index].id)) return
    if (flipped.length === 2) return   // still processing previous pair

    if (!started) setStarted(true)

    const next = [...flipped, index]
    setFlipped(next)

    if (next.length === 2) {
      const total = moves + 1
      setMoves(total)
      const [a, b] = next
      if (deck[a].id === deck[b].id) {
        // Match!
        const newMatched = [...matched, deck[a].id]
        setMatched(newMatched)
        setFlipped([])
        if (newMatched.length === TECH_CARDS.length) {
          setWon(true)
          if (total < bestMoves) { setBestMoves(total);   localStorage.setItem('mm_best_moves', String(total)) }
          if (seconds < bestTime) { setBestTime(seconds); localStorage.setItem('mm_best_time', String(seconds)) }
        }
      } else {
        // No match — flip back after 850ms
        setTimeout(() => setFlipped([]), 850)
      }
    }
  }

  const isFlipped  = (i) => flipped.includes(i) || matched.includes(deck[i].id)
  const isMatched  = (i) => matched.includes(deck[i].id)

  const newBest = won && (moves <= bestMoves || seconds <= bestTime)

  if (!isOpen) return null

  return createPortal(
    <motion.div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 99999, backgroundColor: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        className="relative w-full max-w-[420px] bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <span className="text-base">🃏</span>
            <div>
              <p className="text-sm font-mono font-bold text-slate-100 leading-none">Memory Match</p>
              <p className="text-[10px] font-mono text-slate-500 mt-0.5">Match all 8 tech stack pairs</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={restart} className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" title="Restart">
              <RotateCcw size={13} />
            </button>
            <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" aria-label="Close">
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-between px-5 py-2 bg-slate-950/40 border-b border-slate-800/60 text-[11px] font-mono">
          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1"><Zap size={10} className="text-yellow-400" />{moves} moves</span>
            <span className="flex items-center gap-1"><Clock size={10} className="text-blue-400" />{fmt(seconds)}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            <span className="flex items-center gap-1">
              <Trophy size={9} className="text-amber-400" />
              Best: {bestMoves === 9999 ? '—' : bestMoves}
            </span>
            <span className="text-slate-600">{matched.length}/{TECH_CARDS.length} matched</span>
          </div>
        </div>

        {/* Card Grid */}
        <div className="p-4">
          <div className="grid grid-cols-4 gap-2">
            {deck.map((card, index) => (
              <FlipCard
                key={card.uid}
                card={card}
                isFlipped={isFlipped(index)}
                isMatched={isMatched(index)}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Win Overlay */}
        <AnimatePresence>
          {won && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/92 backdrop-blur-sm gap-4 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="flex flex-col items-center gap-3 text-center"
                initial={{ scale: 0.7, y: 24 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.05, type: 'spring', stiffness: 220, damping: 18 }}
              >
                <span className="text-5xl">🎉</span>
                <h3 className="text-xl font-bold text-white font-mono">All matched!</h3>
                <div className="flex gap-8 text-sm font-mono">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{moves}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">Moves</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{fmt(seconds)}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">Time</div>
                  </div>
                </div>
                {newBest && (
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[11px] font-mono text-amber-400 flex items-center gap-1"
                  >
                    <Trophy size={11} /> New personal best!
                  </motion.span>
                )}
                <button
                  onClick={restart}
                  className="mt-1 px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-mono font-semibold transition-colors flex items-center gap-2"
                >
                  <RotateCcw size={13} /> Play Again
                </button>
                <button onClick={onClose} className="text-[11px] font-mono text-slate-500 hover:text-slate-300 transition-colors">
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>,
    document.body
  )
}

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BootSequence({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)

  // Progress animation timer (clean, fast 1.1s total)
  useEffect(() => {
    const duration = 1100
    const intervalTime = 16
    const step = 100 / (duration / intervalTime)

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step
        if (next >= 100) {
          clearInterval(timer)
          return 100
        }
        return next
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [])

  // Handle completion transition
  useEffect(() => {
    if (progress >= 100) {
      const completionTimeout = setTimeout(() => {
        setCompleted(true)
        const onCompleteTimeout = setTimeout(() => {
          if (typeof onComplete === 'function') {
            onComplete()
          }
        }, 400)
        return () => clearTimeout(onCompleteTimeout)
      }, 200)

      return () => clearTimeout(completionTimeout)
    }
  }, [progress, onComplete])

  return (
    <AnimatePresence>
      {!completed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 z-[99999] bg-[#09090b] flex flex-col justify-center items-center pointer-events-none select-none px-6"
        >
          <div className="flex flex-col items-center justify-center max-w-sm w-full text-center">
            
            {/* Clean Monospace Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-1 mb-6 font-mono"
            >
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-1">
                <span className="text-emerald-400 opacity-70">&lt;</span>
                <span>prajwalkcxcodes</span>
                <span className="text-emerald-400 opacity-70">/&gt;</span>
              </div>
              <p className="text-xs text-gray-400 tracking-wider">
                welcome to the site<span className="animate-pulse text-emerald-400">_</span>
              </p>
            </motion.div>

            {/* Minimalist 2px Progress Line */}
            <div className="w-full max-w-[220px] h-[2px] bg-white/10 rounded-full overflow-hidden relative mb-3">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>

            {/* Clean Percentage Display */}
            <div className="text-[11px] font-mono text-gray-400 tracking-widest uppercase">
              {Math.round(progress)}%
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BootSequence({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)

  // Progress animation timer
  useEffect(() => {
    const duration = 1200
    const intervalTime = 20
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

  // Handle completion state transitions cleanly outside the render/updater phase
  useEffect(() => {
    if (progress >= 100) {
      const completionTimeout = setTimeout(() => {
        setCompleted(true)
        const onCompleteTimeout = setTimeout(() => {
          if (typeof onComplete === 'function') {
            onComplete()
          }
        }, 500) // Delay matching the exit transition duration
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
          exit={{ opacity: 0, filter: "blur(15px)" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 z-[99999] bg-[#09090b] flex flex-col justify-center items-center pointer-events-none select-none"
        >
          {/* Brackets and Logo container */}
          <div className="flex flex-col items-center justify-center max-w-xs w-full px-6">
            
            {/* Animated Code Brackets */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <motion.span
                initial={{ x: -20, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-5xl font-mono font-light text-foreground opacity-80 select-none"
              >
                &lt;
              </motion.span>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0.8, 1], scale: [0.8, 1.05, 1] }}
                transition={{ duration: 1, ease: "easeInOut", repeat: 0 }}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
              />

              <motion.span
                initial={{ x: 20, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-5xl font-mono font-light text-foreground opacity-80 select-none"
              >
                /&gt;
              </motion.span>
            </div>

            {/* Glowing Progress Line */}
            <div className="relative w-full h-[2px] bg-muted rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_12px_rgba(59,130,246,0.8),0_0_20px_rgba(168,85,247,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            
            {/* Small status indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-[10px] font-mono tracking-widest text-muted-foreground uppercase"
            >
              Initializing... {Math.round(progress)}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

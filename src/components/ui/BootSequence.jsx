import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal } from 'lucide-react'

// Authentic realistic boot sequence logs
const BOOT_LOGS = [
  "bios [1.0.4] starting...",
  "Loading kernel modules...",
  "Mounting local file systems...",
  "Starting network interface [OK]",
  "Establishing secure connection to server...",
  "Connection established.",
  "Decrypting graphic assets [OK]",
  "Compiling Prajwal.exe...",
  "Warning: High skill level detected...",
  "Executing interface protocol...",
  "Boot complete."
]

export default function BootSequence({ onComplete }) {
  const [logs, setLogs] = useState([])
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    
    // Interval that gradually pushes logs into the terminal array
    const interval = setInterval(() => {
      if (currentIndex < BOOT_LOGS.length) {
        const nextLog = BOOT_LOGS[currentIndex] // Safely capture by value before async React updater
        setLogs(prev => [...prev, nextLog])
        currentIndex++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setCompleted(true)
          setTimeout(onComplete, 500) // Delay parent unmount slightly
        }, 300)
      }
    }, 120) // Speed of fake logs

    return () => clearInterval(interval)
  }, []) // Removed onComplete to prevent inline-function remounts

  return (
    <AnimatePresence>
      {!completed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col justify-end p-8 font-mono text-sm pointer-events-none"
        >
          <div className="max-w-2xl w-full mx-auto space-y-1 mb-[5vh]">
            <div className="flex items-center gap-2 mb-4 text-green-500 opacity-80">
              <Terminal size={18} />
              <span>System Initialization</span>
            </div>
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${
                  log?.includes("Warning") ? "text-yellow-400" 
                  : log?.includes("OK") ? "text-green-400" 
                  : "text-muted-foreground"
                }`}
              >
                {/* Fake timestamp prepend */}
                <span className="opacity-50 mr-3">
                  [{String((i * 0.12).toFixed(2)).padStart(5, '0')}]
                </span>
                {log}
              </motion.div>
            ))}
            
            {/* Blinking cursor */}
            {!completed && (
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="w-2 h-4 bg-foreground mt-2"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

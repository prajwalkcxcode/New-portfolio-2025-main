import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Volume2, Sparkles, MessageSquare } from 'lucide-react'

const GREETINGS = [
  "Hi, I'm Prajwal",
  "Frontend & Full-Stack Engineer",
  "Building scalable web applications",
  "Crafting performant user interfaces"
]

export default function AnimatedMemoji3D() {
  const [greetingIndex, setGreetingIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  // 3D Tilt Motion Physics
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15])
  const shadowX = useTransform(mouseX, [-0.5, 0.5], [-20, 20])
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [-20, 20])

  // Typewriter effect for speech bubble
  useEffect(() => {
    const targetText = GREETINGS[greetingIndex]
    let charIndex = 0
    setIsTyping(true)
    setTypedText('')

    const typingInterval = setInterval(() => {
      if (charIndex < targetText.length) {
        setTypedText(targetText.slice(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
        
        // Wait 3 seconds then switch greeting
        setTimeout(() => {
          setGreetingIndex((prev) => (prev + 1) % GREETINGS.length)
        }, 3500)
      }
    }, 60)

    return () => clearInterval(typingInterval)
  }, [greetingIndex])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXPos = e.clientX - rect.left
    const mouseYPos = e.clientY - rect.top

    const xPct = mouseXPos / width - 0.5
    const yPct = mouseYPos / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="relative group max-w-[340px] mx-auto md:mx-0 [perspective:1000px] select-none">
      {/* 3D Soft Glow Background */}
      <motion.div 
        className="absolute -inset-6 bg-gradient-to-tr from-blue-500/30 via-purple-500/20 to-cyan-500/30 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-all duration-700 pointer-events-none" 
      />

      {/* Animated Interactive Speech Bubble ("Says Like A Person") */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{ 
          opacity: { duration: 0.6 },
          y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" }
        }}
        className="absolute -top-10 -right-4 z-40 bg-background/95 border border-border/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2.5 max-w-[260px]"
      >
        {/* Animated Voice Equalizer Waves */}
        <div className="flex items-center gap-0.5 shrink-0 text-blue-400">
          <motion.span animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-blue-400 rounded-full" />
          <motion.span animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1 bg-purple-400 rounded-full" />
          <motion.span animate={{ height: [6, 10, 6] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} className="w-1 bg-cyan-400 rounded-full" />
        </div>

        <div className="text-xs font-mono text-foreground font-semibold flex items-center gap-1">
          <span>{typedText}</span>
          {isTyping && <span className="w-1.5 h-3 bg-blue-400 animate-pulse inline-block" />}
        </div>
      </motion.div>

      {/* 3D Animated Card Frame */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative z-10 w-full aspect-[4/5] rounded-3xl border border-white/15 shadow-2xl bg-card overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_25px_60px_-15px_rgba(59,130,246,0.3)] cursor-pointer"
      >
        {/* 3D Floating Avatar Image Container */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{ transform: "translateZ(30px)" }}
          className="w-full h-full relative"
        >
          <img 
            src="/memoji.png" 
            alt="Prajwal KC 3D Waving Memoji Avatar" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Dynamic Lighting Reflection Glare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Interactive Badge at bottom */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-white/90 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/15 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Hire
            </span>

            <span className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 group-hover:text-blue-400 transition-colors">
              <Sparkles size={14} />
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

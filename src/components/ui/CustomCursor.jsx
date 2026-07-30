import React, { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [hoverData, setHoverData] = useState({ active: false, text: '' })
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Outer ring physics: smooth and elegant
  const springConfig = { damping: 28, stiffness: 400, mass: 0.2 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  // Inner dot physics: lightning fast, tracks 1:1
  const dotSpringConfig = { damping: 40, stiffness: 1000, mass: 0.05 }
  const dotX = useSpring(cursorX, dotSpringConfig)
  const dotY = useSpring(cursorY, dotSpringConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    
    const handleMouseOver = (e) => {
      const target = e.target
      
      if (target.closest('[data-cursor="view"]')) {
        setHoverData({ active: true, text: 'VIEW' })
      } else if (target.closest('[data-cursor="execute"]')) {
        setHoverData({ active: true, text: 'EXECUTE' })
      } else if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setHoverData({ active: true, text: '' })
      } else {
        setHoverData({ active: false, text: '' })
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <style>{`
        * { cursor: none !important; }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border border-foreground/30 pointer-events-none z-[99999] mix-blend-difference font-mono font-bold tracking-widest overflow-hidden"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hoverData.text ? 80 : 32,
          height: hoverData.text ? 80 : 32,
          fontSize: "10px",
          color: "var(--background)",
          scale: hoverData.active && !hoverData.text ? 1.5 : 1,
          backgroundColor: hoverData.active || hoverData.text ? 'var(--foreground)' : 'transparent',
          opacity: hoverData.active ? 1 : 0.5
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: hoverData.text ? 1 : 0, y: hoverData.text ? 0 : 10 }}
        >
           {hoverData.text}
        </motion.span>
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-foreground pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: hoverData.active ? 0 : 1
        }}
      />
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }
    
    // Add interactive class to links and buttons for cursor hover state
    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  // Only render on desktop / non-touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <style>{`
        body { cursor: none; }
        a, button { cursor: none; }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-foreground/30 pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? 'var(--foreground)' : 'transparent',
          opacity: isHovered ? 1 : 0.5
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-foreground pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: useSpring(useMotionValue(cursorX.get() + 13), { damping: 40, stiffness: 400 }),
          y: useSpring(useMotionValue(cursorY.get() + 13), { damping: 40, stiffness: 400 }),
        }}
        animate={{
          opacity: isHovered ? 0 : 1
        }}
      />
    </>
  )
}

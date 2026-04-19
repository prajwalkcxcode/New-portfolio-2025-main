import React, { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'

export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring configuration for smooth buttery return
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 }
  const mouseXSpring = useSpring(x, springConfig)
  const mouseYSpring = useSpring(y, springConfig)

  const handleMouseMove = (e) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    
    // Calculate mouse position relative to card center (-1 to 1)
    const width = rect.width
    const height = rect.height
    
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = (mouseX / width - 0.5) * 2
    const yPct = (mouseY / height - 0.5) * 2
    
    // Update motion values (multiplier controls effect strength)
    x.set(xPct * 15)
    y.set(yPct * -15) // Invert Y for natural tilt
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: mouseYSpring,
        rotateY: mouseXSpring,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      {/* 
        TranslateZ is applied to children wrapper to create parallax depth
        when the card rotates
      */}
      <div 
        style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
        className="w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  )
}

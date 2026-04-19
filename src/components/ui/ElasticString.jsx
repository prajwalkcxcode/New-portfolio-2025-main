import React, { useRef, useEffect } from 'react'
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'

export default function ElasticString() {
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000
  
  const springConfig = { damping: 10, mass: 1, stiffness: 400 }
  const mouseY = useMotionValue(windowHeight / 2)
  const mouseX = useSpring(0, springConfig)

  const d = useTransform([mouseX, mouseY], ([x, y]) => {
    return `M 24 0 Q ${24 + x} ${y} 24 ${windowHeight * 2}`
  })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseY.set(e.clientY)
      // Only stretch if mouse is within 150px of the left edge
      if (e.clientX < 150) {
        mouseX.set(e.clientX - 24)
      } else {
        mouseX.set(0)
      }
    }
    const handleMouseLeave = () => mouseX.set(0)
    
    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY])

  return (
    <div className="fixed left-0 top-0 w-64 h-screen z-[9900] pointer-events-none hidden md:block mix-blend-exclusion">
      <svg className="w-full h-full">
        <motion.path 
          d={d}
          stroke="rgba(16, 185, 129, 0.6)"
          strokeWidth="3"
          fill="transparent"
        />
      </svg>
    </div>
  )
}

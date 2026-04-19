import React, { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'

export default function XRayMask() {
  const rawX = useMotionValue(-1000)
  const rawY = useMotionValue(-1000)
  const mx = useSpring(rawX, { stiffness: 400, damping: 25 })
  const my = useSpring(rawY, { stiffness: 400, damping: 25 })

  useEffect(() => {
    const handleMouse = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [rawX, rawY])

  const clipPath = useMotionTemplate`circle(100px at ${mx}px ${my}px)`

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none z-[9990] mix-blend-color-dodge hidden md:block"
      style={{ clipPath }}
    >
       {/* Background that reveals matrix/wireframe aesthetic */}
       <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#10b981_1.5px,transparent_1.5px)] bg-[size:16px_16px]" />
       <div className="absolute inset-0 bg-green-500/10 backdrop-invert backdrop-hue-rotate-180" />
    </motion.div>
  )
}

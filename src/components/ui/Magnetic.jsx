import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Magnetic({ children, ...props }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const handleEnter = () => {
    import('../../utils/audio').then(m => m.playThock())
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onMouseEnter={handleEnter}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

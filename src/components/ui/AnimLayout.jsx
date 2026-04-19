import React from 'react'
import { motion } from 'framer-motion'

export default function AnimLayout({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 150, filter: 'blur(20px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="w-full relative z-10"
    >
      {children}
    </motion.div>
  )
}

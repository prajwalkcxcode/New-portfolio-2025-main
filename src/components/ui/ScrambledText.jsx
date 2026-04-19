import React, { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

const CHARS = '!<>-_\\\\/[]{}—=+*^?#0123456789'

export default function ScrambledText({ text, className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    // If not in view yet, keep it scrambled
    if (!isInView) {
      setDisplayText(text.replace(/[A-Za-z0-9]/g, () => CHARS[Math.floor(Math.random() * CHARS.length)]))
      return
    }

    let iteration = 0
    let interval = null

    interval = setInterval(() => {
      setDisplayText(prev => text.split("").map((letter, index) => {
        // Respect white spaces
        if (letter === ' ') return ' '
        
        // If we passed the iteration line, reveal the correct letter
        if (index < iteration) return text[index]
        
        // Otherwise, keep scrambling
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join(""))
      
      if (iteration >= text.length) {
        clearInterval(interval)
      }
      
      // Speed multiplier
      iteration += 1 / 2
    }, 40)

    return () => clearInterval(interval)
  }, [text, isInView])

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  )
}

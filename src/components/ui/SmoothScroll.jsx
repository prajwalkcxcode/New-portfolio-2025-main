import React from 'react'
import { ReactLenis } from '@studio-freight/react-lenis'

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    }}>
      {children}
    </ReactLenis>
  )
}

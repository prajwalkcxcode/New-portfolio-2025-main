import React, { useEffect, useRef } from 'react'
import fluid from 'webgl-fluid'

export default function FluidBackground() {
  const canvas = useRef(null)

  useEffect(() => {
    // Initializing the 3D Fluid Simulation with specific parameters customized for dark minimalist aesthetics.
    fluid(canvas.current, {
      IMMEDIATE: false,    // Let it fade in
      TRIGGER: 'hover',    // React strictly to cursor hovers
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1024,
      CAPTURE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 1.5, // Faster dissipation for a sleek, non-messy look
      VELOCITY_DISSIPATION: 0.2, // Let the momentum slide nicely
      PRESSURE: 0.6,
      PRESSURE_ITERATIONS: 20,
      CURL: 15, // Less turbulent, more graceful
      SPLAT_RADIUS: 0.15, // Small refined burst
      SPLAT_FORCE: 5000,
      SHADING: true,
      COLORFUL: false, // Disabling extreme rainbow colors to keep the premium minimal monochrome vibe
      COLOR_UPDATE_SPEED: 10,
      PAUSED: false,
      BACK_COLOR: { r: 0.02, g: 0.02, b: 0.03 }, // Dark neutral background
      TRANSPARENT: true, 
      BLOOM: true,
      BLOOM_ITERATIONS: 6,
      BLOOM_RESOLUTION: 256,
      BLOOM_INTENSITY: 0.6,
      BLOOM_THRESHOLD: 0.6,
      BLOOM_SOFT_KNEE: 0.7,
      SUNRAYS: true,
      SUNRAYS_RESOLUTION: 196,
      SUNRAYS_WEIGHT: 1.0,
    })

    const canvasEl = canvas.current
    if (!canvasEl) return

    // Since the canvas is z-[-1], it never receives native mouse events because the UI sits in front of it.
    // We synthetically capture ALL global mouse movements and clone them directly to the WebGL canvas context.
    const forwardMouse = (e) => {
      const clonedEvent = new MouseEvent(e.type, {
        clientX: e.clientX,
        clientY: e.clientY,
        bubbles: true,
        cancelable: true,
      })
      canvasEl.dispatchEvent(clonedEvent)
    }

    const forwardTouch = (e) => {
      // For mobile devices tracking
      if (e.touches.length > 0) {
        const clonedEvent = new TouchEvent(e.type, {
          touches: e.touches,
          bubbles: true,
          cancelable: true,
        })
        canvasEl.dispatchEvent(clonedEvent)
      }
    }

    window.addEventListener('mousemove', forwardMouse)
    window.addEventListener('mousedown', forwardMouse)
    window.addEventListener('mouseup', forwardMouse)
    window.addEventListener('touchmove', forwardTouch, { passive: false })
    window.addEventListener('touchstart', forwardTouch, { passive: false })

    return () => {
      window.removeEventListener('mousemove', forwardMouse)
      window.removeEventListener('mousedown', forwardMouse)
      window.removeEventListener('mouseup', forwardMouse)
      window.removeEventListener('touchmove', forwardTouch)
      window.removeEventListener('touchstart', forwardTouch)
    }
  }, [])

  return (
    <canvas 
      ref={canvas} 
      className="fixed inset-0 z-[0] w-full h-full pointer-events-none mix-blend-screen block" 
      style={{ opacity: 0.8 }}
    />
  )
}

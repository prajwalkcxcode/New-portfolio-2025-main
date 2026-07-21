import React from 'react'

export default function TiltCard({ children, className = '' }) {
  return (
    <div className={`relative transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${className}`}>
      {children}
    </div>
  )
}

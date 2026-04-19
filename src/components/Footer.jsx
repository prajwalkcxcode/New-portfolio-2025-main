import React from 'react'

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-border bg-background py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <button
            onClick={scrollToTop}
            className="text-lg font-bold text-foreground hover:opacity-80 transition-opacity"
          >
            Prajwal<span className="text-muted-foreground">.</span>
          </button>
          <p className="text-sm text-muted-foreground mt-1">
            Building towards full-stack engineering
          </p>
        </div>
        
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Prajwal KC. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

import React from 'react'

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-border bg-background py-12 px-6 relative">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
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

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground">
          <button onClick={() => scrollTo('#about')} className="hover:text-foreground transition-colors">About</button>
          <button onClick={() => scrollTo('#skills')} className="hover:text-foreground transition-colors">Skills</button>
          <button onClick={() => scrollTo('#projects')} className="hover:text-foreground transition-colors">Projects</button>
          <button onClick={() => scrollTo('#journey')} className="hover:text-foreground transition-colors">Journey</button>
          <button onClick={() => scrollTo('#blogs')} className="hover:text-foreground transition-colors">Articles</button>
          <button onClick={() => scrollTo('#guestbook')} className="hover:text-foreground transition-colors">Guestbook</button>
          <button onClick={() => scrollTo('#contact')} className="hover:text-foreground transition-colors">Contact</button>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-1 text-sm text-muted-foreground">
          <div>&copy; {new Date().getFullYear()} Prajwal KC. All rights reserved.</div>
          <div className="flex items-center gap-3 text-[11px] font-mono opacity-70 mt-1 select-none">
            <span>Last Updated: July 2026</span>
            <span>•</span>
            <span>Visitor Count: #1,842</span>
          </div>
        </div>
      </div>
    </footer>
  )
}




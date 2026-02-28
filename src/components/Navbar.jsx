import React, { useState, useEffect } from 'react'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 24)

      const sections = ['home', 'about', 'work', 'contact']
        .map((id) => document.getElementById(id))
        .filter(Boolean)

      let current = '#home'
      sections.forEach((section) => {
        const offsetTop = section.offsetTop - 140
        if (scrollY >= offsetTop) {
          current = `#${section.id}`
        }
      })

      setActive(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-surface/95 backdrop-blur-md border-b border-[var(--border)]' : ''
      }`}
    >
      <nav
        className={`max-w-4xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-14' : 'h-16'
        }`}
        aria-label="Main"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-serif text-lg font-semibold text-ink hover:text-accent transition-colors"
        >
          Prajwal KC
        </button>

        <div className="flex items-center gap-4">
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ name, href }) => {
              const isActive = active === href
              return (
                <li key={name}>
                  <button
                    type="button"
                    onClick={() => scrollTo(href)}
                    className={`text-sm font-medium py-2 link-underline ${
                      isActive ? 'text-ink link-underline--active' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {name}
                  </button>
                </li>
              )
            })}
          </ul>

          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2.5 rounded-full border border-[var(--border)] bg-surface-elevated text-ink hover:text-accent transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-ink-muted hover:text-ink"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-surface-muted border-t border-[var(--border)]">
          <ul className="px-6 py-4 space-y-2">
            {navLinks.map(({ name, href }) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => scrollTo(href)}
                  className="block w-full text-left py-2 text-ink-muted hover:text-ink font-medium"
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

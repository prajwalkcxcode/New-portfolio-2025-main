import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SmoothScroll from './components/ui/SmoothScroll'
import CustomCursor from './components/ui/CustomCursor'
import SpotifyWidget from './components/ui/SpotifyWidget'
import CommandPalette from './components/ui/CommandPalette'
import BootSequence from './components/ui/BootSequence'


export default function App() {
  const [theme, setTheme] = useState('dark') // Defaulting to dark for the true SaaS/Premium developer aesthetic
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
      document.documentElement.dataset.theme = stored
      return
    }

    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
    const initial = prefersDark ? 'dark' : 'light'
    setTheme(initial)
    document.documentElement.dataset.theme = initial
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <SmoothScroll>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      {booted && (
        <>
          <CustomCursor />
          <SpotifyWidget />
          <CommandPalette theme={theme} toggleTheme={toggleTheme} />
          <Navbar theme={theme} onToggleTheme={toggleTheme} />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Journey />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </SmoothScroll>
  )
}

import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Blogs from './components/Blogs'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SmoothScroll from './components/ui/SmoothScroll'
import CommandPalette from './components/ui/CommandPalette'
import BootSequence from './components/ui/BootSequence'
import AnimLayout from './components/ui/AnimLayout'
import ScrollProgress from './components/ui/ScrollProgress'
import ResumeModal from './components/ui/ResumeModal'
import BackToTop from './components/ui/BackToTop'

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [booted, setBooted] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [isFocusMode, setIsFocusMode] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.focusMode = isFocusMode ? 'true' : 'false'
  }, [isFocusMode])

  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeElement = document.activeElement
      const isInput = activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' || 
        activeElement.isContentEditable
      )
      if (isInput) return
      if (e.key === 'f' || e.key === 'F') {
        setIsFocusMode((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const handleToggle = () => setIsResumeOpen((prev) => !prev)
    window.addEventListener('toggle-resume', handleToggle)
    return () => window.removeEventListener('toggle-resume', handleToggle)
  }, [])

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

  const toggleFocusMode = () => {
    setIsFocusMode((prev) => !prev)
  }

  return (
    <SmoothScroll>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      {booted && (
        <>
          <ScrollProgress />
          <CommandPalette 
            theme={theme} 
            toggleTheme={toggleTheme} 
            onOpenResume={() => setIsResumeOpen(true)}
          />
          <Navbar 
            theme={theme} 
            onToggleTheme={toggleTheme} 
            onOpenResume={() => setIsResumeOpen(true)}
            isFocusMode={isFocusMode}
            onToggleFocusMode={toggleFocusMode}
          />
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
          <BackToTop />
          <AnimLayout>
            <main>
              <Hero onOpenResume={() => setIsResumeOpen(true)} />
              <About />
              <Skills />
              <Projects />
              <Blogs />
              <Journey />
              <Contact />
            </main>
          </AnimLayout>
          <Footer />
        </>
      )}
    </SmoothScroll>
  )
}


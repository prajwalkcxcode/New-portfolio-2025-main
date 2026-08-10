import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Blogs from './components/Blogs'
import Journey from './components/Journey'
import Guestbook from './components/Guestbook'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SmoothScroll from './components/ui/SmoothScroll'
import CommandPalette from './components/ui/CommandPalette'
import AnimLayout from './components/ui/AnimLayout'
import ScrollProgress from './components/ui/ScrollProgress'
import ResumeModal from './components/ui/ResumeModal'
import BackToTop from './components/ui/BackToTop'
import MemoryMatchModal from './components/ui/MemoryMatchModal'
import DesktopOS from './components/ui/DesktopOS'
import PrajwalAIWidget from './components/ui/PrajwalAIWidget'
import BootSequence from './components/ui/BootSequence'

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [isMemoryMatchOpen, setIsMemoryMatchOpen] = useState(false)
  const [isOSModeOpen, setIsOSModeOpen] = useState(false)
  const [bootComplete, setBootComplete] = useState(false)

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

  return (
    <>
      <BootSequence onComplete={() => setBootComplete(true)} />
      {bootComplete && (
        <SmoothScroll>
          <ScrollProgress />
          <CommandPalette
            theme={theme}
            toggleTheme={toggleTheme}
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenBugSmasher={() => setIsMemoryMatchOpen(true)}
            onOpenOSMode={() => setIsOSModeOpen(true)}
          />
          <Navbar
            theme={theme}
            onToggleTheme={toggleTheme}
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenBugSmasher={() => setIsMemoryMatchOpen(true)}
            onOpenOSMode={() => setIsOSModeOpen(true)}
          />
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
          <MemoryMatchModal isOpen={isMemoryMatchOpen} onClose={() => setIsMemoryMatchOpen(false)} />
          <DesktopOS
            isOpen={isOSModeOpen}
            onClose={() => setIsOSModeOpen(false)}
            onOpenBugSmasher={() => setIsMemoryMatchOpen(true)}
          />
          <PrajwalAIWidget
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenBugSmasher={() => setIsMemoryMatchOpen(true)}
            onOpenOSMode={() => setIsOSModeOpen(true)}
          />
          <BackToTop />
          <AnimLayout>
            <main>
              <Hero onOpenResume={() => setIsResumeOpen(true)} />
              <About />
              <Skills />
              <Projects />
              <Blogs />
              <Journey />
              <Guestbook />
              <Contact />
            </main>
          </AnimLayout>
          <Footer />
        </SmoothScroll>
      )}
    </>
  )
}




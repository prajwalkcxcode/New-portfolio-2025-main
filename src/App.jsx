import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Learning from './components/Learning'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SmoothScroll from './components/ui/SmoothScroll'
import CustomCursor from './components/ui/CustomCursor'
import CommandPalette from './components/ui/CommandPalette'
import BootSequence from './components/ui/BootSequence'
import AnimLayout from './components/ui/AnimLayout'
import ScrollProgress from './components/ui/ScrollProgress'
import ResumeModal from './components/ui/ResumeModal'
import BackToTop from './components/ui/BackToTop'
import FluidBackground from './components/ui/FluidBackground'

export default function App() {
  const [theme, setTheme] = useState('dark') // Defaulting to dark for the true SaaS/Premium developer aesthetic
  const [booted, setBooted] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [fluidEnabled, setFluidEnabled] = useState(() => {
    return window.localStorage.getItem('fluid-bg') === 'true'
  })

  useEffect(() => {
    window.localStorage.setItem('fluid-bg', fluidEnabled)
  }, [fluidEnabled])

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
    <SmoothScroll>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      {booted && (
        <>
          <ScrollProgress />
          <CustomCursor />
          {fluidEnabled && <FluidBackground />}
          <CommandPalette 
            theme={theme} 
            toggleTheme={toggleTheme} 
            onOpenResume={() => setIsResumeOpen(true)}
            fluidEnabled={fluidEnabled}
            onToggleFluid={() => setFluidEnabled(prev => !prev)}
          />
          <Navbar 
            theme={theme} 
            onToggleTheme={toggleTheme} 
            onOpenResume={() => setIsResumeOpen(true)} 
            fluidEnabled={fluidEnabled}
            onToggleFluid={() => setFluidEnabled(prev => !prev)}
          />
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
          <BackToTop />
          <AnimLayout>
            <main>
              <Hero onOpenResume={() => setIsResumeOpen(true)} />
              <About />
              <Skills />
              <Learning />
              <Projects />
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

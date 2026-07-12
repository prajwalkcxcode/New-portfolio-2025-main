import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Mail, Github, Linkedin, Briefcase, GraduationCap, Code, Award, User, Layers } from 'lucide-react'

export default function ResumeModal({ isOpen, onClose }) {
  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Keyboard shortcut listener 'R' or 'r'
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in an input, textarea, or contenteditable
      const activeElement = document.activeElement
      const isInput = activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' || 
        activeElement.isContentEditable
      )
      
      if (isInput) return

      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault()
        if (isOpen) {
          onClose()
        } else {
          // Find the resume modal trigger or just execute open
          // Since parent manages open, toggle it
          // We can use a custom event or a direct callback
          const event = new CustomEvent('toggle-resume')
          window.dispatchEvent(event)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 overflow-hidden">
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-zoom-out"
          />

          {/* Glassmorphic Window Container */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-4xl h-[85vh] bg-[#09090b]/85 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(59,130,246,0.15)] flex flex-col overflow-hidden text-foreground z-10"
          >
            {/* Top Title Bar (OS Window style) */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-muted/40">
              {/* Window Controls */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-80 hover:opacity-100 transition-opacity cursor-pointer" onClick={onClose} />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-80" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f] opacity-80" />
                <span className="ml-4 text-xs font-mono text-muted-foreground tracking-wider select-none">
                  cv_prajwal_kc.sh
                </span>
              </div>
              
              {/* Close Button */}
              <button 
                onClick={onClose} 
                className="p-1 rounded-md text-muted-foreground hover:text-white hover:bg-muted transition-colors"
                aria-label="Close CV Window"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-8 md:p-8 space-y-10 custom-scrollbar">
              
              {/* Header Profile Section */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/5">
                <div className="space-y-2 w-full md:w-auto">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-foreground to-muted-foreground bg-clip-text text-transparent">
                      Prajwal KC
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-mono bg-green-500/10 text-green-400 border border-green-500/20 flex items-center gap-1.5 self-center whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      AVAILABLE FOR WORK
                    </span>
                  </div>
                  <p className="text-lg text-blue-400 font-mono">Software Engineer & Full Stack Developer</p>
                  <p className="text-sm text-muted-foreground flex flex-wrap items-center gap-2">
                    <span>Kathmandu, Nepal</span>
                    <span>•</span>
                    <span>BSc. CSIT Student</span>
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/resume.pdf"
                    download
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-foreground text-background font-medium text-sm transition-colors hover:bg-foreground/90 shadow-lg hover:shadow-white/5"
                  >
                    <Download size={15} />
                    Download CV
                  </a>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=prajwalkc2063@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2.5 rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Send Email via Gmail"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>

              {/* Grid Layout */}
              <div className="grid md:grid-cols-3 gap-8">
                
                {/* Left Column - Meta & Info */}
                <div className="space-y-8 md:col-span-1">
                  {/* Summary / Profile */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold font-mono tracking-widest text-blue-400 uppercase flex items-center gap-2">
                      <User size={14} /> Profile
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      A driven Computer Science & Information Technology student from Nepal, passionate about building robust, high-performance web applications. Focused on state management, responsive designs, and clean architectural design.
                    </p>
                  </div>

                  {/* Skills Grid */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold font-mono tracking-widest text-blue-400 uppercase flex items-center gap-2">
                      <Code size={14} /> Technical Stack
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs text-muted-foreground font-semibold">Languages</span>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {['JavaScript (ES6+)', 'TypeScript', 'HTML5/CSS3'].map(s => (
                            <span key={s} className="px-2 py-0.5 rounded bg-muted text-foreground text-xs font-mono">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground font-semibold">Frameworks / Libraries</span>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS'].map(s => (
                            <span key={s} className="px-2 py-0.5 rounded bg-muted text-foreground text-xs font-mono">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground font-semibold">DevOps & Databases</span>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {['Docker', 'MongoDB', 'Git/GitHub', 'Vite', 'Vercel'].map(s => (
                            <span key={s} className="px-2 py-0.5 rounded bg-muted text-foreground text-xs font-mono">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold font-mono tracking-widest text-blue-400 uppercase flex items-center gap-2">
                      <Award size={14} /> Credentials
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="border-l border-border pl-3 space-y-0.5">
                        <h4 className="font-semibold text-foreground">React Development Bootcamp</h4>
                        <p className="text-xs text-muted-foreground font-mono">Udemy</p>
                      </div>
                      <div className="border-l border-border pl-3 space-y-0.5">
                        <h4 className="font-semibold text-foreground">Responsive Web Design</h4>
                        <p className="text-xs text-muted-foreground font-mono">freeCodeCamp</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Work & Projects & Education */}
                <div className="space-y-8 md:col-span-2">
                  
                  {/* Experience */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold font-mono tracking-widest text-blue-400 uppercase flex items-center gap-2">
                      <Briefcase size={14} /> Experience
                    </h3>
                    <div className="space-y-6">
                      <div className="relative border-l border-border pl-6 space-y-1">
                        <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-blue-500" />
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-semibold text-foreground text-base">Full-Stack Projects & Open Source</h4>
                          <span className="text-xs text-muted-foreground font-mono shrink-0">2023 - Present</span>
                        </div>
                        <p className="text-xs text-blue-400 font-mono">Independent Developer</p>
                        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                          Developing real-world SaaS applications, productivity boards, and ecommerce web architectures. Structuring modular UI components, integrating RESTful APIs, securing payment routes, and deploying on modern cloud hosts.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Selected Projects */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold font-mono tracking-widest text-blue-400 uppercase flex items-center gap-2">
                      <Layers size={14} /> Featured Projects
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
                        <h4 className="font-semibold text-foreground text-sm">Modern Ecommerce Platform</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Features responsive cart system, stripe payments, product catalogs, and custom analytics boards.
                        </p>
                        <p className="text-[10px] font-mono text-blue-400">React · Node.js · Stripe · Tailwind</p>
                      </div>
                      <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
                        <h4 className="font-semibold text-foreground text-sm">Weather Forecasting Dashboard</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Provides detailed location metrics, multi-day forecasting, client caching, and ambient style adaptations.
                        </p>
                        <p className="text-[10px] font-mono text-blue-400">React · TypeScript · OpenWeather</p>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold font-mono tracking-widest text-blue-400 uppercase flex items-center gap-2">
                      <GraduationCap size={14} /> Education
                    </h3>
                    <div className="space-y-4">
                      <div className="relative border-l border-border pl-6 space-y-1">
                        <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-blue-500" />
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-semibold text-foreground text-base">BSc. Computer Science & Information Technology</h4>
                          <span className="text-xs text-muted-foreground font-mono shrink-0">2021 - Present</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Tribhuvan University, Nepal</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Core coursework in Data Structures & Algorithms, Database Management Systems, Software Engineering, and Operating Systems.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Footer with keyboard hint */}
            <div className="px-6 py-3 border-t border-white/5 bg-muted/20 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span>Press ESC to close</span>
              <span>PRAJWAL_KC_SHELL v1.0.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

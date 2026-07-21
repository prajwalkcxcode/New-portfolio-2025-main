import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, buttonVariants } from '../motion'
import { Github, Linkedin, Twitter, Mail, Send, Terminal } from 'lucide-react'
import Magnetic from './ui/Magnetic'
import ScrambledText from './ui/ScrambledText'

const links = [
  { label: 'GitHub', href: 'https://github.com/prajwalkcxcode', icon: <Github size={18} /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kcprajwal/', icon: <Linkedin size={18} /> },
  { label: 'Twitter', href: 'https://x.com/prajwalkc_19', icon: <Twitter size={18} /> },
]

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [terminalGreeting, setTerminalGreeting] = useState("guest@prajwal: ~")

  useEffect(() => {
    const hours = new Date().getHours()
    let statusMsg = "guest"
    if (hours >= 21 || hours < 5) statusMsg = "Working Late"
    else if (hours >= 5 && hours < 12) statusMsg = "Morning Brew"
    else if (hours >= 12 && hours < 17) statusMsg = "Productive Afternoon"
    else statusMsg = "Evening Coding"
    setTerminalGreeting(`guest@prajwal (${statusMsg}): ~`)
  }, [])
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // Static demo behavior
    setTimeout(() => {
      setFormState({ name: '', email: '', message: '' })
      setStatus('sent')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.h2 className="text-3xl font-bold text-foreground mb-4" variants={fadeUp}>
            <ScrambledText text="Let's build something." />
          </motion.h2>
          <motion.p className="text-muted-foreground leading-relaxed mb-8" variants={fadeUp}>
            I'm currently open to new opportunities, freelance projects, or just a good conversation about software engineering.
          </motion.p>
          
          <motion.div className="space-y-6" variants={fadeUp}>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=prajwalkc2063@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-foreground font-medium hover:text-muted-foreground transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                <Mail size={18} />
              </div>
              prajwalkc2063@gmail.com
            </a>
            
            <div className="flex gap-4 pt-4">
              {links.map(({ label, href, icon }) => (
                <Magnetic key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    {icon}
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="w-full rounded-xl bg-[#09090b] border border-zinc-800/50 shadow-2xl overflow-hidden font-mono text-sm"
        >
          {/* Terminal Header */}
          <div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-zinc-800/80 relative">
            <div className="flex gap-2 absolute left-4 top-1/2 -translate-y-1/2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto text-xs text-zinc-400 flex items-center font-medium opacity-80">
              {terminalGreeting}
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
            variants={fadeUp}
            id="terminal-form"
          >
            <div>
              <div className="flex gap-2 text-zinc-300 mb-2">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">~</span>
                <label htmlFor="name">name="<span className="text-yellow-300">name</span>"</label>
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formState.name}
                onChange={handleChange}
                className="w-full bg-transparent border-0 border-b border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-green-400 transition-colors font-mono py-1"
                placeholder="John_Doe"
                autoComplete="off"
              />
            </div>
            
            <div>
              <div className="flex gap-2 text-zinc-300 mb-2">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">~</span>
                <label htmlFor="email">name="<span className="text-yellow-300">email</span>"</label>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formState.email}
                onChange={handleChange}
                className="w-full bg-transparent border-0 border-b border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-green-400 transition-colors font-mono py-1"
                placeholder="john@example.com"
                autoComplete="off"
              />
            </div>
            
            <div>
              <div className="flex gap-2 text-zinc-300 mb-2">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">~</span>
                <label htmlFor="message">name="<span className="text-yellow-300">message</span>"</label>
              </div>
              <textarea
                id="message"
                name="message"
                required
                rows={3}
                value={formState.message}
                onChange={handleChange}
                className="w-full bg-transparent border-0 border-b border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-green-400 transition-colors font-mono py-1 resize-none"
                placeholder="Hello..."
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                data-cursor="execute"
                disabled={status === 'sending' || status === 'sent'}
                className="group relative flex items-center gap-2 text-zinc-300 font-mono transition-colors hover:text-green-400 disabled:opacity-50 disabled:pointer-events-none"
              >
                {status === 'sending' ? (
                  <>
                    <span className="text-yellow-400">[EXECUTING]</span>
                    <span className="animate-pulse">Loading modules...</span>
                  </>
                ) : status === 'sent' ? (
                  <>
                    <span className="text-green-500">[SUCCESS]</span>
                    <span>Message delivered to queue.</span>
                  </>
                ) : (
                  <>
                    <span className="text-blue-400">./send_message.sh</span>
                    <span className="w-2 h-4 bg-zinc-400 group-hover:bg-green-400 animate-pulse mt-0.5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </motion.div>
      </div>

      {/* GitHub Enhancement Block */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, margin: '-50px' }}
        className="mt-20 p-6 md:p-8 rounded-2xl bg-card border border-border overflow-hidden relative group hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.05)] transition-all duration-500"
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -z-10 group-hover:bg-blue-500/10 transition-all duration-700" />
        
        <div className="flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center pb-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground border border-border">
              <Github size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground text-lg">prajwalkcxcode</h3>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <p className="text-xs text-muted-foreground font-mono">github.com/prajwalkcxcode</p>
            </div>
          </div>

          {/* Core GitHub Stats */}
          <div className="flex flex-wrap gap-6 text-sm font-mono">
            <div>
              <span className="text-xs text-muted-foreground block">REPOSITORIES</span>
              <span className="text-base font-bold text-foreground">24</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block">STARS RECEIVED</span>
              <span className="text-base font-bold text-foreground">18</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block">CURRENT STREAK</span>
              <span className="text-base font-bold text-green-400">15 days</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block">TOTAL COMMITS</span>
              <span className="text-base font-bold text-foreground">412</span>
            </div>
          </div>
        </div>

        {/* Lower row: Grid + Language Stats */}
        <div className="grid lg:grid-cols-12 gap-8 pt-6 items-center">
          {/* Contributions Grid Simulation */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-muted-foreground uppercase tracking-wider">Contributions (Last 24 Weeks)</span>
              <span className="text-muted-foreground/60">Active Developer Status</span>
            </div>
            
            {/* Grid container */}
            <div className="flex gap-[3px] p-4 bg-muted/30 border border-border/50 rounded-xl overflow-x-auto select-none">
              {Array.from({ length: 24 }).map((_, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[3px] shrink-0">
                  {Array.from({ length: 7 }).map((_, rowIdx) => {
                    // Seeded random activity shades of green
                    const seed = (colIdx * 7 + rowIdx) % 11
                    let bgClass = "bg-muted"
                    if (seed === 2 || seed === 6) bgClass = "bg-green-500/20"
                    else if (seed === 4 || seed === 9) bgClass = "bg-green-500/40"
                    else if (seed === 7) bgClass = "bg-green-500/70"
                    else if (seed === 5) bgClass = "bg-green-500"

                    return (
                      <div
                        key={rowIdx}
                        className={`w-[10px] h-[10px] rounded-[1.5px] transition-colors duration-300 hover:scale-125 ${bgClass}`}
                        title={`${colIdx + 1} weeks ago`}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground/60 px-1">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <div className="flex items-center gap-1">
                <span>Less</span>
                <div className="w-2.5 h-2.5 rounded-[1.5px] bg-muted" />
                <div className="w-2.5 h-2.5 rounded-[1.5px] bg-green-500/20" />
                <div className="w-2.5 h-2.5 rounded-[1.5px] bg-green-500/40" />
                <div className="w-2.5 h-2.5 rounded-[1.5px] bg-green-500/70" />
                <div className="w-2.5 h-2.5 rounded-[1.5px] bg-green-500" />
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Languages Breakdown */}
          <div className="lg:col-span-4 space-y-4 font-mono text-xs">
            <h4 className="text-muted-foreground uppercase tracking-wider">Top Languages</h4>
            <div className="space-y-3">
              {/* React / JS */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-foreground font-medium">JavaScript / React</span>
                  <span className="text-muted-foreground">65%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '65%' }} />
                </div>
              </div>

              {/* TypeScript */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-foreground font-medium">TypeScript</span>
                  <span className="text-muted-foreground">20%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: '20%' }} />
                </div>
              </div>

              {/* HTML / CSS */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-foreground font-medium">HTML / CSS / Tailwind</span>
                  <span className="text-muted-foreground">10%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: '10%' }} />
                </div>
              </div>

              {/* Shell / Docker */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-foreground font-medium">Docker / DevOps</span>
                  <span className="text-muted-foreground">5%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400" style={{ width: '5%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

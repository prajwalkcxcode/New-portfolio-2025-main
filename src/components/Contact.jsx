import React, { useState } from 'react'
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
              href="mailto:prajwalkc2063@gmail.com"
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
              guest@prajwal: ~
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
    </section>
  )
}

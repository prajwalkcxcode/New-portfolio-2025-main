import React, { useState, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon, CornerDownLeft } from 'lucide-react'

const INITIAL_HISTORY = [
  { type: 'system', content: 'Prajwal KC Interactive CLI v1.0.0' },
  { type: 'system', content: 'Type "help" to view all available commands.' }
]

const COMMAND_MAP = {
  help: `Available commands:
  • about       - Short bio and focus areas
  • skills      - Technical skills breakdown
  • projects    - Featured portfolio projects
  • contact     - Direct email & social profiles
  • hire        - Availability status & booking link
  • cat resume  - Quick resume summary
  • clear       - Clear terminal output`,
  
  about: `Prajwal KC — BSc CSIT Student & React/Full-Stack Developer based in Nepal.
Specializing in high-performance frontend engineering, clean component architecture, and full-stack API integration.`,

  skills: `Core Arsenal:
  Frontend : React, Next.js, JavaScript (ES6+), TypeScript, Tailwind CSS, Framer Motion
  Backend  : Node.js, Express, MongoDB, REST APIs
  Tools    : Git, GitHub, VS Code, Vercel, Docker`,

  projects: `Selected Work:
  1. Modern Ecommerce       (React, Node.js, Stripe, Tailwind CSS)
  2. Weather Dashboard      (React, TypeScript, Tailwind CSS, OpenWeather)
  3. Task Management SaaS   (Next.js, MongoDB, Prisma, Framer Motion)`,

  contact: `Get In Touch:
  Email    : prajwalkc2063@gmail.com
  GitHub   : https://github.com/prajwalkcxcode
  LinkedIn : https://www.linkedin.com/in/kcprajwal/
  Twitter  : https://x.com/prajwalkc_19`,

  hire: `🟢 Status: OPEN FOR OPPORTUNITIES
Available for full-time frontend/full-stack roles, contract projects, and freelance work.
Email me directly at prajwalkc2063@gmail.com!`,

  'cat resume': `Resume Summary:
  Name        : Prajwal KC
  Degree      : BSc CSIT (Computer Science & Information Technology)
  Location    : Nepal
  Primary Role: Frontend & Full-Stack Engineer`
}

export default function DeveloperCLI() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState(INITIAL_HISTORY)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (e) => {
    e.preventDefault()
    const trimmed = input.trim().toLowerCase()
    if (!trimmed) return

    if (trimmed === 'clear') {
      setHistory(INITIAL_HISTORY)
      setInput('')
      return
    }

    let response = COMMAND_MAP[trimmed]
    if (!response) {
      // Check partial match
      if (trimmed.startsWith('cat') && trimmed !== 'cat resume') {
        response = `File not found: ${trimmed.slice(4)}. Try "cat resume"`
      } else {
        response = `Command not found: "${trimmed}". Type "help" for a list of valid commands.`
      }
    }

    setHistory((prev) => [
      ...prev,
      { type: 'command', content: input },
      { type: 'output', content: response }
    ])
    setInput('')
  }

  return (
    <div className="w-full rounded-2xl bg-[#09090b] border border-border/80 shadow-2xl overflow-hidden font-mono text-xs md:text-sm">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#141417] border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
            <TerminalIcon size={14} className="text-blue-400" />
            prajwal@terminal: ~
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground/60">Interactive CLI</span>
      </div>

      {/* Terminal Body */}
      <div className="p-5 h-64 overflow-y-auto space-y-3 bg-[#09090b] text-gray-300">
        {history.map((item, index) => (
          <div key={index} className="leading-relaxed">
            {item.type === 'system' && (
              <p className="text-muted-foreground/80">{item.content}</p>
            )}
            {item.type === 'command' && (
              <div className="flex items-center gap-2 text-foreground font-medium">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">~</span>
                <span>{item.content}</span>
              </div>
            )}
            {item.type === 'output' && (
              <pre className="text-gray-300 font-mono whitespace-pre-wrap pl-4 border-l border-border/40 my-1 text-xs">
                {item.content}
              </pre>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Row */}
      <form onSubmit={handleCommand} className="flex items-center px-4 py-3 bg-[#111114] border-t border-border/60">
        <span className="text-green-400 mr-2">➜</span>
        <span className="text-blue-400 mr-2">~</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type a command (e.g. "help", "about", "skills", "projects", "hire")...'
          className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none font-mono text-xs md:text-sm"
          autoComplete="off"
        />
        <button type="submit" className="text-muted-foreground hover:text-foreground transition-colors p-1">
          <CornerDownLeft size={14} />
        </button>
      </form>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerContainer } from '../motion'
import { Github, ExternalLink, ArrowRight, Cpu, X, Layers, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'
import { FEATURED_PROJECT } from '../personalityConfig'

// ── Habit Tracker App Mockup ──────────────────────────────────────────────
function AppMockup() {
  const habits = [
    { name: 'Morning Run & Mobility', done: true, streak: 12 },
    { name: 'Deep Work (2h Focus)', done: true, streak: 7 },
    { name: 'Hydration Target (3L)', done: true, streak: 21 },
    { name: 'Offline Reading (30m)', done: false, streak: 4 },
    { name: 'Daily Reflection & Journal', done: false, streak: 3 },
  ]

  return (
    <div className="w-full h-full bg-[#111110] rounded-2xl overflow-hidden border border-white/8 shadow-2xl flex flex-col select-none">
      {/* App header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div>
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Thursday, Sep 4</p>
          <p className="text-sm font-semibold text-white/90 mt-0.5">Today's Habits</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Local-First (IndexedDB)
          </span>
          <div className="flex items-center gap-1.5 pl-1">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-mono text-white/40">3 / 5</span>
          </div>
        </div>
      </div>

      {/* Habit list */}
      <div className="flex-1 p-4 space-y-2 overflow-hidden">
        {habits.map((habit, i) => (
          <motion.div
            key={habit.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 + 0.2, duration: 0.4 }}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all ${
              habit.done
                ? 'bg-white/5 border-white/8'
                : 'bg-transparent border-white/4'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                habit.done ? 'border-emerald-400 bg-emerald-400/20' : 'border-white/20'
              }`}>
                {habit.done && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 4l2 2 4-4" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className={`text-xs font-medium ${habit.done ? 'text-white/70 line-through' : 'text-white/60'}`}>
                {habit.name}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-amber-400 text-[10px]">🔥</span>
              <span className="text-[10px] font-mono text-white/30">{habit.streak}d</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom streak & audio widget hint */}
      <div className="px-4 py-3 border-t border-white/5 bg-white/[0.02]">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Weekly Rhythm</span>
            <span className="text-[9px] font-mono text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              🎧 Spotify Synced
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">5 / 7 days</span>
        </div>
        <div className="flex gap-1.5">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-full h-6 rounded-md ${i < 5 ? 'bg-emerald-500/30' : 'bg-white/5'}`} />
              <span className={`text-[8px] font-mono ${i < 5 ? 'text-emerald-400/70' : 'text-white/20'}`}>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Architecture Modal ─────────────────────────────────────────────────────
function ArchitectureModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl max-h-[85vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-muted/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Cpu size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Habit Tracker — System Architecture</h3>
              <p className="text-xs text-muted-foreground font-mono">Local-First Engine & Full-Stack Tech Stack</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Key Architectural Pillars */}
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border">
              <span className="text-xs font-mono font-semibold text-emerald-400 block mb-1">⚡ Zero Latency</span>
              <p className="text-xs text-muted-foreground">Dexie.js IndexedDB client database enables instant offline CRUD operations.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border">
              <span className="text-xs font-mono font-semibold text-blue-400 block mb-1">🔄 Cloud Sync</span>
              <p className="text-xs text-muted-foreground">Supabase PostgreSQL multi-device backup with secure Row Level Security (RLS).</p>
            </div>
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border">
              <span className="text-xs font-mono font-semibold text-purple-400 block mb-1">👥 Realtime Rooms</span>
              <p className="text-xs text-muted-foreground">Multiplayer social challenge rooms powered by Supabase Realtime broadcast channels.</p>
            </div>
          </div>

          {/* Categorized Tech Breakdown */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Detailed Architecture Breakdown
            </h4>

            <div className="grid gap-3">
              {FEATURED_PROJECT.architectureBreakdown.map((section, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-muted/30 border border-border/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{section.icon}</span>
                    <h5 className="text-sm font-semibold text-foreground font-mono">{section.category}</h5>
                  </div>
                  <ul className="space-y-1.5 pl-6 list-disc text-xs text-muted-foreground leading-relaxed">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Production Ready on Vercel</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={FEATURED_PROJECT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-foreground hover:text-muted-foreground border border-border px-3 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Github size={13} />
              GitHub
            </a>
            {FEATURED_PROJECT.liveUrl && (
              <a
                href={FEATURED_PROJECT.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-background bg-foreground px-3.5 py-2 rounded-lg hover:bg-foreground/90 transition-colors"
              >
                <ExternalLink size={13} />
                Open Live App
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  )
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function FeaturedProject() {
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false)

  return (
    <section id="featured" className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {/* ── Section label ── */}
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-12">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold tracking-widest text-muted-foreground uppercase">
              Featured Project
            </span>
          </div>
          <div className="h-px flex-1 bg-border" />
          <span className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {FEATURED_PROJECT.status}
          </span>
        </motion.div>

        {/* ── Main layout ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — text content */}
          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.h2
              variants={fadeUp}
              className="text-5xl sm:text-6xl font-bold text-foreground tracking-tight leading-none"
            >
              {FEATURED_PROJECT.title}
            </motion.h2>

            <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
              {FEATURED_PROJECT.tagline}
            </motion.p>

            <motion.p variants={fadeUp} className="text-sm text-muted-foreground leading-relaxed">
              {FEATURED_PROJECT.description}
            </motion.p>

            {/* Features */}
            <motion.ul variants={fadeUp} className="space-y-2">
              {FEATURED_PROJECT.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="text-foreground mt-0.5 shrink-0">—</span>
                  <span>{f}</span>
                </li>
              ))}
            </motion.ul>

            {/* Tech stack badges */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-1.5 pt-1">
              {FEATURED_PROJECT.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-muted border border-border/80 text-foreground/80"
                >
                  {t}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 pt-2">
              {FEATURED_PROJECT.liveUrl && (
                <a
                  href={FEATURED_PROJECT.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-background bg-foreground px-5 py-2.5 rounded-lg hover:bg-foreground/90 transition-all shadow-sm"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              )}
              <a
                href={FEATURED_PROJECT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-foreground border border-border px-4 py-2.5 rounded-lg hover:bg-muted transition-colors group"
              >
                <Github size={16} />
                <span>Source Code</span>
                <ArrowRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>

              {/* Architecture Deep Dive Modal Trigger */}
              <button
                type="button"
                onClick={() => setIsArchitectureOpen(true)}
                className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground border border-border/60 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors"
              >
                <Cpu size={13} className="text-amber-400" />
                <span>System Architecture</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right — App visual */}
          <motion.div
            variants={fadeUp}
            className="relative h-[420px] lg:h-[480px]"
          >
            {/* Ambient glow */}
            <div className="absolute -inset-8 bg-amber-500/5 rounded-3xl blur-3xl pointer-events-none" />

            {/* Main mockup */}
            <motion.div
              className="relative h-full w-full"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <AppMockup />
            </motion.div>

            {/* Floating mini card — streak indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-4 -left-4 bg-card/95 backdrop-blur-md border border-border rounded-xl px-4 py-3 shadow-xl z-20"
            >
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">Current Streak</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-foreground">21</span>
                <span className="text-xs font-semibold text-amber-500">🔥 days</span>
              </div>
            </motion.div>

            {/* Floating mini card — completion rate */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              viewport={{ once: true }}
              className="absolute -top-4 -right-4 bg-card/95 backdrop-blur-md border border-border rounded-xl px-4 py-3 shadow-xl z-20"
            >
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">Completion</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">73</span>
                <span className="text-xs font-semibold text-emerald-500">%</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Architecture Deep Dive Modal */}
      <AnimatePresence>
        {isArchitectureOpen && (
          <ArchitectureModal
            isOpen={isArchitectureOpen}
            onClose={() => setIsArchitectureOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../motion'
import { Github, ExternalLink, ArrowRight } from 'lucide-react'
import { FEATURED_PROJECT } from '../personalityConfig'

// ── Habit Tracker App Mockup ──────────────────────────────────────────────
// A CSS-only visual hint of the app UI — no fake screenshots
function AppMockup() {
  const habits = [
    { name: 'Morning Run', done: true, streak: 12 },
    { name: 'Read 30 min', done: true, streak: 7 },
    { name: 'Drink Water', done: true, streak: 21 },
    { name: 'No Social Media', done: false, streak: 4 },
    { name: 'Journal', done: false, streak: 3 },
  ]

  return (
    <div className="w-full h-full bg-[#111110] rounded-2xl overflow-hidden border border-white/8 shadow-2xl flex flex-col select-none">
      {/* App header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div>
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Thursday, Sep 4</p>
          <p className="text-sm font-semibold text-white/90 mt-0.5">Today's Habits</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[10px] font-mono text-white/40">3 / 5</span>
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

      {/* Bottom streak bar */}
      <div className="px-4 py-3 border-t border-white/5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">This Week</span>
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

// ── Main Component ─────────────────────────────────────────────────────────
export default function FeaturedProject() {
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

            {/* Tech stack */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {FEATURED_PROJECT.tech.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-muted border border-border text-muted-foreground"
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
                <span>View on GitHub</span>
                <ArrowRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
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
    </section>
  )
}

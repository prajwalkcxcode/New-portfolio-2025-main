import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, buttonVariants } from '../motion'
import { ArrowRight, Mail } from 'lucide-react'
import Magnetic from './ui/Magnetic'
import LocalTime from './ui/LocalTime'
import {
  ENABLE_PERSONALIZATION,
  ACTIVE_HERO_VARIANT,
  HERO_BADGES,
  CURRENTLY_BUILDING,
  NOW_ITEMS,
} from '../personalityConfig'

// ─── Original content (preserved for easy revert) ───────────────────────────
const ORIGINAL = {
  greeting: "Hi, I'm Prajwal",
  headline: 'Frontend Developer',
  headlineAccent: 'Building Modern Web',
  subtext:
    "Hi, I'm Prajwal KC from Nepal, specializing in React. I build clean, intelligent, and highly performant user interfaces.",
  buildingTitle: 'AI Portfolio Builder',
  buildingDesc:
    'Building a modern SaaS platform that helps users generate and customize professional portfolios using AI and reusable templates.',
}

export default function Hero({ onOpenResume }) {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const variant = ENABLE_PERSONALIZATION ? ACTIVE_HERO_VARIANT : null

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-20 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-muted/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <motion.div
        className="w-full max-w-3xl mx-auto text-center z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* ── Badge Row ── */}
        {/* LocalTime widget — clean single pill, no repeated badges */}
        <motion.div variants={fadeUp} className="mb-8 flex items-center justify-center">
          <Magnetic>
            <LocalTime />
          </Magnetic>
        </motion.div>

        {/* ── Headline ── */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground tracking-tight mb-6"
          variants={fadeUp}
        >
          {ENABLE_PERSONALIZATION ? variant.headline : ORIGINAL.headline}<br />
          <span className="text-muted-foreground">
            {ENABLE_PERSONALIZATION ? variant.headlineAccent : ORIGINAL.headlineAccent}
          </span>
        </motion.h1>

        {/* ── Subtext ── */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          variants={fadeUp}
        >
          {ENABLE_PERSONALIZATION ? variant.subtext : ORIGINAL.subtext}
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp}
        >
          <Magnetic>
            <motion.button
              onClick={scrollToProjects}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-foreground text-background font-medium text-sm transition-all hover:bg-foreground/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] w-full md:w-auto min-w-[160px] justify-center"
            >
              View Projects
              <ArrowRight size={16} />
            </motion.button>
          </Magnetic>

          <Magnetic>
            <motion.button
              onClick={onOpenResume}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="relative group flex items-center gap-2 px-6 py-3.5 rounded-lg border border-border bg-background/40 backdrop-blur-md text-foreground font-medium text-sm w-full md:w-auto min-w-[160px] justify-center overflow-hidden transition-all duration-300 hover:border-transparent hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
            >
              {/* Glowing gradient border */}
              <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">View CV</span>
              <motion.span
                className="relative z-10 inline-block text-xs"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.button>
          </Magnetic>

          <Magnetic>
            <motion.a
              href="#contact"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="flex items-center gap-2 px-6 py-3.5 rounded-lg border border-border bg-background/50 backdrop-blur-md text-foreground font-medium text-sm transition-colors hover:bg-muted w-full md:w-auto min-w-[160px] justify-center"
            >
              <Mail size={16} />
              Contact Me
            </motion.a>
          </Magnetic>
        </motion.div>

        {/* ── Currently Building card ── */}
        {ENABLE_PERSONALIZATION ? (
          <motion.div
            variants={fadeUp}
            className="mt-12 p-5 rounded-xl border border-blue-500/20 bg-card/60 backdrop-blur-sm max-w-md mx-auto text-left flex gap-4 items-start hover:border-blue-500/40 transition-all duration-300 shadow-[0_0_30px_-10px_rgba(59,130,246,0.2)] hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.35)] group"
          >
            {/* Animated indicator */}
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 shrink-0 mt-0.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
              </span>
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[10px] font-mono font-bold tracking-wider text-muted-foreground uppercase">Currently Building</div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold tracking-wide">
                  {CURRENTLY_BUILDING.status}
                </span>
              </div>
              <h4 className="text-base font-bold text-foreground group-hover:text-blue-400 transition-colors">{CURRENTLY_BUILDING.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{CURRENTLY_BUILDING.description}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={fadeUp}
            className="mt-12 p-4 rounded-xl border border-border bg-card/40 backdrop-blur-sm max-w-md mx-auto text-left flex gap-3.5 items-start hover:border-muted-foreground/20 transition-all duration-300 shadow-sm"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 shrink-0 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-bold tracking-wider text-muted-foreground uppercase">Currently Building</div>
              <h4 className="text-sm font-semibold text-foreground">{ORIGINAL.buildingTitle}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{ORIGINAL.buildingDesc}</p>
            </div>
          </motion.div>
        )}

        {/* ── NOW Strip ── */}
        {ENABLE_PERSONALIZATION && (
          <motion.div
            variants={fadeUp}
            className="mt-8 max-w-md mx-auto"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground/60 uppercase">Now</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {NOW_ITEMS.map((item, i) => (
                <span
                  key={i}
                  className="text-xs text-muted-foreground flex items-center gap-1.5"
                >
                  <span>{item.emoji}</span>
                  <span>{item.text}</span>
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Keyboard shortcut hint ── */}
        <motion.p
          variants={fadeUp}
          className="text-[10px] font-mono text-muted-foreground/60 mt-6 tracking-wider uppercase select-none flex items-center justify-center gap-1.5 flex-wrap"
        >
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[9px] text-muted-foreground font-semibold">Ctrl + K</kbd>
          <span>or</span>
          <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[9px] text-muted-foreground font-semibold">⌘K</kbd>
          <span>for commands</span>
          <span className="opacity-40">•</span>
          <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[9px] text-muted-foreground font-semibold">R</kbd>
          <span>for CV</span>
        </motion.p>
      </motion.div>
    </section>
  )
}

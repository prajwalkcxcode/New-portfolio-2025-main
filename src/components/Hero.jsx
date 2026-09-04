import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, buttonVariants } from '../motion'
import { ArrowRight, Mail } from 'lucide-react'
import Magnetic from './ui/Magnetic'
import LocalTime from './ui/LocalTime'
import { ACTIVE_HERO_VARIANT } from '../personalityConfig'

export default function Hero({ onOpenResume }) {
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const v = ACTIVE_HERO_VARIANT

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[640px] max-h-[640px] bg-muted/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <motion.div
        className="w-full max-w-3xl mx-auto text-center z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* LocalTime — clean single pill */}
        <motion.div variants={fadeUp} className="mb-10 flex items-center justify-center">
          <Magnetic>
            <LocalTime />
          </Magnetic>
        </motion.div>

        {/* Small intro line */}
        <motion.p
          variants={fadeUp}
          className="text-sm font-medium text-muted-foreground mb-4 tracking-wide"
        >
          {v.introLine}
        </motion.p>

        {/* Main headline — large display typography */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground tracking-tight leading-[1.05] mb-6"
          variants={fadeUp}
        >
          {v.headline}
          <br />
          <span className="text-muted-foreground">{v.headlineAccent}</span>
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
          variants={fadeUp}
        >
          {v.subtext}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          variants={fadeUp}
        >
          {/* Primary CTA */}
          <Magnetic>
            <motion.button
              onClick={() => scrollTo(v.primaryCTA.href)}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-medium text-sm transition-all hover:bg-foreground/90 w-full sm:w-auto min-w-[152px] justify-center"
            >
              {v.primaryCTA.label}
              <ArrowRight size={15} />
            </motion.button>
          </Magnetic>

          {/* Secondary CTA */}
          <Magnetic>
            <motion.button
              onClick={() => scrollTo(v.secondaryCTA.href)}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-transparent text-foreground font-medium text-sm transition-colors hover:bg-muted w-full sm:w-auto min-w-[152px] justify-center"
            >
              {v.secondaryCTA.label}
            </motion.button>
          </Magnetic>

          {/* Resume */}
          <Magnetic>
            <motion.button
              onClick={onOpenResume}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="relative group flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-background/40 backdrop-blur-md text-foreground font-medium text-sm w-full sm:w-auto min-w-[152px] justify-center overflow-hidden transition-all duration-300 hover:border-transparent hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]"
            >
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
        </motion.div>

        {/* Keyboard shortcut hint */}
        <motion.p
          variants={fadeUp}
          className="text-[10px] font-mono text-muted-foreground/50 mt-8 tracking-wider uppercase select-none flex items-center justify-center gap-1.5 flex-wrap"
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

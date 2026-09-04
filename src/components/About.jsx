import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../motion'
import ScrambledText from './ui/ScrambledText'
import { Copy, Check, Sparkles } from 'lucide-react'
import { ENABLE_PERSONALIZATION, ABOUT_CONTENT, CURRENT_STATUS, MISSION_CARD, EDUCATION_CARD } from '../personalityConfig'

// Word-by-word reveal
const wordAnimation = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } }
}
const wordStagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.018, delayChildren: 0.05 } }
}
const splitText = (text) =>
  text.split(' ').map((word, i) => (
    <motion.span key={i} variants={wordAnimation} className="inline-block mr-[0.25em]">{word}</motion.span>
  ))

export default function About() {
  const [copied, setCopied] = useState(false)
  const copyEmail = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText('prajwalkc2063@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">

        {/* ── Left column — photo + tags ── */}
        <motion.div
          className="md:col-span-4 md:sticky top-28"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.h2 className="text-3xl font-bold text-foreground mb-2" variants={fadeUp}>
            <ScrambledText text={ENABLE_PERSONALIZATION ? ABOUT_CONTENT.sectionTitle : 'About Me'} />
          </motion.h2>
          <motion.div className="w-10 h-0.5 bg-foreground mb-6" variants={fadeUp} />
          <motion.p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-10" variants={fadeUp}>
            {ENABLE_PERSONALIZATION ? ABOUT_CONTENT.sectionSubtitle : 'My Background'}
          </motion.p>

          {/* Profile photo — clean static card */}
          <motion.div variants={fadeUp} className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-border aspect-[4/5] bg-muted group">
              <img
                src="/prajwal-portrait.jpg"
                alt="Prajwal KC — Developer from Nepal"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
            </div>

            {/* Profile tags */}
            <motion.div variants={fadeUp} className="mt-4 flex flex-wrap gap-2">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-muted border border-border text-muted-foreground">
                📍 Nepal
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-muted border border-border text-muted-foreground">
                💻 React Dev
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-muted border border-border text-muted-foreground flex items-center gap-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                </span>
                Habit Tracker
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Right column — content ── */}
        <div className="md:col-span-8 space-y-8">

          {/* Paragraphs */}
          <div className="space-y-4">
            {[ABOUT_CONTENT.paragraph1, ABOUT_CONTENT.paragraph2, ABOUT_CONTENT.paragraph3].map((para, i) => (
              <motion.p
                key={i}
                variants={wordStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="text-base md:text-lg text-muted-foreground leading-relaxed"
              >
                {splitText(para)}
              </motion.p>
            ))}
          </div>

          {/* Current Status Panel */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.div variants={fadeUp} className="p-5 rounded-xl bg-muted/50 border border-border">
              <h3 className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase mb-4">
                Current Status
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {CURRENT_STATUS.map((item, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">{item.label}</span>
                    <span className="text-sm font-semibold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Cards row */}
          <motion.div
            className="grid sm:grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {/* Education */}
            <motion.div variants={fadeUp} className="p-6 rounded-xl bg-muted border border-border group hover:bg-muted/80 transition-colors">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{EDUCATION_CARD.label}</h3>
              <p className="font-semibold text-foreground group-hover:translate-x-1 transition-transform">{EDUCATION_CARD.headline}</p>
              <p className="text-muted-foreground text-sm mt-1">{EDUCATION_CARD.subtext}</p>
            </motion.div>

            {/* Mission */}
            <motion.div variants={fadeUp} className="p-6 rounded-xl bg-muted border border-border group hover:bg-muted/80 transition-colors">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{MISSION_CARD.label}</h3>
              <p className="font-semibold text-foreground group-hover:translate-x-1 transition-transform">{MISSION_CARD.headline}</p>
              <p className="text-muted-foreground text-sm mt-1">{MISSION_CARD.subtext}</p>
            </motion.div>

            {/* Email Copy */}
            <motion.div
              variants={fadeUp}
              onClick={copyEmail}
              className="sm:col-span-2 p-5 rounded-xl bg-muted/40 border border-border group hover:bg-muted hover:border-blue-500/30 transition-all duration-300 cursor-pointer flex items-center justify-between select-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground group-hover:text-blue-400 transition-colors">
                  <Sparkles size={14} className="animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground text-sm group-hover:text-blue-400 transition-colors">Get In Touch</p>
                  <p className="text-muted-foreground text-xs mt-0.5 font-mono">prajwalkc2063@gmail.com</p>
                </div>
              </div>
              <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-mono text-muted-foreground group-hover:text-foreground transition-all duration-300">
                {copied ? (
                  <><Check size={12} className="text-green-400" /><span className="text-green-400 font-semibold">Copied!</span></>
                ) : (
                  <><Copy size={12} /><span>Copy Email</span></>
                )}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

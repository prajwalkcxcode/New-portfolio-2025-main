import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, buttonVariants } from '../motion'

export default function Hero() {
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="min-h-[90vh] flex items-center px-6 pt-24 pb-20 max-w-4xl mx-auto"
    >
      <motion.div
        className="w-full"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-sm font-mono text-ink-muted uppercase tracking-wider mb-4"
          variants={fadeUp}
        >
          BSc CSIT · React & Full-Stack
        </motion.p>
        <motion.h1
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-tight tracking-tight"
          variants={fadeUp}
        >
          Prajwal KC
        </motion.h1>
        <motion.p
          className="mt-6 text-lg text-ink-muted max-w-xl leading-relaxed"
          variants={fadeUp}
        >
          Building modern web applications with React and full-stack tools. Clean code, intentional design, no fluff.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          variants={fadeUp}
        >
          <motion.button
            type="button"
            onClick={scrollToAbout}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="px-6 py-3 rounded-lg bg-[var(--accent)] text-white font-medium text-sm transition-colors"
          >
            About me
          </motion.button>
          <motion.a
            href="#contact"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="px-6 py-3 rounded-lg border border-[var(--border)] text-ink-muted hover:text-ink hover:border-ink-faint font-medium text-sm transition-colors"
          >
            Get in touch
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

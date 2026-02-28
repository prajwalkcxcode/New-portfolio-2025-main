import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../motion'

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 max-w-4xl mx-auto"
    >
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        <motion.div
          className="lg:col-span-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.h2
            className="font-serif text-2xl font-semibold text-ink"
            variants={fadeUp}
          >
            About
          </motion.h2>
          <motion.p
            className="mt-2 text-sm font-mono text-ink-muted uppercase tracking-wider"
            variants={fadeUp}
          >
            Who I am
          </motion.p>
        </motion.div>
        <motion.div
          className="lg:col-span-8 space-y-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p
            className="text-ink-muted leading-relaxed max-w-2xl"
            variants={fadeUp}
          >
            I'm Prajwal KC — a BSc CSIT student focused on React and full-stack development. I build modern, responsive
            applications with clean code and intentional design. Currently exploring the full stack: from React
            components to APIs and databases.
          </motion.p>
          <motion.div
            className="grid sm:grid-cols-2 gap-4"
            variants={fadeUp}
          >
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.10)' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="p-4 rounded-lg bg-surface-muted border border-[var(--border)] transition-shadow duration-300"
            >
              <h3 className="text-xs font-mono text-ink-faint uppercase tracking-wider mb-2">
                Education
              </h3>
              <p className="font-medium text-ink">BSc. CSIT</p>
              <p className="text-ink-muted text-sm mt-0.5">Computer Science & IT</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.10)' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="p-4 rounded-lg bg-surface-muted border border-[var(--border)] transition-shadow duration-300"
            >
              <h3 className="text-xs font-mono text-ink-faint uppercase tracking-wider mb-2">
                Focus
              </h3>
              <p className="font-medium text-ink">React & Full-Stack</p>
              <p className="text-ink-muted text-sm mt-0.5">Frontend-first, expanding backend</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

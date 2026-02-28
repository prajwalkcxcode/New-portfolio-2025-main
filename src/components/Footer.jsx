import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../motion'

const links = [
  { label: 'GitHub', href: 'https://github.com/prajwalkcxcode', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kcprajwal/', external: true },
  { label: 'Twitter', href: 'https://x.com/prajwalkc_19', external: true },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-[var(--border)] bg-surface-muted">
      <motion.div
        className="max-w-4xl mx-auto px-6 py-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <motion.div
            variants={fadeUp}
          >
            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.15 }}
              className="font-serif font-semibold text-lg text-ink hover:text-accent transition-colors"
            >
              Prajwal KC
            </motion.button>
            <p className="mt-2 text-sm text-ink-muted max-w-xs">
              BSc CSIT student. React & full-stack. Kathmandu, Nepal.
            </p>
          </motion.div>
          <nav aria-label="Footer">
            <motion.ul
              className="flex flex-wrap gap-6"
              variants={fadeUp}
            >
              {links.map(({ label, href }) => (
                <li key={label}>
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="text-sm font-medium text-ink-muted hover:text-ink link-underline"
                  >
                    {label}
                  </motion.a>
                </li>
              ))}
            </motion.ul>
          </nav>
        </div>
        <motion.div
          className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-ink-faint"
          variants={fadeUp}
        >
          <span>© {new Date().getFullYear()} Prajwal KC.</span>
          <span>Built with React, Tailwind & Framer Motion.</span>
        </motion.div>
      </motion.div>
    </footer>
  )
}

import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../motion'

const projects = [
  {
    title: 'Ecommerce Site',
    description:
      'A modern ecommerce experience with product browsing, cart, and checkout. Built with React, a Node.js API, and a focus on performance.',
    tech: ['React', 'Node.js', 'Stripe', 'Tailwind CSS'],
    href: '#',
    github: 'https://github.com/prajwalkcxcode',
  },
  {
    title: 'Weather App',
    description:
      'Weather dashboard that shows current conditions and forecasts using a public weather API, with a clean, responsive UI.',
    tech: ['React', 'TypeScript', 'OpenWeather API'],
    href: '#',
    github: 'https://github.com/prajwalkcxcode',
  },
]

export default function Work() {
  return (
    <section
      id="work"
      className="py-24 px-6 max-w-4xl mx-auto bg-surface-muted/40"
    >
      <motion.div
        className="mb-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.h2
          className="font-serif text-2xl font-semibold text-ink"
          variants={fadeUp}
        >
          Work
        </motion.h2>
        <motion.p
          className="mt-2 text-sm font-mono text-ink-muted uppercase tracking-wider"
          variants={fadeUp}
        >
          Selected projects
        </motion.p>
      </motion.div>
      <motion.ul
        className="space-y-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {projects.map((project) => (
          <motion.li
            key={project.title}
            variants={fadeUp}
            className="group border-b border-[var(--border)] pb-12 last:border-0 last:pb-0 lg:hover:-translate-y-1 lg:hover:shadow-md transition-transform duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-semibold text-ink group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-ink-muted text-sm leading-relaxed max-w-xl">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono text-ink-faint px-2 py-1 rounded bg-surface-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 flex-shrink-0">
                <a
                  href={project.href}
                  className="text-sm font-medium text-ink-muted hover:text-ink link-underline"
                >
                  Live
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-ink-muted hover:text-ink link-underline"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}

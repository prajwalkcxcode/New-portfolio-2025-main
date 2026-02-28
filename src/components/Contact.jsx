import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, buttonVariants } from '../motion'

const links = [
  { label: 'GitHub', href: 'https://github.com/prajwalkcxcode', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kcprajwal/', external: true },
  { label: 'Twitter', href: 'https://x.com/prajwalkc_19', external: true },
]

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // For a static portfolio, you'd typically wire this to an API or form service
    setTimeout(() => {
      setFormState({ name: '', email: '', message: '' })
      setStatus('sent')
    }, 800)
  }

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section
      id="contact"
      className="py-24 px-6 max-w-4xl mx-auto"
    >
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        <motion.div
          className="lg:col-span-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.h2
            className="font-serif text-2xl font-semibold text-ink"
            variants={fadeUp}
          >
            Get in touch
          </motion.h2>
          <motion.p
            className="mt-4 text-ink-muted leading-relaxed"
            variants={fadeUp}
          >
            Open to freelance and full-time opportunities. If you have a project in mind, say hello.
          </motion.p>
          <motion.div
            className="mt-8 space-y-4"
            variants={fadeUp}
          >
            <p>
              <a
                href="mailto:prajwalkc2063@gmail.com"
                className="link-underline text-ink-muted hover:text-ink font-medium"
              >
                prajwalkc2063@gmail.com
              </a>
            </p>
            <p className="text-sm text-ink-faint">Kathmandu, Nepal</p>
          </motion.div>
          <motion.div
            className="mt-8 flex gap-6"
            variants={fadeUp}
          >
            {links.map(({ label, href, external }) => (
              <motion.a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="text-sm font-medium text-ink-muted hover:text-ink link-underline"
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className="lg:col-span-7"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={fadeUp}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formState.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-surface-muted border border-[var(--border)] text-ink placeholder-ink-faint focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formState.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-surface-muted border border-[var(--border)] text-ink placeholder-ink-faint focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formState.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-surface-muted border border-[var(--border)] text-ink placeholder-ink-faint focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <motion.button
              type="submit"
              disabled={status === 'sending'}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="px-6 py-3 rounded-lg bg-[var(--accent)] text-white font-medium text-sm transition-colors disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent' : 'Send message'}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}

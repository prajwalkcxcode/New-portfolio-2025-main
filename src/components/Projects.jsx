import React, { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerContainer } from '../motion'
import {
  ExternalLink, Github, Filter, ChevronUp, ChevronDown,
  CheckCircle, Cpu, Settings, X, Info, Zap, Coffee, ScanLine, Heart
} from 'lucide-react'
import TiltCard from './ui/TiltCard'
import Magnetic from './ui/Magnetic'
import ScrambledText from './ui/ScrambledText'
import { ENABLE_PERSONALIZATION, PROJECT_DESCRIPTIONS, PROJECT_SECTION_CONTENT } from '../personalityConfig'

// ---------------------------------------------------------------------------
// Project Data
// ---------------------------------------------------------------------------
const projects = [
  {
    title: 'Modern Ecommerce',
    description: 'A full-featured ecommerce experience with product browsing, cart management, and seamless Stripe checkout. Built with a focus on web performance.',
    tech: ['React', 'Node.js', 'Stripe', 'Tailwind CSS'],
    href: '#',
    github: 'https://github.com/prajwalkcxcode',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    category: 'Full Stack',
    details: {
      problem: 'Building a performant, modern online store with real-time state updates, secure payment processing, and smooth UI transitions.',
      features: [
        'Secure checkout funnel powered by Stripe API',
        'State-preserved shopping cart synced across browser sessions',
        'Dynamic product grid with instant category filtering',
        'Admin interface to monitor inventory and customer logs'
      ],
      architecture: 'Monolithic React architecture with modular folder structures, Node.js/Express backend routes, and full session caching.'
    }
  },
  {
    title: 'Weather Dashboard',
    description: 'A sleek, responsive weather dashboard showing real-time conditions and forecasts using OpenWeather API. Features caching and weather-based themes.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'OpenWeather'],
    href: '#',
    github: 'https://github.com/prajwalkcxcode',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=800',
    category: 'Frontend',
    details: {
      problem: 'Fetching and displaying real-time weather metrics dynamically with smooth UI adaptations based on environmental conditions.',
      features: [
        'Local storage caching to prevent redundant API rate limit calls',
        'Interactive charts displaying 5-day weather forecasts',
        'Responsive layout scaling from mobile viewports up to ultrawide screens',
        'Context-aware backdrop animations mapping to sun, rain, or snow'
      ],
      architecture: 'Pure React/TypeScript setup utilizing clean hook separation, context APIs, and debounce controls for search inputs.'
    }
  },
  {
    title: 'Task Management SaaS',
    description: 'A minimalist task management tool for individuals and small teams. Includes real-time updates, drag-and-drop boards, and team collaboration.',
    tech: ['Next.js', 'MongoDB', 'Prisma', 'Framer Motion'],
    href: '#',
    github: 'https://github.com/prajwalkcxcode',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=800',
    category: 'Full Stack',
    details: {
      problem: 'Creating a highly responsive collaborative task organizer with instant updates and seamless drag-and-drop mechanics.',
      features: [
        'Fluid drag-and-drop workspace layout powered by Framer Motion',
        'Persistent database modeling using Prisma and MongoDB',
        'User authentication and role management protocols',
        'Clean, responsive workspaces styled with Tailwind CSS'
      ],
      architecture: 'Next.js server actions coupled with server-side rendered state hydration and client-side motion loops.'
    }
  },
  {
    title: 'Portfolio Template',
    description: 'A ready-to-use developer portfolio template with a clean dark aesthetic, smooth animations, and a modular component system. Preview and test it live before making it your own.',
    tech: ['React', 'Vite', 'Framer Motion', 'Tailwind CSS'],
    href: 'https://buildfolio-prajwal.vercel.app/',
    github: 'https://github.com/prajwalkcxcode',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=800',
    category: 'Template',
    details: {
      problem: 'Most developers spend weeks building their portfolio from scratch. This template provides a production-ready starting point with best-in-class design patterns already implemented.',
      features: [
        'Fully responsive layout optimised for all screen sizes',
        'Dark-mode-first design with smooth theme transitions',
        'Framer Motion powered section reveal and micro-animations',
        'Modular component architecture — swap sections in minutes',
        'SEO-ready with semantic HTML and meta tag structure'
      ],
      architecture: 'Vite + React single-page app with a flat component hierarchy, a centralised CSS variable design token system, and zero runtime dependencies beyond Framer Motion.'
    }
  },
  {
    title: 'AI Portfolio Builder',
    description: 'An AI-powered platform that generates and customises a professional portfolio website for you with minimal effort. Describe yourself — the AI does the rest.',
    tech: ['Next.js', 'OpenAI', 'Tailwind CSS', 'Prisma'],
    href: 'https://portfolio-ai-gamma-beige.vercel.app/',
    github: 'https://github.com/prajwalkcxcode',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=800',
    category: 'AI / SaaS',
    wip: true,
    details: {
      problem: 'Non-technical professionals struggle to create polished portfolio websites. This platform removes all friction by using AI to generate, populate, and customise a complete portfolio from a simple prompt.',
      features: [
        'AI-generated content and layout selection from a single prompt',
        'Real-time section customisation with live preview',
        'One-click deployment to Vercel or custom domain',
        'Intelligent skill and project inference from resume upload',
        'Multiple design themes with instant switching'
      ],
      architecture: 'Next.js App Router with OpenAI streaming responses, Prisma ORM for project persistence, and a server-action-driven generation pipeline.'
    }
  }
]

const ALL_FILTER_TAGS = ['All', 'Frontend', 'Full Stack', 'React', 'TypeScript', 'Next.js', 'Node.js', 'Template', 'AI / SaaS']

// ---------------------------------------------------------------------------
// Toast System (self-contained, uses already-imported Framer Motion)
// ---------------------------------------------------------------------------
let toastIdCounter = 0

function ToastContainer({ toasts, onDismiss }) {
  return createPortal(
    <div className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-2 items-end pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-start gap-3 bg-card border border-border text-foreground text-xs font-mono rounded-xl px-4 py-3 shadow-lg max-w-xs"
            style={{ backdropFilter: 'blur(12px)' }}
          >
            <span className="mt-0.5 shrink-0">
              {toast.type === 'success' ? (
                <CheckCircle size={13} className="text-emerald-400" />
              ) : (
                <Info size={13} className="text-blue-400" />
              )}
            </span>
            <span className="leading-relaxed text-muted-foreground flex-1">
              {toast.message}
            </span>
            <button
              onClick={() => onDismiss(toast.id)}
              className="ml-1 text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-0.5"
              aria-label="Dismiss notification"
            >
              <X size={12} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  )
}

function useToast() {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const show = useCallback((message, type = 'info') => {
    const id = ++toastIdCounter
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4500)
  }, [])

  return { toasts, show, dismiss }
}

// ---------------------------------------------------------------------------
// Main Projects Component
// ---------------------------------------------------------------------------
export default function Projects() {
  const [selectedTag, setSelectedTag] = useState('All')
  const [expandedProject, setExpandedProject] = useState(null)
  const { toasts, show: showToast, dismiss: dismissToast } = useToast()

  const filteredProjects = selectedTag === 'All'
    ? projects
    : projects.filter((p) =>
        p.category === selectedTag || p.tech.includes(selectedTag)
      )

  const toggleProjectDetails = (projectTitle) => {
    setExpandedProject(expandedProject === projectTitle ? null : projectTitle)
  }

  const handleExternalLink = (href, label) => {
    window.open(href, '_blank', 'noopener,noreferrer')
    showToast(`Opening ${label} in a new tab.`, 'success')
  }

  const handleWipClick = () => {
    showToast('AI Portfolio Builder is currently in development. Stay tuned for updates!', 'info')
  }

  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <section id="projects" className="py-24 px-6 max-w-5xl mx-auto overflow-visible">
        <motion.div
          className="mb-16 md:text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.h2 className="text-3xl font-bold text-foreground mb-4" variants={fadeUp}>
            <ScrambledText text={ENABLE_PERSONALIZATION ? PROJECT_SECTION_CONTENT.heading : 'Selected Projects'} />
          </motion.h2>
          <motion.p className="text-muted-foreground max-w-2xl mx-auto" variants={fadeUp}>
            {ENABLE_PERSONALIZATION
              ? PROJECT_SECTION_CONTENT.subtext
              : 'A showcase of my recent work focusing on clean UI, robust architecture, and real-world problem solving.'}
          </motion.p>
        </motion.div>

        {/* Dynamic Tag & Stack Matrix Filtering */}
        <div className="flex justify-center items-center gap-2 mb-12 flex-wrap">
          <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground mr-2 hidden sm:flex">
            <Filter size={13} />
            <span>Filter:</span>
          </div>
          {ALL_FILTER_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                selectedTag === tag
                  ? 'bg-foreground text-background font-semibold shadow-md'
                  : 'bg-muted/40 border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="perspective-1000"
              >
                <TiltCard>
                  <div className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-[0_20px_50px_-12px_rgba(255,255,255,0.05)] transition-shadow duration-300">
                    {/* Image wrapper */}
                    <div className="h-48 bg-muted border-b border-border relative overflow-hidden flex items-center justify-center">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/10 opacity-50 z-0" />
                          <span className="text-muted-foreground/50 font-medium tracking-widest text-sm uppercase relative z-10">
                            Project Preview
                          </span>
                        </>
                      )}

                      {/* WIP Badge */}
                      {project.wip && (
                        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-amber-500/90 text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded-full tracking-wider shadow-md">
                          <Zap size={9} className="shrink-0" />
                          COMING SOON
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col bg-background relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-foreground">
                          {project.title}
                        </h3>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground uppercase border border-border">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {ENABLE_PERSONALIZATION && PROJECT_DESCRIPTIONS[project.title]
                          ? PROJECT_DESCRIPTIONS[project.title]
                          : project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono text-foreground bg-muted px-2 py-0.5 rounded border border-border/50"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <Magnetic>
                          {project.wip ? (
                            // WIP: show github link but muted
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors p-1.5 -ml-1 rounded-md hover:bg-muted font-mono"
                            >
                              <Github size={14} />
                              Source Code
                            </a>
                          ) : (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors p-1.5 -ml-1 rounded-md hover:bg-muted font-mono"
                            >
                              <Github size={14} />
                              Source Code
                            </a>
                          )}
                        </Magnetic>
                        <button
                          onClick={() => {
                            toggleProjectDetails(project.title)
                            if (project.wip && expandedProject !== project.title) {
                              showToast('AI Portfolio Builder is currently in development. Stay tuned for updates!', 'info')
                            }
                          }}
                          className="text-xs font-mono font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                        >
                          {expandedProject === project.title ? (
                            <>
                              <ChevronUp size={14} />
                              Hide Details
                            </>
                          ) : (
                            <>
                              <ChevronDown size={14} />
                              View Details
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Details Section */}
                    <AnimatePresence>
                      {expandedProject === project.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden border-t border-border bg-muted/30"
                        >
                          <div className="p-6 space-y-5">
                            {/* Key Features */}
                            <div className="space-y-3">
                              <h4 className="text-[10px] font-mono tracking-widest text-blue-500 uppercase flex items-center gap-2 font-bold">
                                <CheckCircle size={14} /> Key Features
                              </h4>
                              <ul className="space-y-2">
                                {project.details?.features.map((f, i) => (
                                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
                                    <span className="text-blue-500 font-semibold mt-0.5">✔</span>
                                    <span>{f}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Core Problem Solved */}
                            <div className="space-y-2">
                              <h4 className="text-[10px] font-mono tracking-widest text-blue-500 uppercase flex items-center gap-2 font-bold">
                                <Cpu size={14} /> Core Problem Solved
                              </h4>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {project.details?.problem}
                              </p>
                            </div>

                            {/* Architecture Summary */}
                            <div className="space-y-2">
                              <h4 className="text-[10px] font-mono tracking-widest text-blue-500 uppercase flex items-center gap-2 font-bold">
                                <Settings size={14} /> Architecture Summary
                              </h4>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {project.details?.architecture}
                              </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 text-xs font-mono font-medium text-foreground bg-muted border border-border px-4 py-2.5 rounded-lg hover:bg-muted/80 transition-colors"
                              >
                                <Github size={14} />
                                View Source Code
                              </a>

                              {/* Portfolio Template: real Live Demo link */}
                              {!project.wip && project.href && project.href !== '#' && (
                                <button
                                  onClick={() => handleExternalLink(project.href, project.title)}
                                  className="flex-1 flex items-center justify-center gap-2 text-xs font-mono font-medium text-background bg-foreground px-4 py-2.5 rounded-lg hover:bg-foreground/90 transition-colors"
                                >
                                  <ExternalLink size={14} />
                                  Live Demo
                                </button>
                              )}

                              {/* WIP project: button shows toast */}
                              {project.wip && (
                                <button
                                  onClick={handleWipClick}
                                  className="flex-1 flex items-center justify-center gap-2 text-xs font-mono font-medium text-amber-400 border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 rounded-lg hover:bg-amber-500/20 transition-colors cursor-pointer"
                                >
                                  <Zap size={14} />
                                  Coming Soon
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Support Section                                                   */}
        {/* ---------------------------------------------------------------- */}
        <SupportSection />
      </section>

      {/* QR Modal — rendered at root level so it overlays everything */}
    </>
  )
}

// ---------------------------------------------------------------------------
// Support Section + QR Modal (self-contained)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// PAYMENT_METHODS — commented out, restore to re-enable eSewa & Khalti buttons
// ---------------------------------------------------------------------------
// const PAYMENT_METHODS = [
//   {
//     id: 'esewa',
//     label: 'eSewa',
//     description: 'Pay via eSewa',
//     qr: '/esewa-qr.jpg',
//     accent: '#60bb46',
//     accentMuted: 'rgba(96,187,70,0.12)',
//     badge: 'eSewa',
//     icon: '🟢',
//     cropPosition: '50% 22%',  // frames the white QR box in the eSewa screenshot
//   },
//   {
//     id: 'khalti',
//     label: 'Khalti',
//     description: 'Pay via Khalti',
//     qr: '/khalti-qr.jpg',
//     accent: '#5c2d91',
//     accentMuted: 'rgba(92,45,145,0.12)',
//     badge: 'Khalti',
//     icon: '🟣',
//     cropPosition: '50% 42%',  // frames the white QR box in the Khalti screenshot
//   },
// ]

function QRModal({ method, onClose }) {
  const overlayRef = useRef(null)

  // Close on Escape + lock body scroll — only fires when modal is open
  useEffect(() => {
    if (!method) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = prev
    }
  }, [method, onClose])

  const handleBackdrop = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  // Portal to document.body — escapes AnimLayout's filter stacking context
  return createPortal(
    <AnimatePresence>
      {method && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 flex items-center justify-center p-6"
          style={{ zIndex: 99999, backgroundColor: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(8px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdrop}
          aria-modal="true"
          role="dialog"
          aria-label={`${method.label} QR Code`}
        >
          <motion.div
            className="relative w-full bg-card border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{ maxWidth: '300px' }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Accent top bar */}
            <div
              className="h-0.5 w-full shrink-0"
              style={{ background: `linear-gradient(90deg, transparent, ${method.accent}, transparent)` }}
            />

            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-3 pb-2 shrink-0">
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[9px]"
                  style={{ background: method.accentMuted }}
                >
                  {method.icon}
                </div>
                <span
                  className="text-[11px] font-mono font-bold tracking-widest uppercase"
                  style={{ color: method.accent }}
                >
                  {method.label}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-6 h-6 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X size={13} />
              </button>
            </div>

            {/* QR Code — white bg ensures scannable and visible on any theme */}
            <div className="px-4 pb-2 shrink-0">
              <div
                className="rounded-xl overflow-hidden"
                style={{ height: '210px', background: '#ffffff' }}
              >
                <img
                  src={method.qr}
                  alt={`${method.label} QR code for Prajwal K.C.`}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: method.cropPosition }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 pb-4 pt-2 flex flex-col items-center gap-1 shrink-0">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <ScanLine size={11} />
                <span className="text-[10px] font-mono">
                  Scan with your {method.label} app
                </span>
              </div>
              <p className="text-[9px] text-muted-foreground/50 font-mono">
                Prajwal K.C. · 9844995564
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

function SupportSection() {
  // const [activeMethod, setActiveMethod] = useState(null) // restore with eSewa/Khalti

  return (
    <>
      {/* <QRModal method={activeMethod} onClose={() => setActiveMethod(null)} /> */}

      <motion.div
        className="mt-16 flex justify-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <div className="w-full max-w-md bg-card border border-border rounded-2xl px-6 py-6 flex flex-col items-center text-center gap-4">

          {/* Label */}
          <div className="flex items-center gap-2">
            <Heart size={13} className="text-rose-400" />
            <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-muted-foreground">
              Support My Work
            </span>
          </div>

          {/* Message */}
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            If you enjoy my projects and find my work valuable, you can support future development through the options below.
          </p>

          {/* Divider */}
          <div className="w-full border-t border-border" />

          {/* ── eSewa & Khalti buttons — commented out, restore when ready ──
          <div className="flex flex-col sm:flex-row gap-2.5 w-full">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                onClick={() => setActiveMethod(method)}
                className="flex-1 flex items-center justify-center gap-2 text-xs font-mono font-semibold text-foreground bg-muted border border-border px-4 py-2.5 rounded-xl hover:bg-muted/80 hover:border-border/60 transition-all duration-200 group"
              >
                <span className="text-sm">{method.icon}</span>
                Support via {method.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 border-t border-border" />
            <span className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest">or</span>
            <div className="flex-1 border-t border-border" />
          </div>
          ── end eSewa & Khalti ── */}

          {/* Buy Me a Coffee */}
          <a
            href="https://buymeacoffee.com/prajwalkcxcodes"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 text-xs font-mono font-semibold text-foreground bg-muted border border-border px-4 py-2.5 rounded-xl hover:bg-muted/80 hover:border-border/60 transition-all duration-200"
          >
            <Coffee size={13} className="text-amber-400" />
            Buy Me a Coffee
          </a>

          {/* Sub-note */}
          <p className="text-[10px] font-mono text-muted-foreground/50">
            Any amount appreciated · Thank you ♥
          </p>
        </div>
      </motion.div>
    </>
  )
}

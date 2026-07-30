import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerContainer } from '../motion'
import { ExternalLink, Github, Eye, Filter } from 'lucide-react'
import TiltCard from './ui/TiltCard'
import Magnetic from './ui/Magnetic'
import ScrambledText from './ui/ScrambledText'
import ProjectModal from './ui/ProjectModal'

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
  }
]

const ALL_FILTER_TAGS = ['All', 'Frontend', 'Full Stack', 'React', 'TypeScript', 'Next.js', 'Node.js']

export default function Projects() {
  const [selectedTag, setSelectedTag] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProjects = selectedTag === 'All'
    ? projects
    : projects.filter((p) => 
        p.category === selectedTag || p.tech.includes(selectedTag)
      )

  const openProjectDetails = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto overflow-visible">
      <motion.div
        className="mb-16 md:text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.h2 className="text-3xl font-bold text-foreground mb-4" variants={fadeUp}>
          <ScrambledText text="Selected Projects" />
        </motion.h2>
        <motion.p className="text-muted-foreground max-w-2xl mx-auto" variants={fadeUp}>
          A showcase of my recent work focusing on clean UI, robust architecture, and real-world problem solving.
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
              className="perspective-1000 h-full"
            >
              <TiltCard className="h-full">
                <div
                  onClick={() => openProjectDetails(project)}
                  className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-[0_20px_50px_-12px_rgba(255,255,255,0.05)] transition-shadow duration-300 h-full cursor-pointer"
                >
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
                    {/* View Details Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/80 border border-white/10 text-xs font-mono font-medium text-foreground backdrop-blur-sm">
                        <Eye size={12} />
                        View Details
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow bg-background relative z-10">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-muted-foreground transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground uppercase border border-border">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono text-foreground bg-muted px-2 py-0.5 rounded border border-border/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border" onClick={(e) => e.stopPropagation()}>
                      <Magnetic>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors p-1.5 -ml-1 rounded-md hover:bg-muted font-mono"
                        >
                          <Github size={14} />
                          Source Code
                        </a>
                      </Magnetic>
                      <button
                        onClick={() => openProjectDetails(project)}
                        className="text-xs font-mono font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                      >
                        Details →
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}

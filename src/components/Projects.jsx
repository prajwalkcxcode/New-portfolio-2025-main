import React from 'react'
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion'
import { fadeUp, staggerContainer } from '../motion'
import { ExternalLink, Github } from 'lucide-react'
import TiltCard from './ui/TiltCard'
import Magnetic from './ui/Magnetic'
import ScrambledText from './ui/ScrambledText'

const projects = [
  {
    title: 'Modern Ecommerce',
    description: 'A full-featured ecommerce experience with product browsing, cart management, and seamless Stripe checkout. Built with a focus on web performance.',
    tech: ['React', 'Node.js', 'Stripe', 'Tailwind CSS'],
    href: '#',
    github: 'https://github.com/prajwalkcxcode',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Weather Dashboard',
    description: 'A sleek, responsive weather dashboard showing real-time conditions and forecasts using OpenWeather API. Features caching and dynamic themes based on weather.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'OpenWeather'],
    href: '#',
    github: 'https://github.com/prajwalkcxcode',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Task Management SaaS',
    description: 'A minimalist task management tool for individuals and small teams. Includes real-time updates, drag-and-drop boards, and team collaboration.',
    tech: ['Next.js', 'MongoDB', 'Prisma', 'Framer Motion'],
    href: '#',
    github: 'https://github.com/prajwalkcxcode',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=800'
  }
]

export default function Projects() {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const skewVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const skewY = useTransform(skewVelocity, [-1000, 1000], [3, -3])

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

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        style={{ skewY }}
      >
        {projects.map((project, index) => (
          <motion.div key={project.title} variants={fadeUp} className="perspective-1000 h-full">
            <TiltCard className="h-full">
              <div
                className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-[0_20px_50px_-12px_rgba(255,255,255,0.05)] transition-shadow duration-300 h-full"
              >
                {/* Project Image Placeholder or Image */}
                <div className="h-48 bg-muted border-b border-border relative overflow-hidden flex items-center justify-center">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={`${project.title} preview`} 
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/10 opacity-50 z-0" />
                      <span className="text-muted-foreground/50 font-medium tracking-widest text-sm uppercase relative z-10 transition-transform group-hover:scale-110 duration-500">
                        Project Preview
                      </span>
                    </>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow bg-background relative z-10">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-muted-foreground transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-medium text-foreground bg-muted px-2.5 py-1 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border">
                    <Magnetic>
                      <a
                        href={project.href}
                        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2 rounded-md hover:bg-muted"
                      >
                        <ExternalLink size={16} />
                        Live Preview
                      </a>
                    </Magnetic>
                    <Magnetic>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted"
                      >
                        <Github size={16} />
                        Code
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../motion'

const timeline = [
  {
    year: '2025',
    title: 'Preparing for Full-Stack Roles',
    description: 'Deep diving into backend technologies (Node.js, Express, MongoDB) while continuing to refine frontend architectures with Next.js.',
    status: 'current'
  },
  {
    year: '2024',
    title: 'Building Real Projects',
    description: 'Started applying React to build comprehensive applications like ecommerce platforms and productivity tools, focusing on state management and API integration.',
    status: 'past'
  },
  {
    year: '2023',
    title: 'Mastering React & Modern JS',
    description: 'Transitioned from vanilla JavaScript to React. Learned about component lifecycles, hooks, and modern CSS frameworks like Tailwind.',
    status: 'past'
  },
  {
    year: '2022',
    title: 'The Beginning',
    description: 'Started the journey into web development alongside BSc. CSIT studies. Mastered the fundamentals of HTML, CSS, and algorithmic problem solving.',
    status: 'past'
  }
]

export default function Journey() {
  return (
    <section id="journey" className="py-24 px-6 max-w-4xl mx-auto">
      <motion.div
        className="mb-16 md:text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.h2 className="text-3xl font-bold text-foreground mb-4" variants={fadeUp}>
          My Journey
        </motion.h2>
        <motion.p className="text-muted-foreground" variants={fadeUp}>
          A timeline of my growth and learning in software development.
        </motion.p>
      </motion.div>

      <motion.div
        className="relative border-l border-border ml-3 md:ml-0 md:border-l-0 md:border-t flex flex-col md:flex-row md:justify-around gap-10 md:gap-4 md:pt-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Scroll Progress Line */}
        <div className="md:hidden absolute top-0 left-[-1px] w-[2px] bg-foreground h-full z-10" />
        <div className="hidden md:block absolute top-[-1px] left-0 h-[2px] bg-foreground w-full z-10" />
        
        {timeline.map((item, index) => (
          <motion.div
            key={item.year}
            variants={fadeUp}
            className="relative pl-8 md:pl-0 md:flex-1 md:text-center group"
          >
            {/* Timeline Dot */}
            <div className={`absolute left-0 md:left-1/2 top-1.5 md:-top-12 md:-translate-x-1/2 -ml-[5px] md:ml-0 w-2.5 h-2.5 rounded-full z-20 transition-colors duration-300 ${item.status === 'current' ? 'bg-foreground ring-4 ring-background' : 'bg-muted-foreground/30 group-hover:bg-foreground'}`} />
            
            <span className="inline-block text-sm font-bold text-foreground bg-muted px-3 py-1 rounded-full mb-4">
              {item.year}
            </span>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

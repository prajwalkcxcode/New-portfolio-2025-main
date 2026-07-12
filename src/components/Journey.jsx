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

      {/* Mini Learning Timeline */}
      <div className="mt-28 pt-16 border-t border-border/40">
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl font-semibold text-center text-foreground mb-12 tracking-wider font-mono uppercase"
        >
          Learning Pathway
        </motion.h3>

        <div className="max-w-md mx-auto relative pl-8 sm:pl-0">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-16 relative">
            
            {/* Item 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-50px' }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between group"
            >
              <div className="hidden sm:block w-[42%] text-right pr-6">
                <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest">2024</span>
              </div>
              
              {/* Dot */}
              <div className="absolute left-4 sm:left-1/2 w-[11px] h-[11px] rounded-full bg-border border border-background -translate-x-1/2 z-10 group-hover:bg-blue-500 group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0)] group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              
              <div className="w-full sm:w-[42%] sm:pl-6">
                <span className="sm:hidden text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest block mb-1">2024</span>
                <h4 className="font-semibold text-foreground text-sm tracking-wide">Frontend Development</h4>
                <p className="text-xs text-muted-foreground mt-1">Deepening core React architectures, complex animations, state management, and modern CSS.</p>
              </div>
            </motion.div>

            {/* Down Arrow 1 */}
            <div className="absolute left-4 sm:left-1/2 top-[44px] -translate-x-1/2 text-muted-foreground/30 text-sm pointer-events-none select-none font-mono">↓</div>

            {/* Item 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-50px' }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between group pt-4"
            >
              <div className="w-full sm:w-[42%] text-left sm:text-right sm:pr-6">
                <span className="sm:hidden text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest block mb-1">2025</span>
                <h4 className="font-semibold text-foreground text-sm tracking-wide">Full Stack Development</h4>
                <p className="text-xs text-muted-foreground mt-1">Expanding into databases (MongoDB), Node.js, and server-side API systems.</p>
              </div>
              
              {/* Dot */}
              <div className="absolute left-4 sm:left-1/2 w-[11px] h-[11px] rounded-full bg-border border border-background -translate-x-1/2 z-10 group-hover:bg-purple-500 group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0)] group-hover:shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              
              <div className="hidden sm:block w-[42%] pl-6">
                <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest">2025</span>
              </div>
            </motion.div>

            {/* Down Arrow 2 */}
            <div className="absolute left-4 sm:left-1/2 top-[162px] -translate-x-1/2 text-muted-foreground/30 text-sm pointer-events-none select-none font-mono">↓</div>

            {/* Item 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-50px' }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between group pt-4"
            >
              <div className="hidden sm:block w-[42%] text-right pr-6">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest animate-pulse">Currently</span>
              </div>
              
              {/* Dot */}
              <div className="absolute left-4 sm:left-1/2 w-[11px] h-[11px] rounded-full bg-blue-500 border border-background -translate-x-1/2 z-10 scale-125 shadow-[0_0_12px_rgba(59,130,246,0.6)] animate-pulse" />
              
              <div className="w-full sm:w-[42%] sm:pl-6">
                <span className="sm:hidden text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block mb-1 animate-pulse">Currently</span>
                <h4 className="font-semibold text-foreground text-sm tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Docker & DevOps</h4>
                <p className="text-xs text-muted-foreground mt-1">Containers, orchestration, virtual machine operations, and cloud architecture fundamentals.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

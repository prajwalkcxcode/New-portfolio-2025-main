import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../motion'
import ScrambledText from './ui/ScrambledText'

const learningSkills = [
  {
    name: 'Docker',
    icon: (
      <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V8.906c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.987c0 .102.083.185.186.185m-2.691 0h2.118c.102 0 .185-.083.185-.185V8.906c0-.102-.083-.186-.185-.186h-2.118c-.103 0-.186.084-.186.186v1.987c0 .102.083.185.186.185m-2.69 0h2.118c.103 0 .186-.083.186-.185V8.906c0-.102-.083-.186-.186-.186H8.602c-.103 0-.186.084-.186.186v1.987c0 .102.083.185.186.185m-2.69 0h2.118c.103 0 .186-.083.186-.185V8.906c0-.102-.083-.186-.186-.186H5.912c-.103 0-.186.084-.186.186v1.987c0 .102.083.185.186.185m-2.69 0h2.119c.102 0 .185-.083.185-.185V8.906c0-.102-.083-.186-.185-.186H3.222c-.102 0-.185.084-.185.186v1.987c0 .102.083.185.185.185m2.69-2.38h2.118c.103 0 .186-.083.186-.186V6.526c0-.102-.083-.186-.186-.186H5.912c-.103 0-.186.084-.186.186v1.986c0 .103.083.186.186.186m2.69 0h2.118c.103 0 .186-.083.186-.186V6.526c0-.102-.083-.186-.186-.186H8.602c-.103 0-.186.084-.186.186v1.986c0 .103.083.186.186.186m2.69 0h2.118c.102 0 .185-.083.185-.186V6.526c0-.102-.083-.186-.185-.186h-2.118c-.103 0-.186.084-.186.186v1.986c0 .103.083.186.186.186m-2.69-2.38h2.118c.103 0 .186-.084.186-.186V4.145c0-.102-.083-.186-.186-.186H8.602c-.103 0-.186.084-.186.186v1.987c0 .102.083.186.186.186m12.908 6.002c-.512-.326-1.138-.223-1.745-.102-.63.124-1.285.26-1.92.26-.11 0-.198.09-.198.2v1.026c0 .878-.456 1.688-1.2 2.14-.15.09-.23.23-.23.4v.93c0 .18.11.35.28.42 1.34.61 2.37 1.68 2.87 3.03.08.2.25.32.46.32h.06c2.7-.22 5.09-2.02 5.9-4.63.12-.4.18-.81.18-1.23 0-1.23-.51-2.35-1.46-3.15M17.42 19.98c-1.45.05-3.07-.36-4.22-1.34a.194.194 0 01-.06-.18c.03-.13.12-.23.25-.26.85-.2 1.77-.38 2.65-.63.14-.04.28.02.35.14.3.52.73.96 1.25 1.29.13.08.15.25.04.37-.09.09-.17.11-.26.11m-14.86-5.46c.07.7 1.83 5.46 8.5 5.46.33 0 .6-.27.6-.6V16.3c0-.13-.08-.24-.2-.28-1.44-.52-2.73-1.41-3.69-2.58-.09-.11-.24-.15-.37-.09-1.25.59-2.61.94-3.99 1.07-.15.01-.27.12-.27.27z"/>
      </svg>
    ),
    progress: 80,
    status: 'Currently Learning',
    color: 'from-blue-500/20 to-cyan-500/5',
    borderColor: 'group-hover:border-blue-500/50'
  },
  {
    name: 'DevOps',
    icon: (
      <svg className="w-8 h-8 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19a7 7 0 100-14 7 7 0 000 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 17.5L22 22M6.5 6.5L2 2" />
      </svg>
    ),
    progress: 60,
    status: 'Currently Learning',
    color: 'from-orange-500/20 to-red-500/5',
    borderColor: 'group-hover:border-orange-500/50'
  },
  {
    name: 'React',
    icon: (
      <svg className="w-8 h-8 text-cyan-400 animate-[spin_8s_linear_infinite]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 8.7c-1.8 0-3.3 1.5-3.3 3.3s1.5 3.3 3.3 3.3 3.3-1.5 3.3-3.3-1.5-3.3-3.3-3.3zm0 5.4c-1.2 0-2.1-.9-2.1-2.1 0-1.2.9-2.1 2.1-2.1 1.2 0 2.1.9 2.1 2.1 0 1.2-.9 2.1-2.1 2.1z" />
        <path d="M21.9 11.2c-.4-1.9-1.9-3.7-4.1-4.9-2.4-1.4-5.1-1.9-7.2-1.3-2.1.6-3.7 2.1-4.2 4.1-.4 1.9.1 3.9 1.4 5.4 1.3 1.5 3.2 2.4 5.3 2.6.4.1.8.1 1.2.1 1.9 0 3.7-.6 5.2-1.6 2.3-1.6 3.7-3.9 4-6.4 0 .8-.6 1.6-1.6 2-.9.4-2 .5-3 .2-.4-.1-.7-.3-.8-.7s-.1-.8.2-1.1c.9-1 1.4-2.2 1.4-3.5 0-2-1.3-3.8-3.3-4.5s-4.3-.2-5.9 1.3c-.6.6-1 1.3-1.3 2.1-.1.4-.4.6-.8.7s-.8-.1-1-.4c-.9-1.2-.9-2.8-.2-4.1.7-1.3 2.1-2.2 3.8-2.5 1.7-.3 3.5.1 5 1.1 2.2 1.3 3.7 3.5 4.1 6.1s-.2 5.1-1.8 7c-.3.4-.8.5-1.2.3s-.5-.8-.3-1.2c1.2-1.9 1.7-4.1 1.2-6.2z" />
      </svg>
    ),
    progress: 100,
    status: 'Mastered',
    color: 'from-cyan-500/20 to-blue-500/5',
    borderColor: 'group-hover:border-cyan-500/50'
  },
  {
    name: 'Node.js',
    icon: (
      <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm0-4c0 .83-.67 1.5-1.5 1.5S9 13.33 9 12.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm0-4C13 9.83 12.33 10.5 11.5 10.5S10 9.83 10 9s.67-1.5 1.5-1.5 1.5.67 1.5 1.5z"/>
      </svg>
    ),
    progress: 85,
    status: 'Currently Learning',
    color: 'from-green-500/20 to-emerald-500/5',
    borderColor: 'group-hover:border-green-500/50'
  },
  {
    name: 'MongoDB',
    icon: (
      <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-.2 0-.4 0-.6.1-.7.2-1.3.5-1.8.9C8.3 4.1 7.2 6 6.7 8.3c-.6 2.7-.4 5.3.6 7.6.8 1.9 2.2 3.5 3.9 4.6.4.3.7.1.8-.3v-1.9c0-.4.3-.8.7-.9.8-.3 1.5-.8 2-1.5.9-1.2 1.3-2.6 1.2-4.1-.1-2.1-1-4.1-2.5-5.6-.6-.6-1.3-1.1-2-1.5-.1 0-.3-.1-.4-.2V2z"/>
      </svg>
    ),
    progress: 75,
    status: 'Currently Learning',
    color: 'from-emerald-500/20 to-teal-500/5',
    borderColor: 'group-hover:border-emerald-500/50'
  },
  {
    name: 'Cloud Fundamentals',
    icon: (
      <svg className="w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    progress: 70,
    status: 'Currently Learning',
    color: 'from-purple-500/20 to-pink-500/5',
    borderColor: 'group-hover:border-purple-500/50'
  }
]

export default function Learning() {
  const getProgressBar = (percentage) => {
    const totalBars = 10
    const filledBars = Math.round((percentage / 100) * totalBars)
    const emptyBars = totalBars - filledBars
    return '█'.repeat(filledBars) + '░'.repeat(emptyBars)
  }

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <section id="learning" className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div
        className="mb-16 md:text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.h2 className="text-3xl font-bold text-foreground mb-4" variants={fadeUp}>
          <ScrambledText text="Current Focus" />
        </motion.h2>
        <motion.p className="text-muted-foreground max-w-2xl mx-auto" variants={fadeUp}>
          Technologies and domains I am actively exploring, mastering, and integrating into my engineering stack.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {learningSkills.map((skill) => (
          <motion.div
            key={skill.name}
            variants={fadeUp}
            onMouseMove={handleMouseMove}
            className="group relative flex flex-col justify-between p-6 bg-card border border-border rounded-2xl overflow-hidden hover:shadow-[0_20px_50px_-12px_rgba(255,255,255,0.03)] transition-all duration-500 hover:-translate-y-1 cursor-default"
          >
            {/* Spotlight radial background glow */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
              style={{
                background: `radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(59, 130, 246, 0.08), transparent 80%)`
              }}
            />

            {/* Spotlight radial border glow */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
              style={{
                background: `radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(168, 85, 247, 0.2), transparent 80%)`,
                padding: '1px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }}
            />

            {/* Ambient Background Glow on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-50 transition-opacity duration-700 z-0`} />
            
            {/* Glowing borders */}
            <div className={`absolute inset-0 border border-transparent rounded-2xl transition-colors duration-500 z-10 ${skill.borderColor}`} />
            
            <div className="relative z-20 flex items-start justify-between mb-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                  {skill.status}
                </span>
                <h3 className="text-xl font-semibold text-foreground mt-1 group-hover:text-white transition-colors duration-300">
                  {skill.name}
                </h3>
              </div>
              <div className="p-2 rounded-lg bg-muted border border-border group-hover:bg-background group-hover:border-muted-foreground/30 transition-all duration-300">
                {skill.icon}
              </div>
            </div>

            <div className="relative z-20 space-y-2 mt-auto">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground/80 tracking-wider">
                  {getProgressBar(skill.progress)}
                </span>
                <span className="text-foreground font-semibold">
                  {skill.progress}%
                </span>
              </div>
              
              {/* Actual thin progress bar */}
              <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="h-full bg-foreground group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

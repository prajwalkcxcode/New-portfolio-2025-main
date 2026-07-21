import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, buttonVariants } from '../motion'
import { ArrowRight, Mail } from 'lucide-react'
import Magnetic from './ui/Magnetic'
import LocalTime from './ui/LocalTime'
// import Scene from './ui/Scene'

export default function Hero({ onOpenResume }) {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-20 overflow-hidden"
    >
      {/* 3D Scene Background Disabled for Debugging */}
      {/* <Scene /> */}

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-muted/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <motion.div
        className="w-full max-w-3xl mx-auto text-center z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Memoji Welcoming Pill */}
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-muted/80 border border-border shadow-sm backdrop-blur-sm select-none">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20 shrink-0">
              <img src="/memoji.png" alt="Memoji Avatar" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-semibold text-foreground">Hi, I'm Prajwal</span>
          </div>

          <Magnetic>
            <LocalTime />
          </Magnetic>
        </motion.div>
        
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground tracking-tight mb-6"
          variants={fadeUp}
        >
          Frontend Developer<br />
          <span className="text-muted-foreground">Building Modern Web</span>
        </motion.h1>
        
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          variants={fadeUp}
        >
          Hi, I'm Prajwal KC from Nepal, specializing in React.
          I build clean, intelligent, and highly performant user interfaces.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp}
        >
          <Magnetic>
            <motion.button
              onClick={scrollToProjects}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-foreground text-background font-medium text-sm transition-all hover:bg-foreground/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] w-full md:w-auto min-w-[160px] justify-center"
            >
              View Projects
              <ArrowRight size={16} />
            </motion.button>
          </Magnetic>

          <Magnetic>
            <motion.button
              onClick={onOpenResume}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="relative group flex items-center gap-2 px-6 py-3.5 rounded-lg border border-border bg-background/40 backdrop-blur-md text-foreground font-medium text-sm w-full md:w-auto min-w-[160px] justify-center overflow-hidden transition-all duration-300 hover:border-transparent hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
            >
              {/* Glowing gradient border */}
              <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className="relative z-10">View CV</span>
              <motion.span
                className="relative z-10 inline-block text-xs"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.button>
          </Magnetic>

          <Magnetic>
            <motion.a
              href="#contact"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="flex items-center gap-2 px-6 py-3.5 rounded-lg border border-border bg-background/50 backdrop-blur-md text-foreground font-medium text-sm transition-colors hover:bg-muted w-full md:w-auto min-w-[160px] justify-center"
            >
              <Mail size={16} />
              Contact Me
            </motion.a>
          </Magnetic>
        </motion.div>

        {/* Keyboard shortcut hint under the CTA buttons */}
        <motion.p 
          variants={fadeUp} 
          className="text-[10px] font-mono text-muted-foreground/60 mt-6 tracking-wider uppercase select-none flex items-center justify-center gap-1.5 flex-wrap"
        >
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[9px] text-muted-foreground font-semibold">Ctrl + K</kbd>
          <span>or</span>
          <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[9px] text-muted-foreground font-semibold">⌘K</kbd>
          <span>for commands</span>
          <span className="opacity-40">•</span>
          <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[9px] text-muted-foreground font-semibold">R</kbd>
          <span>for CV</span>
        </motion.p>
      </motion.div>
    </section>
  )
}

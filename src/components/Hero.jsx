import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, buttonVariants } from '../motion'
import { ArrowRight, Mail } from 'lucide-react'
import Magnetic from './ui/Magnetic'
import LocalTime from './ui/LocalTime'
// import Scene from './ui/Scene'

export default function Hero() {
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
        <motion.div variants={fadeUp} className="mb-8 flex justify-center">
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
              className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-foreground text-background font-medium text-sm transition-colors hover:bg-foreground/90 w-full md:w-auto min-w-[160px] justify-center"
            >
              View Projects
              <ArrowRight size={16} />
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
      </motion.div>
    </section>
  )
}

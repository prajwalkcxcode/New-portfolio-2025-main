import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../motion'
import ScrambledText from './ui/ScrambledText'

// Utility for word reveal animation
const wordAnimation = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } }
}

const wordStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02, delayChildren: 0.1 }
  }
}

const splitText = (text) => {
  return text.split(' ').map((word, index) => (
    <motion.span key={index} variants={wordAnimation} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  ))
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
        <motion.div
          className="md:col-span-4 md:sticky top-32"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.h2
            className="text-3xl font-bold text-foreground mb-2"
            variants={fadeUp}
          >
            <ScrambledText text="About Me" />
          </motion.h2>
          <motion.div
            className="w-12 h-1 bg-foreground mb-6"
            variants={fadeUp}
          />
          <motion.p
            className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-10"
            variants={fadeUp}
          >
            My Background
          </motion.p>
          
          <motion.div variants={fadeUp} className="relative group max-w-[340px] mx-auto md:mx-0">
            {/* Soft ambient glow behind the subject */}
            <div className="absolute -inset-6 bg-gradient-to-tr from-muted-foreground/10 to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-duration-1000" />
            
            <div 
              className="relative z-10 w-full aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <img 
                 src="/p.jpg" 
                 alt="Prajwal playing guitar" 
                 className="w-full h-full object-cover object-[50%_55%] scale-[1.25] grayscale hover:grayscale-0 transition-all duration-[1.5s] ease-out hover:scale-[1.3]"
              />
              
              {/* Dynamic lighting overlay on hover */}
              <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-20 mix-blend-overlay pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>
        
        <div
          className="md:col-span-8 space-y-8"
        >
          <div className="text-lg text-muted-foreground leading-relaxed space-y-6">
            <motion.p
              variants={wordStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {splitText("I'm")} <motion.span variants={wordAnimation} className="text-foreground font-medium inline-block mr-[0.25em]">Prajwal KC,</motion.span> {splitText("a driven BSc CSIT student based in Nepal with a deep passion for software engineering. What started as curiosity has grown into a focused pursuit of becoming a proficient full-stack developer.")}
            </motion.p>
            <motion.p
              variants={wordStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {splitText("My primary focus lies in frontend development with")} <motion.span variants={wordAnimation} className="text-foreground font-medium inline-block mr-[0.25em]">React</motion.span> {splitText("and modern JavaScript ecosystems. I believe that engineering is not just about writing code, but about solving real-world problems through intelligent design and solid architecture.")}
            </motion.p>
            <motion.p
              variants={wordStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {splitText("Currently, I'm dedicating my time to building real-world projects, mastering modern frontend tools, and steadily expanding my knowledge into backend technologies. My goal is simple: to create seamless, performant, and realistic software that feels right.")}
            </motion.p>
          </div>
          
          <motion.div
            className="grid sm:grid-cols-2 gap-4 pt-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.div variants={fadeUp} className="p-6 rounded-xl bg-muted border border-border group hover:bg-muted/80 transition-colors">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Education
              </h3>
              <p className="font-semibold text-foreground group-hover:translate-x-1 transition-transform">BSc. CSIT</p>
              <p className="text-muted-foreground text-sm mt-1">Computer Science & Information Technology</p>
            </motion.div>
            <motion.div variants={fadeUp} className="p-6 rounded-xl bg-muted border border-border group hover:bg-muted/80 transition-colors">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Core Goal
              </h3>
              <p className="font-semibold text-foreground group-hover:translate-x-1 transition-transform">Full-Stack Engineer</p>
              <p className="text-muted-foreground text-sm mt-1">Bridging the gap between beautiful UI and robust APIs</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

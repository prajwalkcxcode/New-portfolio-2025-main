import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../motion'
import ScrambledText from './ui/ScrambledText'
import AnimatedMemoji3D from './ui/AnimatedMemoji3D'
import { Copy, Check, Sparkles } from 'lucide-react'

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
  const [copied, setCopied] = useState(false)
  const copyEmail = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText('prajwalkc2063@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
          
          <motion.div variants={fadeUp}>
            <AnimatedMemoji3D />
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

            {/* Email Copy Card */}
            <motion.div 
              variants={fadeUp} 
              onClick={copyEmail}
              className="sm:col-span-2 p-5 rounded-xl bg-muted/40 border border-border group hover:bg-muted hover:border-blue-500/30 transition-all duration-300 cursor-pointer flex items-center justify-between select-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground group-hover:text-blue-400 transition-colors">
                  <Sparkles size={14} className="animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground text-sm group-hover:text-blue-400 transition-colors">Get In Touch</p>
                  <p className="text-muted-foreground text-xs mt-0.5 font-mono">prajwalkc2063@gmail.com</p>
                </div>
              </div>
              <button 
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-mono text-muted-foreground group-hover:text-foreground transition-all duration-300"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-green-400" />
                    <span className="text-green-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

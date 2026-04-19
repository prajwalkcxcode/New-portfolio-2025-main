import React from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { fadeUp, staggerContainer } from '../motion'
import CodePlayground from './ui/CodePlayground'
import ScrambledText from './ui/ScrambledText'

const allSkills = [
  "HTML5", "CSS3", "JavaScript (ES6+)", "React", "Next.js", "Tailwind CSS",
  "Git", "GitHub", "VS Code", "Vercel", "Vite", "Framer Motion",
  "Node.js", "Express", "MongoDB", "TypeScript", "Responsive Design"
]

const half = Math.ceil(allSkills.length / 2)
const row1 = allSkills.slice(0, half)
const row2 = allSkills.slice(half)

function Marquee({ items, reverse = false }) {
  return (
    <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-2">
      <motion.div
        className="flex shrink-0 items-center gap-6 pr-6"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {[...items, ...items].map((skill, index) => (
          <div
            key={index}
            className="flex items-center justify-center px-8 py-5 bg-card/60 backdrop-blur-sm border border-border rounded-xl text-muted-foreground font-semibold hover:bg-card hover:text-foreground hover:border-muted-foreground/30 hover:scale-105 hover:shadow-lg hover:shadow-[0_20px_50px_-12px_rgba(255,255,255,0.05)] transition-all cursor-crosshair text-lg shadow-sm"
          >
            {skill}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-screen-2xl mx-auto overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mb-16 md:text-center"
      >
        <motion.h2 className="text-3xl font-bold text-foreground mb-4" variants={fadeUp}>
          <ScrambledText text="Technical Arsenal" />
        </motion.h2>
        <motion.p className="text-muted-foreground max-w-2xl mx-auto" variants={fadeUp}>
          The robust tools and modern frameworks I leverage to engineer performant, scalable digital experiences.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-col gap-6 relative"
      >
        <Marquee items={row1} />
        <Marquee items={row2} reverse />
      </motion.div>

      <CodePlayground />
    </section>
  )
}

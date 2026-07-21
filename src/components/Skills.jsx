import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../motion'
import CodeSnippets from './ui/CodeSnippets'
import ScrambledText from './ui/ScrambledText'
import { Cpu, Layout, Cloud, Network } from 'lucide-react'
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, 
  SiGit, SiGithub, SiNodedotjs, SiExpress, SiMongodb, SiTypescript, 
  SiDocker, SiVercel, SiVite, SiFramer
} from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'

const allSkills = [
  { name: "HTML5", icon: <SiHtml5 className="text-[#E34F26] text-lg" /> },
  { name: "CSS3", icon: <SiCss3 className="text-[#1572B6] text-lg" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E] text-lg rounded bg-black" /> },
  { name: "React", icon: <SiReact className="text-[#61DAFB] text-lg" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-foreground text-lg" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4] text-lg" /> },
  { name: "Git", icon: <SiGit className="text-[#F05032] text-lg" /> },
  { name: "GitHub", icon: <SiGithub className="text-foreground text-lg" /> },
  { name: "VS Code", icon: <VscCode className="text-[#007ACC] text-lg" /> },
  { name: "Vercel", icon: <SiVercel className="text-foreground text-lg" /> },
  { name: "Vite", icon: <SiVite className="text-[#646CFF] text-lg" /> },
  { name: "Framer Motion", icon: <SiFramer className="text-[#0055FF] text-lg" /> },
  { name: "Node.js", icon: <SiNodedotjs className="text-[#339933] text-lg" /> },
  { name: "Express", icon: <SiExpress className="text-foreground text-lg" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-[#47A248] text-lg" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6] text-lg" /> },
  { name: "Responsive Design", icon: <Layout className="text-blue-400 text-lg" /> }
]

const learningSkills = [
  {
    name: 'React & Next.js',
    icon: <SiReact className="text-[#61DAFB] text-xl" />,
    progress: 100,
    status: 'Mastered',
    desc: 'Server components, hydration, hooks, & state architecture.'
  },
  {
    name: 'Node.js & Express',
    icon: <SiNodedotjs className="text-[#339933] text-xl" />,
    progress: 88,
    status: 'Advanced',
    desc: 'REST API design, JWT auth, middleware, & performance.'
  },
  {
    name: 'MongoDB & Databases',
    icon: <SiMongodb className="text-[#47A248] text-xl" />,
    progress: 78,
    status: 'Proficient',
    desc: 'Schema design, indexing, B-tree lookups, & aggregation.'
  },
  {
    name: 'Docker & Containers',
    icon: <SiDocker className="text-[#2496ED] text-xl" />,
    progress: 80,
    status: 'In Progress',
    desc: 'Containerizing full-stack microservices & environment isolation.'
  },
  {
    name: 'DevOps & Cloud',
    icon: <Cloud className="text-purple-400 text-xl" />,
    progress: 65,
    status: 'Exploring',
    desc: 'CI/CD pipelines, Vercel deployments, & cloud monitoring.'
  },
  {
    name: 'System Architecture',
    icon: <Network className="text-indigo-400 text-xl" />,
    progress: 72,
    status: 'Exploring',
    desc: 'Scalable backend structures, rate limiting, & cache layers.'
  }
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
      >
        {[...items, ...items].map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-2.5 px-5 py-3 bg-card/60 backdrop-blur-sm border border-border rounded-xl text-foreground font-medium hover:bg-card hover:border-blue-500/40 transition-all cursor-default text-sm shadow-sm"
          >
            {skill.icon}
            <span>{skill.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mb-16 md:text-center"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
          <Cpu size={14} />
          <span>Capabilities & Tech Stack</span>
        </motion.div>

        <motion.h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" variants={fadeUp}>
          <ScrambledText text="Technical Arsenal & Mastery" />
        </motion.h2>
        <motion.p className="text-muted-foreground max-w-2xl mx-auto" variants={fadeUp}>
          The tools, frameworks, and core engineering concepts I leverage to build scalable, high-performance web applications.
        </motion.p>
      </motion.div>

      {/* Marquee Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="flex flex-col gap-4 mb-16 relative"
      >
        <Marquee items={row1} />
        <Marquee items={row2} reverse />
      </motion.div>

      {/* Core Domain Proficiency Cards */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {learningSkills.map((item) => (
          <motion.div
            key={item.name}
            variants={fadeUp}
            className="group p-6 rounded-2xl bg-card border border-border flex flex-col justify-between hover:border-blue-500/40 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)] transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-muted border border-border group-hover:border-blue-500/30 transition-colors">
                    {item.icon}
                  </div>
                </div>
                <span className="text-blue-400 font-semibold px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                  {item.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground group-hover:text-blue-400 transition-colors mb-2">
                {item.name}
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                {item.desc}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>Proficiency</span>
                <span className="text-foreground font-semibold">{item.progress}%</span>
              </div>
              <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Live Interactive Code Playground */}
      <CodeSnippets />
    </section>
  )
}




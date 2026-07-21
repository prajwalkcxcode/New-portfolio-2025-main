import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerContainer } from '../motion'
import { BookOpen, Clock, Calendar, ArrowUpRight, X, Sparkles, Share2, Tag, Bookmark } from 'lucide-react'
import ScrambledText from './ui/ScrambledText'

const BLOGS = [
  {
    id: 'digital-minimalism',
    title: 'The Art of Digital Minimalism: Reclaiming Focus in a Hyper-Connected World',
    date: 'Jul 18, 2026',
    readTime: '5 min read',
    category: 'Mindset & Life',
    excerpt: 'In an era of constant notifications and algorithmic noise, intentional curation and quiet solitude have become the ultimate superpower for deep creativity.',
    content: `We live in an era of unprecedented connectivity, yet many of us feel continuously fragmented. Every ping, badge, and notification competes for a slice of our finite attention span.

### The Myth of Multitasking
True creative work requires uninterrupted stretches of deep focus. When we constantly switch context between social feeds, messaging apps, and work tabs, our cognitive performance degrades rapidly. Minimalism isn't about giving up technology—it's about intentional alignment.

### 3 Core Principles for Digital Clarity:
1. **Intentionally Curate Your Inputs**: Unsubscribe ruthlessly. Treat your attention as your most valuable asset.
2. **Design Phone-Free Sanctuary Hours**: Protect your first 60 minutes after waking up and last 60 minutes before sleep from algorithmically generated feed loops.
3. **Embrace Boredom & Solitude**: Great ideas rarely surface while doomscrolling. They emerge in the quiet spaces between thoughts when the brain has room to process and synthesize.

> "Clarity of mind is the quiet foundation upon which meaningful human creation rests."`
  },
  {
    id: 'crafting-product-aesthetics',
    title: 'Crafting Emotion: Why Micro-Interactions and Visual Harmony Matter',
    date: 'Jun 29, 2026',
    readTime: '6 min read',
    category: 'Design & Experience',
    excerpt: 'Great design isn\'t just how a product looks; it\'s how it makes people feel through subtle fluid animations, typography rhythm, and tactile visual feedback.',
    content: `When someone interacts with a thoughtfully designed digital experience, they feel a subtle sense of ease and delight. That reaction is rarely accidental—it is engineered through obsessive attention to micro-details.

### The Psychology of Visual Rhythm
Visual hierarchy, balanced whitespace, and harmonious color palettes guide the eye naturally. When typography has proper line height and contrast, reading becomes effortless.

### Elements That Evoke Delight:
- **Subtle Micro-Animations**: A smooth button state transition or gently expanding accordion reassures the user that the system is responsive.
- **Glassmorphism & Depth**: Subtle translucent overlays create a sense of real-world layered depth without cluttering the interface.
- **Consistent Design Tokens**: Unified spacing scales and color themes build unspoken trust and familiarity.

> "Details aren't just details. They make the product." — Charles Eames`
  },
  {
    id: 'ai-ethics-and-humanity',
    title: 'The Human Element in the Age of Artificial Intelligence',
    date: 'May 22, 2026',
    readTime: '7 min read',
    category: 'Future & Philosophy',
    excerpt: 'As artificial intelligence automates routine execution, human intuition, authentic taste, and emotional depth become our most irreplaceable qualities.',
    content: `The rapid rise of generative AI has transformed how we create, think, and solve problems. While algorithms can process petabytes of information in seconds, they lack human lived experience, empathy, and moral framing.

### Synthesis over Automation
The future doesn't belong to machines replacing humans, nor to humans ignoring modern capabilities. It belongs to thoughtful creators who leverage machine speed to amplify genuine human insight.

### What Remains Uniquely Human:
1. **Curated Taste & Aesthetic Judgement**: Deciding *what* is worth making and *why* it matters to people.
2. **Empathy & Storytelling**: Connecting emotionally through shared vulnerability and authentic perspective.
3. **Ethical Vision**: Asking difficult questions about consequences, fairness, and long-term societal impact.

> "Technology is a powerful leverage tool, but human purpose remains the compass."`
  },
  {
    id: 'embracing-the-uncomfortable',
    title: 'Embracing the Uncomfortable: Lessons from Learning Out Loud',
    date: 'Apr 10, 2026',
    readTime: '4 min read',
    category: 'Personal Growth',
    excerpt: 'Why stepping outside your comfort zone, building in public, and embracing early friction build lasting resilience and continuous curiosity.',
    content: `Growth happens at the exact edge of your current capability. If everything feels comfortable and familiar, you are likely refining existing routines rather than expanding your horizons.

### The Fear of Being a Novice
Many people delay sharing their creations or starting new journeys because they fear not looking expert enough. But sharing the raw process of learning builds genuine community and accelerates feedback loops.

### Key Mindset Shifts:
- **Prioritize Consistency Over Perfection**: Small daily efforts compound exponentially over time.
- **View Mistakes as Data**: Every failure contains specific information on what to adjust next.
- **Stay Eternally Curious**: Approach new domains with a beginner's mind, unburdened by ego.`
  }
]

export default function Blogs() {
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [copied, setCopied] = useState(false)

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedBlog])

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedBlog(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleShare = () => {
    if (navigator.clipboard && selectedBlog) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section id="blogs" className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div
        className="mb-16 md:text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
          <Sparkles size={14} />
          <span>Writings & Thoughts</span>
        </motion.div>
        
        <motion.h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" variants={fadeUp}>
          <ScrambledText text="Articles & Perspectives" />
        </motion.h2>
        <motion.p className="text-muted-foreground max-w-2xl mx-auto" variants={fadeUp}>
          Essays and reflections on digital minimalism, product aesthetics, human-AI synergy, and personal growth.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {BLOGS.map((blog) => (
          <motion.div
            key={blog.id}
            variants={fadeUp}
            onClick={() => setSelectedBlog(blog)}
            className="group p-6 rounded-2xl bg-card border border-border flex flex-col justify-between hover:border-blue-500/40 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)] transition-all duration-300 cursor-pointer relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-4">
                <span className="px-2.5 py-0.5 rounded bg-muted border border-border text-foreground font-semibold flex items-center gap-1.5">
                  <Tag size={12} className="text-blue-400" />
                  {blog.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {blog.readTime}
                </span>
              </div>

              <h3 className="text-xl font-bold text-foreground group-hover:text-blue-400 transition-colors mb-3 leading-snug">
                {blog.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                {blog.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {blog.date}
              </span>
              <span className="flex items-center gap-1 font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
                Read Article
                <ArrowUpRight size={14} />
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Article Detail Modal rendered using createPortal into document.body */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedBlog && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedBlog(null)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
                />

                {/* Article Window */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 30 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                  className="relative w-full max-w-3xl bg-[#09090b]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(59,130,246,0.15)] overflow-hidden z-10 max-h-[88vh] flex flex-col font-sans"
                >
                  {/* Top Bar / Header */}
                  <div className="p-6 bg-[#141417] border-b border-white/10 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold flex items-center gap-1">
                          <Tag size={12} />
                          {selectedBlog.category}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                          <Calendar size={12} />
                          {selectedBlog.date}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">•</span>
                        <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                          <Clock size={12} />
                          {selectedBlog.readTime}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground leading-snug">{selectedBlog.title}</h3>
                    </div>

                    <button
                      onClick={() => setSelectedBlog(null)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors shrink-0"
                      aria-label="Close article"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 overflow-y-auto text-sm sm:text-base text-gray-200 space-y-5 leading-relaxed font-sans custom-scrollbar flex-1">
                    <p className="text-base sm:text-lg font-medium text-blue-200/90 leading-relaxed border-l-2 border-blue-500 pl-4 py-1 italic bg-blue-500/5 rounded-r-lg">
                      {selectedBlog.excerpt}
                    </p>

                    {selectedBlog.content.split('\n\n').map((paragraph, idx) => (
                      <div key={idx}>
                        {paragraph.startsWith('### ') ? (
                          <h4 className="text-lg font-bold text-white mt-6 mb-3 tracking-tight">
                            {paragraph.replace('### ', '')}
                          </h4>
                        ) : paragraph.startsWith('> ') ? (
                          <blockquote className="my-4 p-4 rounded-xl bg-muted/40 border border-border/80 text-foreground font-medium italic">
                            {paragraph.replace('> ', '')}
                          </blockquote>
                        ) : paragraph.includes('\n1. ') || paragraph.includes('\n- ') ? (
                          <div className="space-y-2 my-3 pl-2">
                            {paragraph.split('\n').map((line, lIdx) => (
                              <p key={lIdx} className="text-muted-foreground">
                                {line}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground leading-relaxed">{paragraph}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 border-t border-white/10 bg-[#141417]/80 flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground font-semibold transition-colors"
                    >
                      <Share2 size={14} />
                      {copied ? 'Link Copied!' : 'Share Article'}
                    </button>
                    <span>Press ESC to close</span>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  )
}


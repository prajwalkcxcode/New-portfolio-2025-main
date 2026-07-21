import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, CheckCircle, Cpu, Settings, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'

export default function ProjectModal({ project, isOpen, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Reset image index when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveImageIndex(0)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!project) return null

  const galleryImages = project.gallery || [
    project.image,
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800'
  ]

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-zoom-out"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-3xl h-[85vh] max-h-[85vh] bg-[#09090b]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden text-foreground z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-muted/40 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-80 hover:opacity-100 transition-opacity cursor-pointer" onClick={onClose} />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-80" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f] opacity-80" />
                <span className="ml-3 text-xs font-mono text-muted-foreground tracking-wider select-none uppercase">
                  {project.category} / {project.title.toLowerCase().replace(/\s+/g, '_')}.json
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded-md text-muted-foreground hover:text-white hover:bg-muted transition-colors"
                aria-label="Close project modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar">
              
              {/* Interactive Multi-Image Gallery */}
              <div className="space-y-3">
                <div className="relative overflow-hidden rounded-xl border border-white/10 aspect-video bg-muted group">
                  <img 
                    src={galleryImages[activeImageIndex]} 
                    alt={`${project.title} slide ${activeImageIndex + 1}`} 
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  
                  {/* Prev / Next Controls */}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
                        aria-label="Previous screenshot"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
                        aria-label="Next screenshot"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/70 border border-white/10 text-[10px] font-mono text-white backdrop-blur-md flex items-center gap-1.5">
                    <ImageIcon size={12} className="text-blue-400" />
                    <span>{activeImageIndex + 1} / {galleryImages.length}</span>
                  </div>
                </div>

                {/* Thumbnails strip */}
                {galleryImages.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-16 h-10 rounded-lg overflow-hidden border transition-all shrink-0 ${
                          activeImageIndex === idx ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-white/10 opacity-50 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-blue-400 font-semibold tracking-wider uppercase">
                    {project.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                    {project.title}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-foreground border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 grid md:grid-cols-2 gap-6">
                {/* Key Features */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono tracking-widest text-blue-400 uppercase flex items-center gap-2">
                    <CheckCircle size={14} /> Key Features
                  </h3>
                  <ul className="space-y-2">
                    {project.details?.features.map((f, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
                        <span className="text-blue-500 font-semibold mt-0.5">✔</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Architecture & Challenge */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xs font-mono tracking-widest text-blue-400 uppercase flex items-center gap-2">
                      <Cpu size={14} /> Core Problem Solved
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {project.details?.problem}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xs font-mono tracking-widest text-blue-400 uppercase flex items-center gap-2">
                      <Settings size={14} /> Architecture Summary
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {project.details?.architecture}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/5 bg-muted/20 flex items-center justify-between gap-4 shrink-0">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono font-medium text-white bg-white/10 border border-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Github size={14} />
                View Source Code on GitHub
              </a>
              <span className="text-[10px] font-mono text-muted-foreground">Press ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}


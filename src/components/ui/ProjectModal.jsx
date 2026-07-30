import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, CheckCircle, Cpu, Settings, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'

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
        <div className="fixed inset-0 z-[9999] overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[9998] cursor-pointer"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-border shadow-[0_0_50px_rgba(0,0,0,0.3)] flex flex-col text-foreground z-[9999]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-card shrink-0">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-mono font-bold tracking-widest text-blue-500 uppercase">
                  {project.category}
                </span>
                <h3 className="text-base font-bold text-foreground tracking-tight leading-tight">
                  {project.title}
                </h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close project panel"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              
              {/* Interactive Multi-Image Gallery */}
              <div className="space-y-3">
                <div className="relative overflow-hidden rounded-xl border border-border aspect-video bg-muted group">
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
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
                        aria-label="Next screenshot"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded-full bg-black/70 border border-white/10 text-[9px] font-mono text-white backdrop-blur-md flex items-center gap-1.5">
                    <ImageIcon size={10} className="text-blue-400" />
                    <span>{activeImageIndex + 1} / {galleryImages.length}</span>
                  </div>
                </div>

                {/* Thumbnails strip */}
                {galleryImages.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-12 h-8 rounded-md overflow-hidden border transition-all shrink-0 ${
                          activeImageIndex === idx ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-border opacity-50 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-foreground border border-border">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-6 space-y-6">
                {/* Key Features */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-mono tracking-widest text-blue-500 uppercase flex items-center gap-2 font-bold">
                    <CheckCircle size={14} /> Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.details?.features.map((f, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
                        <span className="text-blue-500 font-semibold mt-0.5">✔</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Core Problem Solved */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono tracking-widest text-blue-500 uppercase flex items-center gap-2 font-bold">
                    <Cpu size={14} /> Core Problem Solved
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {project.details?.problem}
                  </p>
                </div>

                {/* Architecture Summary */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono tracking-widest text-blue-500 uppercase flex items-center gap-2 font-bold">
                    <Settings size={14} /> Architecture Summary
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {project.details?.architecture}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border bg-card flex flex-col gap-2 shrink-0">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs font-mono font-medium text-foreground bg-muted border border-border px-4 py-2.5 rounded-lg hover:bg-muted/80 transition-colors w-full"
              >
                <Github size={14} />
                View Source Code
              </a>
              <button
                onClick={onClose}
                className="text-xs font-mono font-medium text-muted-foreground hover:text-foreground py-2 text-center"
              >
                Close Panel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
}


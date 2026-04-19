import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music } from 'lucide-react'

// Array of premium "aesthetic" top tracks
const TOP_TRACKS = [
  {
    song: "Starboy",
    artist: "The Weeknd, Daft Punk",
    album_art_url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=200&auto=format&fit=crop",
    track_url: "https://open.spotify.com/track/7MXVkk9YMqq6vqLSZcgXVK"
  },
  {
    song: "Midnight City",
    artist: "M83",
    album_art_url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=200&auto=format&fit=crop",
    track_url: "https://open.spotify.com/track/1eyzqe2QqGZUmfcPZtrIsq"
  },
  {
    song: "Apocalypse",
    artist: "Cigarettes After Sex",
    album_art_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop",
    track_url: "https://open.spotify.com/track/3AVyKE44c8oP57vBvS41N8"
  },
  {
    song: "Nightcall",
    artist: "Kavinsky",
    album_art_url: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=200&auto=format&fit=crop",
    track_url: "https://open.spotify.com/track/0U0ldCRmgCqhVvD6ksG63j"
  }
]

export default function SpotifyWidget() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Cycle tracks every 15 seconds to simulate a live listening session
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TOP_TRACKS.length)
    }, 15000)
    return () => clearInterval(interval)
  }, [])
  
  const spotify = TOP_TRACKS[currentIndex]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={spotify.song}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50 bg-card/80 backdrop-blur-md border border-border rounded-xl p-3 shadow-xl flex items-center gap-4 max-w-[280px] hover:scale-105 transition-transform duration-300 group cursor-pointer"
        onClick={() => window.open(spotify.track_url, '_blank')}
      >
        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
          <img 
            src={spotify.album_art_url} 
            alt="Album Art"
            className="w-full h-full object-cover"
          />
          {/* Animated equalizer overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.div animate={{ height: ["4px", "14px", "4px"] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }} className="w-1 bg-[#1DB954] rounded-full" />
            <motion.div animate={{ height: ["10px", "4px", "16px", "10px"] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="w-1 bg-[#1DB954] rounded-full" />
            <motion.div animate={{ height: ["5px", "12px", "5px"] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} className="w-1 bg-[#1DB954] rounded-full" />
          </div>
        </div>
        
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Music size={10} className="text-[#1DB954]" />
            <span className="text-[9px] font-bold text-[#1DB954] uppercase tracking-wider">
              Popular Tracks
            </span>
          </div>
          <span className="text-sm font-semibold text-foreground truncate group-hover:underline">
            {spotify.song}
          </span>
          <p className="text-xs text-muted-foreground truncate">
            {spotify.artist}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

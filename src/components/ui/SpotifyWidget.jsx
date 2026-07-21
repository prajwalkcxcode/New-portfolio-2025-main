import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Radio, Volume2, VolumeX, Music, ChevronDown, SkipBack, SkipForward, ListMusic } from 'lucide-react'

const PLAYLIST = [
  {
    id: 1,
    title: 'Midnight Focus Beats',
    artist: 'Lofi Chillhop · Deep Work',
    cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=200',
    src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'
  },
  {
    id: 2,
    title: 'Cyber Dreamer Synth',
    artist: 'Chill Lofi · Synthwave Vibe',
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=200',
    src: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=chill-lofi-song-8444.mp3'
  },
  {
    id: 3,
    title: 'Rainy City Atmosphere',
    artist: 'Ambient Rain · Coffee Shop',
    cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=200',
    src: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=lofi-groove-11394.mp3'
  },
  {
    id: 4,
    title: 'Acoustic Spring Breeze',
    artist: 'Gentle Beats · Creative Flow',
    cover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=200',
    src: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_8844883d65.mp3?filename=spring-chill-lofi-14022.mp3'
  }
]

export default function SpotifyWidget() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)

  const currentTrack = PLAYLIST[currentTrackIndex]

  const togglePlay = (e) => {
    e?.stopPropagation()
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const nextTrack = (e) => {
    e?.stopPropagation()
    const nextIdx = (currentTrackIndex + 1) % PLAYLIST.length
    setCurrentTrackIndex(nextIdx)
    setProgress(0)
  }

  const prevTrack = (e) => {
    e?.stopPropagation()
    const prevIdx = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length
    setCurrentTrackIndex(prevIdx)
    setProgress(0)
  }

  const selectTrack = (idx, e) => {
    e?.stopPropagation()
    setCurrentTrackIndex(idx)
    setShowPlaylist(false)
    setProgress(0)
  }

  const toggleMute = (e) => {
    e?.stopPropagation()
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Auto-play when changing track if already playing
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play().catch(() => {})
      }
    }
  }, [currentTrackIndex])

  // Track progress update
  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100
      setProgress(currentProgress)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />

      {/* Floating Audio Dock Widget */}
      <div className="fixed bottom-6 left-6 z-40">
        {!isExpanded ? (
          /* Mini Floating Pill */
          <div 
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-3 px-3.5 py-2 rounded-full bg-[#121214]/90 border border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.6)] backdrop-blur-xl cursor-pointer hover:border-emerald-500/40 transition-all duration-300 group"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden border border-white/10 bg-muted shrink-0 relative flex items-center justify-center">
              <img
                src={currentTrack.cover}
                alt="Cover"
                className={`w-full h-full object-cover ${isPlaying ? 'scale-105' : 'grayscale opacity-75'}`}
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5">
                  <span className="w-0.5 bg-emerald-400 rounded-full animate-[bounce_1s_infinite_100ms] h-2.5" />
                  <span className="w-0.5 bg-emerald-400 rounded-full animate-[bounce_1s_infinite_300ms] h-3.5" />
                  <span className="w-0.5 bg-emerald-400 rounded-full animate-[bounce_1s_infinite_200ms] h-2" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pr-1">
              <span className="text-xs font-semibold text-foreground group-hover:text-emerald-400 transition-colors max-w-[110px] truncate">
                {currentTrack.title}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            </div>

            <button
              onClick={togglePlay}
              className="w-7 h-7 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center transition-transform hover:scale-105"
            >
              {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="ml-0.5" />}
            </button>
          </div>
        ) : (
          /* Full Expanded Spotify Widget Card */
          <div className="w-80 bg-[#121214]/95 border border-white/10 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden animate-fade-in">
            {/* Ambient Spotify Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-muted-foreground uppercase">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Radio size={12} className={isPlaying ? "animate-pulse" : ""} />
                SPOTIFY VIBE RADAR ({currentTrackIndex + 1}/{PLAYLIST.length})
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowPlaylist(!showPlaylist); }}
                  className={`p-1 rounded transition-colors ${showPlaylist ? 'text-emerald-400 bg-emerald-500/10' : 'text-muted-foreground hover:text-white'}`}
                  title="Playlist tracks"
                >
                  <ListMusic size={14} />
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 rounded text-muted-foreground hover:text-white transition-colors"
                  title="Minimize player"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* Main Player Info */}
            <div className="flex items-center gap-3.5 mb-3">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/10 bg-muted shrink-0 shadow-md">
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'grayscale opacity-75'}`}
                />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5 px-2">
                    <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_1s_infinite_100ms] h-4" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_1s_infinite_300ms] h-6" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_1s_infinite_200ms] h-3" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-foreground truncate">
                  {currentTrack.title}
                </h4>
                <p className="text-[11px] text-muted-foreground truncate">{currentTrack.artist}</p>

                <div className="w-full bg-white/10 rounded-full h-1 mt-2.5 overflow-hidden relative">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Playback Controls (Prev, Play/Pause, Next, Mute) */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevTrack}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
                  title="Previous song"
                >
                  <SkipBack size={15} />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                </button>

                <button
                  onClick={nextTrack}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
                  title="Next song"
                >
                  <SkipForward size={15} />
                </button>
              </div>

              <button
                onClick={toggleMute}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-white transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
            </div>

            {/* Playlist Drawer List */}
            {showPlaylist && (
              <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5 max-h-36 overflow-y-auto custom-scrollbar">
                <p className="text-[10px] font-mono text-muted-foreground uppercase mb-2">Select Track:</p>
                {PLAYLIST.map((track, idx) => (
                  <button
                    key={track.id}
                    onClick={(e) => selectTrack(idx, e)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs transition-colors ${
                      currentTrackIndex === idx
                        ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20'
                        : 'text-muted-foreground hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="truncate">{idx + 1}. {track.title}</span>
                    {currentTrackIndex === idx && isPlaying && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}



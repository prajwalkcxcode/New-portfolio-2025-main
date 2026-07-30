import React, { useState, useRef, useEffect } from 'react'
import { useLanyard, useLanyardWS } from 'use-lanyard'
import { ChevronDown, ExternalLink, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ListMusic, Radio, Music } from 'lucide-react'

// Discord User ID for live Spotify tracking via Lanyard
const DISCORD_ID = '1059444587648798751'

// Custom Royalty-Free Lofi Playlist Fallback
const FALLBACK_PLAYLIST = [
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

// Official Spotify Logo Component
function SpotifyLogo({ className = "w-4 h-4", color = "#1DB954" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-.1.2-1.2-.42-.18-.6.42-1.2 1.02-1.02 4.2-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.54-1.02.72-1.56.42z"/>
    </svg>
  )
}

function formatTime(ms) {
  if (!ms || isNaN(ms) || ms < 0) return '0:00'
  const seconds = Math.floor(ms / 1000)
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

export default function SpotifyWidget() {
  const [isExpanded, setIsExpanded] = useState(false)
  const lanyardWSData = useLanyardWS(DISCORD_ID)
  const { data: lanyardHTTPData } = useLanyard(DISCORD_ID)
  
  const lanyardData = lanyardWSData ?? lanyardHTTPData
  const spotify = lanyardData?.spotify
  const isListeningLive = !!spotify

  // Audio player state for fallback mode
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [offlineProgress, setOfflineProgress] = useState(0)
  const [offlineCurrentTime, setOfflineCurrentTime] = useState(0)
  const [offlineDuration, setOfflineDuration] = useState(0)
  const audioRef = useRef(null)

  const currentTrack = FALLBACK_PLAYLIST[currentTrackIndex]

  // Progress & Timestamps for Live Spotify Track
  const [liveProgress, setLiveProgress] = useState(0)
  const [liveElapsedMs, setLiveElapsedMs] = useState(0)
  const [liveTotalMs, setLiveTotalMs] = useState(0)

  useEffect(() => {
    if (!spotify?.timestamps?.start || !spotify?.timestamps?.end) return
    
    const total = spotify.timestamps.end - spotify.timestamps.start
    setLiveTotalMs(total)

    const updateProgress = () => {
      const elapsed = Date.now() - spotify.timestamps.start
      setLiveElapsedMs(elapsed)
      const currentProgress = Math.min(Math.max((elapsed / total) * 100, 0), 100)
      setLiveProgress(currentProgress)
    }

    updateProgress()
    const interval = setInterval(updateProgress, 1000)
    return () => clearInterval(interval)
  }, [spotify])

  // Global toggle listener
  useEffect(() => {
    const handleToggle = () => setIsExpanded((prev) => !prev)
    window.addEventListener('toggle-spotify', handleToggle)
    return () => window.removeEventListener('toggle-spotify', handleToggle)
  }, [])

  // Offline player controls
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
    const nextIdx = (currentTrackIndex + 1) % FALLBACK_PLAYLIST.length
    setCurrentTrackIndex(nextIdx)
    setOfflineProgress(0)
  }

  const prevTrack = (e) => {
    e?.stopPropagation()
    const prevIdx = (currentTrackIndex - 1 + FALLBACK_PLAYLIST.length) % FALLBACK_PLAYLIST.length
    setCurrentTrackIndex(prevIdx)
    setOfflineProgress(0)
  }

  const selectTrack = (idx, e) => {
    e?.stopPropagation()
    setCurrentTrackIndex(idx)
    setShowPlaylist(false)
    setOfflineProgress(0)
  }

  const toggleMute = (e) => {
    e?.stopPropagation()
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  useEffect(() => {
    if (audioRef.current && !isListeningLive) {
      audioRef.current.load()
      if (isPlaying) audioRef.current.play().catch(() => {})
    }
  }, [currentTrackIndex])

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      setOfflineCurrentTime(audioRef.current.currentTime * 1000)
      setOfflineDuration(audioRef.current.duration * 1000)
      setOfflineProgress((audioRef.current.currentTime / audioRef.current.duration) * 100)
    }
  }

  return (
    <>
      {!isListeningLive && (
        <audio
          ref={audioRef}
          src={currentTrack.src}
          onTimeUpdate={handleTimeUpdate}
          onEnded={nextTrack}
        />
      )}

      <div className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-40 select-none">
        {!isExpanded ? (
          /* Mini Floating Pill */
          <div 
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-3 px-3.5 py-2 rounded-full bg-[#121212]/95 border border-[#1DB954]/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl cursor-pointer hover:border-[#1DB954] transition-all duration-300 group"
          >
            {/* Spotify Icon or Album Art */}
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-[#181818] shrink-0 relative flex items-center justify-center shadow-md">
              <img
                src={isListeningLive ? spotify.album_art_url : currentTrack.cover}
                alt="Cover"
                className={`w-full h-full object-cover ${(isListeningLive || isPlaying) ? 'scale-105' : 'grayscale opacity-75'}`}
              />
              {(isListeningLive || isPlaying) && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5">
                  <span className="w-0.5 bg-[#1DB954] rounded-full animate-[bounce_1s_infinite_100ms] h-2.5" />
                  <span className="w-0.5 bg-[#1DB954] rounded-full animate-[bounce_1s_infinite_300ms] h-3.5" />
                  <span className="w-0.5 bg-[#1DB954] rounded-full animate-[bounce_1s_infinite_200ms] h-2" />
                </div>
              )}
            </div>

            <div className="flex flex-col min-w-0 pr-1">
              <div className="flex items-center gap-1.5">
                {isListeningLive ? (
                  <SpotifyLogo className="w-3.5 h-3.5 shrink-0 animate-pulse" />
                ) : (
                  <Radio className="w-3.5 h-3.5 shrink-0 text-[#1DB954]" />
                )}
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isListeningLive ? 'text-[#1DB954]' : 'text-gray-400'}`}>
                  {isListeningLive ? 'Prajwal is Listening Live' : 'Prajwal is offline'}
                </span>
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${(isListeningLive || isPlaying) ? 'bg-[#1DB954] animate-pulse' : 'bg-muted-foreground'}`} />
              </div>
              <span className="text-xs font-semibold text-white group-hover:text-[#1DB954] transition-colors max-w-[140px] sm:max-w-[170px] truncate">
                {isListeningLive 
                  ? `${spotify.song} • ${spotify.artist}` 
                  : (isPlaying ? currentTrack.title : 'Enjoy offline lofi music')}
              </span>
            </div>

            {!isListeningLive && (
              <button
                onClick={togglePlay}
                className="w-7 h-7 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center transition-transform hover:scale-105 shrink-0 ml-1 shadow-md"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                title={isPlaying ? 'Pause Lofi' : 'Play Lofi'}
              >
                {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="ml-0.5" />}
              </button>
            )}
          </div>
        ) : (
          /* Expanded Player Window */
          <div className="w-[calc(100vw-2rem)] max-w-xs sm:w-84 bg-[#121212]/98 border border-[#1DB954]/30 rounded-2xl p-4 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Background Ambient Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#1DB954]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 min-w-0">
                {isListeningLive ? (
                  <SpotifyLogo className="w-5 h-5 shrink-0 animate-pulse" />
                ) : (
                  <Radio className="w-5 h-5 shrink-0 text-[#1DB954]" />
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5 truncate">
                    {isListeningLive ? "PRAJWAL IS LISTENING LIVE" : "PRAJWAL IS OFFLINE"}
                    {isListeningLive ? (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase bg-[#1DB954]/20 text-[#1DB954] rounded-full border border-[#1DB954]/30">
                        LIVE
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase bg-white/10 text-gray-300 rounded-full border border-white/10">
                        OFFLINE
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate">
                    {isListeningLive ? "Live Spotify Track" : "Enjoy offline lofi music"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 ml-1">
                {!isListeningLive && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowPlaylist(!showPlaylist); }}
                    className={`p-1.5 rounded-lg transition-colors ${showPlaylist ? 'text-[#1DB954] bg-[#1DB954]/15' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}
                    title="Playlist tracks"
                  >
                    <ListMusic size={15} />
                  </button>
                )}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
                  title="Minimize player"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            {/* LIVE SPOTIFY MODE */}
            {isListeningLive ? (
              <div className="space-y-3.5">
                {/* Album Artwork & Details */}
                <div className="flex items-center gap-3.5 bg-[#181818]/90 p-3 rounded-xl border border-white/5 shadow-inner">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/10 bg-black shrink-0 shadow-lg group">
                    <img
                      src={spotify.album_art_url}
                      alt={spotify.song}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5 px-2 opacity-90">
                      <span className="w-1 bg-[#1DB954] rounded-full animate-[bounce_1s_infinite_100ms] h-4" />
                      <span className="w-1 bg-[#1DB954] rounded-full animate-[bounce_1s_infinite_300ms] h-6" />
                      <span className="w-1 bg-[#1DB954] rounded-full animate-[bounce_1s_infinite_200ms] h-3" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <h4 className="text-sm font-bold text-white truncate leading-snug hover:text-[#1DB954] transition-colors">
                      {spotify.song}
                    </h4>
                    <p className="text-xs font-medium text-gray-300 truncate">{spotify.artist}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{spotify.album}</p>
                  </div>
                </div>

                {/* Real-time Progress Bar & Timestamps */}
                <div className="space-y-1.5 pt-0.5">
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden relative">
                    <div
                      className="bg-[#1DB954] h-full rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(29,185,84,0.6)]"
                      style={{ width: `${liveProgress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span>{formatTime(liveElapsedMs)}</span>
                    <span className="text-[#1DB954] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse" />
                      Live on Spotify
                    </span>
                    <span>{formatTime(liveTotalMs)}</span>
                  </div>
                </div>

                {/* Direct Open in Spotify CTA */}
                <a
                  href={`https://open.spotify.com/track/${spotify.track_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <SpotifyLogo className="w-4 h-4" color="#000000" />
                  Listen on Spotify
                  <ExternalLink size={12} strokeWidth={2.5} />
                </a>
              </div>
            ) : (
              /* OFFLINE FALLBACK MODE */
              <div className="space-y-3">
                <div className="flex items-center gap-3.5 bg-[#181818]/90 p-3 rounded-xl border border-white/5 shadow-inner">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-white/10 bg-black shrink-0 shadow-lg">
                    <img
                      src={currentTrack.cover}
                      alt={currentTrack.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'grayscale opacity-75'}`}
                    />
                    {isPlaying && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5 px-2">
                        <span className="w-1 bg-[#1DB954] rounded-full animate-[bounce_1s_infinite_100ms] h-4" />
                        <span className="w-1 bg-[#1DB954] rounded-full animate-[bounce_1s_infinite_300ms] h-6" />
                        <span className="w-1 bg-[#1DB954] rounded-full animate-[bounce_1s_infinite_200ms] h-3" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <h4 className="text-xs font-bold text-white truncate leading-snug">
                      {currentTrack.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground truncate">{currentTrack.artist}</p>
                    <span className="inline-block text-[10px] text-[#1DB954] font-mono mt-0.5">
                      Prajwal is offline • Enjoy offline lofi music
                    </span>
                  </div>
                </div>

                {/* Progress Bar & Timestamps */}
                <div className="space-y-1.5">
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden relative">
                    <div
                      className="bg-[#1DB954] h-full rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(29,185,84,0.6)]"
                      style={{ width: `${offlineProgress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span>{formatTime(offlineCurrentTime)}</span>
                    <span>{formatTime(offlineDuration)}</span>
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevTrack}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
                      title="Previous track"
                    >
                      <SkipBack size={16} />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="w-9 h-9 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                    </button>

                    <button
                      onClick={nextTrack}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
                      title="Next track"
                    >
                      <SkipForward size={16} />
                    </button>
                  </div>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX size={16} strokeWidth={2} /> : <Volume2 size={16} strokeWidth={2} />}
                  </button>
                </div>

                {/* Playlist Selection */}
                {showPlaylist && (
                  <div className="mt-2 pt-2 border-t border-white/10 space-y-1 max-h-36 overflow-y-auto custom-scrollbar">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase mb-1.5">Select Lofi Track:</p>
                    {FALLBACK_PLAYLIST.map((track, idx) => (
                      <button
                        key={track.id}
                        onClick={(e) => selectTrack(idx, e)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs transition-colors ${
                          currentTrackIndex === idx
                            ? 'bg-[#1DB954]/10 text-[#1DB954] font-semibold border border-[#1DB954]/20'
                            : 'text-muted-foreground hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="truncate">{idx + 1}. {track.title}</span>
                        {currentTrackIndex === idx && isPlaying && (
                          <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-ping" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export const playThock = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.type = "sine"
    
    // Rapid pitch drop for a deep mechanical "thump/thock"
    osc.frequency.setValueAtTime(120, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.1)

    // Rapid volume fade out
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.1)
  } catch (e) {
    // Silently fail if browser audio context is suspended without user interaction
  }
}

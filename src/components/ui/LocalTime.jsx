import React, { useState, useEffect } from 'react'

export default function LocalTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      // User is from Nepal based on Hero text
      const formatted = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kathmandu',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
      setTime(formatted)
    }
    updateTime()
    const int = setInterval(updateTime, 1000)
    return () => clearInterval(int)
  }, [])

  return (
    <div className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold tracking-wide rounded-full bg-background border border-border shadow-sm shadow-[0_0_15px_rgba(0,0,0,0.05)] cursor-default hover:border-muted-foreground/30 transition-colors">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span className="text-foreground">Available for work</span>
      <span className="text-muted-foreground border-l border-border pl-2.5">Nepal Time: {time}</span>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { Code2 } from 'lucide-react'

const DEFAULT_CODE = `// Edit my portfolio live!
// Try modifying these values and watch the site change instantly.

export const portfolioConfig = {
  themeColor: "#10b981",  // Try #ec4899 (Pink) or #3b82f6 (Blue)
  blurIntensity: "12px",  // Try "24px" or "0px"
  cardRadius: "16px",     // Try "0px" for sharp boxes
  scaleHover: 1.05        // Try 1.2
};`

export default function CodePlayground() {
  const [code, setCode] = useState(DEFAULT_CODE)

  useEffect(() => {
    try {
      // Basic regex scraping
      const themeMatch = code.match(/themeColor:\s*["']([^"']+)["']/)
      const radiusMatch = code.match(/cardRadius:\s*["']([^"']+)["']/)
      const blurMatch = code.match(/blurIntensity:\s*["']([^"']+)["']/)
      const scaleMatch = code.match(/scaleHover:\s*([0-9.]+)/)

      // Inject custom global styles
      let css = ''
      if (themeMatch) {
        css += `
          .text-green-400, .group-hover\\:text-green-400:hover, .text-green-500 { color: ${themeMatch[1]} !important; }
          .bg-green-500, .bg-green-400, .group-hover\\:bg-green-400:hover { background-color: ${themeMatch[1]} !important; }
          .border-green-400, .focus\\:border-green-400:focus { border-color: ${themeMatch[1]} !important; }
        `
      }
      if (radiusMatch) {
        css += `
          .rounded-xl, .rounded-2xl, .rounded-lg { border-radius: ${radiusMatch[1]} !important; }
        `
      }
      if (blurMatch) {
        css += `
          .backdrop-blur-md, .backdrop-blur-sm { backdrop-filter: blur(${blurMatch[1]}) !important; -webkit-backdrop-filter: blur(${blurMatch[1]}) !important; }
          .blur-3xl, .blur-lg, .blur-md { filter: blur(${blurMatch[1]}) !important; }
        `
      }
      if (scaleMatch) {
         css += `
           .hover\\:scale-105:hover { transform: scale(${scaleMatch[1]}) !important; }
           .group-hover\\:scale-105:hover { transform: scale(${scaleMatch[1]}) !important; }
           .hover\\:scale-\\[1\\.02\\]:hover { transform: scale(${scaleMatch[1]}) !important; }
           .hover\\:scale-\\[1\\.3\\]:hover { transform: scale(${scaleMatch[1]}) !important; }
         `
      }

      let styleEl = document.getElementById('live-playground-styles')
      if (!styleEl) {
        styleEl = document.createElement('style')
        styleEl.id = 'live-playground-styles'
        document.head.appendChild(styleEl)
      }
      styleEl.innerHTML = css

    } catch (e) {
      console.error(e)
    }
  }, [code])

  return (
    <div className="w-full max-w-4xl mx-auto mt-32">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Code2 className="text-muted-foreground" size={28} />
            Live Layout Injector
          </h2>
          <p className="text-muted-foreground mt-2">
            This entire portfolio is fully dynamic. Type in the code block below to instantly inject CSS variables globally. 
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-[#09090b] border border-border/50 shadow-2xl overflow-hidden font-mono text-sm relative group">
        <div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-border/50">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="mx-auto text-xs text-muted-foreground">config.js — Prajwal's Portfolio</div>
        </div>
        <textarea 
          spellCheck="false"
          data-cursor="execute"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-48 bg-transparent text-gray-300 p-6 focus:outline-none resize-none leading-relaxed transition-colors border-2 border-transparent focus:border-border/30"
          style={{ tabSize: 2 }}
        />
        <div className="absolute bottom-4 right-4 text-xs text-muted-foreground flex items-center gap-2 bg-[#18181b] px-3 py-1.5 rounded border border-border/50 opacity-50 group-hover:opacity-100 transition-opacity">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live Compiler Listening
        </div>
      </div>
    </div>
  )
}

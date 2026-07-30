import React, { useState } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'

const SNIPPETS = [
  {
    id: 'useDebounce',
    title: 'useDebounce.js',
    language: 'javascript',
    description: 'Custom React hook to delay state updates until user stops typing, preventing excessive API calls.',
    code: `import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`
  },
  {
    id: 'fetchWithCache',
    title: 'fetchWithCache.js',
    language: 'javascript',
    description: 'Smart fetch wrapper with TTL-based localStorage caching to optimize network request performance.',
    code: `export async function fetchWithCache(url, ttlMs = 5 * 60 * 1000) {
  const cached = localStorage.getItem(url);
  if (cached) {
    const { data, expiry } = JSON.parse(cached);
    if (Date.now() < expiry) return data;
  }

  const res = await fetch(url);
  const data = await res.json();
  
  localStorage.setItem(url, JSON.stringify({
    data,
    expiry: Date.now() + ttlMs
  }));

  return data;
}`
  },
  {
    id: 'cn',
    title: 'cn.js (Classnames)',
    language: 'javascript',
    description: 'Lightweight utility function to merge conditional Tailwind CSS classnames cleanly without duplicates.',
    code: `export function cn(...classes) {
  return classes
    .flat()
    .filter(Boolean)
    .join(' ')
    .trim();
}`
  }
]

export default function CodeSnippets() {
  const [activeTab, setActiveTab] = useState(SNIPPETS[0].id)
  const [copiedId, setCopiedId] = useState(null)

  const activeSnippet = SNIPPETS.find((s) => s.id === activeTab) || SNIPPETS[0]

  const handleCopy = (id, codeText) => {
    navigator.clipboard.writeText(codeText)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-24">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-foreground flex items-center gap-2.5">
            <Terminal className="text-blue-400" size={24} />
            Production Utilities & Code Snippets
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            Reusable, high-performance utility functions engineered for production React applications.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-muted/60 border border-border rounded-xl">
          {SNIPPETS.map((snippet) => (
            <button
              key={snippet.id}
              onClick={() => setActiveTab(snippet.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                activeTab === snippet.id
                  ? 'bg-foreground text-background font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {snippet.title}
            </button>
          ))}
        </div>
      </div>

      {/* Snippet Card */}
      <div className="rounded-2xl bg-[#09090b] border border-border/80 shadow-xl overflow-hidden font-mono text-sm">
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#141417] border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-muted-foreground font-semibold">{activeSnippet.title}</span>
          </div>

          <button
            onClick={() => handleCopy(activeSnippet.id, activeSnippet.code)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/40 border border-border text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
          >
            {copiedId === activeSnippet.id ? (
              <>
                <Check size={13} className="text-green-400" />
                <span className="text-green-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Snippet Description */}
        <div className="px-6 py-3 bg-[#0d0d10] border-b border-border/30 text-xs text-muted-foreground/90 leading-relaxed font-sans">
          💡 <span className="font-semibold text-foreground">Usage:</span> {activeSnippet.description}
        </div>

        {/* Code Content */}
        <div className="p-6 overflow-x-auto text-gray-200 text-xs md:text-sm leading-relaxed bg-[#09090b]">
          <pre className="font-mono">
            <code>{activeSnippet.code}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

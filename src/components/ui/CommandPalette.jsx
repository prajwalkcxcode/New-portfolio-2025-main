import React, { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Moon, Sun, Home, User, Mail, Code2 } from 'lucide-react'

// NOTE: It is essential to style [cmdk-dialog] as a fixed overlay
// However, to keep it clean with tailwind, we pass className to inner wrappers.

export default function CommandPalette({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false)

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const scrollTo = (id) => {
    setOpen(false)
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <Command.Dialog 
          open={open} 
          onOpenChange={setOpen} 
          label="Global Command Menu"
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] pb-[15vh]"
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm -z-10"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="w-[90vw] max-w-[550px] bg-card border border-border rounded-xl shadow-[0_30px_100px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            <div className="flex items-center px-4 border-b border-border h-14">
              <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
              <Command.Input 
                autoFocus
                placeholder="Type a command or search..." 
                className="flex-1 bg-transparent border-0 outline-none text-foreground text-sm placeholder:text-muted-foreground"
              />
              <div className="flex items-center gap-1">
                 <kbd className="font-sans text-[10px] font-medium bg-muted text-muted-foreground px-1.5 py-0.5 rounded border border-border">ESC</kbd>
              </div>
            </div>
            
            <Command.List className="max-h-[350px] overflow-y-auto p-2 scrollbar-none">
              <Command.Empty className="p-6 text-center text-sm text-muted-foreground">
                No results found.
              </Command.Empty>

              <Command.Group heading="Navigation" className="px-2 text-xs font-semibold text-muted-foreground py-2 [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:mb-2">
                <Command.Item 
                  onSelect={() => scrollTo('top')}
                  className="flex items-center px-3 py-2.5 text-sm text-foreground rounded-lg cursor-pointer aria-selected:bg-muted aria-selected:text-foreground data-[selected=true]:bg-muted data-[selected=true]:text-foreground transition-colors"
                >
                  <Home className="w-4 h-4 mr-3 text-muted-foreground" /> Home
                </Command.Item>
                <Command.Item 
                  onSelect={() => scrollTo('about')}
                  className="flex items-center px-3 py-2.5 text-sm text-foreground rounded-lg cursor-pointer aria-selected:bg-muted aria-selected:text-foreground data-[selected=true]:bg-muted data-[selected=true]:text-foreground transition-colors"
                >
                  <User className="w-4 h-4 mr-3 text-muted-foreground" /> About Me
                </Command.Item>
                <Command.Item 
                  onSelect={() => scrollTo('projects')}
                  className="flex items-center px-3 py-2.5 text-sm text-foreground rounded-lg cursor-pointer aria-selected:bg-muted aria-selected:text-foreground data-[selected=true]:bg-muted data-[selected=true]:text-foreground transition-colors"
                >
                  <Code2 className="w-4 h-4 mr-3 text-muted-foreground" /> Projects
                </Command.Item>
                <Command.Item 
                  onSelect={() => scrollTo('contact')}
                  className="flex items-center px-3 py-2.5 text-sm text-foreground rounded-lg cursor-pointer aria-selected:bg-muted aria-selected:text-foreground data-[selected=true]:bg-muted data-[selected=true]:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4 mr-3 text-muted-foreground" /> Contact
                </Command.Item>
              </Command.Group>

              <div className="h-px bg-border my-1 mx-2" />

              <Command.Group heading="Theme" className="px-2 text-xs font-semibold text-muted-foreground py-2 [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:mb-2">
                <Command.Item 
                  onSelect={() => {
                    toggleTheme()
                    setOpen(false)
                  }}
                  className="flex items-center px-3 py-2.5 text-sm text-foreground rounded-lg cursor-pointer aria-selected:bg-muted aria-selected:text-foreground data-[selected=true]:bg-muted data-[selected=true]:text-foreground transition-colors"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4 mr-3 text-muted-foreground" /> : <Moon className="w-4 h-4 mr-3 text-muted-foreground" />} 
                  Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
                </Command.Item>
              </Command.Group>
            </Command.List>
            
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  )
}

import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, ChevronDown, Monitor, Gamepad2, Radio } from "lucide-react";
import Magnetic from "./ui/Magnetic";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#journey" },
  { name: "Contact", href: "#contact" },
];

const secondaryLinks = [
  { name: "Articles", href: "#blogs" },
  { name: "Guestbook", href: "#guestbook" },
];

export default function Navbar({
  theme,
  onToggleTheme,
  onOpenResume,
  onOpenBugSmasher,
  onOpenOSMode,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [active, setActive] = useState("#home");

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const sections = ["home", "about", "skills", "projects", "blogs", "journey", "guestbook", "contact"]
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      let current = "#home";
      sections.forEach((section) => {
        const offsetTop = section.offsetTop - 140;
        if (scrollY >= offsetTop) {
          current = `#${section.id}`;
        }
      });

      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href) => {
    setIsOpen(false)
    // Wait for menu-close animation + body overflow restore before scrolling
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 320)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-background border-b border-border py-4 shadow-xl"
          : "bg-transparent py-6"
      }`}
    >
      <nav
        className="max-w-5xl mx-auto px-6 flex items-center justify-between"
        aria-label="Main"
      >
        <button
          onClick={() => scrollTo("#home")}
          className="text-xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          Prajwal<span className="text-muted-foreground">.</span>
        </button>

        <div className="flex items-center gap-6">
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map(({ name, href }) => {
              const isActive = active === href;
              return (
                <li key={name}>
                  <Magnetic>
                    <button
                      type="button"
                      onClick={() => scrollTo(href)}
                      className={`text-sm font-medium transition-colors px-2 py-1 ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {name}
                    </button>
                  </Magnetic>
                </li>
              );
            })}

            {/* "More" dropdown for less important items */}
            <li className="relative">
              <Magnetic>
                <button
                  type="button"
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  onMouseEnter={() => setIsMoreOpen(true)}
                  className={`text-sm font-medium transition-colors px-2 py-1 flex items-center gap-1 ${
                    secondaryLinks.some(l => active === l.href)
                      ? "text-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  More
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>
              </Magnetic>
              
              <AnimatePresence>
                {isMoreOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsMoreOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      onMouseLeave={() => setIsMoreOpen(false)}
                      className="absolute right-0 mt-2 w-40 rounded-xl border border-border bg-card p-1.5 shadow-xl z-50"
                    >
                      {secondaryLinks.map(({ name, href }) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => {
                            scrollTo(href);
                            setIsMoreOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors font-medium block ${
                            active === href
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {name}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </li>

            <li>
              <Magnetic>
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="relative group px-3.5 py-1.5 rounded-lg border border-border text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:text-foreground hover:border-transparent hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] overflow-hidden"
                >
                  {/* Glowing gradient border */}
                  <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-r from-blue-500 to-purple-500 [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="flex items-center gap-1.5 relative z-10">
                    CV
                    <motion.span 
                      className="inline-block text-[10px]" 
                      animate={{ x: [0, 2, 0] }} 
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </span>
                </button>
              </Magnetic>
            </li>
          </ul>

          <div className="flex items-center gap-2 md:gap-3">
            {/* OS Desktop Mode Toggle */}
            <Magnetic>
              <button
                type="button"
                onClick={onOpenOSMode}
                className="hidden sm:flex p-2 rounded-full text-indigo-400 hover:bg-indigo-500/10 transition-colors items-center justify-center"
                title="Launch Desktop OS Environment"
                aria-label="Launch Desktop OS Environment"
              >
                <Monitor size={18} />
              </button>
            </Magnetic>

            {/* Bug Smasher Game Toggle */}
            <Magnetic>
              <button
                type="button"
                onClick={onOpenBugSmasher}
                className="hidden sm:flex p-2 rounded-full text-rose-400 hover:bg-rose-500/10 transition-colors items-center justify-center"
                title="Play Bug Smasher Mini-Game"
                aria-label="Play Bug Smasher Mini-Game"
              >
                <Gamepad2 size={18} />
              </button>
            </Magnetic>

            {/* Spotify Player Toggle */}
            <Magnetic>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("toggle-spotify"))}
                className="p-2 rounded-full text-emerald-400 hover:bg-emerald-500/10 transition-colors flex items-center justify-center"
                title="Toggle Music Vibe Player"
                aria-label="Toggle Music Player"
              >
                <Radio size={18} className="animate-pulse" />
              </button>
            </Magnetic>

            <Magnetic>
              <button
                type="button"
                onClick={onToggleTheme}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center justify-center"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </Magnetic>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 top-[65px] bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Mobile Drawer */}
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-2xl overflow-hidden z-50"
            >
              <ul className="px-6 py-6 space-y-4">
                {navLinks.map(({ name, href }) => {
                  const isActive = active === href;
                  return (
                    <li key={name}>
                      <button
                        type="button"
                        onClick={() => scrollTo(href)}
                        className={`block w-full text-left text-base font-semibold transition-colors py-1 ${
                          isActive ? "text-blue-400 font-bold" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {name}
                      </button>
                    </li>
                  );
                })}

                <li className="pt-3 border-t border-border space-y-3">
                  <div className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground mb-1 select-none">
                    More
                  </div>
                  {secondaryLinks.map(({ name, href }) => {
                    const isActive = active === href;
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => scrollTo(href)}
                        className={`block w-full text-left text-sm font-semibold transition-colors py-0.5 ${
                          isActive ? "text-blue-400 font-bold" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {name}
                      </button>
                    );
                  })}
                </li>

                <li className="pt-3 border-t border-border space-y-2">
                  <div className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground mb-1 select-none">
                    Interactive
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      onOpenOSMode();
                    }}
                    className="flex items-center gap-2 w-full text-left text-sm text-indigo-400 font-semibold transition-colors py-1"
                  >
                    <Monitor size={16} />
                    <span>🖥️ Launch Desktop OS Mode</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      onOpenBugSmasher();
                    }}
                    className="flex items-center gap-2 w-full text-left text-sm text-rose-400 font-semibold transition-colors py-1"
                  >
                    <Gamepad2 size={16} />
                    <span>🕹️ Play Bug Smasher Arcade</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      window.dispatchEvent(new CustomEvent("toggle-spotify"));
                    }}
                    className="flex items-center gap-2 w-full text-left text-sm text-emerald-400 font-semibold transition-colors py-1"
                  >
                    <Radio size={16} className="animate-pulse" />
                    <span>🎵 Ambient Audio Vibe</span>
                  </button>
                </li>

                <li className="pt-2 border-t border-border">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      onOpenResume();
                    }}
                    className="block w-full text-left text-sm text-blue-400 hover:text-blue-300 font-bold transition-colors"
                  >
                    View CV / Resume →
                  </button>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}



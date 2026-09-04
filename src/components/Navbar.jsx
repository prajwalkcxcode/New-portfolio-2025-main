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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const sections = ["home", "featured", "about", "skills", "projects", "blogs", "journey", "guestbook", "contact"]
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      let current = "#home";
      sections.forEach((section) => {
        const offsetTop = section.offsetTop - 140;
        if (scrollY >= offsetTop) current = `#${section.id}`;
      });

      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 320);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-background/90 backdrop-blur-md border-b border-border py-3.5 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 flex items-center justify-between" aria-label="Main">

        {/* Logo */}
        <button
          onClick={() => scrollTo("#home")}
          className="text-lg font-bold tracking-tight text-foreground hover:opacity-70 transition-opacity"
        >
          Prajwal<span className="text-muted-foreground">.</span>
        </button>

        {/* Desktop nav */}
        <div className="flex items-center gap-5">
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ name, href }) => {
              const isActive = active === href;
              return (
                <li key={name}>
                  <Magnetic>
                    <button
                      type="button"
                      onClick={() => scrollTo(href)}
                      className={`relative text-sm font-medium transition-colors px-3 py-1.5 rounded-md ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                      }`}
                    >
                      {name}
                      {/* Active underline dot */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-dot"
                          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  </Magnetic>
                </li>
              );
            })}

            {/* More dropdown */}
            <li className="relative">
              <Magnetic>
                <button
                  type="button"
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  onMouseEnter={() => setIsMoreOpen(true)}
                  className={`text-sm font-medium transition-colors px-3 py-1.5 rounded-md flex items-center gap-1 ${
                    secondaryLinks.some((l) => active === l.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  More
                  <ChevronDown size={13} className={`transition-transform duration-200 ${isMoreOpen ? "rotate-180" : ""}`} />
                </button>
              </Magnetic>

              <AnimatePresence>
                {isMoreOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsMoreOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      onMouseLeave={() => setIsMoreOpen(false)}
                      className="absolute right-0 mt-2 w-44 rounded-xl border border-border bg-card/95 backdrop-blur-md p-1.5 shadow-xl z-50"
                    >
                      {secondaryLinks.map(({ name, href }) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => { scrollTo(href); setIsMoreOpen(false); }}
                          className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors font-medium ${
                            active === href
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {name}
                        </button>
                      ))}

                      {/* Divider */}
                      <div className="border-t border-border my-1" />

                      {/* Interactive items moved here */}
                      <button
                        type="button"
                        onClick={() => { setIsMoreOpen(false); onOpenOSMode(); }}
                        className="w-full text-left px-3 py-2 text-xs rounded-lg transition-colors font-medium text-indigo-400 hover:bg-muted flex items-center gap-2"
                      >
                        <Monitor size={12} />
                        Desktop OS Mode
                      </button>
                      <button
                        type="button"
                        onClick={() => { setIsMoreOpen(false); onOpenBugSmasher(); }}
                        className="w-full text-left px-3 py-2 text-xs rounded-lg transition-colors font-medium text-rose-400 hover:bg-muted flex items-center gap-2"
                      >
                        <Gamepad2 size={12} />
                        Memory Match Game
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </li>
          </ul>

          {/* Right side icons — cleaner, fewer */}
          <div className="flex items-center gap-2">
            {/* CV button */}
            <div className="hidden md:block">
              <Magnetic>
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="px-3.5 py-1.5 rounded-lg border border-border text-xs font-semibold tracking-wide text-foreground transition-all duration-200 hover:bg-muted hover:border-muted-foreground/40"
                >
                  CV
                </button>
              </Magnetic>
            </div>

            {/* Spotify */}
            <Magnetic>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("toggle-spotify"))}
                className="p-2 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition-colors flex items-center justify-center"
                title="Toggle Music Player"
                aria-label="Toggle Music Player"
              >
                <Radio size={16} className="animate-pulse" />
              </button>
            </Magnetic>

            {/* Theme */}
            <Magnetic>
              <button
                type="button"
                onClick={onToggleTheme}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center justify-center"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </Magnetic>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 top-[56px] bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-2xl overflow-hidden z-50"
            >
              <ul className="px-6 py-5 space-y-1">
                {navLinks.map(({ name, href }) => {
                  const isActive = active === href;
                  return (
                    <li key={name}>
                      <button
                        type="button"
                        onClick={() => scrollTo(href)}
                        className={`block w-full text-left text-base font-semibold transition-colors py-2 px-3 rounded-lg ${
                          isActive
                            ? "text-foreground bg-muted"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        {name}
                      </button>
                    </li>
                  );
                })}

                <li className="pt-2 border-t border-border mt-2">
                  <div className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground mb-2 px-3">More</div>
                  {secondaryLinks.map(({ name, href }) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => scrollTo(href)}
                      className="block w-full text-left text-sm font-medium transition-colors py-2 px-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    >
                      {name}
                    </button>
                  ))}
                </li>

                <li className="pt-2 border-t border-border space-y-1">
                  <div className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground mb-2 px-3">Interactive</div>
                  <button
                    type="button"
                    onClick={() => { setIsOpen(false); onOpenOSMode(); }}
                    className="flex items-center gap-2 w-full text-left text-sm text-indigo-400 font-medium py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Monitor size={14} /> Desktop OS Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsOpen(false); onOpenBugSmasher(); }}
                    className="flex items-center gap-2 w-full text-left text-sm text-rose-400 font-medium py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Gamepad2 size={14} /> Memory Match Game
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsOpen(false); window.dispatchEvent(new CustomEvent("toggle-spotify")); }}
                    className="flex items-center gap-2 w-full text-left text-sm text-emerald-400 font-medium py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Radio size={14} className="animate-pulse" /> Music Player
                  </button>
                </li>

                <li className="pt-2 border-t border-border">
                  <button
                    type="button"
                    onClick={() => { setIsOpen(false); onOpenResume(); }}
                    className="w-full text-left text-sm font-semibold text-foreground bg-muted hover:bg-muted/80 transition-colors py-2.5 px-4 rounded-lg"
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

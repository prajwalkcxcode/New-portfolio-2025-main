import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Target } from "lucide-react";
import Magnetic from "./ui/Magnetic";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Articles", href: "#blogs" },
  { name: "Journey", href: "#journey" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ theme, onToggleTheme, onOpenResume, isFocusMode, onToggleFocusMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

      const sections = ["home", "about", "skills", "projects", "blogs", "journey", "contact"]
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
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border py-4"
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
          <ul className="hidden md:flex items-center gap-8">
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
            {/* Focus Mode Toggle */}
            <Magnetic>
              <button
                type="button"
                onClick={onToggleFocusMode}
                className={`p-2 rounded-full transition-colors flex items-center justify-center ${
                  isFocusMode ? "text-blue-400 bg-blue-500/10 border border-blue-500/30" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                title="Toggle Zen / Focus Mode (Shortcut: F)"
                aria-label="Toggle Focus Mode"
              >
                <Target size={18} />
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
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg overflow-hidden"
          >
            <ul className="px-6 py-5 space-y-4">
              {navLinks.map(({ name, href }) => (
                <li key={name}>
                  <button
                    type="button"
                    onClick={() => scrollTo(href)}
                    className="block w-full text-left text-sm text-muted-foreground hover:text-foreground font-medium transition-colors"
                  >
                    {name}
                  </button>
                </li>
              ))}
              <li className="pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenResume();
                  }}
                  className="block w-full text-left text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  View CV / Resume
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

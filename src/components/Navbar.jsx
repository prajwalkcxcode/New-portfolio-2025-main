import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import Magnetic from "./ui/Magnetic";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#journey" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const sections = ["home", "about", "skills", "projects", "journey", "contact"]
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
          </ul>

          <div className="flex items-center gap-4">
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
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg">
          <ul className="px-6 py-4 space-y-4">
            {navLinks.map(({ name, href }) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => scrollTo(href)}
                  className="block w-full text-left text-sm text-muted-foreground hover:text-foreground font-medium"
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

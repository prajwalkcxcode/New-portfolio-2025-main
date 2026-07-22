import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareHeart, Heart, Send, Sparkles, User, Tag, CheckCircle2 } from "lucide-react";
import { staggerContainer, fadeUp } from "../motion";

const BADGES = [
  { id: "ui", label: "🚀 Loved the UI" },
  { id: "dev", label: "🔥 Top Developer" },
  { id: "portfolio", label: "💻 Great Portfolio" },
  { id: "hire", label: "⚡ Hire This Guy!" },
  { id: "coffee", label: "☕ Buy Him Coffee" },
];

const INITIAL_NOTES = [
  {
    id: "note-1",
    name: "Aarav Sharma",
    role: "Senior Frontend Engineer",
    message: "The dark theme animations and smooth scroll transitions on this portfolio are outstanding! Super clean code structure.",
    badge: "🚀 Loved the UI",
    likes: 14,
    date: "2 hours ago",
    avatarBg: "from-blue-500 to-indigo-600",
  },
  {
    id: "note-2",
    name: "Sophia Martinez",
    role: "Tech Recruiter @ TechCorp",
    message: "Loved testing out the interactive OS mode and terminal. Very impressive skills showcase!",
    badge: "⚡ Hire This Guy!",
    likes: 21,
    date: "1 day ago",
    avatarBg: "from-purple-500 to-pink-600",
  },
  {
    id: "note-3",
    name: "Rohan KC",
    role: "Full-Stack Developer",
    message: "Bug Smasher arcade game in the portfolio is such a creative touch! Keep building awesome stuff.",
    badge: "🔥 Top Developer",
    likes: 11,
    date: "3 days ago",
    avatarBg: "from-emerald-500 to-teal-600",
  },
];

export default function Guestbook() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("portfolio_guestbook_notes");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_NOTES;
      }
    }
    return INITIAL_NOTES;
  });

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [selectedBadge, setSelectedBadge] = useState(BADGES[0].label);
  const [postedSuccess, setPostedSuccess] = useState(false);

  // Sync notes across tabs and windows
  useEffect(() => {
    const syncNotes = () => {
      const saved = localStorage.getItem("portfolio_guestbook_notes");
      if (saved) {
        try {
          setNotes(JSON.parse(saved));
        } catch (e) {}
      }
    };

    window.addEventListener("guestbook-updated", syncNotes);
    window.addEventListener("storage", syncNotes);
    return () => {
      window.removeEventListener("guestbook-updated", syncNotes);
      window.removeEventListener("storage", syncNotes);
    };
  }, []);

  const saveNotes = (updated) => {
    setNotes(updated);
    localStorage.setItem("portfolio_guestbook_notes", JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("guestbook-updated"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const gradients = [
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-amber-500 to-rose-500",
      "from-emerald-500 to-teal-500",
    ];
    const randomBg = gradients[Math.floor(Math.random() * gradients.length)];

    const newNote = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      role: role.trim() || "Portfolio Visitor",
      message: message.trim(),
      badge: selectedBadge,
      likes: 1,
      date: "Just now",
      avatarBg: randomBg,
    };

    const updatedNotes = [newNote, ...notes];
    saveNotes(updatedNotes);

    setName("");
    setRole("");
    setMessage("");
    setPostedSuccess(true);
    setTimeout(() => setPostedSuccess(false), 4000);
  };

  const handleLike = (id) => {
    const updatedNotes = notes.map((n) =>
      n.id === id ? { ...n, likes: n.likes + 1 } : n
    );
    saveNotes(updatedNotes);
  };

  return (
    <section id="guestbook" className="py-16 md:py-24 relative overflow-hidden bg-background border-t border-border/40">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-5xl mx-auto px-4 sm:px-6"
      >
        {/* Section Title Header */}
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <MessageSquareHeart size={15} /> Community Guestbook & Pinboard
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Leave Your Mark on the <span className="gradient-text">Pinboard</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-xs sm:text-sm leading-relaxed">
            Post a note directly on Prajwal's portfolio website. Share feedback, say hello, or leave a badge!
          </p>
        </motion.div>

        {/* Layout: Left Form / Right Notes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Website Post Form */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-card border border-border shadow-xl backdrop-blur-sm"
          >
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-1 flex items-center gap-2">
              <Sparkles size={18} className="text-blue-400" /> Write a Guest Note
            </h3>
            <p className="text-xs text-muted-foreground mb-5">
              Your note will be displayed live on the website pinboard!
            </p>

            {postedSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-medium"
              >
                <CheckCircle2 size={16} /> 🎉 Note posted live to the pinboard!
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-muted-foreground mb-1 font-semibold">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full bg-background border border-border focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-foreground placeholder-muted-foreground outline-none transition text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-muted-foreground mb-1 font-semibold">Role / Company (Optional)</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Full-Stack Developer or Recruiter"
                  className="w-full bg-background border border-border focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-foreground placeholder-muted-foreground outline-none transition text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-muted-foreground mb-1 font-semibold">Select Badge Tag</label>
                <div className="flex flex-wrap gap-2">
                  {BADGES.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBadge(b.label)}
                      className={`px-3 py-1.5 rounded-lg border text-[11px] font-medium transition min-h-[32px] ${
                        selectedBadge === b.label
                          ? "bg-blue-600 text-white border-blue-500 font-bold"
                          : "bg-background text-muted-foreground border-border hover:border-foreground"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-muted-foreground mb-1 font-semibold">Message *</label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Say hello, share feedback, or leave a message..."
                  className="w-full bg-background border border-border focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-foreground placeholder-muted-foreground outline-none transition resize-none text-xs sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:brightness-110 text-white font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 text-xs sm:text-sm"
              >
                <Send size={15} /> Post Note to Website
              </button>
            </form>
          </motion.div>

          {/* Notes Grid */}
          <motion.div variants={fadeUp} className="lg:col-span-7 space-y-4">
            <AnimatePresence>
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-lg hover:border-blue-500/30 transition group"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr ${note.avatarBg || "from-blue-500 to-indigo-600"} flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-md shrink-0`}
                      >
                        {note.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-foreground flex items-center gap-2">
                          {note.name}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-muted-foreground">{note.role}</p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold border bg-blue-500/10 text-blue-400 border-blue-500/20">
                      {note.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed mb-4 font-sans">
                    "{note.message}"
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-3">
                    <span className="text-[10px] sm:text-[11px] font-mono">{note.date}</span>
                    <button
                      onClick={() => handleLike(note.id)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-border hover:border-rose-500/40 hover:text-rose-400 transition"
                    >
                      <Heart size={14} className="text-rose-500 fill-rose-500/20 group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-foreground text-[11px]">{note.likes}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

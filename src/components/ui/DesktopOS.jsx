import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minus,
  Square,
  Terminal,
  FolderGit2,
  User,
  Cpu,
  Radio,
  MessageSquareHeart,
  Gamepad2,
  LogOut,
  Clock,
  Wifi,
  Battery,
  Search,
  ExternalLink,
  Github,
  Mail,
  Send,
  Heart,
  Sparkles
} from "lucide-react";

const APPS = [
  { id: "projects", title: "Projects.app", icon: FolderGit2, color: "from-blue-500 to-indigo-600" },
  { id: "about", title: "About.app", icon: User, color: "from-purple-500 to-pink-600" },
  { id: "skills", title: "Skills.app", icon: Cpu, color: "from-cyan-500 to-teal-600" },
  { id: "terminal", title: "Terminal.app", icon: Terminal, color: "from-zinc-700 to-zinc-900" },
  { id: "guestbook", title: "Guestbook.app", icon: MessageSquareHeart, color: "from-amber-500 to-orange-600" },
  { id: "bugsmasher", title: "BugSmasher.app", icon: Gamepad2, color: "from-rose-500 to-red-600" },
];

export default function DesktopOS({ isOpen, onClose, onOpenBugSmasher }) {
  const desktopRef = useRef(null);
  const [openWindows, setOpenWindows] = useState(["projects", "terminal"]);
  const [activeWindow, setActiveWindow] = useState("projects");
  const [windowOrder, setWindowOrder] = useState(["projects", "terminal"]);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [terminalOutput, setTerminalOutput] = useState([
    { type: "sys", text: "Prajwal OS v2.5 [Kernel 6.8.0-react]" },
    { type: "sys", text: "Type 'help' to list available system commands." },
  ]);
  const [terminalInput, setTerminalInput] = useState("");

  // Embedded Guestbook State inside OS Mode
  const [guestbookNotes, setGuestbookNotes] = useState(() => {
    const saved = localStorage.getItem("portfolio_guestbook_notes");
    return saved ? JSON.parse(saved) : [
      { id: "note-1", name: "Aarav Sharma", role: "Frontend Dev", message: "Amazing dark mode animations!", badge: "🚀 Loved the UI", likes: 14 },
      { id: "note-2", name: "Sophia M.", role: "Recruiter", message: "Awesome interactive portfolio OS!", badge: "⚡ Hire This Guy!", likes: 21 },
    ];
  });
  const [gbName, setGbName] = useState("");
  const [gbMsg, setGbMsg] = useState("");
  const [gbBadge, setGbBadge] = useState("🚀 Loved the UI");

  // Sync guestbook notes with global storage and custom window events
  useEffect(() => {
    const syncNotes = () => {
      const saved = localStorage.getItem("portfolio_guestbook_notes");
      if (saved) {
        try {
          setGuestbookNotes(JSON.parse(saved));
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

  const saveGuestbookNotes = (updated) => {
    setGuestbookNotes(updated);
    localStorage.setItem("portfolio_guestbook_notes", JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("guestbook-updated"));
  };

  // Update clock time
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(
        d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const focusWindow = (id) => {
    setActiveWindow(id);
    setWindowOrder((prev) => [...prev.filter((w) => w !== id), id]);
  };

  const launchApp = (id) => {
    if (id === "bugsmasher") {
      onOpenBugSmasher();
      return;
    }
    if (minimizedWindows.includes(id)) {
      setMinimizedWindows((prev) => prev.filter((w) => w !== id));
    }
    if (!openWindows.includes(id)) {
      setOpenWindows((prev) => [...prev, id]);
    }
    focusWindow(id);
  };

  const closeWindow = (id) => {
    setOpenWindows((prev) => prev.filter((w) => w !== id));
    setMinimizedWindows((prev) => prev.filter((w) => w !== id));
    setWindowOrder((prev) => prev.filter((w) => w !== id));
    if (activeWindow === id) {
      const remaining = openWindows.filter((w) => w !== id);
      setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }
  };

  const toggleMinimize = (id) => {
    if (minimizedWindows.includes(id)) {
      setMinimizedWindows((prev) => prev.filter((w) => w !== id));
      focusWindow(id);
    } else {
      setMinimizedWindows((prev) => [...prev, id]);
      const remaining = openWindows.filter((w) => w !== id && !minimizedWindows.includes(w));
      if (activeWindow === id) {
        setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1] : null);
      }
    }
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = "";
    if (cmd === "help") {
      response = "Commands: about, skills, projects, contact, github, clear, exit";
    } else if (cmd === "about") {
      response = "Prajwal KC — BSc CSIT Student & Full-Stack React Developer based in Kathmandu.";
    } else if (cmd === "skills") {
      response = "Stack: React, Vite, Node.js, JavaScript/TypeScript, Tailwind CSS, Framer Motion, REST APIs.";
    } else if (cmd === "projects") {
      response = "Featured: 1. Ecommerce Platform  2. Weather Insights App  3. Portfolio Desktop OS";
    } else if (cmd === "contact") {
      response = "Email: prajwalkc2063@gmail.com | GitHub: @prajwalkcxcode";
    } else if (cmd === "github") {
      window.open("https://github.com/prajwalkcxcode", "_blank");
      response = "Opening GitHub profile in browser...";
    } else if (cmd === "clear") {
      setTerminalOutput([]);
      setTerminalInput("");
      return;
    } else if (cmd === "exit") {
      closeWindow("terminal");
      setTerminalInput("");
      return;
    } else {
      response = `Command not recognized: '${cmd}'. Type 'help' for options.`;
    }

    setTerminalOutput((prev) => [
      ...prev,
      { type: "cmd", text: `prajwal@os:~$ ${terminalInput}` },
      { type: "res", text: response },
    ]);
    setTerminalInput("");
  };

  const handleGbPost = (e) => {
    e.preventDefault();
    if (!gbName.trim() || !gbMsg.trim()) return;

    const gradients = [
      "from-blue-500 to-indigo-600",
      "from-purple-500 to-pink-600",
      "from-amber-500 to-orange-600",
      "from-emerald-500 to-teal-600"
    ];
    const newNote = {
      id: Math.random().toString(36).substring(2, 9),
      name: gbName.trim(),
      role: "OS Visitor",
      message: gbMsg.trim(),
      badge: gbBadge,
      likes: 1,
      date: "Just now",
      avatarBg: gradients[Math.floor(Math.random() * gradients.length)],
    };

    const updatedNotes = [newNote, ...guestbookNotes];
    saveGuestbookNotes(updatedNotes);
    setGbName("");
    setGbMsg("");
  };

  const handleGbLike = (id) => {
    const updatedNotes = guestbookNotes.map((n) =>
      n.id === id ? { ...n, likes: n.likes + 1 } : n
    );
    saveGuestbookNotes(updatedNotes);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-950 text-slate-100 font-sans overflow-hidden flex flex-col select-none"
      style={{
        backgroundImage: "radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 60%, #020617 100%)",
      }}
    >
      {/* OS Top Menu Bar */}
      <header className="h-8 bg-black/70 backdrop-blur-xl border-b border-white/10 px-4 flex items-center justify-between text-xs z-50 text-slate-300">
        <div className="flex items-center gap-4">
          <span className="font-extrabold text-blue-400 tracking-wider"> PrajwalOS</span>
          <span className="font-semibold text-white">
            {APPS.find((a) => a.id === activeWindow)?.title || "Desktop"}
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-400">File</span>
          <span className="hidden md:inline text-slate-400">Edit</span>
          <span className="hidden md:inline text-slate-400">View</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-slate-400">
            <Wifi size={14} />
            <Battery size={14} />
          </div>
          <div className="flex items-center gap-1 text-slate-200 font-mono text-[11px]">
            <Clock size={13} className="text-blue-400" />
            <span>{currentTime}</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 border border-rose-500/30 transition text-[11px] font-semibold"
          >
            <LogOut size={12} /> Exit OS
          </button>
        </div>
      </header>

      {/* Desktop Main Workspace Area */}
      <main ref={desktopRef} className="relative flex-1 p-6 overflow-hidden">
        {/* Desktop Grid Shortcuts */}
        <div className="grid grid-cols-1 gap-6 w-28">
          {APPS.map((app) => (
            <button
              key={app.id}
              onClick={() => launchApp(app.id)}
              onDoubleClick={() => launchApp(app.id)}
              className="flex flex-col items-center gap-2 group p-2 rounded-xl hover:bg-white/10 transition backdrop-blur-xs"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${app.color} p-3 flex items-center justify-center shadow-lg shadow-black/40 group-hover:scale-105 transition-transform border border-white/20`}
              >
                <app.icon size={28} className="text-white drop-shadow" />
              </div>
              <span className="text-xs font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center line-clamp-1">
                {app.title}
              </span>
            </button>
          ))}
        </div>

        {/* DRAGGABLE WINDOWS AREA */}
        {openWindows.map((appId, index) => {
          const app = APPS.find((a) => a.id === appId);
          if (!app) return null;
          const isMinimized = minimizedWindows.includes(appId);
          const isActive = activeWindow === appId;
          const zIndexOrder = windowOrder.indexOf(appId) + 10;

          if (isMinimized) return null;

          return (
            <motion.div
              key={appId}
              drag
              dragConstraints={desktopRef}
              dragElastic={0.05}
              dragMomentum={false}
              onClick={() => focusWindow(appId)}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`absolute top-4 sm:top-8 left-2 sm:left-12 md:left-44 w-[calc(100vw-1rem)] sm:w-[calc(100vw-4rem)] max-w-2xl bg-slate-900/95 border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl transition-shadow ${
                isActive ? "border-blue-500/70 shadow-blue-500/20" : "border-slate-800 opacity-95"
              }`}
              style={{
                top: `${20 + (index % 4) * 20}px`,
                left: `${10 + (index % 4) * 15}px`,
                zIndex: zIndexOrder,
              }}
            >
              {/* Window Header Bar (Drag Handle) */}
              <div className="h-10 bg-slate-950/90 border-b border-slate-800 px-4 flex items-center justify-between cursor-grab active:cursor-grabbing select-none">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeWindow(appId);
                    }}
                    className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 flex items-center justify-center group"
                  >
                    <X size={8} className="opacity-0 group-hover:opacity-100 text-black" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMinimize(appId);
                    }}
                    className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 flex items-center justify-center group"
                  >
                    <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black" />
                  </button>
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <app.icon size={14} className="text-blue-400" />
                  <span>{app.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">(Draggable ✥)</span>
                </div>

                <div className="w-12" />
              </div>

              {/* Window Content Body */}
              <div className="p-6 max-h-[420px] overflow-y-auto font-sans text-sm text-slate-200">
                {appId === "projects" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <FolderGit2 className="text-blue-400" /> Featured Projects
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/40 transition">
                        <h4 className="font-bold text-white mb-1">Ecommerce Platform</h4>
                        <p className="text-xs text-slate-400 mb-3">Full-stack store built with React, Node.js, and Tailwind CSS.</p>
                        <div className="flex gap-2 text-[10px] text-blue-300 font-mono">
                          <span className="px-2 py-0.5 rounded bg-blue-500/10">React</span>
                          <span className="px-2 py-0.5 rounded bg-blue-500/10">Node.js</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/40 transition">
                        <h4 className="font-bold text-white mb-1">Weather Insights App</h4>
                        <p className="text-xs text-slate-400 mb-3">Live forecast analytics dashboard with interactive maps.</p>
                        <div className="flex gap-2 text-[10px] text-cyan-300 font-mono">
                          <span className="px-2 py-0.5 rounded bg-cyan-500/10">React</span>
                          <span className="px-2 py-0.5 rounded bg-cyan-500/10">OpenWeather</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {appId === "about" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                        PK
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Prajwal KC</h3>
                        <p className="text-xs text-slate-400">BSc CSIT Student & Full-Stack React Engineer</p>
                        <p className="text-xs text-emerald-400 font-mono mt-1">● Available for Hire & Freelance</p>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-300 border-t border-slate-800 pt-3">
                      I craft performant, pixel-perfect web products using modern JavaScript technologies. Passionate about interactive UI/UX, responsive systems, and scalable full-stack applications.
                    </p>
                  </div>
                )}

                {appId === "skills" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Cpu className="text-cyan-400" /> Tech Stack Overview
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["React", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "Vite", "Node.js", "Express", "REST APIs", "Git/GitHub", "Framer Motion"].map((skill) => (
                        <span key={skill} className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {appId === "terminal" && (
                  <div className="font-mono text-xs text-emerald-400 space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800 min-h-[220px]">
                    {terminalOutput.map((out, i) => (
                      <div key={i} className={out.type === "cmd" ? "text-cyan-300" : out.type === "sys" ? "text-slate-400" : "text-emerald-400"}>
                        {out.text}
                      </div>
                    ))}
                    <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-2">
                      <span className="text-cyan-400 font-bold">prajwal@os:~$</span>
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        className="flex-1 bg-transparent text-white outline-none font-mono"
                        placeholder="Type 'help'..."
                        autoFocus
                      />
                    </form>
                  </div>
                )}

                {appId === "guestbook" && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <h4 className="font-bold text-white text-base flex items-center gap-2">
                          <MessageSquareHeart size={18} className="text-amber-400" /> OS Guestbook Pinboard
                        </h4>
                        <p className="text-xs text-slate-400">Post a note directly from OS mode!</p>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          const el = document.getElementById("guestbook");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-amber-300 transition"
                      >
                        View Full Web Guestbook ↓
                      </button>
                    </div>

                    {/* Quick Post Form */}
                    <form onSubmit={handleGbPost} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          value={gbName}
                          onChange={(e) => setGbName(e.target.value)}
                          placeholder="Your Name *"
                          className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white outline-none focus:border-amber-500"
                        />
                        <select
                          value={gbBadge}
                          onChange={(e) => setGbBadge(e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-slate-300 outline-none focus:border-amber-500"
                        >
                          <option value="🚀 Loved the UI">🚀 Loved the UI</option>
                          <option value="🔥 Top Developer">🔥 Top Developer</option>
                          <option value="⚡ Hire This Guy!">⚡ Hire This Guy!</option>
                          <option value="☕ Buy Him Coffee">☕ Buy Him Coffee</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={gbMsg}
                          onChange={(e) => setGbMsg(e.target.value)}
                          placeholder="Write a message to Prajwal..."
                          className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white outline-none focus:border-amber-500"
                        />
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition flex items-center gap-1"
                        >
                          <Send size={12} /> Post
                        </button>
                      </div>
                    </form>

                    {/* Notes List */}
                    <div className="space-y-3">
                      {guestbookNotes.map((n) => (
                        <div key={n.id} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-xs">{n.name}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">{n.badge}</span>
                            </div>
                            <p className="text-xs text-slate-300 mt-1">"{n.message}"</p>
                          </div>
                          <button
                            onClick={() => handleGbLike(n.id)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-rose-400 hover:bg-rose-500/10 text-xs font-mono"
                          >
                            <Heart size={12} className="fill-rose-500" /> {n.likes}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </main>

      {/* Bottom macOS Translucent Dock */}
      <footer className="h-20 flex items-center justify-center p-2 z-40">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-2xl shadow-2xl">
          {APPS.map((app) => {
            const isOpenApp = openWindows.includes(app.id);
            const isActiveApp = activeWindow === app.id;

            return (
              <button
                key={app.id}
                onClick={() => launchApp(app.id)}
                className="relative group p-1.5 rounded-xl transition-transform hover:-translate-y-2"
                title={app.title}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${app.color} flex items-center justify-center shadow-lg border border-white/20`}
                >
                  <app.icon size={24} className="text-white drop-shadow" />
                </div>
                {/* Active Indicator Dot */}
                {isOpenApp && (
                  <div className={`w-1.5 h-1.5 rounded-full mx-auto mt-1 ${isActiveApp ? "bg-blue-400 shadow-[0_0_8px_#60a5fa]" : "bg-slate-400"}`} />
                )}
              </button>
            );
          })}
        </div>
      </footer>
    </motion.div>
  );
}

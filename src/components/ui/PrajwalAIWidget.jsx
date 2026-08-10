import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, User, ArrowRight, CornerDownLeft, RefreshCw } from "lucide-react";

const SUGGESTIONS = [
  "What is Prajwal's tech stack?",
  "Is Prajwal available for hire?",
  "Show top projects",
  "Where is Prajwal located?",
  "How to get in touch?",
];

const INITIAL_MESSAGES = [
  {
    sender: "ai",
    text: "👋 Hi! I'm Prajwal's AI Portfolio Assistant. Ask me anything about his experience, tech stack, or projects!",
    actions: [],
  },
];

export default function PrajwalAIWidget({ onOpenResume, onOpenBugSmasher, onOpenOSMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = textToSend || input.trim();
    if (!query) return;

    // Add user message
    const userMsg = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(query);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 600);
  };

  const generateAIResponse = (q) => {
    const query = q.toLowerCase();

    if (query.includes("stack") || query.includes("technology") || query.includes("skills")) {
      return {
        sender: "ai",
        text: "Prajwal specializes in modern web development! His core stack includes:\n• Frontend: React, JavaScript (ES6+), Tailwind CSS, Framer Motion, Vite\n• Backend: Node.js, Express, REST APIs\n• Tools: Git/GitHub, VS Code, Postman",
        actions: [{ label: "View Skills Section", handler: () => scrollToSection("#skills") }],
      };
    }

    if (query.includes("hire") || query.includes("work") || query.includes("freelance") || query.includes("available")) {
      return {
        sender: "ai",
        text: "Yes! 🚀 Prajwal is actively open for full-stack & frontend developer roles as well as freelance projects.",
        actions: [
          { label: "View Resume / CV", handler: onOpenResume },
          { label: "Contact Prajwal", handler: () => scrollToSection("#contact") },
        ],
      };
    }

    if (query.includes("project") || query.includes("work") || query.includes("portfolio")) {
      return {
        sender: "ai",
        text: "Prajwal has built several full-stack and interactive web applications, including an Ecommerce platform, Weather analytics app, and this interactive Portfolio OS!",
        actions: [{ label: "View All Projects", handler: () => scrollToSection("#projects") }],
      };
    }

    if (query.includes("location") || query.includes("where") || query.includes("based")) {
      return {
        sender: "ai",
        text: "Prajwal is based in Kathmandu, Nepal 🇳🇵 and is open to remote developer positions worldwide!",
        actions: [{ label: "About Prajwal", handler: () => scrollToSection("#about") }],
      };
    }

    if (query.includes("contact") || query.includes("email") || query.includes("reach")) {
      return {
        sender: "ai",
        text: "You can email Prajwal directly at prajwalkc2063@gmail.com or leave a message through the contact form below!",
        actions: [{ label: "Go to Contact Form", handler: () => scrollToSection("#contact") }],
      };
    }

    if (query.includes("game") || query.includes("bug") || query.includes("match")) {
      return {
        sender: "ai",
        text: "Wanna play a mini-game? 🃏 Try the Memory Match game — flip cards and match all 8 tech stack pairs!",
        actions: [{ label: "Play Memory Match", handler: onOpenBugSmasher }],
      };
    }

    if (query.includes("os") || query.includes("desktop")) {
      return {
        sender: "ai",
        text: "Experience Prajwal's portfolio in a full macOS / Cyber OS desktop environment!",
        actions: [{ label: "Launch Desktop OS", handler: onOpenOSMode }],
      };
    }

    return {
      sender: "ai",
      text: "Thanks for asking! Prajwal is a BSc CSIT student & Full-Stack Developer driven by creating exceptional user experiences. Feel free to check out his projects or drop a message!",
      actions: [
        { label: "View Projects", handler: () => scrollToSection("#projects") },
        { label: "Contact Him", handler: () => scrollToSection("#contact") },
      ],
    };
  };

  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 select-none">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl shadow-blue-500/30 flex items-center gap-2 border border-white/20 hover:brightness-110 transition"
          aria-label="Toggle Prajwal AI Assistant"
        >
          <div className="relative">
            <Bot size={22} className="animate-pulse text-blue-100" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
          </div>
          <span className="text-xs font-bold tracking-wide pr-1 hidden sm:inline">Ask Prajwal AI</span>
        </motion.button>
      </div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-8 z-50 w-[calc(100vw-2rem)] max-w-sm sm:max-w-md bg-zinc-950/95 border border-blue-500/40 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden backdrop-blur-2xl flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="px-5 py-3.5 bg-zinc-950/80 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-100 flex items-center gap-1.5">
                    Prajwal AI <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">ONLINE</span>
                  </h4>
                  <p className="text-[11px] text-zinc-400">Powered by Prajwal's Portfolio Knowledge</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 font-sans text-xs">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                      <Bot size={15} />
                    </div>
                  )}

                  <div className={`max-w-[80%] space-y-2`}>
                    <div
                      className={`p-3 rounded-2xl leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-zinc-800/90 text-zinc-200 border border-zinc-700/50 rounded-bl-none whitespace-pre-line"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Action buttons embedded in AI messages */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.actions.map((act, idx) => (
                          <button
                            key={idx}
                            onClick={act.handler}
                            className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-blue-600 hover:text-white text-blue-400 border border-zinc-700 transition flex items-center gap-1 font-medium"
                          >
                            <span>{act.label}</span>
                            <ArrowRight size={12} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 flex-shrink-0 mt-0.5">
                      <User size={15} />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 items-center text-zinc-400">
                  <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
                    <Bot size={15} />
                  </div>
                  <div className="px-3 py-2 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-4 py-2 border-t border-zinc-800/60 bg-zinc-950/40 flex gap-1.5 overflow-x-auto no-scrollbar">
              {SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  className="px-2.5 py-1 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-[11px] text-zinc-300 whitespace-nowrap transition border border-zinc-700/50 flex-shrink-0"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Prajwal's AI..."
                className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 outline-none transition"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white transition"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

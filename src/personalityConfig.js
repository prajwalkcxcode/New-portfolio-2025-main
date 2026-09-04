/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║         PERSONALIZATION CONFIG — Prajwal KC              ║
 * ║  Portfolio V2 — Updated September 2026                   ║
 * ║  Toggle ENABLE_PERSONALIZATION = false to revert          ║
 * ╚══════════════════════════════════════════════════════════╝
 */

export const ENABLE_PERSONALIZATION = true

// ---------------------------------------------------------------------------
// HERO — V2 headline system
// ---------------------------------------------------------------------------
export const HERO_VARIANTS = [
  {
    id: 'v2-product',
    introLine: "Hi, I'm Prajwal.",
    headline: 'Designing and building',
    headlineAccent: 'digital products.',
    subtext:
      "I'm a BSc CSIT student who turns ideas into thoughtful, functional digital experiences — from design to working code.",
    primaryCTA: { label: 'View my work', href: '#featured' },
    secondaryCTA: { label: "Let's connect", href: '#contact' },
  },
  {
    id: 'nepal-personal',
    introLine: 'Based in Nepal 🇳🇵',
    headline: 'Building products from Nepal,',
    headlineAccent: 'one project at a time.',
    subtext:
      "I'm a BSc CSIT student currently building a Habit Tracker while learning modern full-stack development through real-world projects.",
    primaryCTA: { label: 'View my work', href: '#featured' },
    secondaryCTA: { label: "Let's connect", href: '#contact' },
  },
]

export const ACTIVE_HERO_VARIANT = HERO_VARIANTS[0]

// ---------------------------------------------------------------------------
// FEATURED PROJECT — Habit Tracker
// ---------------------------------------------------------------------------
export const FEATURED_PROJECT = {
  label: 'Featured Project',
  status: 'Active Development',
  statusColor: 'amber', // amber = in progress
  title: 'Habit Tracker',
  tagline: 'A minimal habit and lifestyle tracking experience designed around consistency, reflection, and focus.',
  description:
    'Tired of overcomplicated habit apps that feel like dashboards instead of tools, I started building a minimal tracker focused on one thing: showing up every day. Clean interface, honest progress, no noise.',
  tech: ['React', 'Tailwind CSS', 'Framer Motion'],
  github: 'https://github.com/prajwalkcxcode/Habit-Platform',
  liveUrl: 'https://habit-platform.vercel.app/dashboard',
  features: [
    'Daily habit check-in with streak tracking',
    'Weekly reflection view',
    'Minimal dark-first interface',
    'Mobile-first responsive design',
  ],
}

// ---------------------------------------------------------------------------
// PORTFOLIO BUILDER — now "On Hold"
// ---------------------------------------------------------------------------
export const PORTFOLIO_BUILDER_STATUS = {
  status: 'On Hold',
  description:
    'An AI-powered platform that generates and customises a professional portfolio from a simple prompt. Explored the concept and built an early version — development paused while I focus on the Habit Tracker.',
}

// ---------------------------------------------------------------------------
// CURRENTLY BUILDING (for status panels)
// ---------------------------------------------------------------------------
export const CURRENTLY_BUILDING = {
  title: 'Habit Tracker',
  description:
    'A minimal habit-tracking app designed around consistency and focus.',
  status: 'Active Development',
}

// ---------------------------------------------------------------------------
// NOW ITEMS — current activities
// ---------------------------------------------------------------------------
export const NOW_ITEMS = [
  { emoji: '🚀', text: 'Building Habit Tracker' },
  { emoji: '📚', text: 'Learning Backend Development' },
  { emoji: '⚛', text: 'Working with React & Tailwind' },
  { emoji: '☕', text: 'Listening to Lofi Music' },
  { emoji: '🎯', text: 'Becoming a Full-Stack Engineer' },
]

// ---------------------------------------------------------------------------
// ABOUT / NOW section
// ---------------------------------------------------------------------------
export const ABOUT_CONTENT = {
  sectionTitle: 'Now',
  sectionSubtitle: "What I'm up to",
  paragraph1:
    "I'm Prajwal KC — a BSc CSIT student from Nepal building things on the internet. Right now I'm working on a Habit Tracker: a minimal app for tracking daily habits without the noise.",
  paragraph2:
    "I care about things being useful and intentional. I don't want to build things that look impressive in a portfolio but don't actually work for real people.",
  paragraph3:
    'Learning by building. Every project is a better question than the last one.',
}

// ---------------------------------------------------------------------------
// CURRENT STATUS panel
// ---------------------------------------------------------------------------
export const CURRENT_STATUS = [
  { label: 'Location', value: 'Nepal 🇳🇵' },
  { label: 'Education', value: 'BSc CSIT' },
  { label: 'Learning', value: 'Backend Development' },
  { label: 'Building', value: 'Habit Tracker' },
  { label: 'Workflow', value: 'Lofi Music + Coding' },
  { label: 'Goal', value: 'Full-Stack Engineer' },
]

// ---------------------------------------------------------------------------
// MISSION CARD
// ---------------------------------------------------------------------------
export const MISSION_CARD = {
  label: 'Current Mission',
  headline: 'Build things that are actually useful.',
  subtext: "Starting with a habit tracker that doesn't get in the way.",
}

// ---------------------------------------------------------------------------
// EDUCATION CARD
// ---------------------------------------------------------------------------
export const EDUCATION_CARD = {
  label: 'Education',
  headline: 'BSc CSIT',
  subtext:
    'Currently pursuing a degree while building projects and developing practical software engineering skills.',
}

// ---------------------------------------------------------------------------
// SKILLS section
// ---------------------------------------------------------------------------
export const SKILLS_CONTENT = {
  badgeLabel: 'Skills & Stack',
  heading: 'What I Work With',
  subtext:
    "The tools I reach for when building. Some I know well, some I'm still figuring out — honest about both.",
  exploringLabel: 'Currently Exploring',
}

// ---------------------------------------------------------------------------
// PROJECTS section
// ---------------------------------------------------------------------------
export const PROJECT_DESCRIPTIONS = {
  'Modern Ecommerce':
    'Built to understand how real money moves on the web. Integrated Stripe end-to-end — from cart to checkout to webhook confirmation. Learned how fragile state management gets when real transactions are involved.',
  'Weather Dashboard':
    'Wanted to learn API integration without a tutorial. Built a live weather dashboard with OpenWeather, added local caching to avoid blowing through the rate limit, and made the UI shift visually based on conditions.',
  'Task Management SaaS':
    'An attempt at building something people might actually use. Implemented drag-and-drop task boards, real user auth, and persistent data — all the things that sound simple until you build them.',
  'Portfolio Template':
    'Most developer portfolios look the same. Built a clean, production-ready template with Framer Motion animations and a modular structure — so any developer can deploy their own in under an hour.',
  'AI Portfolio Builder':
    'Explored an AI-powered platform that generates portfolios from a simple prompt. Built an early version and a working prototype — development currently paused while I focus on the Habit Tracker.',
}

export const PROJECT_SECTION_CONTENT = {
  heading: 'Other Work',
  subtext:
    "More projects I've built while learning. Each one solved a specific problem.",
}

// ---------------------------------------------------------------------------
// CONTACT section
// ---------------------------------------------------------------------------
export const CONTACT_CONTENT = {
  heading: 'Have an idea worth building?',
  subtext:
    "I'm open to interesting projects, collaborations, and good conversations. Let's make something useful.",
}

// ---------------------------------------------------------------------------
// FOOTER
// ---------------------------------------------------------------------------
export const FOOTER_CONTENT = {
  attribution: 'Designed & Built by Prajwal KC',
  techStack: 'React • Tailwind • Vercel',
  builtIn: '🇳🇵 Built in Nepal',
  lastUpdated: 'September 2026',
}

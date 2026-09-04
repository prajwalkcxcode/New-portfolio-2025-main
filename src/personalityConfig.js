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
  statusColor: 'amber',
  title: 'Habit Tracker',
  tagline: 'A minimal habit and lifestyle tracking experience designed around consistency, reflection, and focus.',
  description:
    'Tired of overcomplicated habit apps that feel like dashboards instead of tools, I built a local-first platform with zero-latency offline tracking, live multiplayer rooms, and seamless focus music integration.',
  tech: [
    'Next.js 16 (App Router)',
    'React 19',
    'TypeScript 5',
    'Tailwind CSS v4',
    'Zustand 5',
    'Dexie.js (IndexedDB)',
    'Supabase & PostgreSQL',
    'Spotify Web API',
    'Recharts 3',
  ],
  github: 'https://github.com/prajwalkcxcode/Habit-Platform',
  liveUrl: 'https://habit-platform.vercel.app/dashboard',
  features: [
    'Local-first offline architecture via Dexie.js (IndexedDB) with Supabase cloud backup',
    'Live multiplayer Challenge Rooms with Supabase Realtime & Row Level Security',
    'Interactive Spotify OAuth 2.0 playback & focus audio integration',
    'Tactile Web Audio completion chimes & mobile vibration haptics',
    'Recharts habit trends, completion analytics, and streak tracking',
  ],
  architectureBreakdown: [
    {
      category: 'Core Framework & Runtime',
      icon: '⚡',
      items: [
        'Next.js 16.3 (App Router with Turbopack) — Server-side rendering, streaming layouts, and optimized production builds.',
        'React 19 — Concurrent features, transitions, and modern hook pipelines.',
        'TypeScript 5 — Strict end-to-end type safety across stores, database models, and components.',
      ],
    },
    {
      category: 'Styling & Design System',
      icon: '🎨',
      items: [
        'Tailwind CSS v4 with modern PostCSS pipeline & CSS custom properties token engine.',
        'Radix UI Primitives — Headless, fully accessible dialogs, selects, dropdowns, switches, and tooltips.',
        'Class Variance Authority (CVA) & clsx / tailwind-merge for variant styling compositions.',
      ],
    },
    {
      category: 'State Management & Sensory Feedback',
      icon: '🧠',
      items: [
        'Zustand 5 modular stores: useHabitStore (CRUD/streaks), useRoomsStore (multiplayer), useMusicStore (Spotify), useProfileStore, and useV3Store.',
        'Web Audio API & Vibration API for tactile audio completion chimes and mobile haptic feedback.',
      ],
    },
    {
      category: 'Storage & Backend (Local-First + Cloud Sync)',
      icon: '💾',
      items: [
        'Dexie.js 4 (IndexedDB) — Zero-latency client-side relational database for seamless offline tracking.',
        'Supabase (PostgreSQL) — Cloud sync for multi-device data backup and Google OAuth / password auth.',
        'Supabase Realtime & RLS — Secure Row Level Security policies and live multiplayer Challenge Rooms.',
      ],
    },
    {
      category: 'Audio & Spotify Integration',
      icon: '🎧',
      items: [
        'Spotify Web API & Embeds — OAuth 2.0 PKCE authentication flow (/api/auth/spotify).',
        'Interactive audio player with custom habit and focus sound bindings.',
      ],
    },
    {
      category: 'Analytics, Utilities & Deployment',
      icon: '📊',
      items: [
        'Recharts 3 — Interactive data visualization charts, completion rates, and streak computations.',
        'date-fns 4 — Precision date arithmetic, intervals, and calendar computations.',
        'React Hook Form & Zod — Schema validation and type-safe forms.',
        'Vercel — Edge-network serverless deployment with automated GitHub CI/CD.',
      ],
    },
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

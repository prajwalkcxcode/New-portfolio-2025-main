/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║         PERSONALIZATION CONFIG — Prajwal KC              ║
 * ║  Toggle ENABLE_PERSONALIZATION to switch the update      ║
 * ║  true  → experimental personal version                   ║
 * ║  false → original generic version                        ║
 * ╚══════════════════════════════════════════════════════════╝
 */

export const ENABLE_PERSONALIZATION = true

// ---------------------------------------------------------------------------
// HERO — variant system (index 0 is the active variant)
// ---------------------------------------------------------------------------
export const HERO_VARIANTS = [
  {
    id: 'nepal-personal',
    locationBadge: '🇳🇵 Nepal',
    greeting: 'नमस्ते, म प्रज्वल हुँ 👋',
    headline: 'Building products from Nepal,',
    headlineAccent: 'one project at a time.',
    subtext:
      "I'm a BSc CSIT student currently building an AI Portfolio Builder while learning modern full-stack development through real-world projects.",
  },
  {
    id: 'kathmandu',
    locationBadge: '📍 Kathmandu, Nepal',
    greeting: "Hi, I'm Prajwal KC 👋",
    headline: 'Frontend developer turning',
    headlineAccent: 'ideas into real products.',
    subtext:
      "BSc CSIT student from Nepal. Currently building an AI Portfolio Builder while going deep on full-stack development.",
  },
]

export const ACTIVE_HERO_VARIANT = HERO_VARIANTS[0]

// ---------------------------------------------------------------------------
// HERO — status badges (pill row above the title)
// ---------------------------------------------------------------------------
export const HERO_BADGES = [
  { emoji: '🇳🇵', label: 'Based in Nepal' },
  { emoji: '🚀', label: 'Building AI Portfolio Builder' },
  { emoji: '☕', label: 'Lofi + Code' },
]

// ---------------------------------------------------------------------------
// CURRENTLY BUILDING card (hero bottom)
// ---------------------------------------------------------------------------
export const CURRENTLY_BUILDING = {
  title: 'AI Portfolio Builder',
  description:
    'Helping developers create professional portfolios through AI-powered customization and reusable templates.',
  status: 'Active Development',
}

// ---------------------------------------------------------------------------
// NOW STRIP — below hero
// ---------------------------------------------------------------------------
export const NOW_ITEMS = [
  { emoji: '🚀', text: 'Building AI Portfolio Builder' },
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
  sectionSubtitle: 'What I\'m up to',
  nepaliGreeting: 'नमस्ते, म प्रज्वल हुँ 👋',
  introParagraph:
    'Building modern web experiences from Nepal for a global audience.',
  paragraph1:
    "I'm Prajwal KC — a BSc CSIT student from Nepal who's genuinely obsessed with building things on the internet. What started as curiosity about how websites work has turned into a focused pursuit of becoming a full-stack engineer.",
  paragraph2:
    "Right now I'm learning backend development while shipping real projects. My current build is an AI Portfolio Builder — a platform that helps developers create professional portfolios without starting from scratch every time.",
  paragraph3:
    'I believe the best way to learn is to build. Every project teaches me something new, every bug makes me a better engineer.',
}

// ---------------------------------------------------------------------------
// CURRENT STATUS panel (about section)
// ---------------------------------------------------------------------------
export const CURRENT_STATUS = [
  { label: 'Location', value: 'Nepal 🇳🇵' },
  { label: 'Education', value: 'BSc CSIT' },
  { label: 'Learning', value: 'Backend Development' },
  { label: 'Building', value: 'AI Portfolio Builder' },
  { label: 'Workflow', value: 'Lofi Music + Coding' },
  { label: 'Goal', value: 'Full-Stack Engineer' },
]

// ---------------------------------------------------------------------------
// MISSION CARD (replaces "Core Goal")
// ---------------------------------------------------------------------------
export const MISSION_CARD = {
  label: 'Current Mission',
  headline: 'Building products that solve real problems.',
  subtext: 'Starting with an AI-powered portfolio platform.',
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
// PROFILE TAGS (shown on avatar card)
// ---------------------------------------------------------------------------
export const PROFILE_TAGS = [
  { emoji: '📍', label: 'Nepal' },
  { emoji: '💻', label: 'React Developer' },
  { emoji: '🚀', label: 'Building AI Portfolio Builder' },
]

// ---------------------------------------------------------------------------
// FOOTER
// ---------------------------------------------------------------------------
export const FOOTER_CONTENT = {
  attribution: 'Designed & Built by Prajwal KC',
  techStack: 'React • Tailwind • Vercel',
  builtIn: '🇳🇵 Built in Nepal',
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
// PROJECTS — rewritten descriptions
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
    'My current main project. Developers spend too long building portfolios from scratch. This platform lets you describe yourself and generates the whole thing. Currently in active development.',
}

export const PROJECT_SECTION_CONTENT = {
  heading: 'Things I\'ve Built',
  subtext:
    "Projects I shipped while learning. Each one taught me something I couldn't get from a tutorial.",
}

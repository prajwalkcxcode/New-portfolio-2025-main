import { cubicBezier } from 'framer-motion'

// Shared easing – smooth and modern, no bounce
export const EASE = [0.16, 1, 0.3, 1]

// Base fade-up for sections and content blocks
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
}

// Container for grouping children with a small stagger
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04,
    },
  },
}

// Viewport settings for section reveal – trigger once
export const sectionViewport = {
  once: true,
  margin: '-80px',
}

// Button microinteraction variants
export const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.04,
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.97,
    transition: {
      duration: 0.1,
      ease: 'easeOut',
    },
  },
}


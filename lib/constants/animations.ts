// Animation variants for Framer Motion
export const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
export const slideUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } }
export const slideDown = { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } }
export const slideLeft = { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 } }
export const slideRight = { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } }
export const scaleIn = { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } }
export const staggerContainer = { animate: { transition: { staggerChildren: 0.1 } } }
export const listItem = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }

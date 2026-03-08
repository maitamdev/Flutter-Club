// Reduced motion detection
export function prefersReducedMotion(): boolean { if (typeof window === 'undefined') return false; return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
export function getAnimationDuration(defaultMs: number): number { return prefersReducedMotion() ? 0 : defaultMs; }
export function getTransitionStyle(property: string, duration: number): string { if (prefersReducedMotion()) return 'none'; return property + ' ' + duration + 'ms ease-in-out'; }

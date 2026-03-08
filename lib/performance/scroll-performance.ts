// Scroll performance utilities
export function createScrollThrottler(callback: () => void, fps: number = 30): () => void { let ticking = false; const interval = 1000 / fps; let lastTime = 0; return () => { const now = Date.now(); if (!ticking && now - lastTime >= interval) { ticking = true; requestAnimationFrame(() => { callback(); ticking = false; lastTime = now; }); } }; }
export function isNearBottom(threshold: number = 100): boolean { if (typeof window === 'undefined') return false; return window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold; }

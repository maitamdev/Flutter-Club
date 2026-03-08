// Timer utilities
export function createTimer() { const start = performance.now(); return { elapsed: () => performance.now() - start, elapsedMs: () => Math.round(performance.now() - start), reset: () => { /* returns new timer */ return createTimer(); } }; }
export function measureAsync<T>(fn: () => Promise<T>): Promise<{ result: T; durationMs: number }> { const start = performance.now(); return fn().then(result => ({ result, durationMs: Math.round(performance.now() - start) })); }

// Render debouncing utilities
export function createRenderDebouncer(delayMs: number = 16) { let rafId: number | null = null; return { schedule(callback: () => void): void { if (rafId !== null) cancelAnimationFrame(rafId); rafId = requestAnimationFrame(() => { callback(); rafId = null; }); }, cancel(): void { if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; } } }; }
export function batchUpdates(updates: (() => void)[]): void { requestAnimationFrame(() => { updates.forEach(fn => fn()); }); }

// Memoization helpers
export function shallowEqual(a: Record<string, unknown>, b: Record<string, unknown>): boolean { const keysA = Object.keys(a); const keysB = Object.keys(b); if (keysA.length !== keysB.length) return false; return keysA.every(key => a[key] === b[key]); }
export function memoize<T extends (...args: unknown[]) => unknown>(fn: T): T { const cache = new Map<string, unknown>(); return ((...args: unknown[]) => { const key = JSON.stringify(args); if (cache.has(key)) return cache.get(key); const result = fn(...args); cache.set(key, result); return result; }) as T; }

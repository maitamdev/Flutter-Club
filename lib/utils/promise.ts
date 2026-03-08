// Promise utilities
export function delay(ms: number): Promise<void> { return new Promise(resolve => setTimeout(resolve, ms)); }
export async function timeout<T>(promise: Promise<T>, ms: number): Promise<T> { const timer = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms)); return Promise.race([promise, timer]); }
export async function allSettled<T>(promises: Promise<T>[]): Promise<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: unknown }[]> { return Promise.allSettled(promises).then(results => results.map(r => r.status === 'fulfilled' ? { status: 'fulfilled' as const, value: r.value } : { status: 'rejected' as const, reason: r.reason })); }

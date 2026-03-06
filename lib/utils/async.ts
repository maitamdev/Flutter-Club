// Debounce and throttle utilities
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay) }
}
export function throttle<T extends (...args: any[]) => any>(fn: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false
  return (...args: Parameters<T>) => { if (!inThrottle) { fn(...args); inThrottle = true; setTimeout(() => (inThrottle = false), limit) } }
}
export function retry<T>(fn: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
  return fn().catch(err => retries > 0 ? new Promise(resolve => setTimeout(resolve, delay)).then(() => retry(fn, retries - 1, delay * 2)) : Promise.reject(err))
}
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

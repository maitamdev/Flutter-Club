export function memoize<T extends (...args: any[]) => any>(fn: T, keyResolver?: (...args: Parameters<T>) => string): T {
  const cache = new Map<string, ReturnType<T>>();
  return ((...args: Parameters<T>) => {
    const key = keyResolver ? keyResolver(...args) : JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}
export function memoizeWithTTL<T extends (...args: any[]) => any>(fn: T, ttl: number): T {
  const cache = new Map<string, { value: ReturnType<T>; expiry: number }>();
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args); const cached = cache.get(key);
    if (cached && cached.expiry > Date.now()) return cached.value;
    const result = fn(...args); cache.set(key, { value: result, expiry: Date.now() + ttl }); return result;
  }) as T;
}

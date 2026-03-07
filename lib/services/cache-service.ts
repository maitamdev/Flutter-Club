interface CacheEntry<T> { data: T; expiry: number; }
class CacheService {
  private cache = new Map<string, CacheEntry<unknown>>();
  set<T>(key: string, data: T, ttlMs: number): void { this.cache.set(key, { data, expiry: Date.now() + ttlMs }); }
  get<T>(key: string): T | null { const entry = this.cache.get(key); if (!entry || entry.expiry < Date.now()) { this.cache.delete(key); return null; } return entry.data as T; }
  has(key: string): boolean { return this.get(key) !== null; }
  delete(key: string): void { this.cache.delete(key); }
  clear(): void { this.cache.clear(); }
  size(): number { return this.cache.size; }
  getOrSet<T>(key: string, factory: () => T, ttlMs: number): T { const cached = this.get<T>(key); if (cached !== null) return cached; const data = factory(); this.set(key, data, ttlMs); return data; }
}
export const cacheService = new CacheService();

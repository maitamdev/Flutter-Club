export const CACHE_DURATIONS = {
  SHORT: 5 * 60 * 1000,       // 5 minutes
  MEDIUM: 30 * 60 * 1000,     // 30 minutes
  LONG: 60 * 60 * 1000,       // 1 hour
  VERY_LONG: 24 * 60 * 60 * 1000, // 24 hours
  SESSION: -1,                  // Until session ends
} as const;
export const CACHE_KEYS = {
  USER_PROFILE: 'cache:user:profile', MEMBER_LIST: 'cache:members:list',
  SESSION_LIST: 'cache:sessions:list', NOTIFICATIONS: 'cache:notifications',
  DASHBOARD_STATS: 'cache:dashboard:stats', THEME_PREFERENCE: 'cache:theme',
  SIDEBAR_STATE: 'cache:sidebar:state', RECENT_SEARCHES: 'cache:recent-searches',
} as const;
export type CacheKey = (typeof CACHE_KEYS)[keyof typeof CACHE_KEYS];

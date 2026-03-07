const BASE = '/api';
export const API_ENDPOINTS = {
  AUTH: { LOGIN: `${BASE}/auth/login`, LOGOUT: `${BASE}/auth/logout`, REFRESH: `${BASE}/auth/refresh`, REGISTER: `${BASE}/auth/register` },
  USERS: { LIST: `${BASE}/users`, PROFILE: (id: string) => `${BASE}/users/${id}`, UPDATE: (id: string) => `${BASE}/users/${id}` },
  SESSIONS: { LIST: `${BASE}/sessions`, CREATE: `${BASE}/sessions`, DETAIL: (id: string) => `${BASE}/sessions/${id}` },
  ASSIGNMENTS: { LIST: `${BASE}/assignments`, CREATE: `${BASE}/assignments`, SUBMIT: (id: string) => `${BASE}/assignments/${id}/submit` },
  MATERIALS: { LIST: `${BASE}/materials`, UPLOAD: `${BASE}/materials/upload` },
  NOTIFICATIONS: { LIST: `${BASE}/notifications`, SEND: `${BASE}/notifications/send` },
  ANALYTICS: { EVENTS: `${BASE}/analytics/events`, REPORT: `${BASE}/analytics/report` },
  HEALTH: `${BASE}/health`,
} as const;

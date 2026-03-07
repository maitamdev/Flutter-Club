export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view', LOGIN: 'login', LOGOUT: 'logout', SIGNUP: 'sign_up',
  SESSION_JOIN: 'session_join', SESSION_CHECKIN: 'session_checkin',
  ASSIGNMENT_SUBMIT: 'assignment_submit', QUIZ_START: 'quiz_start', QUIZ_COMPLETE: 'quiz_complete',
  MATERIAL_DOWNLOAD: 'material_download', PROFILE_UPDATE: 'profile_update',
  SEARCH: 'search', FILTER_APPLY: 'filter_apply', EXPORT_DATA: 'export_data',
  NOTIFICATION_CLICK: 'notification_click', THEME_TOGGLE: 'theme_toggle',
  ERROR_BOUNDARY: 'error_boundary', AI_CHAT_SEND: 'ai_chat_send',
} as const;
export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

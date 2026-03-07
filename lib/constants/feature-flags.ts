export const FEATURE_FLAGS = {
  ENABLE_AI_ASSISTANT: 'enable_ai_assistant', ENABLE_DARK_MODE: 'enable_dark_mode',
  ENABLE_REAL_TIME_CHAT: 'enable_real_time_chat', ENABLE_PDF_EXPORT: 'enable_pdf_export',
  ENABLE_QR_CHECKIN: 'enable_qr_checkin', ENABLE_GAMIFICATION: 'enable_gamification',
  ENABLE_ADVANCED_ANALYTICS: 'enable_advanced_analytics', ENABLE_NOTIFICATIONS: 'enable_notifications',
  ENABLE_FILE_SHARING: 'enable_file_sharing', ENABLE_VIDEO_CALL: 'enable_video_call',
  ENABLE_CERTIFICATE_GEN: 'enable_certificate_gen', ENABLE_BULK_IMPORT: 'enable_bulk_import',
} as const;
export type FeatureFlag = (typeof FEATURE_FLAGS)[keyof typeof FEATURE_FLAGS];

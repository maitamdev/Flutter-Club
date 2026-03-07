export const EMAIL_TEMPLATES = {
  WELCOME: { subject: 'ChÃ o má»«ng báº¡n Ä‘áº¿n vá»›i Flutter Club DHV!', template: 'welcome' },
  RESET_PASSWORD: { subject: 'Äáº·t láº¡i máº­t kháº©u', template: 'reset-password' },
  SESSION_REMINDER: { subject: 'Nháº¯c nhá»Ÿ buá»•i há»c sáº¯p tá»›i', template: 'session-reminder' },
  ASSIGNMENT_DUE: { subject: 'BÃ i táº­p sáº¯p Ä‘áº¿n háº¡n', template: 'assignment-due' },
  CERTIFICATE_ISSUED: { subject: 'Chá»©ng nháº­n Ä‘Ã£ Ä‘Æ°á»£c cáº¥p', template: 'certificate-issued' },
  ACCOUNT_APPROVED: { subject: 'TÃ i khoáº£n Ä‘Ã£ Ä‘Æ°á»£c duyá»‡t', template: 'account-approved' },
  ANNOUNCEMENT: { subject: 'ThÃ´ng bÃ¡o má»›i tá»« CLB Flutter', template: 'announcement' },
} as const;
export type EmailTemplate = keyof typeof EMAIL_TEMPLATES;

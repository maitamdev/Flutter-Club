export const SUPPORTED_LOCALES = {
  vi: { code: 'vi', name: 'Tiáº¿ng Viá»‡t', flag: 'ðŸ‡»ðŸ‡³', dir: 'ltr', dateFormat: 'dd/MM/yyyy', numberFormat: { decimal: ',', thousands: '.' } },
  en: { code: 'en', name: 'English', flag: 'ðŸ‡¬ðŸ‡§', dir: 'ltr', dateFormat: 'MM/dd/yyyy', numberFormat: { decimal: '.', thousands: ',' } },
} as const;
export const DEFAULT_LOCALE = 'vi';
export type SupportedLocale = keyof typeof SUPPORTED_LOCALES;
export const LOCALE_LABELS: Record<string, Record<SupportedLocale, string>> = {
  dashboard: { vi: 'Báº£ng Ä‘iá»u khiá»ƒn', en: 'Dashboard' },
  members: { vi: 'ThÃ nh viÃªn', en: 'Members' },
  sessions: { vi: 'Buá»•i há»c', en: 'Sessions' },
  settings: { vi: 'CÃ i Ä‘áº·t', en: 'Settings' },
};

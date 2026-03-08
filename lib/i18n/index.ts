// Internationalization setup for ft-club-hub
export type Locale = 'vi' | 'en';
export const DEFAULT_LOCALE: Locale = 'vi';
export const SUPPORTED_LOCALES: Locale[] = ['vi', 'en'];

export function getLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const stored = localStorage.getItem('locale');
  return (stored as Locale) || DEFAULT_LOCALE;
}

export function setLocale(locale: Locale): void {
  localStorage.setItem('locale', locale);
}

export function t(key: string, locale?: Locale): string {
  const currentLocale = locale || getLocale();
  const translations = currentLocale === 'vi' ? require('./vi').default : require('./en').default;
  return translations[key] || key;
}

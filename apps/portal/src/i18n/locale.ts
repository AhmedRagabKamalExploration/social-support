export const LOCALES = ['en', 'ar'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const LANGUAGES = {
  en: 'English',
  ar: 'العربية',
} as const;

import type { Locale } from '@/i18n/locale';
import { routing } from '@/i18n/routing';

import messages from './messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
  }
}

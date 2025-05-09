import { getLocale } from 'next-intl/server';

/**
 * Get the current locale in a server component
 */
export async function getServerLocale() {
  return getLocale();
}

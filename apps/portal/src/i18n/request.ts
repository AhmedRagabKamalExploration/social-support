import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

type Messages = Record<string, unknown>;

type MessageModule = {
  default: Messages;
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const importedMessages = (await import(
    `../../messages/${locale}.json`
  )) as MessageModule;
  const messages = importedMessages.default;

  return {
    locale,
    messages,
  };
});

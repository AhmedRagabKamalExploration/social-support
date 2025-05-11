import { NextIntlClientProvider } from 'next-intl';
import type { getMessages } from 'next-intl/server';

import { StoreHydrationProvider } from './store-hydration-provider';

export function Providers({
  children,
  messages,
}: Readonly<{
  children: React.ReactNode;
  messages: Awaited<ReturnType<typeof getMessages>>;
}>) {
  return (
    <NextIntlClientProvider messages={messages}>
      <StoreHydrationProvider>{children}</StoreHydrationProvider>
    </NextIntlClientProvider>
  );
}

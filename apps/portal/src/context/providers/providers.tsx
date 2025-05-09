import { NextIntlClientProvider } from 'next-intl';
import type { getMessages } from 'next-intl/server';

export function Providers({
  children,
  messages,
}: Readonly<{
  children: React.ReactNode;
  messages: Awaited<ReturnType<typeof getMessages>>;
}>) {
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

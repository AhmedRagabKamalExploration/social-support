import { hasLocale } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Toaster } from 'sonner';

import { Providers } from '@/context/providers/providers';
import type { Locale } from '@/i18n/locale';
import { routing } from '@/i18n/routing';
import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // should: not provider all messages, only the ones needed for client components like error.tsx pages
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers messages={messages}>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}

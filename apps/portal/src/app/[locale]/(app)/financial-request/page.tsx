import type { Locale } from '@/i18n/locale';
import { permanentRedirect } from '@/i18n/navigation';

export default async function FinancialRequestPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return permanentRedirect({
    href: '/financial-request/personal-information',
    locale,
  });
}

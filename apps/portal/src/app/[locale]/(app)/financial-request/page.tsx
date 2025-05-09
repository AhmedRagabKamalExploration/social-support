import { permanentRedirect } from '@/i18n/navigation';

export default function FinancialRequestPage() {
  return permanentRedirect({
    href: '/financial-request/personal-information',
    locale: 'en',
  });
}

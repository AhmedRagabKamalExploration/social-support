import { Button, Headline, Paragraph } from '@dge/ui-core';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

export default function AppPage() {
  const t = useTranslations('Pages.HomePage');
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <Headline>{t('title')}</Headline>
      <Paragraph>{t('subTitle')}</Paragraph>
      <Button icon={<ArrowRight className="rtl:rotate-180" />}>
        <Link href="/financial-request">{t('buttonText')}</Link>
      </Button>
    </div>
  );
}

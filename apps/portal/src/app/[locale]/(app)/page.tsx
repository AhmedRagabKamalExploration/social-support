import { Headline, Paragraph } from '@dge/ui-core';
import { useTranslations } from 'next-intl';

import { ContinueRequestButton } from '@/components/continue-request-button/continue-request-button';
import { NewRequestButton } from '@/components/new-request-button/new-request-button';

export default function AppPage() {
  const t = useTranslations('Pages.HomePage');

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <Headline>{t('title')}</Headline>
      <Paragraph className="text-center">{t('subTitle')}</Paragraph>

      <div className="flex flex-col gap-3 sm:flex-row">
        <NewRequestButton />
        <ContinueRequestButton />
      </div>
    </div>
  );
}

import { Headline } from '@dge/ui-core';
import { useTranslations } from 'next-intl';

import { Frame } from '@/layouts/components/frame/frame';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');
  return (
    <Frame>
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        <Headline variant="h3">{t('title')}</Headline>
      </div>
    </Frame>
  );
}

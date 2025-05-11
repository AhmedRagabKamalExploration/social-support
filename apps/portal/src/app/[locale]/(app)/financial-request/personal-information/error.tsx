'use client';

import { Button, Headline, Paragraph } from '@dge/ui-core';
import { RefreshCcwIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { log } from '@/utils/log';

export default function UnExpectedError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  const t = useTranslations('Pages.ErrorPage');
  useEffect(() => {
    log(error);
  }, [error]);

  return (
    <div>
      <Headline variant="h3">{t('title')}</Headline>
      <Paragraph className="text-red-500">{error.message}</Paragraph>
      <Button
        icon={<RefreshCcwIcon className="size-4" />}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => {
            reset();
          }
        }
      >
        {t('button')}
      </Button>
    </div>
  );
}

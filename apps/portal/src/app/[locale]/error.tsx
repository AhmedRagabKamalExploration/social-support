'use client';

import { Button } from '@dge/ui-core';
import * as Sentry from '@sentry/nextjs';
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
      <h2>{t('title')}</h2>
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

'use client';

import { Button } from '@dge/ui-core';
import { RefreshCcwIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function UnExpectedError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  const t = useTranslations('ErrorPage');
  useEffect(() => {
    // integrate with Sentry or other error reporting service
    console.error(error);
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

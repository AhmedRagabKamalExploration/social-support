import * as Sentry from '@sentry/nextjs';

import { envConfig } from '@/config/env-config';

export function log(
  error: Error & {
    digest?: string;
  },
) {
  if (envConfig.SENTRY_DSN) {
    Sentry.captureException(error);
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(error);
  }
}

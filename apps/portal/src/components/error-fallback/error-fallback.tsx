'use client';

import { Button, Paragraph } from '@dge/ui-core';
import { useErrorBoundary } from 'react-error-boundary';

export function ErrorFallback({ error }: { error: Error }) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div role="alert">
      <Paragraph>Something went wrong:</Paragraph>
      <pre className="text-red-500">{error.message}</pre>
      <Button onClick={resetBoundary}>Try again</Button>
    </div>
  );
}

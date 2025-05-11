import type { ReactNode } from 'react';

import { FinanceRequestStepperProvider } from '@/providers/finance-request-stepper-context';
import { Providers } from '@/providers/providers';

import ar from '../../messages/ar.json';
import en from '../../messages/en.json';

const messages = {
  en,
  ar,
} as any;

export default function TestProviders({ children }: { children: ReactNode }) {
  return (
    <Providers messages={messages}>
      <FinanceRequestStepperProvider>{children}</FinanceRequestStepperProvider>
    </Providers>
  );
}

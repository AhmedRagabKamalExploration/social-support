import { Card, CardContent } from '@dge/ui-core';
import type { ReactNode } from 'react';

import { StepperNavigation } from '@/components/stepper/stepper-navigation';
import { StepperProgress } from '@/components/stepper/stepper-progress';
import { FinanceRequestStepperProvider } from '@/providers/finance-request-stepper-context';

export default function FinancialRequestLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <FinanceRequestStepperProvider>
      <Card className="my-4 flex-1">
        <CardContent className="space-y-6 p-4">
          <StepperProgress />
          <div className="py-4">{children}</div>
          <StepperNavigation />
        </CardContent>
      </Card>
    </FinanceRequestStepperProvider>
  );
}

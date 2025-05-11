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
      <Card className="relative my-4 flex flex-1 flex-col">
        <CardContent className="p-4">
          <StepperProgress />
          <div className="py-4 pb-20">{children}</div>
          <div className="bg-background/95 fixed right-0 bottom-0 left-0 z-10 border-t px-4 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] backdrop-blur-sm">
            <div className="container mx-auto max-w-screen-lg">
              <StepperNavigation />
            </div>
          </div>
        </CardContent>
      </Card>
    </FinanceRequestStepperProvider>
  );
}

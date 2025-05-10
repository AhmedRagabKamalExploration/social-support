'use client';

import { Progress } from '@dge/ui-core';
import React from 'react';

import { useFinanceRequestStepper } from '@/context/stepper/finance-request-stepper-context';

export const StepperProgress = () => {
  const { progress, currentStep, totalSteps, steps, goToStep } =
    useFinanceRequestStepper();

  return (
    <div className="w-full space-y-4">
      <Progress value={progress} className="h-2" />

      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <button
              onClick={() => goToStep(index)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                currentStep === index
                  ? 'bg-primary text-primary-foreground'
                  : currentStep > index
                    ? 'bg-primary/80 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
              } `}
              aria-current={currentStep === index ? 'step' : undefined}
            >
              {index + 1}
            </button>
            <span className="mt-2 text-xs font-medium">{step.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

'use client';

import { Progress } from '@dge/ui-core';
import React from 'react';

import { useFinanceRequestStepper } from '@/providers/finance-request-stepper-context';

export const StepperProgress = () => {
  const { progress, currentStep, steps, goToStep, formSubmitHandlerRef } =
    useFinanceRequestStepper();

  const handleStepClick = async (index: number) => {
    // Only validate when trying to move forward
    if (index > currentStep) {
      // Try to use the registered form submit handler first
      if (formSubmitHandlerRef.current) {
        const canProceed = await formSubmitHandlerRef.current();
        if (canProceed) {
          goToStep(index);
        }
        return;
      }
    }

    // If moving backward or no form handler is registered, allow navigation
    goToStep(index);
  };

  return (
    <div className="w-full space-y-4">
      <Progress value={progress} className="h-2" />

      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center text-center">
            <button
              onClick={() => handleStepClick(index)}
              className={`flex size-8 items-center justify-center rounded-full text-sm font-medium ${
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

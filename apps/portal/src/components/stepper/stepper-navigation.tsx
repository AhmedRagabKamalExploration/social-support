'use client';

import { Button } from '@dge/ui-core';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

import { useFinanceRequestStepper } from '@/context/stepper/finance-request-stepper-context';

type StepperNavigationProps = {
  onNext?: () => Promise<boolean> | boolean;
  onPrevious?: () => void;
  nextButtonLabel?: string;
  previousButtonLabel?: string;
  showSubmitOnLastStep?: boolean;
  submitButtonLabel?: string;
  onSubmit?: () => void;
};

export const StepperNavigation = ({
  onNext,
  onPrevious,
  nextButtonLabel = 'Next',
  previousButtonLabel = 'Previous',
  showSubmitOnLastStep = true,
  submitButtonLabel = 'Submit',
  onSubmit,
}: StepperNavigationProps) => {
  const {
    goToNextStep,
    goToPreviousStep,
    isFirstStep,
    isLastStep,
    formSubmitHandlerRef,
  } = useFinanceRequestStepper();

  const handleNext = async () => {
    // First try to use the registered form submit handler from context
    if (formSubmitHandlerRef.current) {
      const canProceed = await formSubmitHandlerRef.current();
      if (canProceed) {
        goToNextStep();
      }
      return;
    }

    // Fall back to the prop-based onNext if provided
    if (onNext) {
      const canProceed = await onNext();
      if (canProceed) {
        goToNextStep();
      }
    } else {
      goToNextStep();
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
    goToPreviousStep();
  };

  const handleSubmit = async () => {
    // Try to use the registered form submit handler first
    if (formSubmitHandlerRef.current) {
      await formSubmitHandlerRef.current();
    }

    // Then call the onSubmit prop if provided
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="flex justify-between pt-6">
      <Button variant="outline" onClick={handlePrevious} disabled={isFirstStep}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {previousButtonLabel}
      </Button>

      {isLastStep && showSubmitOnLastStep ? (
        <Button onClick={handleSubmit}>{submitButtonLabel}</Button>
      ) : (
        <Button onClick={handleNext}>
          {nextButtonLabel}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

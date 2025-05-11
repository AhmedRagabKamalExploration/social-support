'use client';

import { Button } from '@dge/ui-core';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useFinanceRequestStepper } from '@/providers/finance-request-stepper-context';

type StepperNavigationProps = {
  onNext?: () => Promise<boolean> | boolean;
  onPrevious?: () => void;
  showSubmitOnLastStep?: boolean;
  onSubmit?: () => void;
};

export function StepperNavigation({
  onNext,
  onPrevious,
  showSubmitOnLastStep = true,
  onSubmit,
}: StepperNavigationProps) {
  const {
    goToNextStep,
    goToPreviousStep,
    isFirstStep,
    isLastStep,
    formSubmitHandlerRef,
  } = useFinanceRequestStepper();
  const t = useTranslations('StepperNavigation');

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
    <div className="flex w-full justify-between px-2 py-2">
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={isFirstStep}
        className="min-w-24 shadow-sm"
      >
        <ArrowLeft className="me-2 size-4 rtl:rotate-180" />
        {t('previous')}
      </Button>

      {isLastStep && showSubmitOnLastStep ? (
        <Button onClick={handleSubmit} className="min-w-24 shadow-sm">
          {t('submit')}
        </Button>
      ) : (
        <Button className="min-w-24 shadow-sm" onClick={handleNext}>
          {t('next')}
          <ArrowRight className="ms-2 size-4 rtl:rotate-180" />
        </Button>
      )}
    </div>
  );
}

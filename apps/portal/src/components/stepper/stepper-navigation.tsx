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
    <div className="flex justify-between pt-6">
      <Button variant="outline" onClick={handlePrevious} disabled={isFirstStep}>
        {t('previous')}
        <ArrowLeft className="me-2 size-4 rtl:rotate-180" />
      </Button>

      {isLastStep && showSubmitOnLastStep ? (
        <Button onClick={handleSubmit}>{t('submit')}</Button>
      ) : (
        <Button className="flex" onClick={handleNext}>
          <ArrowRight className="ms-2 size-4 rtl:rotate-180" />
          {t('next')}
        </Button>
      )}
    </div>
  );
}

'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useContext, useMemo, useState } from 'react';

import {
  type UseStepperSteps,
  useStepperSteps,
} from '../hooks/useStepperSteps';

type FinanceRequestStepperContextType = {
  currentStep: number;
  totalSteps: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (stepIndex: number) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number;
  steps: UseStepperSteps;
  formSubmitHandlerRef: React.MutableRefObject<(() => Promise<boolean>) | null>;
  registerFormSubmitHandler: (handler: () => Promise<boolean>) => void;
};

const FinanceRequestStepperContext = createContext<
  FinanceRequestStepperContextType | undefined
>(undefined);

export function FinanceRequestStepperProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const FINANCE_REQUEST_STEPS = useStepperSteps();
  const router = useRouter();
  const pathname = usePathname();
  const formSubmitHandlerRef = React.useRef<(() => Promise<boolean>) | null>(
    null,
  );

  // Find the current step index based on the current path
  const getCurrentStepIndex = () => {
    const currentPath = pathname;
    const localeSegment = pathname.split('/')[1];

    for (const [index, step] of FINANCE_REQUEST_STEPS.entries()) {
      if (step) {
        const fullPath = `/${localeSegment}${step.path}`;

        if (currentPath === fullPath) {
          return index;
        }
      }
    }

    // Default to first step if not found
    return 0;
  };

  const [currentStep, setCurrentStep] = useState(getCurrentStepIndex());
  const totalSteps = FINANCE_REQUEST_STEPS.length;

  const goToNextStep = () => {
    if (currentStep < totalSteps - 1) {
      const nextStep = currentStep + 1;
      const nextStepData = FINANCE_REQUEST_STEPS[nextStep];
      if (nextStepData) {
        const nextPath = nextStepData.path;
        const localeSegment = pathname.split('/')[1];

        router.push(`/${localeSegment}${nextPath}`);
        setCurrentStep(nextStep);
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      const previousStep = currentStep - 1;
      const previousStepData = FINANCE_REQUEST_STEPS[previousStep];
      if (previousStepData) {
        const previousPath = previousStepData.path;
        const localeSegment = pathname.split('/')[1];

        router.push(`/${localeSegment}${previousPath}`);
        setCurrentStep(previousStep);
      }
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < totalSteps) {
      const stepData = FINANCE_REQUEST_STEPS[stepIndex];
      if (stepData) {
        const stepPath = stepData.path;
        const localeSegment = pathname.split('/')[1];

        router.push(`/${localeSegment}${stepPath}`);
        setCurrentStep(stepIndex);
      }
    }
  };

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // Register form submit handler
  const registerFormSubmitHandler = (handler: () => Promise<boolean>) => {
    formSubmitHandlerRef.current = handler;
  };

  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      currentStep,
      totalSteps,
      goToNextStep,
      goToPreviousStep,
      goToStep,
      isFirstStep,
      isLastStep,
      progress,
      steps: FINANCE_REQUEST_STEPS,
      formSubmitHandlerRef,
      registerFormSubmitHandler,
    }),
    [
      currentStep,
      totalSteps,
      goToNextStep,
      goToPreviousStep,
      goToStep,
      isFirstStep,
      isLastStep,
      progress,
    ],
  );

  return (
    <FinanceRequestStepperContext.Provider value={value}>
      {children}
    </FinanceRequestStepperContext.Provider>
  );
}

export const useFinanceRequestStepper = () => {
  const context = useContext(FinanceRequestStepperContext);

  if (context === undefined) {
    throw new Error(
      'useFinanceRequestStepper must be used within a FinanceRequestStepperProvider',
    );
  }

  return context;
};

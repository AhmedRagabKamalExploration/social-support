'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  type SituationDescriptionsFormData,
  situationDescriptionsFormSchema,
} from '@/features/financial-request/schema';
import { useStoreHydration } from '@/hooks/use-store-hydration';
import { useRouter } from '@/i18n/navigation';
import { useFinanceRequestStepper } from '@/providers/finance-request-stepper-context';
import { useFinancialRequestStore } from '@/store/financial-request.store';

import { CurrentFinancialSituation } from './current-financial-situation/current-financial-situation';
import { EmploymentCircumstances } from './employment-circumstances/employment-circumstances';
import { ReasonForApplying } from './reason-for-applying/reason-for-applying';

// API response type
type FinancialRequestResponse = {
  success: boolean;
  message: string;
  requestId?: string;
};

export function SituationDescriptionsForm() {
  const t = useTranslations('feedback');
  const situationFeedbackT = useTranslations(
    'Pages.SituationDescription.components.situationDescriptionForm.feedback',
  );

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLastStep, registerFormSubmitHandler, goToStep } =
    useFinanceRequestStepper();

  const isFamilyFinanceInfoCompleted = useFinancialRequestStore(
    (state) => state.isFamilyFinanceInfoCompleted,
  );
  const isPersonalInformationCompleted = useFinancialRequestStore(
    (state) => state.isPersonalInformationCompleted,
  );
  const setSituationDescriptions = useFinancialRequestStore(
    (state) => state.setSituationDescriptions,
  );
  const getCompleteFormData = useFinancialRequestStore(
    (state) => state.getCompleteFormData,
  );
  const resetFormData = useFinancialRequestStore(
    (state) => state.resetFormData,
  );
  const savedData = useFinancialRequestStore(
    (state) => state.situationDescriptions,
  );

  const isHydrated = useStoreHydration();

  const tAdapter = (key: string, values?: Record<string, unknown>) => {
    try {
      // Extract the actual message key
      const validationKey = key.replace(/^validation\./, '');

      // First get the raw message template from the translation
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const messageTemplate = t.raw(`validation.${validationKey}` as any);

      // If there are no values to replace, just return the template
      if (!values || typeof messageTemplate !== 'string') {
        return messageTemplate;
      }

      // Manually replace the placeholders with the values
      let result = messageTemplate;
      Object.entries(values).forEach(([key, value]) => {
        result = result.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
      });

      return result;
    } catch (error) {
      console.error('Translation error:', error, 'for key:', key);
      return key.split('.').pop() || key;
    }
  };

  const form = useForm<SituationDescriptionsFormData>({
    mode: 'onBlur',
    resolver: zodResolver(situationDescriptionsFormSchema(tAdapter)),
    defaultValues: savedData || {
      currentFinancialSituation: '',
      employmentCircumstances: '',
      reasonForApplying: '',
    },
  });

  const handleSubmit = async () => {
    const isValid = await form.trigger();

    if (isValid) {
      const data = form.getValues();
      setSituationDescriptions(data);

      if (isLastStep && !isSubmitting) {
        try {
          setIsSubmitting(true);

          const completeFormData = getCompleteFormData();

          const response = await fetch('/api/financial-request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(completeFormData),
          });

          const result = (await response.json()) as FinancialRequestResponse;

          if (!response.ok) {
            throw new Error(
              result.message || situationFeedbackT('failedToSubmitRequest'),
            );
          }

          setIsSubmitted(true);

          toast.success(situationFeedbackT('success'), {
            description: `${situationFeedbackT('yourRequestID')} ${result.requestId}`,
          });

          resetFormData();

          if (result.requestId) {
            router.push(
              `/request-success?requestId=${result.requestId}&type=financial`,
            );
          } else {
            router.push('/request-success?type=financial');
          }
        } catch (error: any) {
          toast.error(situationFeedbackT('error'), {
            description: error.message || situationFeedbackT('tryAgain'),
          });
          return false;
        } finally {
          setIsSubmitting(false);
        }
      }

      return true;
    }

    return false;
  };

  useEffect(() => {
    registerFormSubmitHandler(handleSubmit);
  }, [registerFormSubmitHandler]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const data = form.getValues();
      setSituationDescriptions(data);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [form, setSituationDescriptions]);

  useEffect(() => {
    if (!isHydrated || isSubmitted) return;

    if (!isPersonalInformationCompleted) {
      toast.error(t('validation.personalInformation'));
      goToStep(0);
      return;
    }

    if (!isFamilyFinanceInfoCompleted) {
      toast.error(t('validation.familyFinanceInfo'));
      goToStep(1);
    }
  }, [
    isFamilyFinanceInfoCompleted,
    isPersonalInformationCompleted,
    goToStep,
    isHydrated,
    isSubmitted,
  ]);

  return (
    <FormProvider {...form}>
      <form className="space-y-4">
        <CurrentFinancialSituation />
        <EmploymentCircumstances />
        <ReasonForApplying />
        {isSubmitting && (
          <div className="flex justify-center">
            <div className="text-muted-foreground text-sm">
              {situationFeedbackT('submitting')}
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
}

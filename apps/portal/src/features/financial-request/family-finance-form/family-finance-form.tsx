'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useStoreHydration } from '@/hooks/use-store-hydration';
import { useFinanceRequestStepper } from '@/providers/finance-request-stepper-context';
import { useFinancialRequestStore } from '@/store/financial-request.store';

import {
  type FamilyAndFinancialInfoFormData,
  familyAndFinancialInfoFormSchema,
} from '../schema';

import { EmploymentStatus } from './employment-status/employment-status';
import { HousingStatus } from './housing-status/housing-status';
import { MaritalStatus } from './marital-status/marital-status';
import { MonthlyIncome } from './monthly-income/monthly-income';
import { NumberOfDependents } from './number-of-dependents/number-of-dependents';

export function FamilyFinanceForm() {
  const t = useTranslations('feedback');
  const { registerFormSubmitHandler, goToStep } = useFinanceRequestStepper();
  const setFamilyFinanceInfo = useFinancialRequestStore(
    (state) => state.setFamilyFinanceInfo,
  );
  const savedData = useFinancialRequestStore(
    (state) => state.familyFinanceInfo,
  );
  const setFamilyFinanceInfoCompleted = useFinancialRequestStore(
    (state) => state.setFamilyFinanceInfoCompleted,
  );

  const isPersonalInformationCompleted = useFinancialRequestStore(
    (state) => state.isPersonalInformationCompleted,
  );

  // Check if the store is hydrated to prevent incorrect redirects
  const isHydrated = useStoreHydration();

  useEffect(() => {
    // Only check and redirect after the store has been hydrated
    if (isHydrated && !isPersonalInformationCompleted) {
      toast.error(t('validation.personalInformation'));
      goToStep(0);
    }
  }, [isPersonalInformationCompleted, goToStep, isHydrated]);

  // Create a completely different adapter that manually handles placeholders
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

  const form = useForm<FamilyAndFinancialInfoFormData>({
    mode: 'onBlur',
    resolver: zodResolver(familyAndFinancialInfoFormSchema(tAdapter)),
    defaultValues: savedData || {
      maritalStatus: undefined,
      numberOfDependents: 0,
      employmentStatus: undefined,
      monthlyIncome: 0,
      housingStatus: undefined,
    },
  });

  // This function will be called by the stepper navigation when Next is clicked
  const handleSubmit = async () => {
    const isValid = await form.trigger();

    if (isValid) {
      const data = form.getValues();
      setFamilyFinanceInfo(data);
      setFamilyFinanceInfoCompleted(true);
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (isHydrated && savedData) {
      form.reset(savedData);
      setFamilyFinanceInfoCompleted(true);
    }
  }, [isHydrated, savedData, form]);

  // Register the form submit handler with the stepper context
  useEffect(() => {
    registerFormSubmitHandler(handleSubmit);
  }, [registerFormSubmitHandler]);

  // Save form data when page is about to unload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const data = form.getValues();
      setFamilyFinanceInfo(data);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [form, setFamilyFinanceInfo]);

  return (
    <FormProvider {...form}>
      <form className="grid grid-cols-2 gap-4">
        <MaritalStatus />
        <NumberOfDependents />
        <EmploymentStatus />
        <MonthlyIncome />
        <HousingStatus />
      </form>
    </FormProvider>
  );
}

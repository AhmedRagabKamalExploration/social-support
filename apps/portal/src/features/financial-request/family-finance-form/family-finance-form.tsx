'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useStoreHydration } from '@/hooks/use-store-hydration';
import { useFinanceRequestStepper } from '@/providers/finance-request-stepper-context';
import { useFinancialRequestStore } from '@/store/financial-request.store';
import { createTAdapter } from '@/utils/t-adapter';

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

  const isHydrated = useStoreHydration();

  useEffect(() => {
    if (isHydrated && !isPersonalInformationCompleted) {
      toast.error(t('validation.personalInformation'));
      goToStep(0);
    }
  }, [isPersonalInformationCompleted, goToStep, isHydrated]);

  const tAdapter = createTAdapter(t);

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

  const handleSubmit = async () => {
    const isValid = await form.trigger();

    if (isValid) {
      const data = form.getValues();
      setFamilyFinanceInfo(data);
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (isHydrated && savedData) {
      form.reset(savedData);

      const schema = familyAndFinancialInfoFormSchema(tAdapter);
      const result = schema.safeParse(savedData);
      setFamilyFinanceInfoCompleted(result.success);
    }
  }, [isHydrated, savedData, form, setFamilyFinanceInfoCompleted]);

  useEffect(() => {
    registerFormSubmitHandler(handleSubmit);
  }, [registerFormSubmitHandler]);

  useEffect(() => {
    const handleBeforeUnload = () => {
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
      <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MaritalStatus />
        <NumberOfDependents />
        <EmploymentStatus />
        <MonthlyIncome />
        <HousingStatus />
      </form>
    </FormProvider>
  );
}

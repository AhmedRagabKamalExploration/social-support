'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useStoreHydration } from '@/hooks/use-store-hydration';
import { useFinanceRequestStepper } from '@/providers/finance-request-stepper-context';
import { useFinancialRequestStore } from '@/store/financial-request.store';
import { createTAdapter } from '@/utils/t-adapter';

import {
  type PersonalInformationFormData,
  personalInformationFormSchema,
} from '../schema';

import { Address } from './address/address';
import { CountryStateCities } from './cities/cities';
import { DateOfBirth } from './date-of-birth/date-of-birth';
import { Email } from './email/email';
import { FullName } from './fullname/fullname';
import { Gender } from './gender/gender';
import { NationalId } from './national-id/national-id';
import { PhoneNumber } from './phone-number/phone-number';
import { CountryStates } from './states/states';

export function PersonalInformationForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('feedback');
  const { registerFormSubmitHandler } = useFinanceRequestStepper();
  const setPersonalInformation = useFinancialRequestStore(
    (state) => state.setPersonalInformation,
  );
  const setPersonalInformationCompleted = useFinancialRequestStore(
    (state) => state.setPersonalInformationCompleted,
  );
  const savedData = useFinancialRequestStore(
    (state) => state.personalInformation,
  );

  const isHydrated = useStoreHydration();

  const tAdapter = createTAdapter(t);

  const form = useForm<PersonalInformationFormData>({
    resolver: zodResolver(personalInformationFormSchema(tAdapter)),
    mode: 'onBlur',
    defaultValues: savedData || {
      fullName: '',
      nationalId: '',
      dateOfBirth: '',
      gender: undefined,
      address: '',
      city: '',
      stateOrEmirate: '',
      country: '',
      phone: '',
      email: '',
    },
  });

  useEffect(() => {
    if (isHydrated && savedData) {
      form.reset(savedData);

      const schema = personalInformationFormSchema(tAdapter);
      const result = schema.safeParse(savedData);
      setPersonalInformationCompleted(result.success);
    }
  }, [isHydrated, savedData, form, setPersonalInformationCompleted]);

  const handleSubmit = async () => {
    const isValid = await form.trigger();

    if (isValid) {
      const data = form.getValues();
      setPersonalInformation(data);
      return true;
    }

    return false;
  };

  useEffect(() => {
    registerFormSubmitHandler(handleSubmit);
  }, [registerFormSubmitHandler]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const data = form.getValues();
      setPersonalInformation(data);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [form, setPersonalInformation]);

  return (
    <FormProvider {...form}>
      <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FullName />
        <NationalId />
        <DateOfBirth />
        <Gender />
        <Address />
        {children}
        <CountryStates />
        <CountryStateCities />
        <PhoneNumber />
        <Email />
      </form>
    </FormProvider>
  );
}

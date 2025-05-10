'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useFinanceRequestStepper } from '@/context/stepper/finance-request-stepper-context';
import { useFinancialRequestStore } from '@/store/financial-request.store';

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
  const savedData = useFinancialRequestStore(
    (state) => state.personalInformation,
  );

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

  const form = useForm<PersonalInformationFormData>({
    resolver: zodResolver(personalInformationFormSchema(tAdapter)),
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

  // This function will be called by the stepper navigation when Next is clicked
  const handleSubmit = async () => {
    const isValid = await form.trigger();

    if (isValid) {
      const data = form.getValues();
      setPersonalInformation(data);
      return true;
    }

    return false;
  };

  // Register the form submit handler with the stepper context
  useEffect(() => {
    registerFormSubmitHandler(handleSubmit);
  }, [registerFormSubmitHandler]);

  // Save form data when page is about to unload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Save form data to store when page is about to unload
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

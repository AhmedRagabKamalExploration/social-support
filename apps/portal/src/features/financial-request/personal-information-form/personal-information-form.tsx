'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useFinanceRequestStepper } from '@/context/stepper/finance-request-stepper-context';
import { useStoreHydration } from '@/hooks/use-store-hydration';
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
  const setPersonalInformationCompleted = useFinancialRequestStore(
    (state) => state.setPersonalInformationCompleted,
  );
  const savedData = useFinancialRequestStore(
    (state) => state.personalInformation,
  );
  const isPersonalInformationCompleted = useFinancialRequestStore(
    (state) => state.isPersonalInformationCompleted,
  );

  // Check if the store is hydrated to ensure we have correct data
  const isHydrated = useStoreHydration();

  // Use a ref to track if the form has been explicitly submitted by the user
  const userInteractedRef = useRef(false);

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

  // Update form data when store is hydrated and savedData changes
  useEffect(() => {
    if (isHydrated && savedData) {
      form.reset(savedData);
      setPersonalInformationCompleted(true);
    }
  }, [isHydrated, savedData, form]);

  // This function will be called by the stepper navigation when Next is clicked
  const handleSubmit = async () => {
    // Mark that the user has interacted with the form
    userInteractedRef.current = true;

    const isValid = await form.trigger();

    if (isValid) {
      const data = form.getValues();
      setPersonalInformation(data);
      setPersonalInformationCompleted(true);
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

      // Only update the completed flag if the user has interacted with the form
      // and the form was previously marked as completed
      if (!userInteractedRef.current && isPersonalInformationCompleted) {
        setPersonalInformationCompleted(false);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [
    form,
    setPersonalInformation,
    isPersonalInformationCompleted,
    setPersonalInformationCompleted,
  ]);

  // Reset the completed flag when the component is first mounted with empty data
  useEffect(() => {
    // If we've just loaded the page and there's no saved data,
    // ensure the completed flag is set to false
    if (
      !savedData ||
      Object.values(savedData).every(
        (value) => value === '' || value === undefined || value === null,
      )
    ) {
      setPersonalInformationCompleted(false);
    }
  }, [savedData, setPersonalInformationCompleted]);

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

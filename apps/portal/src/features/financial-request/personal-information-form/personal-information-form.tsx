'use client';

import { Button } from '@dge/ui-core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';

import { useRouter } from '@/i18n/navigation';
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
  const router = useRouter();
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

  const onSubmit = (data: PersonalInformationFormData) => {
    console.log(data);
    // Save data to Zustand store
    setPersonalInformation(data);
    router.push('/financial-request/family-finance-info');
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
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
        <Button type="submit">Next</Button>
      </form>
    </FormProvider>
  );
}

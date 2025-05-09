'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';

import {
  type PersonalInformationFormData,
  type TFunction,
  personalInformationFormSchema,
} from '../schema';

export function PersonalInformationForm() {
  const t = useTranslations('feedback');

  // Create a wrapper that maps from schema translation paths to the actual structure
  const adaptTranslation: TFunction = (key, values) => {
    // Need to use type assertions for both the key and values due to next-intl's strict typing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return t(
      `validation.${key.replace(/^validation\./, '')}` as any,
      values as any,
    );
  };

  const form = useForm<PersonalInformationFormData>({
    resolver: zodResolver(personalInformationFormSchema(adaptTranslation)),
  });

  const onSubmit = (data: PersonalInformationFormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input type="text" placeholder="Full name" />
      </form>
    </FormProvider>
  );
}

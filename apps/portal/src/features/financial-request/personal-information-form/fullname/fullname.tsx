'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@dge/ui-core';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import type { PersonalInformationFormData } from '@/features/financial-request/schema';

export function FullName() {
  const { control } = useFormContext<PersonalInformationFormData>();
  const t = useTranslations(
    'Pages.PersonalInformation.components.personalInformationForm.FullName',
  );
  return (
    <FormField
      control={control}
      name="fullName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('label')}</FormLabel>
          <FormControl>
            <Input placeholder={t('placeholder')} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

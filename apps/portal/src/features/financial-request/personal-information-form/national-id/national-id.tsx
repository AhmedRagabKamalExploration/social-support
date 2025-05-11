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
import { formatNationalId } from '@/utils/format-national-id';

export function NationalId() {
  const { control } = useFormContext<PersonalInformationFormData>();
  const t = useTranslations(
    'Pages.PersonalInformation.components.personalInformationForm.NationalId',
  );

  return (
    <FormField
      control={control}
      name="nationalId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('label')}</FormLabel>
          <FormControl>
            <Input
              placeholder={t('placeholder')}
              {...field}
              onChange={(e) => {
                const formattedValue = formatNationalId(e.target.value);
                field.onChange(formattedValue);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

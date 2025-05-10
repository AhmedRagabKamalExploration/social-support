'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dge/ui-core';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import type { PersonalInformationFormData } from '@/features/financial-request/schema';

export function Gender() {
  const { control } = useFormContext<PersonalInformationFormData>();
  const t = useTranslations(
    'Pages.PersonalInformation.components.personalInformationForm.Gender',
  );

  return (
    <FormField
      control={control}
      name="gender"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('label')}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t('placeholder')} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="male">{t('male')}</SelectItem>
              <SelectItem value="female">{t('female')}</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

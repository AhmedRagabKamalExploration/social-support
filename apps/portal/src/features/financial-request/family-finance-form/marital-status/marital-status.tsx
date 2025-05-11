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

import type {
  FamilyAndFinancialInfoFormData,
  PersonalInformationFormData,
} from '@/features/financial-request/schema';
import { useDirection } from '@/hooks/use-direction';

export function MaritalStatus() {
  const t = useTranslations(
    'Pages.FamilyFinanceInfo.components.familyFinanceForm.MaritalStatus',
  );
  const { control } = useFormContext<FamilyAndFinancialInfoFormData>();

  const direction = useDirection();

  return (
    <FormField
      control={control}
      name="maritalStatus"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('label')}</FormLabel>
          <Select
            dir={direction}
            onValueChange={field.onChange}
            value={field.value ?? ''}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t('placeholder')} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="single">{t('single')}</SelectItem>
              <SelectItem value="married">{t('married')}</SelectItem>
              <SelectItem value="divorced">{t('divorced')}</SelectItem>
              <SelectItem value="widowed">{t('widowed')}</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

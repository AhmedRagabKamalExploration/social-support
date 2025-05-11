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

import type { FamilyAndFinancialInfoFormData } from '@/features/financial-request/schema';
import { useDirection } from '@/hooks/use-direction';

export function HousingStatus() {
  const { control } = useFormContext<FamilyAndFinancialInfoFormData>();
  const t = useTranslations(
    'Pages.FamilyFinanceInfo.components.familyFinanceForm.HousingStatus',
  );

  const direction = useDirection();

  return (
    <FormField
      control={control}
      name="housingStatus"
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
              <SelectItem value="own">{t('own')}</SelectItem>
              <SelectItem value="rent">{t('rent')}</SelectItem>
              <SelectItem value="living_with_family">
                {t('living_with_family')}
              </SelectItem>
              <SelectItem value="mortgaged">{t('mortgaged')}</SelectItem>
              <SelectItem value="other">{t('other')}</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

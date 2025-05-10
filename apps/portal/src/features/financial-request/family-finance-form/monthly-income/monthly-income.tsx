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

import type { FamilyAndFinancialInfoFormData } from '@/features/financial-request/schema';

export function MonthlyIncome() {
  const { control } = useFormContext<FamilyAndFinancialInfoFormData>();
  const t = useTranslations(
    'Pages.FamilyFinanceInfo.components.familyFinanceForm.MonthlyIncome',
  );
  return (
    <FormField
      control={control}
      name="monthlyIncome"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('label')}</FormLabel>
          <FormControl>
            <Input type="number" placeholder="0" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

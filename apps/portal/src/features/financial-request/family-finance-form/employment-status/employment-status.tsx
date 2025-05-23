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

export function EmploymentStatus() {
  const { control } = useFormContext<FamilyAndFinancialInfoFormData>();
  const t = useTranslations(
    'Pages.FamilyFinanceInfo.components.familyFinanceForm.EmploymentStatus',
  );
  const direction = useDirection();

  return (
    <FormField
      control={control}
      name="employmentStatus"
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
              <SelectItem value="employed">{t('employed')}</SelectItem>
              <SelectItem value="unemployed">{t('unemployed')}</SelectItem>
              <SelectItem value="student">{t('student')}</SelectItem>
              <SelectItem value="retired">{t('retired')}</SelectItem>
              <SelectItem value="homemaker">{t('homemaker')}</SelectItem>
              <SelectItem value="other">{t('other')}</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

'use client';

import { Button } from '@dge/ui-core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';

import {
  type FamilyAndFinancialInfoFormData,
  familyAndFinancialInfoFormSchema,
} from '../schema';

import { EmploymentStatus } from './employment-status/employment-status';
import { HousingStatus } from './housing-status/housing-status';
import { MaritalStatus } from './marital-status/marital-status';
import { MonthlyIncome } from './monthly-income/monthly-income';
import { NumberOfDependents } from './number-of-dependents/number-of-dependents';

export function FamilyFinanceForm() {
  const t = useTranslations('feedback');

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

  const form = useForm<FamilyAndFinancialInfoFormData>({
    resolver: zodResolver(familyAndFinancialInfoFormSchema(tAdapter)),
    defaultValues: {
      maritalStatus: undefined,
      numberOfDependents: 0,
      employmentStatus: undefined,
      monthlyIncome: 0,
      housingStatus: undefined,
    },
  });

  const onSubmit = (data: FamilyAndFinancialInfoFormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <MaritalStatus />
        <NumberOfDependents />
        <EmploymentStatus />
        <MonthlyIncome />
        <HousingStatus />
        <Button type="submit">Next</Button>
      </form>
    </FormProvider>
  );
}

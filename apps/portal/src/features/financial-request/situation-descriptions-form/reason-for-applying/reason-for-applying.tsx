'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from '@dge/ui-core';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import type { SituationDescriptionsFormData } from '@/features/financial-request/schema';
import { useFinancialRequestStore } from '@/store/financial-request.store';

import HelpMeWrite from '../help-me-write/help-me-write';

export function ReasonForApplying() {
  const { control } = useFormContext<SituationDescriptionsFormData>();
  const t = useTranslations(
    'Pages.SituationDescription.components.situationDescriptionForm.ReasonForApplying',
  );

  // Get data from store
  const personalInfo = useFinancialRequestStore(
    (state) => state.personalInformation,
  );
  const familyFinanceInfo = useFinancialRequestStore(
    (state) => state.familyFinanceInfo,
  );

  const formData = {
    fullName: personalInfo?.fullName || '',
    employmentStatus: familyFinanceInfo?.employmentStatus || 'employed',
    monthlyIncome: familyFinanceInfo?.monthlyIncome || 0,
    dependents: familyFinanceInfo?.numberOfDependents || 0,
    maritalStatus: familyFinanceInfo?.maritalStatus || 'single',
    financialNeed: 'financial assistance',
    requestAmount: 5000,
  };

  // Personalize the reason based on circumstances
  let reasonContext = '';

  if (formData.employmentStatus === 'unemployed') {
    reasonContext = 'due to my current unemployment situation';
  } else if (formData.employmentStatus === 'student') {
    reasonContext = 'as a student with limited income';
  } else if (formData.monthlyIncome < 2000) {
    reasonContext = 'due to my limited monthly income';
  } else if (formData.dependents > 2) {
    reasonContext = `as I need to support ${formData.dependents} dependents`;
  }

  const prompt = `I am ${formData.fullName}, ${formData.maritalStatus} with ${formData.dependents} dependents. 
  I am applying for financial assistance of $${formData.requestAmount} ${reasonContext}. 
  Help me write a detailed and compelling reason for applying for financial support that is at least 100 words long.`;

  return (
    <FormField
      control={control}
      name="reasonForApplying"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>{t('label')}</FormLabel>
            <HelpMeWrite prompt={prompt} onChange={field.onChange} />
          </div>
          <FormControl>
            <Textarea
              placeholder={t('placeholder')}
              className="min-h-32"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

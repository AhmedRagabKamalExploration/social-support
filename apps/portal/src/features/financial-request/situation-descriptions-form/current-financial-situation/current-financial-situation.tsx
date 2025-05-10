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

export function CurrentFinancialSituation() {
  const { control } = useFormContext<SituationDescriptionsFormData>();
  const t = useTranslations(
    'Pages.SituationDescription.components.situationDescriptionForm.CurrentFinancialSituation',
  );

  // Get family finance data from store
  const familyFinanceInfo = useFinancialRequestStore(
    (state) => state.familyFinanceInfo,
  );

  const formData = {
    employmentStatus: familyFinanceInfo?.employmentStatus || 'employed',
    monthlyIncome: familyFinanceInfo?.monthlyIncome || 0,
    housingStatus: familyFinanceInfo?.housingStatus || 'rent',
    maritalStatus: familyFinanceInfo?.maritalStatus || 'single',
    numberOfDependents: familyFinanceInfo?.numberOfDependents || 0,
  };

  const prompt = `I am ${formData.employmentStatus} with a monthly income of ${formData.monthlyIncome}. 
  I am ${formData.maritalStatus} with ${formData.numberOfDependents} dependents. 
  My housing situation is: ${
    formData.housingStatus === 'own'
      ? 'I own my home'
      : formData.housingStatus === 'rent'
        ? 'I pay rent'
        : formData.housingStatus === 'living_with_family'
          ? 'I live with family'
          : formData.housingStatus === 'mortgaged'
            ? 'I have a mortgage'
            : 'Other housing situation'
  }. 
  Help me describe my current financial situation comprehensively.`;

  return (
    <FormField
      control={control}
      name="currentFinancialSituation"
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

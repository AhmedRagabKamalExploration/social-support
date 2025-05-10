'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from '@dge/ui-core';
import { useFormContext } from 'react-hook-form';

import type { SituationDescriptionsFormData } from '@/features/financial-request/schema';
import { useFinancialRequestStore } from '@/store/financial-request.store';

import HelpMeWrite from '../help-me-write/help-me-write';

export function EmploymentCircumstances() {
  const { control } = useFormContext<SituationDescriptionsFormData>();

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
    yearsOfExperience: 5,
    monthlyIncome: familyFinanceInfo?.monthlyIncome || 0,
  };

  const getEmploymentDescription = (status: string) => {
    switch (status) {
      case 'employed':
        return `employed full-time with a monthly income of ${formData.monthlyIncome}`;
      case 'unemployed':
        return 'currently unemployed and seeking employment opportunities';
      case 'student':
        return 'a full-time student';
      case 'retired':
        return 'retired';
      case 'homemaker':
        return 'a homemaker responsible for managing household affairs';
      default:
        return `in the following employment situation: ${status}`;
    }
  };

  const prompt = `My name is ${formData.fullName}. I am ${getEmploymentDescription(formData.employmentStatus)}. 
  Help me write a detailed description of my employment circumstances that is at least 100 words.`;

  return (
    <FormField
      control={control}
      name="employmentCircumstances"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>2. Employment Circumstances</FormLabel>
            <HelpMeWrite prompt={prompt} onChange={field.onChange} />
          </div>
          <FormControl>
            <Textarea
              placeholder="Describe your employment circumstances..."
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

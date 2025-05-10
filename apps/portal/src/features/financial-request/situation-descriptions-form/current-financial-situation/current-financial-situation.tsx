'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from '@dge/ui-core';
import { Sparkles } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import type { SituationDescriptionsFormData } from '@/features/financial-request/schema';

import HelpMeWrite from '../help-me-write/help-me-write';

export function CurrentFinancialSituation() {
  const { control } = useFormContext<SituationDescriptionsFormData>();

  const formData = {
    employmentStatus: 'employed',
    monthlyIncome: 1000,
  };

  const prompt = `I am ${formData.employmentStatus} with a monthly income of ${formData.monthlyIncome}. Help me describe my financial situation.`;

  return (
    <FormField
      control={control}
      name="currentFinancialSituation"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>1. Current Financial Situation</FormLabel>
            <HelpMeWrite prompt={prompt} onChange={field.onChange} />
          </div>
          <FormControl>
            <Textarea
              placeholder="Describe your current financial situation..."
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

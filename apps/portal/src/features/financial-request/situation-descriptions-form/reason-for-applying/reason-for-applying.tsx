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

import HelpMeWrite from '../help-me-write/help-me-write';

export function ReasonForApplying() {
  const { control } = useFormContext<SituationDescriptionsFormData>();

  const formData = {
    financialNeed: 'emergency medical expenses',
    requestAmount: 5000,
  };

  const prompt = `I am applying for financial assistance of $${formData.requestAmount} to help with ${formData.financialNeed}. Help me explain my reason for applying.`;

  return (
    <FormField
      control={control}
      name="reasonForApplying"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>3. Reason for Applying</FormLabel>
            <HelpMeWrite prompt={prompt} onChange={field.onChange} />
          </div>
          <FormControl>
            <Textarea
              placeholder="Describe your reason for applying..."
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

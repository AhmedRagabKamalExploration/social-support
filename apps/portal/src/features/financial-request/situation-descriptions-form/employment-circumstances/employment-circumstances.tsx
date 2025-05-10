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

export function EmploymentCircumstances() {
  const { control } = useFormContext<SituationDescriptionsFormData>();

  const formData = {
    occupation: 'software developer',
    yearsOfExperience: 5,
  };

  const prompt = `I work as a ${formData.occupation} with ${formData.yearsOfExperience} years of experience. Help me describe my employment circumstances.`;

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

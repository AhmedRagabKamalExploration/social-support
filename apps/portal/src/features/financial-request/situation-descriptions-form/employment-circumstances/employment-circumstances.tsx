'use client';

import {
  Button,
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

export function EmploymentCircumstances() {
  const { control } = useFormContext<SituationDescriptionsFormData>();
  return (
    <FormField
      control={control}
      name="employmentCircumstances"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>2. Employment Circumstances</FormLabel>
            <Button variant="outline" size="sm" type="button">
              <Sparkles className="mr-2 size-4" />
              Help Me Write
            </Button>
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

'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@dge/ui-core';
import { useFormContext } from 'react-hook-form';

import type { FamilyAndFinancialInfoFormData } from '@/features/financial-request/schema';

export function NumberOfDependents() {
  const { control } = useFormContext<FamilyAndFinancialInfoFormData>();
  return (
    <FormField
      control={control}
      name="numberOfDependents"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Number of Dependents</FormLabel>
          <FormControl>
            <Input type="number" placeholder="0" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

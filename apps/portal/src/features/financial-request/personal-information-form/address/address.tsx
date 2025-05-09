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

import type { PersonalInformationFormData } from '@/features/financial-request/schema';

export function Address() {
  const { control } = useFormContext<PersonalInformationFormData>();
  return (
    <FormField
      control={control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Address</FormLabel>
          <FormControl>
            <Input placeholder="Enter your address" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

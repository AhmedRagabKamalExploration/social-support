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

export function FullName() {
  const { control } = useFormContext<PersonalInformationFormData>();
  return (
    <FormField
      control={control}
      name="fullName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Full name</FormLabel>
          <FormControl>
            <Input placeholder="Enter your full name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

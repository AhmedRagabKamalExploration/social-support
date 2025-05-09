'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@dge/ui-core';
import { useFormContext } from 'react-hook-form';

import type { PersonalInformationFormData } from '@/features/financial-request/schema';

export function NationalId() {
  const { control } = useFormContext<PersonalInformationFormData>();
  return (
    <FormField
      control={control}
      name="nationalId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>National ID</FormLabel>
          <FormControl>
            <Input placeholder="784-YYYY-XXXXXXX-X" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

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

export function PhoneNumber() {
  const { control } = useFormContext<PersonalInformationFormData>();
  return (
    <FormField
      control={control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Phone number</FormLabel>
          <FormControl>
            <Input placeholder="+971 XX XXX XXXX" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

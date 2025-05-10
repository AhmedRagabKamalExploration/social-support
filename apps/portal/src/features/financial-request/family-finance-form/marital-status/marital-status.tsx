'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dge/ui-core';
import { useFormContext } from 'react-hook-form';

import type {
  FamilyAndFinancialInfoFormData,
  PersonalInformationFormData,
} from '@/features/financial-request/schema';

export function MaritalStatus() {
  const { control } = useFormContext<FamilyAndFinancialInfoFormData>();

  return (
    <FormField
      control={control}
      name="maritalStatus"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Marital Status</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a marital status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

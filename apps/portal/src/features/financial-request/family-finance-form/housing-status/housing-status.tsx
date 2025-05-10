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

import type { FamilyAndFinancialInfoFormData } from '@/features/financial-request/schema';

export function HousingStatus() {
  const { control } = useFormContext<FamilyAndFinancialInfoFormData>();

  return (
    <FormField
      control={control}
      name="housingStatus"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Housing Status</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a housing status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="own">Own</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
              <SelectItem value="living_with_family">
                Living with Family
              </SelectItem>
              <SelectItem value="mortgaged">Mortgaged</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

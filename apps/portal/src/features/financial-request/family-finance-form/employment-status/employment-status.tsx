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

export function EmploymentStatus() {
  const { control } = useFormContext<FamilyAndFinancialInfoFormData>();

  return (
    <FormField
      control={control}
      name="employmentStatus"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Employment Status</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an employment status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="employed">Employed</SelectItem>
              <SelectItem value="unemployed">Unemployed</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
              <SelectItem value="homemaker">Homemaker</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

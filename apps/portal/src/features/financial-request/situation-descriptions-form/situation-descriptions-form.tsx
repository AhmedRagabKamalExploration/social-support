'use client';

import { Button } from '@dge/ui-core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';

import {
  type SituationDescriptionsFormData,
  situationDescriptionsFormSchema,
} from '@/features/financial-request/schema';

import { CurrentFinancialSituation } from './current-financial-situation/current-financial-situation';
import { EmploymentCircumstances } from './employment-circumstances/employment-circumstances';
import { ReasonForApplying } from './reason-for-applying/reason-for-applying';

export function SituationDescriptionsForm() {
  const t = useTranslations('feedback');

  // Create a completely different adapter that manually handles placeholders
  const tAdapter = (key: string, values?: Record<string, unknown>) => {
    try {
      // Extract the actual message key
      const validationKey = key.replace(/^validation\./, '');

      // First get the raw message template from the translation
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const messageTemplate = t.raw(`validation.${validationKey}` as any);

      // If there are no values to replace, just return the template
      if (!values || typeof messageTemplate !== 'string') {
        return messageTemplate;
      }

      // Manually replace the placeholders with the values
      let result = messageTemplate;
      Object.entries(values).forEach(([key, value]) => {
        result = result.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
      });

      return result;
    } catch (error) {
      console.error('Translation error:', error, 'for key:', key);
      return key.split('.').pop() || key;
    }
  };

  const form = useForm<SituationDescriptionsFormData>({
    resolver: zodResolver(situationDescriptionsFormSchema(tAdapter)),
    defaultValues: {
      currentFinancialSituation: '',
      employmentCircumstances: '',
      reasonForApplying: '',
    },
  });

  const onSubmit = (data: SituationDescriptionsFormData) => {
    console.log(data);
    // TODO: submit the form, call your backend api
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <CurrentFinancialSituation />
          <EmploymentCircumstances />
          <ReasonForApplying />
          <Button type="submit">Next</Button>
        </div>
      </form>
    </FormProvider>
  );
}

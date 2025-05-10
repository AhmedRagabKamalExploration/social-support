'use client';

import { Button } from '@dge/ui-core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  type SituationDescriptionsFormData,
  situationDescriptionsFormSchema,
} from '@/features/financial-request/schema';
import { useRouter } from '@/i18n/navigation';
import { useFinancialRequestStore } from '@/store/financial-request.store';

import { CurrentFinancialSituation } from './current-financial-situation/current-financial-situation';
import { EmploymentCircumstances } from './employment-circumstances/employment-circumstances';
import { ReasonForApplying } from './reason-for-applying/reason-for-applying';

// API response type
interface FinancialRequestResponse {
  success: boolean;
  message: string;
  requestId?: string;
}

export function SituationDescriptionsForm() {
  const t = useTranslations('feedback');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setSituationDescriptions = useFinancialRequestStore(
    (state) => state.setSituationDescriptions,
  );
  const getCompleteFormData = useFinancialRequestStore(
    (state) => state.getCompleteFormData,
  );
  const resetFormData = useFinancialRequestStore(
    (state) => state.resetFormData,
  );
  const savedData = useFinancialRequestStore(
    (state) => state.situationDescriptions,
  );

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
    defaultValues: savedData || {
      currentFinancialSituation: '',
      employmentCircumstances: '',
      reasonForApplying: '',
    },
  });

  const onSubmit = async (data: SituationDescriptionsFormData) => {
    try {
      setIsSubmitting(true);

      // Save data to Zustand store
      setSituationDescriptions(data);

      // Get complete form data
      const completeFormData = getCompleteFormData();
      console.log('Complete form data:', completeFormData);

      // Submit the complete form data to the backend API
      const response = await fetch('/api/financial-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeFormData),
      });

      const result = (await response.json()) as FinancialRequestResponse;

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit request');
      }

      // Show success message
      toast.success('Application submitted successfully!', {
        description: `Your request ID is ${result.requestId}`,
      });

      // Navigate to success page with the request ID
      if (result.requestId) {
        router.push(`/financial-request/success?requestId=${result.requestId}`);
      } else {
        router.push('/financial-request/success');
      }

      // Log the success
      console.log('Form submitted successfully!', result);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit application', {
        description: error.message || 'Please try again later',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <CurrentFinancialSituation />
          <EmploymentCircumstances />
          <ReasonForApplying />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

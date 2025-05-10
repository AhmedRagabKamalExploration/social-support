'use client';

import { Button, Headline, Paragraph } from '@dge/ui-core';
import { CheckCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Link } from '@/i18n/navigation';
import { useFinancialRequestStore } from '@/store/financial-request.store';

export default function FinancialRequestSuccessPage() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get('requestId') || '';

  // Get the reset function from the store
  const resetFormData = useFinancialRequestStore(
    (state) => state.resetFormData,
  );

  // Reset form data when navigating to success page
  useEffect(() => {
    // We only want to reset if we don't have a requestId in the URL
    // This ensures we don't reset when the user refreshes the page
    if (!requestId) {
      resetFormData();
    }
  }, [resetFormData, requestId]);

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-lg space-y-6 text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-24 w-24 text-green-500" />
        </div>

        <Headline variant="h1">Application Submitted!</Headline>

        <Paragraph className="text-lg">
          Your financial request has been successfully submitted. We will review
          your application and get back to you soon.
        </Paragraph>

        {requestId && (
          <div className="rounded-md bg-gray-100 p-4">
            <Paragraph className="font-medium">Your Request ID:</Paragraph>
            <Paragraph className="text-xl font-bold">{requestId}</Paragraph>
            <Paragraph className="mt-2 text-sm text-gray-500">
              Please save this ID for future reference.
            </Paragraph>
          </div>
        )}

        <div className="pt-4">
          <Button onClick={() => (window.location.href = '/')}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

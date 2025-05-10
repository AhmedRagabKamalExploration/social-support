'use client';

import { Button, Card, CardContent, Headline, Paragraph } from '@dge/ui-core';
import { CheckCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { Link } from '@/i18n/navigation';

export default function RequestSuccessPage() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get('requestId') || '';
  const requestType = searchParams.get('type') || 'financial';

  return (
    <div className="container py-8">
      <Card className="mx-auto max-w-lg">
        <CardContent className="space-y-6 p-8 text-center">
          <div className="flex justify-center">
            <CheckCircle className="h-24 w-24 text-green-500" />
          </div>

          <Headline variant="h1">Application Submitted!</Headline>

          <Paragraph className="text-lg">
            {requestType === 'financial'
              ? 'Your financial request has been successfully submitted. We will review your application and get back to you soon.'
              : 'Your request has been successfully submitted. We will review your application and get back to you soon.'}
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
            <Button>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

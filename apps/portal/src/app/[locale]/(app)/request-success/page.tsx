import { Button, Card, CardContent, Headline, Paragraph } from '@dge/ui-core';
import { CheckCircle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';

export default async function RequestSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ requestId: string }>;
}) {
  const { requestId } = await searchParams;
  const t = await getTranslations('Pages.RequestSuccess');

  return (
    <div className="container py-8">
      <Card className="mx-auto max-w-lg">
        <CardContent className="space-y-6 p-8 text-center">
          <div className="flex justify-center">
            <CheckCircle className="h-24 w-24 text-green-500" />
          </div>

          <Headline variant="h1">{t('title')}</Headline>

          <Paragraph className="text-lg">{t('subTitle')}</Paragraph>

          {requestId && (
            <div className="rounded-md bg-gray-100 p-4">
              <Paragraph className="font-medium">
                {t('yourRequestID')}
              </Paragraph>
              <Paragraph className="text-xl font-bold">{requestId}</Paragraph>
              <Paragraph className="mt-2 text-sm text-gray-500">
                {t('pleaseSaveYourRequestID')}
              </Paragraph>
            </div>
          )}

          <div className="pt-4">
            <Button>
              <Link href="/">{t('backToHome')}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

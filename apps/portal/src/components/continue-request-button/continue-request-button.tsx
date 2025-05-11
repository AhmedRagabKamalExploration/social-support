'use client';

import { Button } from '@dge/ui-core';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useState } from 'react';

import { Link } from '@/i18n/navigation';
import { useFinancialRequestStore } from '@/store/financial-request.store';

export function ContinueRequestButton() {
  const t = useTranslations('Pages.HomePage');
  const [hasExistingRequest, setHasExistingRequest] = useState(false);
  const [nextStep, setNextStep] = useState(
    '/financial-request/personal-information',
  );

  useEffect(() => {
    const store = useFinancialRequestStore.getState();

    // Check if there's an existing request with completed steps
    if (store.isPersonalInformationCompleted) {
      setHasExistingRequest(true);

      // Determine the next step based on completed forms
      if (store.isFamilyFinanceInfoCompleted) {
        setNextStep('/financial-request/situation-descriptions');
      } else {
        setNextStep('/financial-request/family-finance-info');
      }
    }
  }, []);
  return (
    <>
      {hasExistingRequest ? (
        <Button
          variant="secondary"
          icon={<ArrowRight className="rtl:rotate-180" />}
        >
          <Link href={nextStep}>{t('continueRequestButton')}</Link>
        </Button>
      ) : null}
    </>
  );
}

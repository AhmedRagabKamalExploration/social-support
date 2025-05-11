'use client';

import { Button } from '@dge/ui-core';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { useFinancialRequestStore } from '@/store/financial-request.store';

export function NewRequestButton() {
  const t = useTranslations('Pages.HomePage');
  const handleNewRequest = () => {
    useFinancialRequestStore.getState().resetFormData();
  };
  return (
    <Button icon={<Plus />} onClick={handleNewRequest}>
      <Link href="/financial-request/personal-information">
        {t('newRequestButton')}
      </Link>
    </Button>
  );
}

import { getTranslations } from 'next-intl/server';

import { FamilyFinanceForm } from '@/features/financial-request/family-finance-form/family-finance-form';

export async function generateMetadata() {
  const t = await getTranslations('Pages.FamilyFinanceInfo.Metadata');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function FamilyFinanceInfoPage() {
  return <FamilyFinanceForm />;
}

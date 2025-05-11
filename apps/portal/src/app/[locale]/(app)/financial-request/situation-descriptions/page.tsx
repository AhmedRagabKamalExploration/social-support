import { getTranslations } from 'next-intl/server';

import { SituationDescriptionsForm } from '@/features/financial-request/situation-descriptions-form/situation-descriptions-form';

export async function generateMetadata() {
  const t = await getTranslations('Pages.FamilyFinanceInfo.Metadata');

  return {
    title: t('title'),
    description: t('description'),
  };
}
export default function SituationDescriptionsPage() {
  return <SituationDescriptionsForm />;
}

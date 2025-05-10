import { Headline } from '@dge/ui-core';

import { SituationDescriptionsForm } from '@/features/financial-request/situation-descriptions-form/situation-descriptions-form';

export default async function SituationDescriptionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Headline variant="h2">Situation Descriptions</Headline>
      <SituationDescriptionsForm />
    </div>
  );
}

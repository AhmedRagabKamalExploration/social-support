import { SituationDescriptionsForm } from '@/features/financial-request/situation-descriptions-form/situation-descriptions-form';

export default async function SituationDescriptionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <SituationDescriptionsForm />
    </div>
  );
}

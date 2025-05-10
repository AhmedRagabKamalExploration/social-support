import { Headline } from '@dge/ui-core';

import { FamilyFinanceForm } from '@/features/financial-request/family-finance-form/family-finance-form';

export default function FamilyFinanceInfoPage() {
  return (
    <div className="flex flex-col gap-4">
      <Headline variant="h3">Family & Financial Info</Headline>
      <FamilyFinanceForm />
    </div>
  );
}

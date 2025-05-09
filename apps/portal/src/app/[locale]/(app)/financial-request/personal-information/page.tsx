import { Headline } from '@dge/ui-core';

import { PersonalInformationForm } from '@/features/financial-request/personal-information-form/personal-information-form';

export default function PersonalInformationPage() {
  return (
    <div className="flex h-full w-full flex-col">
      <Headline variant="h3">Personal Information</Headline>
      <PersonalInformationForm />
    </div>
  );
}

import { Headline } from '@dge/ui-core';

import { CountriesWrapper } from '@/features/financial-request/personal-information-form/countries-wrapper/countries-wrapper';
import { PersonalInformationForm } from '@/features/financial-request/personal-information-form/personal-information-form';
import { getCountries } from '@/services/country.service';

export default async function PersonalInformationPage() {
  // const data = await getCountries();
  // console.log({ data });
  return (
    <div className="flex h-full w-full flex-col">
      <Headline variant="h3">Personal Information</Headline>
      <PersonalInformationForm>
        <CountriesWrapper countryResponse={getCountries()} />
      </PersonalInformationForm>
    </div>
  );
}

import { Headline } from '@dge/ui-core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '@/components/error-fallback/error-fallback';
import { SpinnerLoading } from '@/components/spinner-loading/spinner-loading';
import { CountriesWrapper } from '@/features/financial-request/personal-information-form/countries-wrapper/countries-wrapper';
import { PersonalInformationForm } from '@/features/financial-request/personal-information-form/personal-information-form';
import { getCountries } from '@/services/country.service';

export default async function PersonalInformationPage() {
  const countriesPromise = getCountries();
  return (
    <div className="flex h-full w-full flex-col">
      <Headline variant="h3">Personal Information</Headline>
      <PersonalInformationForm>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<SpinnerLoading />}>
            <CountriesWrapper countriesPromise={countriesPromise} />
          </Suspense>
        </ErrorBoundary>
      </PersonalInformationForm>
    </div>
  );
}

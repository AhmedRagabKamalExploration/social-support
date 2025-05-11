import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '@/components/error-fallback/error-fallback';
import { CountriesWrapper } from '@/features/financial-request/personal-information-form/countries-wrapper/countries-wrapper';
import { PersonalInformationForm } from '@/features/financial-request/personal-information-form/personal-information-form';
import { getCountries } from '@/services/country.service';

export async function generateMetadata() {
  const t = await getTranslations('Pages.PersonalInformation.Metadata');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function PersonalInformationPage() {
  const countriesPromise = getCountries();

  return (
    <div className="flex h-full w-full flex-col">
      <PersonalInformationForm>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense
            fallback={
              <CountriesWrapper
                isLoading={true}
                countriesPromise={countriesPromise}
              />
            }
          >
            <CountriesWrapper countriesPromise={countriesPromise} />
          </Suspense>
        </ErrorBoundary>
      </PersonalInformationForm>
    </div>
  );
}

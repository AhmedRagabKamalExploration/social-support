import { use } from 'react';

import type { CountryResponse } from '@/types/country.type';

import { Countries } from '../countries/countries';

type CountriesWrapperProps = {
  countriesPromise: Promise<CountryResponse>;
  isLoading?: boolean;
};

export function CountriesWrapper({
  countriesPromise,
  isLoading = false,
}: CountriesWrapperProps) {
  const { list: countries } = use(countriesPromise);
  return <Countries countries={countries} isLoading={isLoading} />;
}

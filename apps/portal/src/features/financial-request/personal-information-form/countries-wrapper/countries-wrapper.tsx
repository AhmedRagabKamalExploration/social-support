import { use } from 'react';

import type { CountryResponse } from '@/types/country.type';

import { Countries } from '../countries/countries';

type CountriesWrapperProps = {
  countriesPromise: Promise<CountryResponse>;
};

export function CountriesWrapper({ countriesPromise }: CountriesWrapperProps) {
  const { list: countries } = use(countriesPromise);
  return <Countries countries={countries} />;
}

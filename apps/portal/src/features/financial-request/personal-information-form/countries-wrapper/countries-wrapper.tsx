import { use } from 'react';

import type { CountryResponse } from '@/types/country.type';

import { Countries } from '../countries/countries';

type CountriesWrapperProps = {
  countryResponse: Promise<CountryResponse>;
};

export function CountriesWrapper({ countryResponse }: CountriesWrapperProps) {
  const { list: countries } = use(countryResponse);
  return <Countries countries={countries} />;
}

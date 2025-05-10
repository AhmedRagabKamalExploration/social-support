'use server';

import { getCitiesByCountryState } from '@/services/cities.service';

export async function getCountryStateCitiesAction(
  countryIso2: string,
  stateCode: string,
) {
  try {
    const cities = await getCitiesByCountryState(countryIso2, stateCode);
    return cities.list;
  } catch (error) {
    throw error;
  }
}

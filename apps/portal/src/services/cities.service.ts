import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from 'next/cache';
import 'server-only';

import { ENDPOINTS } from '@/constant/endpoints';
import { httpWithType } from '@/http';
import { CityResponse } from '@/types/city.type';

import { getFullApiUrl } from './domain.service';

export async function getCitiesByCountryState(
  countryIso2: string,
  stateCode: string,
) {
  'use cache';

  const path = ENDPOINTS.cities(countryIso2, stateCode);

  cacheTag(path);
  cacheLife('max');

  const url = getFullApiUrl(path);

  try {
    return await httpWithType<CityResponse>(url);
  } catch (error) {
    throw error;
  }
}

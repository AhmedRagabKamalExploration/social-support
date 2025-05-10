import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from 'next/cache';
import 'server-only';

import { ENDPOINTS } from '@/constant/endpoints';
import { httpWithType } from '@/http';
import type { CountryResponse } from '@/types/country.type';

import { getFullApiUrl } from './domain.service';

export async function getCountries() {
  'use cache';

  const path = ENDPOINTS.countries;

  cacheTag(path);
  cacheLife('max');

  const url = getFullApiUrl(path);

  try {
    return await httpWithType<CountryResponse>(url);
  } catch (error) {
    throw error;
  }
}

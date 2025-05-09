import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from 'next/cache';
import 'server-only';

import { envConfig } from '@/config/env-config';
import { ENDPOINTS } from '@/constant/endpoints';
import { httpWithType } from '@/http';
import type { CountryResponse } from '@/types/country.type';

import { getFullApiUrl } from './domain.service';

const { RAPID_API_KEY, RAPID_API_HOST } = envConfig;

export async function getCountries() {
  'use cache';

  const path = ENDPOINTS.countries;

  cacheTag(path);
  cacheLife('max');

  const url = getFullApiUrl(path);

  const headers = new Headers();
  headers.set('X-RapidAPI-Key', RAPID_API_KEY);
  headers.set('X-RapidAPI-Host', RAPID_API_HOST);

  try {
    return await httpWithType<CountryResponse>(url, { headers });
  } catch (error) {
    throw error;
  }
}

import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from 'next/cache';
import 'server-only';

import { ENDPOINTS } from '@/constant/endpoints';
import { httpWithType } from '@/http';
import type { StateResponse } from '@/types/state.type';

import { getFullApiUrl } from './domain.service';

export async function getCountryStates(countryIso2: string) {
  'use cache';

  const path = ENDPOINTS.states(countryIso2);

  cacheTag(path);
  cacheLife('max');

  const url = getFullApiUrl(path);

  try {
    return await httpWithType<StateResponse>(url);
  } catch (error) {
    throw error;
  }
}

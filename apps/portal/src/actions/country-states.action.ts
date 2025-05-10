'use server';

import { getCountryStates } from '@/services/states.service';

export async function getCountryStatesAction(countryIso2: string) {
  try {
    const states = await getCountryStates(countryIso2);
    return states.list;
  } catch (error) {
    throw error;
  }
}

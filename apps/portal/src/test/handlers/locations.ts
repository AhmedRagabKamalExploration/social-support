import { HttpResponse, http } from 'msw';

import type { City } from '@/types/city.type';
import type { Country } from '@/types/country.type';
import type { State } from '@/types/state.type';

// Mock data
const mockCountries: Country[] = [
  {
    id: 1,
    name: 'United Arab Emirates',
    iso2: 'AE',
    iso3: 'ARE',
    emoji: '🇦🇪',
    translations: { fa: 'امارات متحده عربی' },
  },
  {
    id: 2,
    name: 'United States',
    iso2: 'US',
    iso3: 'USA',
    emoji: '🇺🇸',
    translations: { fa: 'ایالات متحده آمریکا' },
  },
  {
    id: 3,
    name: 'United Kingdom',
    iso2: 'GB',
    iso3: 'GBR',
    emoji: '🇬🇧',
    translations: { fa: 'بریتانیا' },
  },
];

const mockStates: Record<string, State[]> = {
  US: [
    {
      id: 1,
      name: 'California',
      state_code: 'CA',
      country_id: 2,
      country_code: 'US',
    },
    {
      id: 2,
      name: 'New York',
      state_code: 'NY',
      country_id: 2,
      country_code: 'US',
    },
    {
      id: 3,
      name: 'Texas',
      state_code: 'TX',
      country_id: 2,
      country_code: 'US',
    },
  ],
  AE: [
    {
      id: 4,
      name: 'Abu Dhabi',
      state_code: 'AZ',
      country_id: 1,
      country_code: 'AE',
    },
    {
      id: 5,
      name: 'Dubai',
      state_code: 'DU',
      country_id: 1,
      country_code: 'AE',
    },
  ],
  GB: [
    {
      id: 6,
      name: 'England',
      state_code: 'ENG',
      country_id: 3,
      country_code: 'GB',
    },
    {
      id: 7,
      name: 'Scotland',
      state_code: 'SCT',
      country_id: 3,
      country_code: 'GB',
    },
  ],
};

const mockCities: Record<string, Record<string, City[]>> = {
  US: {
    NY: [
      {
        id: 1,
        name: 'New York City',
        state_id: 2,
        state_code: 'NY',
        country_id: 2,
        country_code: 'US',
      },
      {
        id: 2,
        name: 'Brooklyn',
        state_id: 2,
        state_code: 'NY',
        country_id: 2,
        country_code: 'US',
      },
      {
        id: 3,
        name: 'Queens',
        state_id: 2,
        state_code: 'NY',
        country_id: 2,
        country_code: 'US',
      },
    ],
    CA: [
      {
        id: 4,
        name: 'Los Angeles',
        state_id: 1,
        state_code: 'CA',
        country_id: 2,
        country_code: 'US',
      },
      {
        id: 5,
        name: 'San Francisco',
        state_id: 1,
        state_code: 'CA',
        country_id: 2,
        country_code: 'US',
      },
    ],
    TX: [
      {
        id: 6,
        name: 'Houston',
        state_id: 3,
        state_code: 'TX',
        country_id: 2,
        country_code: 'US',
      },
      {
        id: 7,
        name: 'Austin',
        state_id: 3,
        state_code: 'TX',
        country_id: 2,
        country_code: 'US',
      },
    ],
  },
};

export const handlers = [
  // Get countries - matches '/countries'
  http.get('/countries', () => {
    return HttpResponse.json({
      list: mockCountries,
      total: mockCountries.length,
    });
  }),

  // Get states by country - matches '/states?country=XX'
  http.get('/states', ({ request }) => {
    const url = new URL(request.url);
    const countryCode = url.searchParams.get('country');

    if (!countryCode) {
      return new HttpResponse(null, { status: 400 });
    }

    const states = mockStates[countryCode] || [];
    return HttpResponse.json({
      list: states,
      total: states.length,
    });
  }),

  // Get cities by country and state - matches '/cities?country=XX&state=YY'
  http.get('/cities', ({ request }) => {
    const url = new URL(request.url);
    const countryCode = url.searchParams.get('country');
    const stateCode = url.searchParams.get('state');

    if (!countryCode || !stateCode) {
      return new HttpResponse(null, { status: 400 });
    }

    const countryCities = mockCities[countryCode] || {};
    const cities = countryCities[stateCode] || [];

    return HttpResponse.json({
      list: cities,
      total: cities.length,
    });
  }),
];

export default handlers;

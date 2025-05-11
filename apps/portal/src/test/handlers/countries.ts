// https://mswjs.io/docs/network-behavior/rest
import { HttpResponse, http } from 'msw';

import { Country } from '@/types/country.type';

export default [
  http.get('/countries', () => {
    return HttpResponse.json([
      {
        result: {
          data: {
            name: 'Egypt',
            id: 1,
            iso2: 'EG',
            iso3: 'EGY',
            translations: {
              fa: 'مصر',
            },
            emoji: '🇪🇬',
          } satisfies Country,
        },
      },
    ]);
  }),
];

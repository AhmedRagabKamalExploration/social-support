// https://mswjs.io/docs/integrations/node
import { setupServer } from 'msw/node';

import countries from '@/test/handlers/countries';

export const server = setupServer(...countries);

// https://mswjs.io/docs/integrations/node
import { setupServer } from 'msw/node';

import countriesHandlers from './handlers/countries';
import locationsHandlers from './handlers/locations';

// Create a server instance
export const server = setupServer(...countriesHandlers, ...locationsHandlers);

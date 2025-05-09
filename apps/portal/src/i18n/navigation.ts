import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Link,
  redirect,
  permanentRedirect,
  usePathname,
  useRouter,
  getPathname,
} = createNavigation(routing);

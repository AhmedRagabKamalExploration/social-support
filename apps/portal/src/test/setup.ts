import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import type { Window } from 'happy-dom';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import { server } from '@/test/server';

(window as typeof window & { happyDOM: Window['happyDOM'] }).happyDOM.setURL(
  'http://localhost',
);

beforeAll(() => {
  vi.mock('@/i18n/navigation', () => ({
    usePathname: () => '/test-path',
    useParams: () => ({}),
    useSearchParams: () => new URLSearchParams(),
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
    }),
  }));

  server.listen({
    onUnhandledRequest: 'error',
  });
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  vi.restoreAllMocks();
  server.resetHandlers();
  cleanup();
});

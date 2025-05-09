import nextPlugin from '@next/eslint-plugin-next';

import { GLOB_TS, GLOB_TSX } from '../utils/glob.js';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export default {
  files: [GLOB_TS, GLOB_TSX],
  plugins: {
    '@next/next': nextPlugin,
  },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    'no-restricted-imports': [
      'error',
      {
        name: 'next/link',
        message: 'Please import from `@/i18n/navigation` instead.',
      },
      {
        name: 'next/navigation',
        importNames: [
          'redirect',
          'permanentRedirect',
          'useRouter',
          'usePathname',
        ],
        message: 'Please import from `@/i18n/navigation` instead.',
      },
    ],
  },
};

import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    coverage: {
      provider: 'v8',
      thresholds: {
        branches: 63,
        lines: 8,
      },
      exclude: ['**/__mocks__/**', '**/test/**'],
      reporter: ['text', 'html'],
    },
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    typecheck: {
      include: ['src/**/*.{ts,tsx}'],
      tsconfig: './tsconfig.json',
      ignoreSourceErrors: false,
    },
  },
});

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: 'node',
    exclude: [
      'node_modules',
      'dist',
      'references',
      'scratch',
      'website',
      '**/node_modules/**',
    ],
  },
});

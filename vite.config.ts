/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.test.{js,ts,tsx}'],
    globals: true, //https://vitest.dev/guide/migration.html#globals-as-a-default
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});

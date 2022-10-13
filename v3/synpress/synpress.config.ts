import { defineConfig } from 'cypress';
import synpressPlugins from '@synthetixio/synpress/plugins';

export default defineConfig({
  userAgent: 'synpress',
  chromeWebSecurity: true,
  modifyObstructiveCode: false,
  env: {
    coverage: false,
  },
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 30000,
  requestTimeout: 30000,
  e2e: {
    watchForFileChanges: false,
    // @ts-ignore
    setupNodeEvents(on, config) {
      synpressPlugins(on, config);
      return config;
    },
    baseUrl: 'http://localhost:3000',
    specPattern: ['tests/e2e/**/*.e2e.{js,jsx,ts,tsx}'],
    supportFile: 'tests/support/index.ts',
  },
});

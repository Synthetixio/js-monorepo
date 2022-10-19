const { defineConfig } = require('cypress');

module.exports = defineConfig({
  component: {
    watchForFileChanges: false,
    specPattern: ['../**/*.cy.{js,jsx,ts,tsx}'],
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: require('@synthetixio/v2-ui/webpack.config'),
    },
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
  },

  e2e: {
    watchForFileChanges: false,
    specPattern: ['../**/*.e2e.{js,jsx,ts,tsx}'],
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        ...require('./cypress/tasks/removeMinimumStakeTime'),
        ...require('./cypress/tasks/getSnx'),
        ...require('./cypress/tasks/mintSusd'),
        ...require('./cypress/tasks/snapshot'),
      });
      return config;
    },

    retries: {
      runMode: 3,
      openMode: 0,
    },
    defaultCommandTimeout: 60_000,
    execTimeout: 120_000,
    taskTimeout: 120_000,
  },
});

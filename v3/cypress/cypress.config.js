const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: './cypress/reports/junit-results.[hash].xml',
    toConsole: false,
  },

  component: {
    watchForFileChanges: false,
    specPattern: ['../**/*.cy.{js,jsx,ts,tsx}'],
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: require('@snx-v3/ui/webpack.config'),
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
      if (process.env.CI) {
        on('before:browser:launch', require('@snx-cy/printBrowserLogs').printBrowserLogs);
        require('@cypress/code-coverage/task')(on, config);
      }
      on('task', {
        ...require('./cypress/tasks/forkReset'),
        ...require('./cypress/tasks/setEthBalance'),
        ...require('./cypress/tasks/wrapEth'),
        ...require('./cypress/tasks/getCollateralConfig'),
        ...require('./cypress/tasks/getSnx'),
        ...require('./cypress/tasks/createAccount'),
        ...require('./cypress/tasks/approveCollateral'),
        ...require('./cypress/tasks/depositCollateral'),
        ...require('./cypress/tasks/delegateCollateral'),
      });

      return config;
    },

    retries: {
      runMode: 1,
      openMode: 0,
    },
    defaultCommandTimeout: 60_000,
    execTimeout: 120_000,
    taskTimeout: 300_000, // sometimes Anvil needs quite a bit of time to complete impersonating tx
  },
});

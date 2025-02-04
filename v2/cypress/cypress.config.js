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
      if (process.env.CI) {
        require('cypress-terminal-report/src/installLogsPrinter')(on, {
          printLogsToConsole: 'always',
          includeSuccessfulHookLogs: true,
          defaultTrimLength: 10_000,
          commandTrimLength: 10_000,
        });
        require('@cypress/code-coverage/task')(on, config);
      }
      on('task', {
        ...require('./cypress/tasks/forkReset'),
        ...require('./cypress/tasks/removeMinimumStakeTime'),
        ...require('./cypress/tasks/removeEthCollateralInteractionDelay'),
        ...require('./cypress/tasks/getSnx'),
        ...require('./cypress/tasks/mintSusd'),
      });
      return config;
    },

    viewportWidth: 1000,
    viewportHeight: 1200,

    video: true,

    retries: {
      runMode: 0,
      openMode: 0,
    },

    defaultCommandTimeout: 30_000,
    execTimeout: 60_000,
    taskTimeout: 60_000,
  },
});

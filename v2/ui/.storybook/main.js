const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

// Make depcheck happy
require.resolve('storybook');
require.resolve('@chakra-ui/storybook-addon');
require.resolve('@storybook/addon-actions');
require.resolve('@storybook/addon-docs');
require.resolve('@storybook/addon-essentials');
require.resolve('@storybook/addon-interactions');
require.resolve('@storybook/addon-links');
require.resolve('@storybook/builder-webpack5');
require.resolve('@storybook/manager-webpack5');

const custom = require('../webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  stories: ['../../**/**/*.stories.tsx'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chakra-ui/storybook-addon',
  ],
  framework: '@storybook/react',

  core: {
    builder: '@storybook/builder-webpack5',
  },

  features: {
    emotionAlias: false,
  },

  webpackFinal: async (config) => {
    return {
      ...config,
      module: { ...config.module, rules: custom.module.rules },
      plugins: [
        ...config.plugins,
        ...custom.plugins.filter((plugin) => !(plugin instanceof HtmlWebpackPlugin)),
      ],
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          ...custom.resolve.alias,
        },
        fallback: {
          ...config.resolve.fallback,
          ...custom.resolve.fallback,
        },
      },
    };
  },
};

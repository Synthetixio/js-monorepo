// Make depcheck happy
require.resolve('storybook');
require.resolve('@chakra-ui/storybook-addon');
require.resolve('@storybook/addon-essentials');
require.resolve('@storybook/addon-interactions');
require.resolve('@storybook/addon-links');
require.resolve('@storybook/builder-webpack5');
require.resolve('@storybook/manager-webpack5');
require.resolve('@storybook/react');

const custom = require('../webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  stories: ['../../**/**/*.stories.tsx'],
  addons: [
    '@chakra-ui/storybook-addon',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  features: {
    emotionAlias: false,
  },
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      module: { ...config.module, rules: custom.module.rules },
      plugins: [
        ...config.plugins,
        ...custom.plugins.filter((plugin) => !(plugin instanceof HtmlWebpackPlugin)),
      ],
    };
  },
};

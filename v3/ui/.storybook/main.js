const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

// Make depcheck happy
require.resolve('storybook');
require.resolve('@chakra-ui/storybook-addon');
require.resolve('@storybook/addon-essentials');
require.resolve('@storybook/addon-interactions');
require.resolve('@storybook/addon-links');
require.resolve('@storybook/builder-webpack5');
require.resolve('@storybook/manager-webpack5');
require.resolve('@storybook/react');

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
  webpackFinal: (config) => {
    if (!isProd) {
      config.plugins.push(new ReactRefreshWebpackPlugin());
    }
    return config;
  },
};

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

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

  webpackFinal: (config) => {
    if (!isProd) {
      config.plugins.push(new ReactRefreshWebpackPlugin());
    }
    return config;
  },
};

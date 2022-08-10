// because depcheck does not support storybook config
require.resolve('@storybook/addon-links');
require.resolve('@storybook/addon-essentials');
require.resolve('@storybook/addon-interactions');
require.resolve('@chakra-ui/storybook-addon');
require.resolve('@storybook/react');
require.resolve('@storybook/builder-webpack5');
require.resolve('@storybook/manager-webpack5');

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
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
    interactionsDebugger: true,
    emotionAlias: false,
  },
  typescript: {
    reactDocgen: false,
  },
};

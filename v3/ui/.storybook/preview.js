import { Fonts, theme } from '@synthetixio/v3-theme';
import i18n from './i18next.js';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

export const parameters = {
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
  },
  chakra: {
    theme,
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator((story) => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>);

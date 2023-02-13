import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enLocale from '../src/locales/en.json';

i18n.use(initReactI18next).init({
  supportedLngs: ['en'],
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  resources: {
    en: {
      translation: enLocale,
    },
  },
});

export default i18n;

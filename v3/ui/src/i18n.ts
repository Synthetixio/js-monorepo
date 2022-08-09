import i18n from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import enLocale from './locales/en.json';
import { initReactI18next } from 'react-i18next';

export enum Locale {
  en = 'en',
}

const resources = {
  en: {
    translation: enLocale,
  },
};

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    lng: Locale.en,
    resources,
    fallbackLng: Locale.en,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      caches: ['cookie'],
    },
  });

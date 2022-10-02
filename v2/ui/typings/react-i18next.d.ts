import 'react-i18next';
import ns1 from '../translations/en.json';

declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: 'ns1';
    // custom resources type
    resources: {
      ns1: typeof ns1;
    };
  }
}

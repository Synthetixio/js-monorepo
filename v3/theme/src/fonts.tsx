import { Global } from '@emotion/react';

export const Fonts = () => (
  <Global
    styles={`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200..700&display=swap');
      @font-face {
        font-family: 'GT America Condensed';
        font-style: normal;
        font-display: swap;
        font-weight: 700;
        src: local('GT America Condensed'),
          url('https://fonts.synthetix.io/GT%20America%20Condensed%20Bold.woff2') format('woff2'),
          url('https://fonts.synthetix.io/GT%20America%20Condensed%20Bold.woff') format('woff'),
          url('https://fonts.synthetix.io/GT%20America%20Condensed%20Bold.otf') format('opentype');
      }
      @font-face {
        font-family: 'GT America Condensed';
        font-style: italic;
        font-display: swap;
        font-weight: 700;
        src: local('GT America Condensed'),
          url('https://fonts.synthetix.io/GT%20America%20Condensed%20Bold%20Italic.woff2')
            format('woff2'),
          url('https://fonts.synthetix.io/GT%20America%20Condensed%20Bold%20Italic.woff')
            format('woff'),
          url('https://fonts.synthetix.io/GT%20America%20Condensed%20Bold%20Italic.otf')
            format('opentype');
      }
      @font-face {
        font-family: 'GT America Condensed';
        font-style: normal;
        font-display: swap;
        font-weight: 100;
        src: local('GT America Condensed'),
          url('https://fonts.synthetix.io/GT%20America%20Condensed%20Thin.woff2') format('woff2'),
          url('https://fonts.synthetix.io/GT%20America%20Condensed%20Thin.woff') format('woff'),
          url('https://fonts.synthetix.io/GT%20America%20Condensed%20Thin.otf') format('opentype');
      }
      @font-face {
        font-family: 'GT America Condensed';
        font-style: italic;
        font-display: swap;
        font-weight: 100;
        src: local('GT America Condensed'),
          url('https://fonts.synthetix.io/GT%20America%20Condensed%20Thin%20Italic.woff2')
            format('woff2'),
          url('https://fonts.synthetix.io/GT%20America%20Condensed%20Thin%20Italic.woff')
            format('woff'),
          url('https://fonts.synthetix.io/GT%20America%20Condensed%20Thin%20Italic.otf')
            format('opentype');
      }
      @font-face {
        font-family: 'GT America Mono';
        font-style: normal;
        font-display: swap;
        font-weight: 700;
        src: local('GT America Mono'),
          url('https://fonts.synthetix.io/GT%20America%20Mono%20Bold.woff2') format('woff2'),
          url('https://fonts.synthetix.io/GT%20America%20Mono%20Bold.woff') format('woff'),
          url('https://fonts.synthetix.io/GT%20America%20Mono%20Bold.otf') format('opentype');
      }
    `}
  />
);

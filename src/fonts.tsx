import { Global } from '@emotion/react';
import React from 'react';

export const Fonts = () => (
  <Global
    styles={`
        @font-face {
          font-family: 'Lustra Text';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Lustra Text'), url('https://synthetix.io/fonts/Lustra-Text-Regular.woff2') format('woff2'),
            url('https://synthetix.io/fonts/Lustra-Text-Regular.woff') format('woff');
        }
        
        @font-face {
          font-family: 'GT America';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('GT America'), url('https://synthetix.io/fonts/GT-America-Regular.woff2') format('woff2'),
            url('https://synthetix.io/fonts/GT-America-Regular.woff') format('woff');
        }
        
        @font-face {
          font-family: 'GT America Extended';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: local('GT America Extended'), url('https://synthetix.io/fonts/GT-America-Extended-Bold.woff2') format('woff2'),
            url('https://synthetix.io/fonts/GT-America-Extended-Bold.woff') format('woff');
        }
        
        @font-face {
          font-family: 'GT America Condensed Bold';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: local('GT America Condensed Bold'), url('https://synthetix.io/fonts/GT-America-Condensed-Bold.woff2') format('woff2'),
            url('https://synthetix.io/fonts/GT-America-Condensed-Bold.woff') format('woff');
        }
        
        @font-face {
          font-family: 'GT America Mono';
          font-style: normal;
          font-display: swap;
          font-weight: bold;
          src: local('GT America Extended'), url('https://synthetix.io/fonts/GT-America-Mono-Bold.woff2') format('woff2'),
            url('https://synthetix.io/fonts/GT-America-Mono-Bold.woff') format('woff');
        }
        
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: local('Inter'), url('https://synthetix.io/fonts/Inter-Regular.woff2') format('woff2'),
            url('https://synthetix.io/fonts/Inter-Regular.woff') format('woff');
        }
        
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: bold;
          src: local('Inter Bold'), url('https://synthetix.io/fonts/Inter-Bold.woff2') format('woff2'),
            url('https://synthetix.io/fonts/Inter-Bold.woff') format('woff');
        }
        
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url('https://synthetix.io/fonts/Inter-SemiBold.woff') format('woff');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F,
            U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        
      `}
  />
);

import colors from './colors';
import fonts from './fonts';
import { device } from './breakpoints';
import { rem } from '../constants';

const theme = {
  rem: rem.toString().concat('px'),
  colors,
  fonts,
};

export type ThemeInterface = typeof theme;

export { theme, device };

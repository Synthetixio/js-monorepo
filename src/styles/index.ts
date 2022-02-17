import colors from './colors';
import fonts from './fonts';
import { device } from './breakpoints';

const theme = {
  colors,
  fonts,
};

export type ThemeInterface = typeof theme;

export { theme, device };

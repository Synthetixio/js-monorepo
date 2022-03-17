import colors from './colors';
import fonts from './fonts';
import { device } from './breakpoints';
import { rem } from '../constants';
import spacings from './spacings';

const theme = {
	rem: rem.toString().concat('px'),
	colors,
	fonts,
	spacings,
};

export type ThemeInterface = typeof theme;

export { theme, device };

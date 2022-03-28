import colors from './colors';
import fonts from './fonts';
import { device } from './breakpoints';
import { rem } from '../constants';
import spacings from './spacings';

// Just for Webpack
import './main.css';
import './fonts/Inter-Bold.woff';
import './fonts/Inter-Bold.woff2';
import './fonts/Inter-Regular.woff';
import './fonts/Inter-Regular.woff2';
import './fonts/Lustra Text Regular.woff';
import './fonts/Lustra Text Regular.woff2';
import './fonts/GT-America-Regular.woff';
import './fonts/GT-America-Regular.woff2';

const theme = {
	rem: rem.toString().concat('px'),
	colors,
	fonts,
	spacings,
};

export type ThemeInterface = typeof theme;

export { theme, device };

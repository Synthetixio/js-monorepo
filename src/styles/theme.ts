import colors from './colors';
import fonts from './fonts';
import { devices } from './breakpoints';
import { rem } from '../constants';
import spacings from './spacings';

export default {
	rem: rem.toString().concat('px'),
	colors,
	fonts,
	spacings,
	devices,
};

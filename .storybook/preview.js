import colors from '../src/styles/colors';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	backgrounds: {
		default: 'dark',
		values: [
			{ name: 'dark', value: '#111' },
			{ name: 'light', value: '#F8F8F8' },
			{ name: 'black', value: '#000000' },
			{ name: 'white', value: '#FFFFFF' },
			{ name: 'purple', value: colors.gradients.purple },
			{ name: 'darkBlue', value: colors.gradients.darkBlue },
		],
	},
};

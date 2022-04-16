const size = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '425px',
	tablet: '768px',
	laptop: '1024px',
	laptopL: '1440px',
	desktop: '1920px',
};

export const devices = {
	mobileS: (max?: boolean) => `(${max ? 'max' : 'min'}-width: ${size.mobileS})`,
	mobileM: (max?: boolean) => `(${max ? 'max' : 'min'}-width: ${size.mobileM})`,
	mobileL: (max?: boolean) => `(${max ? 'max' : 'min'}-width: ${size.mobileL})`,
	tablet: (max?: boolean) => `(${max ? 'max' : 'min'}-width: ${size.tablet})`,
	laptop: (max?: boolean) => `(${max ? 'max' : 'min'}-width: ${size.laptop})`,
	laptopL: (max?: boolean) => `(${max ? 'max' : 'min'}-width: ${size.laptopL})`,
	desktop: (max?: boolean) => `(${max ? 'max' : 'min'}-width: ${size.desktop})`,
	desktopL: (max?: boolean) => `(${max ? 'max' : 'min'}-width: ${size.desktop})`,
};

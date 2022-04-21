import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tabs from '../src/components/Tabs';
import CloseIcon from '../src/components/Icons/CloseIcon';
import BinIcon from '../src/components/Icons/BinIcon';
import { withDesign } from 'storybook-addon-designs';

export default {
	title: 'Tabs',
	component: Tabs,
	decorators: [withDesign],
} as ComponentMeta<typeof Tabs>;

export const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;
export const WithoutIcon: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

Template.args = {
	titles: ['first', 'second', 'third'],
	onClick: () => {},
	activeIndex: 0,
	icons: [<CloseIcon />, <BinIcon />],
};

WithoutIcon.args = {
	titles: ['first', 'second', 'third'],
	onClick: () => {},
	activeIndex: 0,
};

WithoutIcon.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/zeCepPb3Bo6Fd92FdcolUT/v1.0?node-id=920%3A18414',
	},
};

Template.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/zeCepPb3Bo6Fd92FdcolUT/v1.0?node-id=920%3A18422',
	},
};

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Selector from '../src/components/Selector';
import CloseIcon from '../src/components/Icons/CloseIcon';
import { withDesign } from 'storybook-addon-designs';

export default {
	title: 'Selector',
	component: Selector,
	decorators: [withDesign],
} as ComponentMeta<typeof Selector>;

export const Template: ComponentStory<typeof Selector> = (args) => <Selector {...args} />;
export const WithoutIcon: ComponentStory<typeof Selector> = (args) => <Selector {...args} />;

Template.args = {
	text: 'ACTION',
	icon: <CloseIcon />,
};

WithoutIcon.args = {
	text: 'ACTION',
};

Template.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/zeCepPb3Bo6Fd92FdcolUT/v1.0?node-id=466%3A21724',
	},
};

WithoutIcon.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/zeCepPb3Bo6Fd92FdcolUT/v1.0?node-id=436%3A20722',
	},
};

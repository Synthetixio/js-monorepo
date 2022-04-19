import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dropdown from '../src/components/Dropdown';
import BinIcon from '../src/components/Icons/BinIcon';
import { withDesign } from 'storybook-addon-designs';

export default {
	title: 'Dropdown',
	component: Dropdown,
	decorators: [withDesign],
} as ComponentMeta<typeof Dropdown>;

export const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

Template.args = {
	elements: [
		<span style={{ color: 'white' }}>test</span>,
		<span style={{ color: 'white' }}>done</span>,
		<BinIcon />,
	],
};

Template.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/zeCepPb3Bo6Fd92FdcolUT/v1.0?node-id=898%3A19471',
	},
};

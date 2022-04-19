import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ExternalLink from '../src/components/ExternalLink';

export default {
	title: 'External Link',
	component: ExternalLink,
} as ComponentMeta<typeof ExternalLink>;

export const Template: ComponentStory<typeof ExternalLink> = (args) => <ExternalLink {...args} />;

Template.args = {
	link: '#',
	text: 'External Link',
};

Template.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/zeCepPb3Bo6Fd92FdcolUT/v1.0?node-id=905%3A25554',
	},
};

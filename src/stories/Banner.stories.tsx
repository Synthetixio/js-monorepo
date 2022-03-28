import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Banner from '../components/Banner';
import { withDesign } from 'storybook-addon-designs';

export default {
	title: 'Banner',
	component: Banner,
	decorators: [withDesign],
} as ComponentMeta<typeof Banner>;

export const Template: ComponentStory<typeof Banner> = (args) => (
	<Banner {...args}>
		<h1 style={{ color: 'white' }}>test</h1>
	</Banner>
);

Template.args = {
	color: 'orange',
};

Template.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/zeCepPb3Bo6Fd92FdcolUT/v1.0?node-id=308%3A23842',
	},
};

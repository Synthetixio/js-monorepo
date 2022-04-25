import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from '../src/components/Card';
import { withDesign } from 'storybook-addon-designs';

export default {
	title: 'Card',
	component: Card,
	decorators: [withDesign],
} as ComponentMeta<typeof Card>;

export const Template: ComponentStory<typeof Card> = (args) => (
	<div style={{ display: 'flex', justifyContent: 'center' }}>
		<Card {...args} />
		<Card {...args} />
		<Card {...args} />
	</div>
);

Template.args = {
	children: [
		<div style={{ color: 'white' }}>
			{' '}
			<div style={{ color: 'white' }}>hello</div>,<div style={{ color: 'white' }}>world</div>,
		</div>,
		<div style={{ color: 'white' }}>hello</div>,
		<div style={{ color: 'white' }}>world</div>,
	],
};

Template.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/zeCepPb3Bo6Fd92FdcolUT/v1.0?node-id=910%3A18817',
	},
};

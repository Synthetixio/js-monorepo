import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from '../components/Card';

export default {
	title: 'Card',
	component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	children: [
		<div style={{ color: 'white' }}>test</div>,
		<div style={{ color: 'white' }}>hello</div>,
		<div style={{ color: 'white' }}>world</div>,
	],
};

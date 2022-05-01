import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NavBar from '../src/components/NavBar';

export default {
	title: 'Nav Bar',
	component: NavBar,
} as ComponentMeta<typeof NavBar>;

export const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

Template.args = {
	children: [
		<div style={{ color: 'white' }}>some buttons</div>,
		<div style={{ color: 'white' }}>some buttons</div>,
		<div style={{ color: 'white' }}>some buttons</div>,
		<div style={{ color: 'white' }}>some buttons</div>,
	],
};

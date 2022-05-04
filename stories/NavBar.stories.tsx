import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NavBar from '../src/components/NavBar';
import { SpotlightButton } from '../src';

export default {
	title: 'Nav Bar',
	component: NavBar,
} as ComponentMeta<typeof NavBar>;

export const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

Template.args = {
	children: [
		<SpotlightButton onClick={() => {}} active text="test" />,
		<SpotlightButton onClick={() => {}} active={false} text="test" />,
		<SpotlightButton onClick={() => {}} active={false} text="test" />,
		<SpotlightButton onClick={() => {}} active text="test" />,
		<SpotlightButton onClick={() => {}} active text="test" />,
	],
};

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Spotlight from '../src/components/Spotlight';

export default {
	title: 'Spotlight',
	component: Spotlight,
} as ComponentMeta<typeof Spotlight>;

export const Template: ComponentStory<typeof Spotlight> = (args) => <Spotlight {...args} />;

Template.args = {
	children: <div style={{ color: 'white', minHeight: 400 }}>test</div>,
};

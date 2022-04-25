import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SpotlightButton from '../src/components/SpotlightButton';

export default {
	title: 'SpotlightButton',
	component: SpotlightButton,
} as ComponentMeta<typeof SpotlightButton>;

export const Template: ComponentStory<typeof SpotlightButton> = (args) => (
	<SpotlightButton {...args} />
);

Template.args = {
	text: 'Im a cheeky button',
	active: true,
};

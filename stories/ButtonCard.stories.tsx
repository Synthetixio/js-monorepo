import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ButtonCard from '../src/components/ButtonCard';

export default {
	title: 'Button Card',
	component: ButtonCard,
} as ComponentMeta<typeof ButtonCard>;

export const Template: ComponentStory<typeof ButtonCard> = (args) => <ButtonCard {...args} />;

Template.args = {
	headline: 'test headline',
	subline: 'cheeky subline',
	arrowDirection: 'left',
	sublineFirst: true,
};

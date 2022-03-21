import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '../components/Button';
import { withDesign } from 'storybook-addon-designs';

export default {
	title: 'Button',
	component: Button,
	decorators: [withDesign],
} as ComponentMeta<typeof Button>;

export let Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

Template.args = {
	text: 'I am a Button',
	variant: 'primary',
	type: 'button',
	size: 'large',
	secondaryBackgroundColor: 'white',
	disabled: false,
};

Template.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/zeCepPb3Bo6Fd92FdcolUT/v1.0?node-id=918%3A18443',
	},
};

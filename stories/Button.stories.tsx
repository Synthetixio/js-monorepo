import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '../src/components/Button';
import { withDesign } from 'storybook-addon-designs';

export default {
	title: 'Button',
	component: Button,
	decorators: [withDesign],
} as ComponentMeta<typeof Button>;

export const Template: ComponentStory<typeof Button> = (args) => (
	<div style={{ backgroundColor: 'red', padding: '10px' }}>
		<Button {...args} />
	</div>
);

Template.args = {
	children: 'I am a Button',
	variant: 'primary',
	type: 'button',
	size: 'large',
	disabled: false,
};

Template.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/zeCepPb3Bo6Fd92FdcolUT/v1.0?node-id=918%3A18443',
	},
};

export const Quaternary: ComponentStory<typeof Button> = (args) => <Button {...args} />;

Quaternary.args = {
	children: (
		<>
			<span style={{ backgroundColor: 'green', minWidth: 8, minHeight: 8, borderRadius: '50%' }}>
				.
			</span>
			I am a Button
		</>
	),
	variant: 'primary',
	type: 'button',
	size: 'large',
	disabled: false,
};

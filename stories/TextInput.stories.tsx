import React from 'react';
import { withDesign } from 'storybook-addon-designs';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import TextInput from '../src/components/TextInput';

export default {
	title: 'TextInput',
	component: TextInput,
	decorators: [withDesign],
	args: {
		id: 'text-input-example',
	},
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/file/zeCepPb3Bo6Fd92FdcolUT/v1.0?node-id=920%3A18499',
		},
	},
} as ComponentMeta<typeof TextInput>;

export const Template: ComponentStory<typeof TextInput> = (args) => (
	<TextInput
		{...args}
		label="TextArea Label"
		placeholder="Some placeholder..."
		value="Lorem ipsum"
		icon={
			<div
				style={{
					position: 'absolute',
					top: '20px',
					right: 1,
					color: 'white',
					zIndex: 10,
					cursor: 'pointer',
				}}
			>
				CLICK ME
			</div>
		}
	/>
);

export const Disabled: ComponentStory<typeof TextInput> = (args) => (
	<TextInput {...args} value="Disabled text" disabled />
);

export const Small: ComponentStory<typeof TextInput> = (args) => (
	<TextInput {...args} size="small" placeholder="Some placeholder..." value="Lorem ipsum" />
);

Small.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/zeCepPb3Bo6Fd92FdcolUT/v1.0?node-id=920%3A18500',
	},
};

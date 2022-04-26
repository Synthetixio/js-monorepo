import React, { useState } from 'react';
import { withDesign } from 'storybook-addon-designs';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Checkbox from '../src/components/Checkbox';

export default {
	title: 'Checkbox',
	component: Checkbox,
	decorators: [withDesign],
	args: {
		id: 'checkbox',
		name: 'example-checkbox',
	},
	parameters: {
		backgrounds: {
			default: 'darkBlue',
		},
		design: {
			type: 'figma',
			url: 'https://www.figma.com/file/zeCepPb3Bo6Fd92FdcolUT/v1.0?node-id=894%3A23624',
		},
	},
} as ComponentMeta<typeof Checkbox>;

export const Example: ComponentStory<typeof Checkbox> = (args) => {
	const [checked, setChecked] = useState(false);
	return <Checkbox {...args} label="Example Checkbox" onChange={setChecked} checked={checked} />;
};

export const Enabled: ComponentStory<typeof Checkbox> = (args) => (
	<Checkbox {...args} label="Enabled Checkbox" checked />
);

export const Disabled: ComponentStory<typeof Checkbox> = (args) => (
	<Checkbox {...args} label="Disabled Checkbox" checked disabled />
);

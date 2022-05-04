import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import Accordion from '../src/components/Accordion';

export default {
	title: 'Accordion',
	component: Accordion,
	decorators: [withDesign],
} as ComponentMeta<typeof Accordion>;

export const Template: ComponentStory<typeof Accordion> = (args) => <Accordion {...args} />;

Template.args = {
	headerChildren: <div style={{ color: 'white' }}>Test</div>,
	children: (
		<div style={{ color: 'white' }}>
			Some nice content blalalalalalalalaalalalSome nice content blalalalalalalalaalalalSome nice
			content blalalalalalalalaalalalSome nice content blalalalalalalalaalalalSome nice content
			blalalalalalalalaalalalSome nice content blalalalalalalalaalalal
		</div>
	),
};

Template.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/zeCepPb3Bo6Fd92FdcolUT/v1.0?node-id=905%3A23533',
	},
};

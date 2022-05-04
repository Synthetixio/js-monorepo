import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dropdown from '../src/components/Dropdown';
import BinIcon from '../src/components/Icons/BinIcon';
import { withDesign } from 'storybook-addon-designs';

export default {
	title: 'Dropdown',
	component: Dropdown,
	decorators: [withDesign],
} as ComponentMeta<typeof Dropdown>;

export const Template: ComponentStory<typeof Dropdown> = (args) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<div onClick={() => setIsOpen(!isOpen)} style={{ color: 'wheat', position: 'relative' }}>
				click me
				{isOpen && (
					<Dropdown
						{...args}
						style={{ position: 'absolute', bottom: '-55px', left: '20px', maxWidth: 200 }}
					/>
				)}
			</div>
		</>
	);
};

Template.args = {
	elements: [
		<span style={{ color: 'white' }} key="12">
			test
		</span>,
		<span style={{ color: 'white' }} key="123">
			done
		</span>,
		<BinIcon key="1232" />,
	],
};

Template.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/zeCepPb3Bo6Fd92FdcolUT/v1.0?node-id=898%3A19471',
	},
};

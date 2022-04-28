import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from '../src/components/Modal';

export default {
	title: 'Modal',
	component: Modal,
} as ComponentMeta<typeof Modal>;

export const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

Template.args = {
	open: false,
	children: (
		<div style={{ backgroundColor: 'white' }}>
			<h1>HELLO WORLD</h1>,<h1>HELLO WORLD</h1>,<h1>HELLO WORLD</h1>,<h1>HELLO WORLD</h1>,
		</div>
	),
	modalContent: <div style={{ backgroundColor: 'red', width: '100%', height: '100%' }}></div>,
};

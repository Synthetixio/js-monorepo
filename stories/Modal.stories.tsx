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
	children: <h1>Buenas</h1>,
};

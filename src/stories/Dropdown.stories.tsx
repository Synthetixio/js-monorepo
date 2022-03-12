import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dropdown from '../components/Dropdown';
import BinIcon from '../components/Icons/BinIcon';

export default {
  title: 'Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  elements: [
    <span style={{ color: 'white' }}>test</span>,
    <span style={{ color: 'white' }}>done</span>,
    <BinIcon />,
  ],
};

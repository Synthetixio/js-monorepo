import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Selector from '../components/Selector';
import CloseIcon from '../components/Icons/CloseIcon';

export default {
  title: 'Selector',
  component: Selector,
} as ComponentMeta<typeof Selector>;

const Template: ComponentStory<typeof Selector> = (args) => (
  <Selector {...args} />
);

export const Primary = Template.bind({});
export const WithoutIcon = Template.bind({});

Primary.args = {
  text: 'ACTION',
  icon: <CloseIcon />,
};

WithoutIcon.args = {
  text: 'ACTION',
};

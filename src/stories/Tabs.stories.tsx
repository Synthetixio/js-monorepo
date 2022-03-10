import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tabs from '../components/Tabs';
import CloseIcon from '../components/Icons/CloseIcon';

export default {
  title: 'Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});
export const WithoutIcon = Template.bind({});

Primary.args = {
  titles: ['first', 'second', 'third'],
  onClick: () => {},
  activeIndex: 0,
  icon: <CloseIcon />,
};

WithoutIcon.args = {
  titles: ['first', 'second', 'third'],
  onClick: () => {},
  activeIndex: 0,
};

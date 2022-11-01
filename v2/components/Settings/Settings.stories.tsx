import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Settings } from './Settings';

export default {
  title: 'Settings',
  component: Settings,
} as ComponentMeta<typeof Settings>;

const Template: ComponentStory<typeof Settings> = (props) => <Settings {...props} />;

export const Primary = Template.bind({});

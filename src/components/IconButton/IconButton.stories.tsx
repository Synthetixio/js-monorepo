import { ComponentMeta, ComponentStory } from '@storybook/react';
import CloseIcon from 'components/Icons/CloseIcon';

import { IconButton } from './IconButton';

export default {
  title: 'IconButton',
  component: IconButton,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args}>
    <CloseIcon />
  </IconButton>
);

export const Primary = Template.bind({});

Primary.args = {};

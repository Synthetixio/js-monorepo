import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Icon } from '../Icon/Icon';
import { IconButton } from './IconButton';

export default {
  title: 'IconButton',
  component: IconButton,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args}>
    <Icon name='Small-Cross' />
  </IconButton>
);

export const Primary = Template.bind({});

Primary.args = {};

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  loading: false,
  disabled: false,
  variant: 'default',
  children: 'Button',
  size: 'lg'
};

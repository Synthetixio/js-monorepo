import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Badge } from './Badge';

export default {
  title: 'Badge',
  component: Badge,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  variant: 'default',
  children: 'Badge'
};

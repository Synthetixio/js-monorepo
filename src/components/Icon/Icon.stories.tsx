import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Icon } from './Icon';

export default {
  title: 'Icon',
  component: Icon,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  name: 'Archive',
  className: 'ui-text-2xl dark:ui-text-white'
};

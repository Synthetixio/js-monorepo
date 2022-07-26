import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Skeleton } from './Skeleton';

export default {
  title: 'Skeleton',
  component: Skeleton,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Primary = Template.bind({});

Primary.args = {};

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Card } from './Card';

export default {
  title: 'Card',
  component: Card,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: <div>test</div>
};

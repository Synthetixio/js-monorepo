import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Dialog } from './Dialog';

export default {
  title: 'Dialog',
  component: Dialog,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  open: false,
  children: 'test'
};

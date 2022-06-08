import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Radio } from './Radio';

export default {
  title: 'Radio',
  component: Radio,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => (
  <div>
    <Radio id='radio1' {...args} />
    <Radio id='radio2' {...args} />
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  label: 'Radio',
  name: 'form',
  disabled: false
};

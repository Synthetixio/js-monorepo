import { StatBox } from './';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'StatBox',
  component: StatBox,
} as ComponentMeta<typeof StatBox>;

const Template: ComponentStory<typeof StatBox> = (_args) => <StatBox {..._args} />;

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Tertiary = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: 'Estimated Upcoming Rewards',
  amount: '$10,090.92',
  align: 'start',
};

Secondary.args = {
  label: 'Earning',
  amount: '30.75%',
  align: 'center',
};

Tertiary.args = {
  label: 'Lifetime Rewards',
  amount: '$10,090.92',
  align: 'end',
};

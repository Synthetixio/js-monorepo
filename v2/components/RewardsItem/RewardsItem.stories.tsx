import { RewardsItem } from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'RewardsItem',
  component: RewardsItem,
} as ComponentMeta<typeof RewardsItem>;

const Template: ComponentStory<typeof RewardsItem> = (_args) => <RewardsItem {..._args} />;

export const Primary = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  isLoading: false,
  title: 'Hello',
  description: 'Hello there',
  apyReturn: '12%',
  icon: 'null',
};

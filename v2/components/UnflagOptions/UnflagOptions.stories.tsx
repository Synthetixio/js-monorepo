import { UnflagOptionsUi } from './UnflagOptions';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'UnflagOptionsUi',
  component: UnflagOptionsUi,
} as ComponentMeta<typeof UnflagOptionsUi>;

const Template: ComponentStory<typeof UnflagOptionsUi> = (_args) => <UnflagOptionsUi {..._args} />;

export const Primary = Template.bind({});
Primary.args = {
  sUSDBalance: 100,
  sUSDToGetBackToTarget: 100,
  selfLiquidationPenalty: '20%',
  canSelfLiquidate: true,
};

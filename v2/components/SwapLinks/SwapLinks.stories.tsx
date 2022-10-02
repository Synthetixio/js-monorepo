import { SwapLinksUi } from './SwapLinks';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'SwapLinksUi',
  component: SwapLinksUi,
} as ComponentMeta<typeof SwapLinksUi>;

const Template: ComponentStory<typeof SwapLinksUi> = (_args) => <SwapLinksUi {..._args} />;

export const Primary = Template.bind({});
Primary.args = {
  networkId: 1,
  outputCurrencyAddress: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',
  sUSDToGetBackToTarget: 100,
};

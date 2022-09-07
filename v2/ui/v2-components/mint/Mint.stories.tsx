import { Mint } from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { wei } from '@synthetixio/wei';

export default {
  title: 'Mint',
  component: Mint,
} as ComponentMeta<typeof Mint>;

const Template: ComponentStory<typeof Mint> = (_args) => <Mint {..._args} />;

// FYI Not currently showing up
export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  snxBalance: wei(0),
  susdBalance: wei(0),
  exchangeRate: 0.25,
  gasPrice: wei(0),
};

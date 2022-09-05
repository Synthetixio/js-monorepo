import { Mint } from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Navigation',
  component: Mint,
} as ComponentMeta<typeof Mint>;

const Template: ComponentStory<typeof Mint> = (_args) => <Mint {..._args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};

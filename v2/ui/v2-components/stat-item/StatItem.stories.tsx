import { StatItem } from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'StatItem',
  component: StatItem,
} as ComponentMeta<typeof StatItem>;

const Template: ComponentStory<typeof StatItem> = (_args) => <StatItem {..._args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: 'Active Debt',
  amount: '$100,002,389.99',
  tooltipLabel: 'Soonthetix',
  dropdownItems: [
    { label: 'Active Debt Overview', action: () => {} },
    { label: 'Historical Performance', action: () => {} },
  ],
};

export const Secondary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Secondary.args = {
  label: 'Issued Debt',
  amount: '$100,002,389.99',
  tooltipLabel: 'Soonthetix',
  dropdownItems: [
    { label: 'Issued Debt Overview', action: () => {} },
    { label: 'Historical Performance', action: () => {} },
  ],
};

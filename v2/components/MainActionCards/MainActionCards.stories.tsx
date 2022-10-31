import { Card } from './MainActionCards';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StakeIcon } from '@snx-v2/icons';

export default {
  title: 'CardUI',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (props) => <Card {...props} />;

export const Primary = Template.bind({});

Primary.args = {
  step: 1,
  headingText: 'Stake & Borrow',
  bodyText: 'Borrow sUSD by staking your SNX.',
  icon: <StakeIcon disabled={false} />,
  disabled: false,
  buttonText: 'Stake and Borrow More',
  Content: null,
  buttonVariant: 'link',
  buttonAction: () => {},
  testId: 'storybook',
};

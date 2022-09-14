import { MainActionCardsUi } from './MainActionCards';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'MainActionCardsUi',
  component: MainActionCardsUi,
} as ComponentMeta<typeof MainActionCardsUi>;

const Template: ComponentStory<typeof MainActionCardsUi> = (props) => (
  <MainActionCardsUi {...props} />
);

export const Primary = Template.bind({});

Primary.args = {
  targetCratioPercentage: 400,
  liquidationCratioPercentage: 150,
  currentCRatioPercentage: 440,
  epoch: '07:14:55',
  isFlagged: false,
  hasClaimed: false,
};

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainActionCardsList } from './MainActionCardsList';

export default {
  title: 'MainActionCardsList',
  component: MainActionCardsList,
} as ComponentMeta<typeof MainActionCardsList>;

const Template: ComponentStory<typeof MainActionCardsList> = (props) => (
  <MainActionCardsList {...props} />
);

export const Primary = Template.bind({});

Primary.args = {
  targetCratioPercentage: 400,
  liquidationCratioPercentage: 150,
  currentCRatioPercentage: 440,
  nextEpochStartDate: new Date(Date.now() + 100000000),
  isFlagged: false,
  hasClaimed: false,
};

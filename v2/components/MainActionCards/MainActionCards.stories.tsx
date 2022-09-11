import { MainActionCards } from './MainActionCards';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'MainActionCards',
  component: MainActionCards,
} as ComponentMeta<typeof MainActionCards>;

const Template: ComponentStory<typeof MainActionCards> = (props) => <MainActionCards {...props} />;

export const Primary = Template.bind({});

Primary.args = {
  targetCratioPercentage: 400,
  liquidationCratioPercentage: 150,
  currentCRatioPercentage: 440,
  epoch: '07:14:55',
  isFlagged: false,
  isStaking: true,
  hasClaimed: false,
};

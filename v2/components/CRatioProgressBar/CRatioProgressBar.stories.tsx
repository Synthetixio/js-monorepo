import { CRatioProgressBarUi } from './CRatioProgressBar';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'CRatioProgressBar',
  component: CRatioProgressBarUi,
} as ComponentMeta<typeof CRatioProgressBarUi>;

const Template: ComponentStory<typeof CRatioProgressBarUi> = (props) => (
  <CRatioProgressBarUi {...props} />
);

export const NoChangeGreen = Template.bind({});

NoChangeGreen.args = {
  targetCratioPercentage: 400,
  liquidationCratioPercentage: 150,
  currentCRatioPercentage: 400,
  newCratioPercentage: undefined,
};
export const NoChangeOrange = Template.bind({});

NoChangeOrange.args = {
  targetCratioPercentage: 400,
  liquidationCratioPercentage: 150,
  currentCRatioPercentage: 300,
  newCratioPercentage: undefined,
};
export const NoChangeRed = Template.bind({});

NoChangeRed.args = {
  targetCratioPercentage: 400,
  liquidationCratioPercentage: 150,
  currentCRatioPercentage: 149,
  newCratioPercentage: undefined,
};
export const BurnToGreen = Template.bind({});

BurnToGreen.args = {
  targetCratioPercentage: 400,
  liquidationCratioPercentage: 150,
  currentCRatioPercentage: 350,
  newCratioPercentage: 410,
};
export const MintToOrange = Template.bind({});

MintToOrange.args = {
  targetCratioPercentage: 400,
  liquidationCratioPercentage: 150,
  currentCRatioPercentage: 400,
  newCratioPercentage: 300,
};
export const MintToRed = Template.bind({});

MintToRed.args = {
  targetCratioPercentage: 400,
  liquidationCratioPercentage: 150,
  currentCRatioPercentage: 400,
  newCratioPercentage: 149,
};

import { CRatioHealthCardUi } from './CRatioHealthCard';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'CRatioHealthCardUi',
  component: CRatioHealthCardUi,
} as ComponentMeta<typeof CRatioHealthCardUi>;

const Template: ComponentStory<typeof CRatioHealthCardUi> = (props) => (
  <CRatioHealthCardUi {...props} />
);

export const Primary = Template.bind({});

Primary.args = {
  targetCratioPercentage: 400,
  liquidationCratioPercentage: 150,
  currentCRatioPercentage: 440,
};

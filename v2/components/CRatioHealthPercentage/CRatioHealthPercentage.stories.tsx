import { CRatioHealthPercentage } from './CRatioHealthPercentage';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'CRatioHealthPercentage',
  component: CRatioHealthPercentage,
} as ComponentMeta<typeof CRatioHealthPercentage>;

const Template: ComponentStory<typeof CRatioHealthPercentage> = (props) => (
  <CRatioHealthPercentage {...props} />
);

export const Primary = Template.bind({});

Primary.args = {
  isLoading: false,
  variant: 'success',
  currentCRatioPercentage: 0,
};

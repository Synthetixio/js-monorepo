import { CRatioBannerUi } from './CRatioBanner';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'CRatioBannerUi',
  component: CRatioBannerUi,
} as ComponentMeta<typeof CRatioBannerUi>;

const Template: ComponentStory<typeof CRatioBannerUi> = (props) => <CRatioBannerUi {...props} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  variant: 'success',
  isFlagged: false,
  nextEpochStartDate: new Date(Date.now() + 100000000),
};

Primary.parameters = {
  layout: 'fullscreen',
};

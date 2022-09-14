import { BannerUi } from './Banner';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'BannerUi',
  component: BannerUi,
} as ComponentMeta<typeof BannerUi>;

const Template: ComponentStory<typeof BannerUi> = (props) => <BannerUi {...props} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  variant: 'success',
  text: 'You can now collect your weekly rewards',
  countDown: '0D 14H 08M',
};

Primary.parameters = {
  layout: 'fullscreen',
};

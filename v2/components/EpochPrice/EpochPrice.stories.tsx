import { EpochPrice } from './EpochPrice';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { addMinutes } from 'date-fns';

export default {
  title: 'EpochPrice',
  component: EpochPrice,
} as ComponentMeta<typeof EpochPrice>;

const Template: ComponentStory<typeof EpochPrice> = (props) => <EpochPrice {...props} />;

export const Primary = Template.bind({});

Primary.args = {
  epochEnd: addMinutes(new Date(), 5000),
  snxPrice: '$2.9300',
  isLoading: true,
};

Primary.parameters = {
  layout: 'fullscreen',
};

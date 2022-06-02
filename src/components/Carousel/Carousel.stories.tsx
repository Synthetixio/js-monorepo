import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Card } from '../Card/Card';
import { Carousel } from './Carousel';

export default {
  title: 'Carousel',
  component: Carousel,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => (
  <div style={{ margin: '30px', maxWidth: '200px' }}>
    <Carousel {...args} />
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  widthOfItems: 200,
  withFade: false,
  withDots: true,

  carouselItems: [
    <Card key={1} wrapperClassName='text-center ui-max-w-[200px] ui-min-w-[200px]'>
      ONE
    </Card>,
    <Card key={2} wrapperClassName='ui-max-w-[200px] ui-min-w-[200px]'>
      TWO
    </Card>,
    <Card key={3} wrapperClassName='ui-max-w-[200px] ui-min-w-[200px]'>
      THREE
    </Card>,
    <Card key={4} wrapperClassName='ui-max-w-[200px] ui-min-w-[200px]'>
      FOUR
    </Card>,
    <Card key={5} wrapperClassName='ui-max-w-[200px] ui-min-w-[200px]'>
      SIX
    </Card>,
    <Card key={6} wrapperClassName='ui-max-w-[200px] ui-min-w-[200px]'>
      SEVEN
    </Card>
  ]
};

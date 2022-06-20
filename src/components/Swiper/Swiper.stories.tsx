import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Card } from '../Card/Card';
import { Swiper } from './Swiper';

export default {
  title: 'Swiper',
  component: Swiper,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof Swiper>;

const Template: ComponentStory<typeof Swiper> = (args) => <Swiper {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  slides: [
    <Card key={1} variant='purple' wrapperClassName='ui-w-[200px] ui-h-[200px]'>
      1
    </Card>,
    <Card key={2} variant='purple' wrapperClassName='ui-w-[200px] ui-h-[200px]'>
      2
    </Card>,
    <Card key={3} variant='purple' wrapperClassName='ui-w-[200px] ui-h-[200px]'>
      3
    </Card>,
    <Card key={4} variant='purple' wrapperClassName='ui-w-[200px] ui-h-[200px]'>
      4
    </Card>,
    <Card key={5} variant='purple' wrapperClassName='ui-w-[200px] ui-h-[200px]'>
      5
    </Card>,
    <Card key={6} variant='purple' wrapperClassName='ui-w-[200px] ui-h-[200px]'>
      1
    </Card>,
    <Card key={7} variant='purple' wrapperClassName='ui-w-[200px] ui-h-[200px]'>
      2
    </Card>,
    <Card key={8} variant='purple' wrapperClassName='ui-w-[200px] ui-h-[200px]'>
      3
    </Card>,
    <Card key={9} variant='purple' wrapperClassName='ui-w-[200px] ui-h-[200px]'>
      4
    </Card>,
    <Card key={10} variant='purple' wrapperClassName='ui-w-[200px] ui-h-[200px]'>
      5
    </Card>
  ],
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 40
    }
  }
};

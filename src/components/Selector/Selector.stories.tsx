import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Icon } from '../Icon/Icon';
import { Selector } from './Selector';

export default {
  title: 'Selector',
  component: Selector,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof Selector>;

const Template: ComponentStory<typeof Selector> = (args) => <Selector {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  text: (
    <>
      Action
      <Icon className='ui-text-white ui-ml-2' name='Small-Cross' />
    </>
  )
};

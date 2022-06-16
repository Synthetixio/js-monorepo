import { ComponentMeta, ComponentStory } from '@storybook/react';
import CloseIcon from 'components/Icons/CloseIcon';

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
      <CloseIcon className='' />
    </>
  )
};

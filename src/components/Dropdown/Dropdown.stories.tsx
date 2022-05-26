import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from 'components/Button/Button';

import { Dropdown } from './Dropdown';

export default {
  title: 'Dropdown',
  component: Dropdown,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown
    {...args}
    contentAlignment='left'
    triggerElement={<Button>Trigger</Button>}
    triggerElementProps={({ isOpen }) => ({ isActive: isOpen })}
  >
    <div>Content</div>
  </Dropdown>
);

export const Primary = Template.bind({});

Primary.args = {};

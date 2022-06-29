import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import { Tabs } from './Tabs';

export default {
  title: 'Tabs',
  component: Tabs
};

const Template: Story<ComponentProps<typeof Tabs>> = (args) => <Tabs {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  contentClassName: 'ui-overflow-hidden',
  items: [
    {
      id: 1,
      label: 'tab12',
      content: <div style={{ display: 'flex' }}>Tab 1</div>
    },
    {
      id: 2,
      label: 'tab2',
      content: null
    },
    {
      id: 3,
      label: 'disabled',
      content: null,
      disabled: true
    }
  ],
  initial: 2
};

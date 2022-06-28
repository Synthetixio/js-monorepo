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
      id: 'tab1',
      label: 'tab12',
      content: (
        <div style={{ display: 'flex' }}>
          Tab 1 <div>Tab 1</div>
          Tab 1 <div>Tab 1</div>Tab 1 <div>Tab 1</div>Tab 1 <div>Tab 1</div>Tab 1 <div>Tab 1</div>
          Tab 1 <div>Tab 1</div>Tab 1 <div>Tab 1</div>Tab 1 <div>Tab 1</div>Tab 1 <div>Tab 1</div>
          Tab 1 <div>Tab 1</div>Tab 1 <div>Tab 1</div>Tab 1 <div>Tab 1</div>Tab 1 <div>Tab 1</div>
          Tab 1 <div>Tab 1</div>Tab 1 <div>Tab 1</div>Tab 1 <div>Tab 1</div>Tab 1 <div>Tab 1</div>
          Tab 1 <div>Tab 1</div>Tab 1 <div>Tab 1</div>Tab 1 <div>Tab 1</div>Tab 1 <div>Tab 1</div>
          Tab 1 <div>Tab 1</div>Tab 1 <div>Tab 1</div>Tab 1 <div>Tab 1</div>
        </div>
      )
    },
    {
      id: 'tab2',
      label: 'tab2',
      content: <div>Tab 2</div>
    },
    {
      id: 'tab3',
      label: 'disabled',
      content: <div>Tab 3</div>,
      disabled: true
    }
  ],
  initial: 'tab1'
};

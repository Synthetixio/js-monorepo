import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Pagination } from './Pagination';

export default {
  title: 'Pagination',
  component: Pagination,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = () => {
  const [pageIndex, setPageIndex] = useState(0);
  return <Pagination gotoPage={(page) => setPageIndex(page)} length={9} pageIndex={pageIndex} />;
};

export const Primary = Template.bind({});

Primary.args = {};

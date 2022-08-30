import Pagination from '../components/Pagination';
import React from 'react';

export default {
  title: 'Pagination',
  component: Pagination,
};

const Template = (args) => <Pagination {...args} />;

export const Brand = Template.bind({});
Brand.args = {
  dropdownOptions: [8, 16, 24],
  maxLength: 32,
  onChange: () => {
    return;
  },
};

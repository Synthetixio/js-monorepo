import Pagination from '../components/Pagination';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />;

export const Brand = Template.bind({});
Brand.args = {
  dropdownOptions: [8, 16, 24],
  maxLength: 32,
  onChange: () => {
    return;
  },
};

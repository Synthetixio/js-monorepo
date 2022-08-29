import { CustomExample } from './CustomExample';

export default {
  title: 'Custom Example',
  component: CustomExample,
};

const Template = (args) => <CustomExample {...args} />;

export const Brand = Template.bind({});
Brand.args = {
  buttonLabel: 'Click me',
  content: 'Box with a button',
};

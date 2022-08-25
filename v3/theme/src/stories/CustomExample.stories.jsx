import { CustomExample } from './CustomExample';

export default {
  title: 'Custom Example',
  component: CustomExample,
};

const Template = (args) => <CustomExample {...args} />;

export const Brand = Template.bind({});
Brand.args = {
  colorScheme: 'brand',
  buttonLabel: 'Click me',
  content: 'Box with a button',
};

export const Red = Template.bind({});
Red.args = {
  colorScheme: 'red',
  buttonLabel: 'Don’t click me',
  content: 'Another box with a button',
};

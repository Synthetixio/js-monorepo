import { Button } from '@chakra-ui/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'ChakraButtons',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (props) => <Button {...props}>My button</Button>;

export const Solid = Template.bind({});
Solid.args = { variant: 'solid' };
export const Outline = Template.bind({});
Outline.args = { variant: 'outline' };
export const OutlineGrey = Template.bind({});
Outline.args = { variant: 'outline', colorScheme: 'gray' };
export const Ghost = Template.bind({});
Ghost.args = { variant: 'ghost' };

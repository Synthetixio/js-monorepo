import { Badge } from '@chakra-ui/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'ChakraBadges',
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (props) => <Badge {...props}>My button</Badge>;

export const Success = Template.bind({});
Success.args = { variant: 'success' };

export const Warning = Template.bind({});
Warning.args = { variant: 'warning' };

export const Error = Template.bind({});
Error.args = { variant: 'error' };

export const NotStaking = Template.bind({});
NotStaking.args = { variant: 'gray' };

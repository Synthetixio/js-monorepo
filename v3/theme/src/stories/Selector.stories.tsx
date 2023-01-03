import { InfoIcon } from '@chakra-ui/icons';
import Selector from '../components/Selector';
import { ButtonProps } from '@chakra-ui/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Selector',
  component: Selector,
} as ComponentMeta<typeof Selector>;

const Template: ComponentStory<typeof Selector> = (args: any) => <Selector {...args} />;

export const Brand = Template.bind({});
Brand.args = {
  children: 'test',
  active: false,
  disabled: false,
  rightIcon: <InfoIcon />,
  leftIcon: <InfoIcon />,
  size: 'lg',
} as ButtonProps;

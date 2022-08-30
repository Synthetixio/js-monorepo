import { InfoIcon } from '@chakra-ui/icons';
import Selector from '../components/Selector';
import React from 'react';
import { ButtonProps } from '@chakra-ui/react';

export default {
  title: 'Selector',
  component: Selector,
};

const Template = (args) => <Selector {...args} />;

export const Brand = Template.bind({});
Brand.args = {
  children: 'test',
  active: false,
  disabled: false,
  rightIcon: <InfoIcon />,
  leftIcon: <InfoIcon />,
  size: 'lg',
} as ButtonProps;

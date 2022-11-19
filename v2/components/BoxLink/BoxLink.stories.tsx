import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BoxLink } from './BoxLink';
import { BridgeIcon } from '@snx-v2/icons';

export default {
  title: 'BoxLink',
  component: BoxLink,
} as ComponentMeta<typeof BoxLink>;

const Template: ComponentStory<typeof BoxLink> = (props) => <BoxLink {...props} />;

export const Primary = Template.bind({});

Primary.args = {
  headline: 'SNX Bridge',
  subHeadline: 'Transfer asset between blockchains',
  to: '/debt',
  icon: <BridgeIcon />,
};

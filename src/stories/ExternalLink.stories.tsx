import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ExternalLink from '../components/ExternalLink';

export default {
  title: 'External Link',
  component: ExternalLink,
} as ComponentMeta<typeof ExternalLink>;

const Template: ComponentStory<typeof ExternalLink> = (args) => (
  <ExternalLink {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  link: '#',
  text: 'External Link',
};

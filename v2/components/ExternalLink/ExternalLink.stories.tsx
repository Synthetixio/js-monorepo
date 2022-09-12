import React from 'react';
import { ExternalLink } from './ExternalLink';
import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
  title: 'ExternalLink',
  component: ExternalLink,
} as ComponentMeta<typeof ExternalLink>;

const Template: ComponentStory<typeof ExternalLink> = (props) => <ExternalLink {...props} />;

export const CollectRewards = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
CollectRewards.args = {
  children: 'View Etherscan',
};

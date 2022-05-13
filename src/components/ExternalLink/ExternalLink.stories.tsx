import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ExternalLink } from "./ExternalLink";

export default {
  title: "ExternalLink",
  component: ExternalLink,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof ExternalLink>;

const Template: ComponentStory<typeof ExternalLink> = (args) => <ExternalLink {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  link: "https://synthetix.io/",
  text: "Synthetix"
};

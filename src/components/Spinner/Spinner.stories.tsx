import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Spinner } from "./Spinner";

export default {
  title: "Spinner",
  component: Spinner,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  variant: "default"
};

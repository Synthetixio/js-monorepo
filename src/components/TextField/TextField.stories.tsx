import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TextField } from "./TextField";

export default {
  title: "TextField",
  component: TextField,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => <TextField {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  placeholder: "Placeholder",
  label: "Label",
  error: ""
};

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Select } from "./Select";

export default {
  title: "Select",
  component: Select,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  options: [
    { label: "Option A", value: "A" },
    { label: "Option B", value: "B" },
    { label: "Option C", value: "C" },
    { label: "Option D", value: "D" },
    { label: "Option E", value: "E" },
    { label: "Option F", value: "F" }
  ],
  placeholder: "Select"
};

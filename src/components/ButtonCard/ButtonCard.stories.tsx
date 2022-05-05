import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ButtonCard } from "./ButtonCard";

export default {
  title: "ButtonCard",
  component: ButtonCard,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof ButtonCard>;

const Template: ComponentStory<typeof ButtonCard> = (args) => <ButtonCard {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  subline: "subline",
  headline: "headline"
};

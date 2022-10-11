import { Welcome } from './Welcome';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Welcome',
  component: Welcome,
} as ComponentMeta<typeof Welcome>;

const Template: ComponentStory<typeof Welcome> = (props) => <Welcome {...props} />;

export const Primary = Template.bind({});

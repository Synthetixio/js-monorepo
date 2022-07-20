import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Upload } from './Upload';

export default {
  title: 'Upload',
  component: Upload,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof Upload>;

const Template: ComponentStory<typeof Upload> = (args) => <Upload {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  upload: (file) => console.log('file to upload:', file)
};

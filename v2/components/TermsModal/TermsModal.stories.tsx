import React from 'react';
import { TermsModal } from './TermsModal';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import { Button } from '@chakra-ui/react';

export default {
  title: 'TermsModal',
  component: TermsModal,
} as ComponentMeta<typeof TermsModal>;

const Template: ComponentStory<typeof TermsModal> = (props) => {
  return (
    <div>
      <TermsModal {...props} />
    </div>
  );
};

export const Terms = Template.bind({});

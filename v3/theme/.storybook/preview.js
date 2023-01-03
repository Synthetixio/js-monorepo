import { theme, Fonts } from '../src';
import { Box } from '@chakra-ui/react';

export const parameters = {
  chakra: {
    theme,
  },
  backgrounds: {
    default: 'black',
    values: [
      {
        name: 'black',
        value: '#000000',
      },
    ],
  },
};

export const decorators = [
  (Story) => (
    <Box color="white">
      <Fonts />
      {Story()}
    </Box>
  ),
];

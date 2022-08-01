const { theme } = require('../src/theme.js')
const { Fonts } = require('../src/fonts.js')
import { Box } from "@chakra-ui/react"
import React from "react";

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
}

export const decorators = [
  (Story) => (
    <Box color="white">
      <Fonts />
      {Story()}
    </Box>
  ),
];
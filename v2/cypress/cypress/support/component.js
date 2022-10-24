import '@cypress/code-coverage/support';
import { mount } from 'cypress/react18';
import { MemoryRouter } from 'react-router-dom';

import '@synthetixio/v2-ui/i18n';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { stakingTheme } from '@synthetixio/v2-ui/content/theme';

// TODO: uncomment if we will test anything with StyledComponents
// import { ThemeProvider } from 'styled-components';
// import theme from 'styles/theme';
// <ThemeProvider theme={theme}>...</ThemeProvider>

function Container(props) {
  return (
    <ChakraProvider theme={extendTheme(stakingTheme)}>
      <MemoryRouter>
        <div id="app" {...props} />
      </MemoryRouter>
    </ChakraProvider>
  );
}

Cypress.Commands.add('mount', (el) => mount(<Container>{el}</Container>));

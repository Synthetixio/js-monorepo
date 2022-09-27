import { mount } from 'cypress/react18';
import { BrowserRouter } from 'react-router-dom';

import 'i18n';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { stakingTheme } from 'content/theme';

// TODO: uncomment if we will test anything with StyledComponents
// import { ThemeProvider } from 'styled-components';
// import theme from 'styles/theme';
// <ThemeProvider theme={theme}>...</ThemeProvider>

function Container(props) {
  return (
    <ChakraProvider theme={extendTheme(stakingTheme)}>
      <BrowserRouter>
        <div id="app" {...props} />
      </BrowserRouter>
    </ChakraProvider>
  );
}

Cypress.Commands.add('mount', (el) => mount(<Container>{el}</Container>));

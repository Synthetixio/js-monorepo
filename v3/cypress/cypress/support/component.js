import { ChakraProvider } from '@chakra-ui/react';
import '@cypress/code-coverage/support';

import '@synthetixio/v2-ui/i18n';
import { theme } from '@synthetixio/v3-theme';
import { mount } from 'cypress/react18';
import { MemoryRouter } from 'react-router-dom';

function Container(props) {
  return (
    <ChakraProvider theme={theme}>
      <MemoryRouter>
        <div id="app" {...props} />
      </MemoryRouter>
    </ChakraProvider>
  );
}

Cypress.Commands.add('mount', (el) => mount(<Container>{el}</Container>));

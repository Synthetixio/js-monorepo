import { mount } from 'cypress/react18';

function Container(props) {
  return <div id="app" {...props} />;
}

Cypress.Commands.add('mount', (el) => mount(<Container>{el}</Container>));

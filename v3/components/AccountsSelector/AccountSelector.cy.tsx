import { AccountsSelectorUi } from './AccountsSelector';

describe('AccountsSelectorUi', () => {
  it('should display account id shortened', () => {
    cy.viewport(200, 50);
    cy.mount(<AccountsSelectorUi accountId="omg very long account id string" />);
    cy.get(`[data-testid="current account id"]`).should('include.text', 'omg...ing');
  });
  it('should not shorten short but still does ¯\\_(ツ)_/¯', () => {
    cy.viewport(200, 50);
    cy.mount(<AccountsSelectorUi accountId="short" />);
    cy.get(`[data-testid="current account id"]`).should('include.text', 'sho...ort');
  });
});

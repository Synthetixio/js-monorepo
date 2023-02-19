it('walks over wallet sub-pages', () => {
  cy.on('window:before:load', (win) => {
    win.localStorage.STAKING_V2_ENABLED = 'true';
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });

  cy.visit('http://localhost:3000');

  cy.get('[data-testid="main menu button"]').click();
  cy.contains('[data-testid="main menu dropdown"] button', 'Wallet').click();

  cy.contains('h2', 'My Wallet').should('exist');

  cy.contains('a.chakra-button[aria-selected="true"]', 'Balances').should('exist');
  cy.contains('h2', 'Synths').should('exist');

  cy.contains('a.chakra-button', 'Escrow').click().should('have.attr', 'aria-selected', 'true');
  cy.contains('span.title', 'Total SNX escrowed').should('exist');

  cy.contains('a.chakra-button', 'History').click().should('have.attr', 'aria-selected', 'true');
  cy.contains('span.title', 'Total transactions').should('exist');

  cy.contains('a.chakra-button', 'Delegate').click().should('have.attr', 'aria-selected', 'true');
  cy.contains('[role="tab"]', 'Delegate to a new Address').should('exist');

  cy.contains('a.chakra-button', 'Bridge').click().should('have.attr', 'aria-selected', 'true');
  cy.contains('h1', 'Bridge any assets between Layer 1 and Layer 2').should('exist');

  cy.contains('a.chakra-button', 'Merge Accounts')
    .click()
    .should('have.attr', 'aria-selected', 'true');
  cy.contains('div', 'BURN DEBT & NOMINATE ACCOUNT').should('exist');

  cy.contains('a.chakra-button', 'Migrate Escrow')
    .click()
    .should('have.attr', 'aria-selected', 'true');
  cy.contains('[role="tab"]', 'Migrate Escrowed SNX').should('exist');
});

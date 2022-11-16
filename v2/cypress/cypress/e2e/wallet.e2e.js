it('walks over wallet sub-pages', () => {
  cy.on('window:before:load', (win) => {
    win.localStorage.STAKING_V2_ENABLED = 'true';
  });

  cy.visit('http://localhost:3000');

  function goToWallet() {
    cy.get('[id="menu-button-:rh:"]').click();
    cy.contains('[id="menu-list-:rh:-menuitem-:rm:"]', 'Wallet').click();
  }

  goToWallet();
  cy.contains('h2', 'My Wallet').should('exist');

  cy.contains('[role="tab"][aria-selected="true"]', 'Balances').should('exist');

  cy.contains('[role="tab"][aria-selected="false"]', 'Escrow').should('exist');
  cy.contains('[role="tab"][aria-selected="false"]', 'History').should('exist');
  cy.contains('[role="tab"][aria-selected="false"]', 'Delegate').should('exist');
  cy.contains('[role="tab"][aria-selected="false"]', 'Bridge').should('exist');
  cy.contains('[role="tab"][aria-selected="false"]', 'Merge Accounts').should('exist');
  cy.contains('[role="tab"][aria-selected="false"]', 'Migrate Escrow').should('exist');

  cy.contains('[role="tab"]', 'Escrow').click();
  cy.contains('span.title', 'Total SNX escrowed').should('exist');

  goToWallet();
  cy.contains('[role="tab"]', 'History').click();
  cy.contains('span.title', 'Total transactions').should('exist');

  goToWallet();
  cy.contains('[role="tab"]', 'Delegate').click();
  cy.contains('[role="tab"]', 'Delegate to a new Address').should('exist');

  goToWallet();
  cy.contains('[role="tab"]', 'Bridge').click();
  cy.contains('h1', 'Bridge any assets between Layer 1 and Layer 2').should('exist');

  goToWallet();
  cy.contains('[role="tab"]', 'Merge Accounts').click();
  cy.contains('div', 'BURN DEBT & NOMINATE ACCOUNT').should('exist');

  goToWallet();
  cy.contains('[role="tab"]', 'Migrate Escrow').click();
  cy.contains('[role="tab"]', 'Migrate Escrowed SNX').should('exist');
});

it.skip('Can borrow sUSD with ETH collateral', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });
  cy.viewport(1000, 1200);

  cy.task('removeEthCollateralInteractionDelay');
  cy.task('getSnx');
  cy.task('mintSusd', 10);

  cy.visit('http://localhost:3000/loans');
  cy.contains('button[role="tab"]', 'Borrow Synths').should('be.visible');

  cy.get('[data-testid="loans current eth balance"]').should('be.visible');
  cy.get('[data-testid="loans current eth balance"]').should(
    ($0) => parseFloat($0.attr('data-balance')) >= 2
  );

  // input for the debt asset
  cy.get('[data-testid="loans form"] input[type="number"]').eq(0).type(100);
  // input for the collateral asset
  cy.get('[data-testid="loans form"] input[type="number"]').eq(1).type(2);

  cy.get('[data-testid="loans form submit button"]').should('not.be.disabled').click();

  cy.get('[role="dialog"]')
    .should('exist')
    .should('include.text', 'Confirm Transaction')
    .should('include.text', 'BORROWING')
    .should('include.text', '100.00 sUSD')
    .should('include.text', 'POSTING')
    .should('include.text', '2.00 ETH');

  cy.get('[role="dialog"]').should('not.exist');

  // Wait for balance to be fetched and ensure we have at least 100 sUSD available
  cy.get('[data-testid="balance item"][data-currency="sUSD"]').should(
    ($0) => parseFloat($0.attr('data-amount')) >= 100
  );

  cy.contains('button[role="tab"][aria-selected="true"]', 'Active Borrows').should('exist');
  cy.get('[data-testid="loan actions button"]')
    .should('exist')
    .then(($0) => cy.wrap($0.attr('data-id')).as('loanId'));

  cy.get('@loanId').then((id) => {
    cy.get(`[data-testid="loan actions button"][data-id="${id}"]`).last().click();
    cy.get('[data-testid="loan action"][data-action="close"]').should('be.visible').click();
    cy.url().should('include', `/loans/eth/${id}/close`);
  });

  cy.get('[data-testid="loans submit loan modification"]').should('exist');
  cy.get('[data-testid="loans submit loan modification"]').should('not.be.disabled');

  cy.get('[data-testid="loans submit loan modification"]').click();

  cy.get('[role="dialog"]')
    .should('exist')
    .should('include.text', 'Confirm Transaction')
    .should('include.text', 'REPAY')
    .should('include.text', '100.00 sUSD')
    .should('include.text', 'RECEIVE')
    .should('include.text', '2.00 ETH');

  cy.get('[role="dialog"]').should('not.exist');

  cy.contains('button[role="tab"][aria-selected="true"]', 'Active Borrows').should('exist');
  cy.get('@loanId').then((id) => {
    cy.get(`[data-testid="loan actions button"][data-id="${id}"]`).should('not.exist');
  });

  cy.get('[data-testid="loans claim pending withdrawals"]').should('exist').click();
  cy.get('[data-testid="loans claim pending withdrawals"]').should('not.exist');
});

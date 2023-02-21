it('should burn sUSD', () => {
  cy.on('window:before:load', async (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });

  cy.task('getSnx');
  cy.task('mintSusd');
  cy.task('removeMinimumStakeTime');

  cy.visit('http://localhost:3000/staking/burn');

  cy.get('[data-testid="burn header"]').should('be.visible');

  cy.get('[data-testid="burn available susd balance"]').should('be.visible');
  cy.get('[data-testid="burn available susd balance"]').should(
    ($0) => parseFloat($0.attr('data-balance')) >= 1
  );

  cy.get('[data-testid="burn susd amount input"]').type(1);

  cy.get('[data-testid="burn submit"]').should('be.visible').should('not.be.disabled').click();

  cy.get('[data-testid="transaction modal"]')
    .should('be.visible')
    .should('include.text', 'Transaction completed')
    .should('include.text', 'Unstaking')
    .should('include.text', 'SNX')
    .should('include.text', 'Burning')
    .should('include.text', '1 sUSD');

  cy.contains('[data-testid="transaction modal"] button', 'Done')
    .should('be.visible')
    .should('not.be.disabled')
    .click();

  cy.get('[data-testid="transaction modal"]').should('not.exist');
});

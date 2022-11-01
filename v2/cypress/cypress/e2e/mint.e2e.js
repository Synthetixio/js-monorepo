it('should mint sUSD', () => {
  cy.on('window:before:load', (win) => {
    win.localStorage.STAKING_V2_ENABLED = 'true';
  });
  cy.task('getSnx');

  cy.visit('http://localhost:3000/staking/mint');

  cy.get('[data-testid="mint header"]').should('be.visible');

  cy.get('[data-testid="mint available snx balance"]').should('be.visible');
  cy.get('[data-testid="mint available snx balance"]').should(
    ($0) => parseFloat($0.attr('data-balance')) >= 10
  );

  cy.get('[data-testid="mint snx amount input"]').type(10);

  cy.get('[data-testid="mint submit"]').should('be.visible').should('not.be.disabled').click();

  cy.get('[data-testid="transaction modal"]')
    .should('be.visible')
    .should('include.text', 'Transaction completed')
    .should('include.text', 'Staking')
    .should('include.text', '10 SNX')
    .should('include.text', 'Minting')
    .should('include.text', 'sUSD');

  cy.contains('[data-testid="transaction modal"] button', 'Close')
    .should('be.visible')
    .should('not.be.disabled')
    .click();

  cy.get('[data-testid="transaction modal"]').should('not.exist');
});

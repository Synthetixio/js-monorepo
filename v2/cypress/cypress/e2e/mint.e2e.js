describe('mint', () => {
  it('should mint sUSD', () => {
    cy.on('window:before:load', (win) => {
      win.localStorage.STAKING_V2_ENABLED = 'true';
    });
    cy.get('@fork').then((fork) => {
      cy.task('getSnx', fork);
    });

    cy.visit('http://localhost:3000/staking/mint');

    cy.get('[data-testid="mint header"]').should('be.visible');

    cy.get('[data-testid="mint available snx balance"]')
      .should('be.visible')
      .within(($0) => cy.wrap(parseFloat($0.data('balance'))).should('be.gte', 10));

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
    cy.wrap(true).as('ok');
  });
});

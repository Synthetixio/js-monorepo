describe('burn', () => {
  it('should burn sUSD', () => {
    cy.on('window:before:load', async (win) => {
      win.localStorage.STAKING_V2_ENABLED = 'true';
    });
    cy.get('@fork').then((fork) => {
      cy.task('getSnx', fork);
      cy.task('mintSusd', fork);
      cy.task('removeMinimumStakeTime', fork);
    });

    cy.visit('http://localhost:3000/staking/burn');

    cy.get('[data-testid="burn header"]').should('be.visible');

    cy.get('[data-testid="burn available susd balance"]')
      .should('be.visible')
      .within(($0) => cy.wrap(parseFloat($0.data('balance'))).should('be.gte', 1));

    cy.get('[data-testid="burn susd amount input"]').type(1);

    cy.get('[data-testid="burn submit"]').should('be.visible').should('not.be.disabled').click();

    cy.get('[data-testid="transaction modal"]')
      .should('be.visible')
      .should('include.text', 'Transaction completed')
      .should('include.text', 'Unstaking')
      .should('include.text', 'SNX')
      .should('include.text', 'Burning')
      .should('include.text', '1 sUSD');

    cy.contains('[data-testid="transaction modal"] button', 'Close')
      .should('be.visible')
      .should('not.be.disabled')
      .click();

    cy.get('[data-testid="transaction modal"]').should('not.exist');
  });
});

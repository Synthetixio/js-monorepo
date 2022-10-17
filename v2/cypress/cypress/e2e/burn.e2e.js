describe('burn', () => {
  it('should burn sUSD', () => {
    cy.on('window:before:load', async (win) => {
      win.localStorage.STAKING_V2_ENABLED = 'true';
    });

    cy.task('getSnx');
    cy.task('mintSusd');
    cy.task('removeMinimumStakeTime');

    const TIMEOUT_TX = 120000;
    const TIMEOUT_DATA_FETCH = 30000;

    cy.visit('http://localhost:3000/staking/burn');

    cy.get('[data-testid="burn header"]', { timeout: TIMEOUT_DATA_FETCH }).should('be.visible');

    cy.get('[data-testid="burn available susd balance"]', { timeout: TIMEOUT_DATA_FETCH })
      .should('be.visible')
      .within(($0) => cy.wrap(parseFloat($0.data('balance'))).should('be.gte', 1));

    cy.get('[data-testid="burn susd amount input"]').type(1);

    cy.get('[data-testid="burn submit"]').should('be.visible').should('not.be.disabled').click();

    cy.get('[data-testid="transaction modal"]', { timeout: TIMEOUT_TX })
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

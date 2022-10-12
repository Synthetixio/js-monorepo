describe('mint', () => {
  it('should mint sUSD', () => {
    cy.on('window:before:load', (win) => {
      win.localStorage.STAKING_V2_ENABLED = 'true';
    });

    const TIMEOUT_TX = 120000;
    const TIMEOUT_DATA_FETCH = 30000;

    cy.visit('http://localhost:3000/staking/mint');

    cy.get('[data-testid="mint header"]', { timeout: TIMEOUT_DATA_FETCH })
      .should('be.visible')
      .should('include.text', 'Stake SNX By Minting sUSD');

    cy.get('[data-testid="mint available snx balance"]', { timeout: TIMEOUT_DATA_FETCH })
      .should('be.visible')
      .within(($0) => cy.wrap(parseFloat($0.data('balance'))).should('be.gte', 10));

    cy.get('[data-testid="mint snx amount input"]').type(10);

    cy.get('[data-testid="mint submit"]').click();
    cy.get('[data-testid="transaction modal"]')
      .should('be.visible')
      .should('include.text', 'Transaction pending')
      .should('include.text', 'Staking')
      .should('include.text', '10 SNX')
      .should('include.text', 'Minting')
      .should('include.text', 'sUSD');

    cy.get('[data-testid="transaction modal"]', {
      timeout: TIMEOUT_TX,
    }).should('include.text', 'Transaction completed');

    cy.contains('[data-testid="transaction modal"] button', 'Close')
      .should('be.visible')
      .should('not.be.disabled')
      .click();

    cy.get('[data-testid="transaction modal"]').should('not.be.visible');
  });
});

describe('loans', () => {
  it('Can borrow SNX with ETH collateral', () => {
    cy.visit('http://localhost:3000/loans');
    cy.get('[id="Borrow Synths-tab"]').should('be.visible');

    cy.get('[data-testid="loans current balance"]')
      .invoke('attr', 'data-balance')
      .should('be.gte', 2);

    // input for the debt asset
    cy.get('[data-testid="loans form"] input[type="number"]').eq(0).type(100);
    // input for the collateral asset
    cy.get('[data-testid="loans form"] input[type="number"]').eq(1).type(2);

    cy.get('[data-testid="loans form submit button"]').should('not.be.disabled').click();

    cy.get('[role="dialog"]')
      .should('exist')
      .should(($dialog) => {
        expect($dialog).to.contain('Confirm Transaction');
        expect($dialog).to.contain('BORROWING');
        expect($dialog).to.contain('100.00 sUSD');
        expect($dialog).to.contain('POSTING');
        expect($dialog).to.contain('2.00 ETH');
      });

    // TX confirmation can take a while
    cy.get('[role="dialog"]', { timeout: 120000 }).should('not.exist');

    cy.get('[id="Active Borrows-tab"][aria-selected="true"]').should('exist');
    cy.get('[id="Active Borrows-tabpanel"]').should('exist');
    cy.get('[id="Active Borrows-tabpanel"] [data-testid="loan actions button"]').should('exist');
  });
});

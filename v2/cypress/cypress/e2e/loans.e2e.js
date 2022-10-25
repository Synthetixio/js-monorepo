describe('loans', () => {
  it('Can borrow sUSD with ETH collateral', () => {
    cy.viewport(1000, 1000);

    cy.get('@fork').then((fork) => {
      cy.task('removeEthCollateralInteractionDelay', fork);
    });

    cy.visit('http://localhost:3000/loans');
    cy.get('[id="Borrow Synths-tab"]').should('be.visible');

    cy.get('[data-testid="loans current eth balance"]').should(($0) => {
      expect(parseFloat($0.data('balance'))).to.be.gte(2);
    });

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

    cy.get('[id="Active Borrows-tab"][aria-selected="true"]').should('exist');
    cy.get('[id="Active Borrows-tabpanel"]').should('exist');
    cy.get('[data-testid="loan actions button"]')
      .should('exist')
      .then(($0) => cy.wrap($0.data('id')).as('loanId'));

    cy.get('@loanId').then((id) => {
      cy.get(`[data-testid="loan actions button"][data-id="${id}"]`).click();
      cy.get('[data-testid="loan action"][data-action="close"]').should('be.visible').click();
    });

    cy.get('[data-testid="loans submit loan modification"]')
      .should('exist')
      .should('not.be.disabled');

    // Looks like sUSD balance is not getting refetched, so we cannot close the loan right away without page reload
    // but if we reload page the just added loan will disappear as thegraph does not index our fork
    // TODO: re-fetch sUSD balance after taking a loan
    /*

    // Wait for balance to be fetched and ensure we have 100 sUSD available
    cy.get('[data-testid="balance item"][data-currency="sUSD"][data-amount="100.00"]').should('exist');

    cy.get('[data-testid="loans submit loan modification"]')
      .should('exist')
      .should('not.be.disabled')
      .click();

    cy.get('[role="dialog"]')
      .should('exist')
      .should('include.text', 'Confirm Transaction')
      .should('include.text', 'REPAY')
      .should('include.text', '100.00 sUSD')
      .should('include.text', 'RECEIVE')
      .should('include.text', '2.00 ETH');

    cy.get('[role="dialog"]').should('not.exist');

    cy.get('[id="Active Borrows-tab"][aria-selected="true"]').should('exist');
    cy.get('[id="Active Borrows-tabpanel"]').should('exist');
    cy.get('@loanId').then((id) => {
      cy.get(`[data-testid="loan actions button"][data-id="${id}"]`).should('not.exist');
    });

    cy.get('[data-testid="loans claim pending withdrawals"]').should('exist');

    */
  });
});

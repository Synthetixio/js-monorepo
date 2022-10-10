describe('loans', () => {
  it('Can borrow sUSD with ETH collateral', () => {
    // TX confirmation can take a while
    const TIMEOUT_TX = 120000;
    // Data fetching from tenderly can take some extra time
    const TIMEOUT_DATA_FETCH = 30000;

    cy.visit('http://localhost:3000/loans');
    cy.get('[id="Borrow Synths-tab"]').should('be.visible');

    cy.get('[data-testid="loans current eth balance"]', {
      timeout: TIMEOUT_DATA_FETCH,
    }).should(($0) => {
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

    cy.get('[role="dialog"]', { timeout: TIMEOUT_TX }).should('not.exist');

    cy.get('[id="Active Borrows-tab"][aria-selected="true"]').should('exist');
    cy.get('[id="Active Borrows-tabpanel"]').should('exist');
    cy.get('[data-testid="loan actions button"]', { timeout: TIMEOUT_DATA_FETCH })
      .should('exist')
      .then(($0) => cy.wrap($0.data('id')).as('loanId'));

    cy.get('@loanId').then((id) => {
      cy.get(`[data-testid="loan actions button"][data-id="${id}"]`).click();
      cy.get('[data-testid="loan action"][data-action="close"]').should('be.visible').click();
    });
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

    cy.get('[role="dialog"]', { timeout: TIMEOUT_TX }).should('not.exist');

    cy.get('[id="Active Borrows-tab"][aria-selected="true"]').should('exist');
    cy.get('[id="Active Borrows-tabpanel"]').should('exist');
    cy.get('@loanId').then((id) => {
      cy.get(`[data-testid="loan actions button"][data-id="${id}"]`).should('not.exist');
    });

    cy.get('[data-testid="loans claim pending withdrawals"]').should('exist');
  });
});

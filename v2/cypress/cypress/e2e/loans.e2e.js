import { subgraph } from '../lib/subgraph';

it('Can borrow sUSD with ETH collateral', () => {
  cy.viewport(1000, 1200);
  cy.task('removeEthCollateralInteractionDelay');
  cy.visit('http://localhost:3000/loans');
  cy.contains('button[role="tab"]', 'Borrow Synths').should('be.visible');

  cy.get('[data-testid="loans current eth balance"]')
    .should('be.visible')
    .should(($0) => {
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

  cy.contains('button[role="tab"][aria-selected="true"]', 'Active Borrows').should('exist');
  cy.get('[data-testid="loan actions button"]')
    .should('exist')
    .then(($0) => cy.wrap($0.data('id')).as('loanId'));

  cy.get('@loanId').then((id) => {
    cy.intercept('https://api.thegraph.com/**', (req) => {
      if (req.body?.query?.startsWith('{loans(')) {
        return req.reply({ data: { loans: [{ id: `${id}` }] } });
      }
      return subgraph(req);
    }).as('subgraph:loans');
  });

  cy.get('@loanId').then((id) => {
    cy.get(`[data-testid="loan actions button"][data-id="${id}"]`).last().click();
    cy.get('[data-testid="loan action"][data-action="close"]').should('be.visible').click();
    cy.url().should('include', `/loans/eth/${id}/close`);
  });

  cy.reload();

  cy.get('[data-testid="loans submit loan modification"]')
    .should('exist')
    .should('not.be.disabled');

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

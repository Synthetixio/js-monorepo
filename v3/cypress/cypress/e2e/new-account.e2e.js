import { generatePath } from 'react-router-dom';

it('creates new account with first deposit', () => {
  // Ensure we have at least 1 WETH
  cy.task('wrapEth', 1).then((balance) => {
    cy.wrap(balance).as('wethBalance');
  });

  cy.viewport(800, 800);
  cy.visit(
    generatePath('/deposit/:collateralSymbol/:poolId', {
      poolId: 1,
      collateralSymbol: 'WETH',
    })
  );
  cy.get('#app').should('contain', 'Welcome to Synthetix V3');

  cy.get('@wethBalance').then((balance) => {
    // Use more collateral than we have weth to invoke wrapping
    cy.get('[data-testid="deposit amount input"]').type(`${balance + 0.1}`);
  });

  cy.get('[data-testid="deposit collateral"]').should('be.enabled').click();

  cy.get('[data-testid="deposit modal"]')
    .should('include.text', 'Wrap')
    .and('include.text', 'Approve WETH transfer')
    .and('include.text', 'Deposit WETH');

  cy.get('[data-testid="deposit submit button"]').should('include.text', 'Start').click();

  cy.get('[data-testid="deposit submit button"]')
    .should('include.text', 'Processing...')
    .and('be.disabled');

  cy.get('[data-testid="deposit submit button"]')
    .should('include.text', 'Done')
    .and('be.enabled')
    .click();

  cy.get('[data-testid="deposit modal"]').should('not.exist');

  cy.location('search').should('include', 'accountId=');

  cy.location().then((loc) => {
    const search = new URLSearchParams(loc.search);
    cy.wrap(search.get('accountId')).as('accountId');
  });

  cy.get('@accountId').then((accountId) => {
    cy.get('[data-testid="current account id"]').should('have.attr', 'data-accountId', accountId);
  });
});

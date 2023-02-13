import { generatePath } from 'react-router-dom';

it('creates new account with first deposit of SNX', () => {
  cy.connectWallet().then(({ address }) => {
    cy.task('setEthBalance', { address, balance: 100 });
    cy.task('getSnx', { address, amount: 20 });
  });

  cy.viewport(800, 800);
  cy.visit(
    generatePath('/deposit/:collateralSymbol/:poolId', {
      poolId: '1',
      collateralSymbol: 'SNX',
    })
  );

  cy.get('[data-testid="deposit amount input"]').type(`10`);

  cy.get('[data-testid="deposit collateral"]').should('be.enabled').click();

  cy.get('[data-testid="deposit modal"]')
    .should('include.text', 'Approve SNX transfer')
    .and('include.text', 'Deposit SNX');

  cy.get('[data-testid="deposit confirm button"]').should('include.text', 'Start').click();

  cy.get('[data-testid="deposit confirm button"]')
    .should('include.text', 'Processing...')
    .and('be.disabled');

  cy.get('[data-testid="deposit confirm button"]')
    .should('include.text', 'Done')
    .and('be.enabled')
    .click();

  cy.get('[data-testid="deposit modal"]').should('not.exist');

  cy.location('pathname').should('include', 'accounts').should('include', 'positions');

  cy.get('[data-testid="current account id"]').then((element) => {
    const accountId = element.attr('data-accountId');
    cy.wrap(accountId).as('accountId');
  });

  cy.get('@accountId').then((accountId) => {
    cy.url().should('include', `/accounts/${accountId}`);
  });

  cy.get('[data-action="borrow"][data-active="true"]').should('include.text', 'Borrow');
});

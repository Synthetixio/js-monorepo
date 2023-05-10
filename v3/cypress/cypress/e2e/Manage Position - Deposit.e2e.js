import { generatePath } from 'react-router-dom';

it('should deposit additional SNX collateral', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });
  cy.connectWallet().then(({ address, privateKey }) => {
    cy.task('setEthBalance', { address, balance: 100 });
    cy.task('getSnx', { address, amount: 20 });
    cy.task('approveCollateral', { privateKey, symbol: 'SNX' });
    cy.task('createAccount', { privateKey }).then((accountId) => {
      cy.wrap(accountId).as('accountId');
      cy.task('depositCollateral', { privateKey, symbol: 'SNX', accountId, amount: 10 });
      cy.task('delegateCollateral', {
        privateKey,
        symbol: 'SNX',
        accountId,
        amount: 10,
        poolId: 1,
      });
    });
  });

  cy.viewport(800, 800);

  cy.get('@accountId').then((accountId) => {
    cy.visit(
      generatePath('/accounts/:accountId/positions/:collateralSymbol/:poolId', {
        accountId,
        collateralSymbol: 'SNX',
        poolId: 1,
      })
    );
  });

  cy.get('[data-testid="manage action"][data-action="deposit"]')
    .should('exist')
    .click()
    .should('have.attr', 'data-active', 'true');
  cy.location().should((loc) => {
    expect(loc.search).to.eq('?manageAction=deposit');
  });

  cy.get('[data-testid="manage stats collateral"]').should('include.text', '10 SNX');

  cy.get('[data-testid="deposit amount input"]').type('5');

  cy.get('[data-testid="deposit submit"]').should('be.enabled').click();

  cy.get('[data-testid="deposit modal"]')
    .should('exist')
    .and('include.text', 'Complete this action');

  cy.get('[data-testid="deposit modal"]').should('include.text', `Deposit SNX`);

  cy.get('[data-testid="deposit confirm button"]').should('include.text', 'Start').click();

  cy.get('[data-testid="deposit confirm button"]')
    .should('include.text', 'Processing...')
    .and('be.disabled');

  cy.get('[data-testid="deposit confirm button"]')
    .should('include.text', 'Done')
    .and('be.enabled')
    .click();

  cy.get('[data-testid="deposit modal"]').should('not.exist');

  cy.get('[data-testid="manage stats collateral"]').should('include.text', '15 SNX');
});

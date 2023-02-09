import { generatePath } from 'react-router-dom';

it('should repay borrowed snxUSD and get back SNX collateral', () => {
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
      cy.task('borrowUsd', {
        privateKey,
        symbol: 'SNX',
        accountId,
        amount: 10,
        poolId: 1,
      }).then((debt) => cy.wrap(debt).as('debt'));
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

  cy.get('[data-testid="manage action"][data-action="repay"]')
    .should('exist')
    .click()
    .should('have.attr', 'data-active', 'true');
  cy.location().should((loc) => {
    expect(loc.search).to.eq('?manageAction=repay');
  });

  cy.get('[data-testid="current debt"]').should('not.have.text', '-');
  cy.get('[data-testid="available snxUSD balance"]').should('not.have.text', '-');

  cy.get('@debt').then((debt) => {
    cy.get('[data-testid="repay amount input"]').type(`${debt}`);
  });

  cy.get('[data-testid="repay submit"]').should('be.enabled').click();

  cy.get('[data-testid="repay modal"]').should('exist').and('include.text', 'Complete this action');

  cy.get('@debt').then((debt) => {
    cy.get('[data-testid="repay modal"]').should('include.text', `Repay ${debt} snxUSD`);
  });

  cy.get('[data-testid="repay confirm button"]').should('include.text', 'Start').click();

  cy.get('[data-testid="repay confirm button"]')
    .should('include.text', 'Processing...')
    .and('be.disabled');

  cy.get('[data-testid="repay confirm button"]')
    .should('include.text', 'Done')
    .and('be.enabled')
    .click();

  cy.get('[data-testid="repay modal"]').should('not.exist');

  cy.get('[data-testid="manage stats debt"]').should('have.text', `$0`);
});

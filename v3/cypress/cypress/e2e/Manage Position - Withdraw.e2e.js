import { generatePath } from 'react-router-dom';

it('should withdraw borrowed snxUSD and get back SNX collateral', () => {
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

  cy.get('[data-testid="manage action"][data-action="withdraw"]')
    .should('exist')
    .click()
    .should('have.attr', 'data-active', 'true');
  cy.location().should((loc) => {
    expect(loc.search).to.eq('?manageAction=withdraw');
  });

  cy.get('[data-testid="available to withdraw"]').should('not.have.text', '-');

  // withdraw only half of the collateral provided
  cy.get('[data-testid="withdraw amount input"]').type('5');

  cy.get('[data-testid="withdraw submit"]').should('be.enabled').click();

  cy.get('[data-testid="withdraw modal"]')
    .should('exist')
    .and('include.text', 'Complete this action');

  cy.get('[data-testid="withdraw modal"]')
    .should('include.text', `Withdraw`)
    .and('include.text', `5 SNX will be withdrawn`);

  cy.get('[data-testid="withdraw confirm button"]').should('include.text', 'Start').click();

  cy.get('[data-testid="withdraw confirm button"]')
    .should('include.text', 'Processing...')
    .and('be.disabled');

  cy.get('[data-testid="withdraw confirm button"]')
    .should('include.text', 'Done')
    .and('be.enabled')
    .click();

  cy.get('[data-testid="withdraw modal"]').should('not.exist');

  cy.get('[data-testid="manage stats collateral"]').should('include.text', `5 SNX`);
  cy.get('[data-testid="available to withdraw"]').should('have.text', '5');
});

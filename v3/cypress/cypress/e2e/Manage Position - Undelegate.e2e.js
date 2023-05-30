import { generatePath } from 'react-router-dom';

it('should withdraw borrowed snxUSD and get back SNX collateral', () => {
  cy.on('window:before:load', (win) => {
    win.sessionStorage.TERMS_CONDITIONS_ACCEPTED = 'true';
  });
  cy.connectWallet().then(({ address, privateKey }) => {
    cy.task('setEthBalance', { address, balance: 100 });
    cy.task('getSnx', { address, amount: 500 });
    cy.task('approveCollateral', { privateKey, symbol: 'SNX' });
    cy.task('createAccount', { privateKey }).then((accountId) => {
      cy.wrap(accountId).as('accountId');
      cy.task('depositCollateral', { privateKey, symbol: 'SNX', accountId, amount: 200 });
      cy.task('delegateCollateral', {
        privateKey,
        symbol: 'SNX',
        accountId,
        amount: 200,
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

  cy.get('[data-testid="manage action"][data-action="undelegate"]')
    .should('exist')
    .click()
    .should('have.attr', 'data-active', 'true');
  cy.location().should((loc) => {
    expect(loc.search).to.include('manageAction=undelegate');
  });

  cy.get('[data-testid="available to undelegate"]').should('not.have.text', '-');

  // undelegate only half of the collateral provided
  cy.get('[data-testid="undelegate amount input"]').type('5');

  cy.get('[data-testid="undelegate submit"]').should('be.enabled').click();

  cy.get('[data-testid="undelegate modal"]')
    .should('exist')
    .and('include.text', 'Complete this action');

  cy.get('[data-testid="undelegate modal"]')
    .should('include.text', `Undelegate`)
    .and('include.text', `5 SNX will be undelegated`);

  cy.get('[data-testid="undelegate confirm button"]').should('include.text', 'Start').click();

  cy.get('[data-testid="undelegate confirm button"]')
    .should('include.text', 'Processing...')
    .and('be.disabled');

  cy.get('[data-testid="undelegate confirm button"]')
    .should('include.text', 'Done')
    .and('be.enabled')
    .click();

  cy.get('[data-testid="undelegate modal"]').should('not.exist');

  cy.get('[data-testid="manage stats collateral"]').should('include.text', `195 SNX`);
  cy.get('[data-testid="available to undelegate"]').should('have.text', '195');
});

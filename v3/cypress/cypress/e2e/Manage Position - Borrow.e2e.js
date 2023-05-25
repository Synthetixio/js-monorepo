import { generatePath } from 'react-router-dom';

it('should borrow against already deposited SNX collateral', () => {
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

  cy.location().should((loc) => {
    expect(loc.search).to.include('manageAction=borrow');
  });
  cy.get('[data-testid="manage action"][data-action="borrow"]')
    .should('exist')
    .should('have.attr', 'data-active', 'true');

  // Because token price can change, let's not hardcode any number
  // Use max debt but round it to the closest round number
  cy.get('[data-testid="borrow amount input"]').then(($el) => {
    const maxDebt = parseFloat($el.attr('data-max'));
    const debt = Math.floor(maxDebt);
    cy.wrap(maxDebt).as('maxDebt');
    cy.wrap(debt).as('debt');
  });

  cy.get('@debt').then((debt) => {
    cy.get('[data-testid="borrow amount input"]').type(debt);
  });

  cy.get('[data-testid="borrow submit"]').should('be.enabled').click();

  cy.get('[data-testid="borrow modal"]')
    .should('exist')
    .and('include.text', 'Complete this action');

  cy.get('@debt').then((debt) => {
    cy.get('[data-testid="borrow modal"]').should('include.text', `Borrow ${debt} snxUSD`);
  });

  cy.get('[data-testid="borrow confirm button"]').should('include.text', 'Start').click();

  cy.get('[data-testid="borrow confirm button"]')
    .should('include.text', 'Processing...')
    .and('be.disabled');

  cy.get('[data-testid="borrow confirm button"]')
    .should('include.text', 'Done')
    .and('be.enabled')
    .click();

  cy.get('[data-testid="deposit modal"]').should('not.exist');

  cy.get('@debt').then((debt) => {
    cy.get('[data-testid="manage stats debt"]').should('have.text', `$${debt}`);
  });
});

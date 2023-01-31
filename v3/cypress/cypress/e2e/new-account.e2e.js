import { generatePath } from 'react-router-dom';
import { ethers } from 'ethers';

it('creates new account with first deposit', () => {
  //  const wallet = ethers.Wallet.createRandom();
  //  const wallet = new ethers.Wallet(
  //    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
  //  );
  cy.window().then(async (win) => {
    const pk = win.localStorage.getItem('pk');
    cy.task('setEthBalance', { pk, balance: 100 });
    cy.task('wrapEth', { pk, amount: 0.1 });

    //    win.localStorage.setItem('pk', wallet.privateKey);
    //    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    //    await provider.send('anvil_impersonateAccount', [wallet.address]);
  });

  //  return null;
  cy.viewport(800, 800);
  cy.visit(
    generatePath('/deposit/:collateralSymbol/:poolId', {
      poolId: 1,
      collateralSymbol: 'WETH',
    })
  );
  cy.get('#app').should('contain', 'Welcome to Synthetix V3');

  //  return;

  //  cy.window().then(async (win) => win.ethereum.send('anvil_impersonateAccount', [wallet.address]));

  // Use more collateral than we have weth to invoke wrapping
  cy.get('[data-testid="deposit amount input"]').type(`0.1`);

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

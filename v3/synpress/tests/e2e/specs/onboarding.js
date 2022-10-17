import HomePage from '../pages/home/home-page';

const home = new HomePage();

describe('Onboarding tests', () => {
  before(() => {
    cy.disconnectMetamaskWalletFromAllDapps();
    home.visit();
    home.connectBrowserWallet();
    home.acceptMetamaskAccessRequest();
    home.waitUntilLoggedIn();
  });
  context('Deposit and delegate SNX to the preferred pool', () => {
    it('should succeed', () => {
      cy.get('#app').findByText('Balance: 200 SNX').should('exist');
      cy.get('#amount').type('123');
      cy.get('button[type="submit"]').click();
      cy.confirmMetamaskPermissionToSpend();
      cy.confirmMetamaskTransaction();
      cy.get('#app').findByText('123 SNX').should('exist');
    });
  });
});

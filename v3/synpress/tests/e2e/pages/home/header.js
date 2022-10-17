import Page from '../page';
export default class Header extends Page {
  getConnectWalletBtn() {
    return cy.findByTestId('connect-wallet-button');
  }
  getAccountBtn() {
    return cy.findByTestId('account-button');
  }
}

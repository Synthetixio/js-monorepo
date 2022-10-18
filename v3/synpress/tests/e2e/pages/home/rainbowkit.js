import Page from '../page';

export default class Rainbowkit extends Page {
  getMetamaskWalletBtn() {
    return cy.findByText('MetaMask');
  }
}

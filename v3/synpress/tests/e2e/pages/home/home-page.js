import Page from '../page';
import Header from './header';
import Rainbowkit from './rainbowkit';

export default class HomePage extends Page {
  constructor() {
    super();
    this.header = new Header();
    this.rainbowkit = new Rainbowkit();
  }

  visit() {
    cy.visit('/?chain=hardhat');
  }

  connectBrowserWallet() {
    const connectWalletButton = this.header.getConnectWalletBtn();
    connectWalletButton.click();
    const rainbowkitMetamaskWalletButton = this.rainbowkit.getMetamaskWalletBtn();
    rainbowkitMetamaskWalletButton.click();
  }

  waitUntilLoggedIn() {
    cy.waitUntil(() => {
      const accountBtn = this.header.getAccountBtn();
      return accountBtn.should('exist');
    });
  }

  getLoggedInWalletAddress() {
    const accountBtn = this.header.getAccountBtn();
    return accountBtn.invoke('text');
  }
}

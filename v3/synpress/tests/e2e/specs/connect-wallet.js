import HomePage from '../pages/home/home-page';

const home = new HomePage();

let metamaskWalletAddress;

describe('Wallet tests', () => {
  before(() => {
    cy.disconnectMetamaskWalletFromAllDapps();
    home.getMetamaskWalletAddress().then((address) => {
      metamaskWalletAddress = address;
    });
    home.visit();
  });
  context('Connect metamask wallet', () => {
    it('should login with success', () => {
      home.connectBrowserWallet();
      home.acceptMetamaskAccessRequest();
      home.waitUntilLoggedIn();
      home.getLoggedInWalletAddress().then((stakingWalletAddress) => {
        const formattedMetamaskWalletAddress =
          metamaskWalletAddress.slice(0, 4) + '…' + metamaskWalletAddress.slice(-4);
        expect(stakingWalletAddress).to.equal(formattedMetamaskWalletAddress);
      });
    });
  });
});

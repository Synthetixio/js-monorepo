import HomePage from '../pages/home/home-page';

const home = new HomePage();

let metamaskWalletAddress;

describe('Onboarding tests', () => {
    before(() => {
        home.visit();
        home.connectBrowserWallet();
        home.acceptMetamaskAccessRequest();
        home.waitUntilLoggedIn();
    });
    context('Deposit and delegate SNX tokens to the preferred pool', () => {
        it('should login with success', () => {
            cy.get('#app').findByText("Balance: 200 SNX")

            // "Balance: 200 SNX"
            // Put 123 in the input
            // click stake
            // wait
            // see "123 SNX" on the next screen

        });
    });
});

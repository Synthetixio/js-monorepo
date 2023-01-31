import '@cypress/code-coverage/support';
import { ethers } from 'ethers';
import { onLogAdded } from '@snx-cy/onLogAdded';
import { subgraph } from '../lib/subgraph';

beforeEach(() => {
  cy.on('log:added', onLogAdded);

  cy.intercept('https://analytics.synthetix.io/matomo.js', { statusCode: 204 }).as('matomo');

  // Because we are working with local fork, subgraph becomes irrelevant
  cy.intercept('https://api.thegraph.com/**', (req) => {
    return subgraph(req);
  }).as('subgraph');

  cy.intercept('https://mainnet.infura.io/v3/*', (req) => {
    req.url = 'http://127.0.0.1:8545';
    req.continue();
  }).as('mainnet');

  cy.intercept('https://goerli.infura.io/v3/*', (req) => {
    req.url = 'http://127.0.0.1:8545';
    req.continue();
  }).as('goerli');
  //  cy.intercept(' https://optimism-mainnet.infura.io/v3/*', { statusCode: 404 }).as('optimism');

  cy.window().then(async (win) => {
    const wallet = ethers.Wallet.createRandom();
    win.localStorage.setItem('pk', wallet.privateKey);
    win.localStorage.setItem('walletAddress', wallet.address);
  });

  cy.on('window:before:load', (win) => {
    win.localStorage.setItem('UNSAFE_IMPORT', 'true');
    win.localStorage.setItem('selectedWallet', '["MetaMask"]');

    class ConnectedMetamask extends ethers.providers.JsonRpcProvider {
      isMetaMask = true;
      request = async ({ method, params }) => {
        switch (method) {
          case 'eth_accounts':
          case 'eth_requestAccounts':
            return [win.localStorage.getItem('walletAddress')];
          default:
            return await this.send(method, params);
        }
      };
      //      getSigner = () => new ethers.Wallet(win.localStorage.getItem('pk'), this);
    }

    win.ethereum = new ConnectedMetamask('http://127.0.0.1:8545');
  });
});

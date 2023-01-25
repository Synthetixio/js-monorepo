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

  cy.on('window:before:load', (win) => {
    win.__caches = {};
    win.__timers = {};
    win.localStorage.setItem('UNSAFE_IMPORT', 'true');
    win.localStorage.setItem('selectedWallet', '["MetaMask"]');

    class Signer {
      constructor(provider) {
        this._isSigner = true;
        this.getAddress = async () => '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
        this.provider = provider;
        this.wallet = new ethers.Wallet(
          '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
        );
        this.signMessage = async (message) => {
          // don't sign instantly, wait for a bit
          await new Promise((ok) => setTimeout(ok, 500));
          return await this.wallet.signMessage(message);
        };
      }
    }

    win.ethereum = new Proxy(new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545'), {
      get(target, prop, _receiver) {
        switch (prop) {
          case 'isMetaMask':
            return true;

          case 'getSigner':
            return () => new Signer(win.ethereum);

          case 'request':
            return async ({ method, params }) => {
              switch (method) {
                case 'eth_accounts':
                case 'eth_requestAccounts':
                  return ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'];

                default:
                  return await target.send(method, params);
              }
            };

          default:
            return target[prop];
        }
      },
    });
  });
});

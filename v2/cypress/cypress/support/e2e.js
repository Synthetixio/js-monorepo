import '@cypress/code-coverage/support';
import { ethers } from 'ethers';
import { testname } from '../lib/testname';

beforeEach(() => {
  cy.intercept('https://analytics.synthetix.io/matomo.js', { statusCode: 204 }).as('matomo');

  // Because we are working with tenderly fork, subgraph becomes irrelevant
  cy.intercept('https://api.thegraph.com/subgraphs/name/synthetixio-team/mainnet-main', {
    statusCode: 204,
  }).as('subgraph');

  cy.task('fork', testname())
    .as('fork')
    .then((fork) => {
      const TENDERLY_RPC_URL = `https://rpc.tenderly.co/fork/${fork.simulation_fork.id}`;
      const [[WALLET_ADDRESS, WALLET_PK]] = Object.entries(fork.simulation_fork.accounts);
      Cypress.env('TENDERLY_RPC_URL', TENDERLY_RPC_URL);
      Cypress.env('WALLET_ADDRESS', WALLET_ADDRESS);
      Cypress.env('WALLET_PK', WALLET_PK);
    });
  cy.wrap(false).as('ok');

  cy.on('window:before:load', (win) => {
    win.__caches = {};
    win.__timers = {};
    win.localStorage.setItem('UNSAFE_IMPORT', 'true');
    win.localStorage.setItem('selectedWallet', '["MetaMask"]');

    class Signer {
      constructor(provider) {
        this._isSigner = true;
        this.getAddress = async () => Cypress.env('WALLET_ADDRESS');
        this.provider = provider;
        this.wallet = new ethers.Wallet(Cypress.env('WALLET_PK'));
        this.signMessage = async (message) => {
          // don't sign instantly, wait for a bit
          await new Promise((ok) => setTimeout(ok, 500));
          return await this.wallet.signMessage(message);
        };
      }
    }

    async function cachedForever({ key, target, method, params }) {
      if (key in win.__caches) {
        return win.__caches[key];
      }
      win.__caches[key] = await target.send(method, params);
      return win.__caches[key];
    }

    async function cachedDebounced({ key, timeout, target, method, params }) {
      if (key in win.__caches) {
        return win.__caches[key];
      }
      clearTimeout(win.__timers[key]);
      win.__caches[key] = await target.send(method, params);
      // debounce ETH balance checks a bit
      win.__timers[key] = setTimeout(() => {
        delete win.__caches[key];
      }, timeout);
      return win.__caches[key];
    }

    win.ethereum = new Proxy(
      new ethers.providers.JsonRpcProvider(Cypress.env('TENDERLY_RPC_URL')),
      {
        get(target, prop, _receiver) {
          switch (prop) {
            case 'isMetaMask':
              return true;

            case 'getSigner':
              return () => new Signer(win.ethereum);

            case 'request':
              return async ({ method, params }) => {
                switch (method) {
                  case 'eth_chainId': {
                    const key = `${method}`;
                    return await cachedForever({ key, target, method, params });
                  }

                  case 'eth_blockNumber': {
                    const key = `${method}`;
                    return await cachedDebounced({ key, timeout: 3000, target, method, params });
                  }

                  case 'eth_getBalance': {
                    const walletAddress = params[0];
                    const key = `${method}/${walletAddress}`;
                    return await cachedDebounced({ key, timeout: 10000, target, method, params });
                  }

                  case 'eth_accounts':
                  case 'eth_requestAccounts':
                    return [Cypress.env('WALLET_ADDRESS')];

                  default:
                    return await target.send(method, params);
                }
              };

            default:
              return target[prop];
          }
        },
      }
    );
  });
});

afterEach(() => {
  cy.intercept('https://rpc.tenderly.co/fork/**', { statusCode: 204 }).as('rpc');
  cy.get('@ok').then((ok) => {
    if (ok) {
      cy.task('unfork', testname());
    }
  });
});

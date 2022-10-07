import { ethers } from 'ethers';

beforeEach(() => {
  cy.intercept('https://analytics.synthetix.io/matomo.js', { statusCode: 204 }).as('matomo');

  // Because we are working with tenderly fork, subgraph becomes irrelevant
  cy.intercept('https://api.thegraph.com/subgraphs/name/synthetixio-team/mainnet-main', {
    statusCode: 204,
  }).as('subgraph');

  // Because we are working with tenderly fork, infura calls should not even happen!
  cy.intercept('https://mainnet.infura.io/**', { statusCode: 204 }).as('infura-mainnet');
  cy.intercept('https://optimism-mainnet.infura.io/**', { statusCode: 204 }).as('infura-optimism');

  cy.intercept('POST', '/graphql', (req) => {
    req?.body?.forEach((gql) => {
      if (gql?.operationName && gql?.variables) {
        Cypress.log({
          name: 'graphql',
          message: `${gql.operationName}: ${JSON.stringify(gql.variables)}`,
          consoleProps: () => gql,
        });
      }
    });
  }).as('graphql');

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
        this.signMessage = (message) => this.wallet.signMessage(message);
      }
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
                  case 'eth_chainId':
                  case 'eth_blockNumber': {
                    const key = `${method}`;
                    if (key in win.__caches) {
                      return win.__caches[key];
                    }
                    win.__caches[key] = await target.send(method, params);
                    return win.__caches[key];
                  }

                  case 'eth_getBalance': {
                    const walletAddress = params[0];
                    const key = `${method}/${walletAddress}`;
                    if (key in win.__caches) {
                      return win.__caches[key];
                    }
                    clearTimeout(win.__timers[key]);
                    win.__caches[key] = await target.send(method, params);
                    // debounce ETH balance checks a bit
                    win.__timers[key] = setTimeout(() => {
                      delete win.__caches[key];
                    }, 10000);
                    return win.__caches[key];
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

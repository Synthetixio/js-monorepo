import { ethers } from 'ethers';

beforeEach(() => {
  cy.intercept('https://analytics.synthetix.io/matomo.js', { statusCode: 204 }).as('matomo');

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
    win.localStorage.setItem('UNSAFE_IMPORT', 'true');
    win.localStorage.setItem('selectedWallet', '["MetaMask"]');

    class Signer {
      constructor(provider) {
        this._isSigner = true;
        this.getAddress = async () => Cypress.env('WALLET_ADDRESS');
        this.provider = provider;
        this.wallet = ethers.Wallet.fromMnemonic(Cypress.env('WALLET_MNEMONIC'));
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
                  case 'eth_accounts':
                  case 'eth_requestAccounts':
                    return [Cypress.env('WALLET_ADDRESS')];
                  case 'eth_chainId':
                    return '0x1';
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

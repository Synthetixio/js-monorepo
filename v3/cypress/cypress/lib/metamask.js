import { ethers } from 'ethers';

export function metamask({ pk, address }) {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  return new Proxy(provider, {
    get(target, prop) {
      switch (prop) {
        case 'chainId':
          return '0x5';
        case 'isMetaMask':
          return true;
        case 'getSigner':
          return () => {
            const wallet = new ethers.Wallet(pk);
            return wallet.connect(provider);
          };
        case 'request':
          return async ({ method, params }) => {
            switch (method) {
              case 'eth_accounts':
              case 'eth_requestAccounts':
                return [address];
              case 'eth_sendTransaction':
                await provider.send('anvil_impersonateAccount', [address]);
                const result = await provider.send(method, params);
                await provider.send('anvil_stopImpersonatingAccount', [address]);
                return result;
              default: {
                return await provider.send(method, params);
              }
            }
          };
        default:
          return target[prop];
      }
    },
  });
}

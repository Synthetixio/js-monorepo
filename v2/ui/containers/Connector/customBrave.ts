import { WalletInit } from '@web3-onboard/common';
import { EIP1193Provider } from '@web3-onboard/core';
import { ProviderLabel } from '@web3-onboard/injected-wallets';

export function initCustomBrave(): WalletInit {
  return () => {
    return {
      label: ProviderLabel.Brave,
      getIcon: async () => (await import('./walletIcons/braveIcon')).default,
      getInterface: async () => {
        let provider = {} as EIP1193Provider;
        if (
          (window?.ethereum && window.ethereum.isMetaMask && !window.ethereum?.isBraveWallet) ||
          !window?.ethereum
        ) {
          window.open('https://brave.com/wallet/', '_blank');
        } else {
          provider = window?.ethereum;
        }

        return {
          provider,
          instance: {},
        };
      },
    };
  };
}

export default initCustomBrave();

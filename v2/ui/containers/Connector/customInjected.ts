import { EIP1193Provider } from '@web3-onboard/core';
import { ProviderIdentityFlag } from '@web3-onboard/injected-wallets';
import {
  InjectedNameSpace,
  InjectedWalletModule,
  ProviderLabel,
} from '@web3-onboard/injected-wallets/dist/types';

function getInjectedInterface(
  identity: string,
  checkOtherProviderFlags?: boolean
): () => Promise<{ provider: EIP1193Provider }> {
  return async () => ({
    provider: (window?.ethereum?.providers && Array.isArray(window.ethereum.providers)
      ? getInterfaceFromProvidersArray(identity, checkOtherProviderFlags)
      : window.ethereum) as EIP1193Provider,
  });
}

function getInterfaceFromProvidersArray(identity: string, checkOtherProviderFlags?: boolean) {
  return window?.ethereum?.providers.find((provider: any) => {
    return checkOtherProviderFlags
      ? !!provider[identity] && !otherProviderFlagsExist(identity, provider)
      : !!provider[identity];
  });
}

function otherProviderFlagsExist(identity: string, provider: any): boolean {
  const otherProviderFlags = Object.values(ProviderIdentityFlag).filter(
    (id) => id !== identity && id !== ProviderIdentityFlag.Detected
  );
  return otherProviderFlags.some((id) => !!provider[id]);
}

export const customMetaMask: InjectedWalletModule = {
  // The label that will be displayed in the wallet selection modal
  label: ProviderLabel.MetaMask,
  // The property on the window where the injected provider is defined
  // Example: window.ethereum
  injectedNamespace: InjectedNameSpace.Ethereum,
  // A function that returns a bool indicating whether or not the provider is
  // of a certain identity. In this case, a unique property on the provider
  // is used to identify the provider.
  // In most cases this is in the format: `is<provider-name>`.
  // You may also include custom logic here if checking for the property
  // isn't sufficient.
  checkProviderIdentity: ({ provider }) => {
    let result = false;

    if (provider.isMetaMask && !provider.isBraveWallet) {
      result = true;
    }

    return result;
  },

  // A method that returns a string of the wallet icon which will be displayed
  getIcon: async () => (await import('./walletIcons/metaMaskIcon')).default,
  // Returns a valid EIP1193 provider. In some cases the provider will need to be patched to satisfy the EIP1193 Provider interface
  getInterface: getInjectedInterface(ProviderIdentityFlag.MetaMask, false),
  // A list of platforms that this wallet supports
  platforms: ['all'],
};

// This disables brave showing when injected
export const customBrave: InjectedWalletModule = {
  // The label that will be displayed in the wallet selection modal
  label: ProviderLabel.Brave,
  // The property on the window where the injected provider is defined
  // Example: window.ethereum
  injectedNamespace: InjectedNameSpace.Ethereum,

  checkProviderIdentity: ({}) => false,

  // A method that returns a string of the wallet icon which will be displayed
  getIcon: async () => (await import('./walletIcons/braveIcon')).default,
  // Returns a valid EIP1193 provider. In some cases the provider will need to be patched to satisfy the EIP1193 Provider interface
  getInterface: getInjectedInterface(ProviderIdentityFlag.BraveWallet, false),
  // A list of platforms that this wallet supports
  platforms: ['all'],
};

export const customDetected: InjectedWalletModule = {
  label: ProviderLabel.Detected,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) => {
    let result = !!provider && !!provider[ProviderIdentityFlag.Detected];

    // Overwrite to hide on brave
    if (provider.isMetaMask && provider.isBraveWallet) {
      result = false;
    }

    return result;
  },
  getIcon: async () => (await import('./walletIcons/detectedIcon')).default,
  getInterface: async () => ({
    provider: window.ethereum as EIP1193Provider,
  }),
  platforms: ['all'],
};

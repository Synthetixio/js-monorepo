import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider';
import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk';
import { createEIP1193Provider } from '@web3-onboard/common';

interface gnosisOptions {
  whitelistedDomains?: RegExp[];
}

function gnosis(options?: gnosisOptions) {
  const {
    whitelistedDomains = [
      /^https:\/\/gnosis-safe\.io$/,
      /^https:\/\/app\.safe\.global$/,
      /^https:\/\/safe\.global$/,
    ],
  } = options || {};
  return () => ({
    label: 'Gnosis Safe',
    getIcon: async () => (await import('@web3-onboard/gnosis/dist/icon')).default,
    getInterface: async () => {
      const SafeAppProviderConstructor =
        // @ts-ignore
        SafeAppsSDK.default || SafeAppsSDK;
      const opts = {
        whitelistedDomains,
      };
      const appsSdk = new SafeAppProviderConstructor(opts);
      const safe = await Promise.race([
        appsSdk.safe.getInfo(),
        new Promise((resolve) => setTimeout(resolve, 200)),
      ]);
      if (!safe) {
        throw new Error(
          `App must be loaded in a Safe App context, head to <a href="https://gnosis-safe.io/app">the Safe</a> and open this website as an app.`
        );
      }
      const provider = new SafeAppProvider(
        safe,
        // @ts-ignore
        appsSdk
      );
      const patchedProvider = createEIP1193Provider(provider, {
        eth_requestAccounts: () => Promise.resolve([safe.safeAddress]),
      });
      return {
        provider: patchedProvider,
        instance: appsSdk,
      };
    },
  });
}

export default gnosis;

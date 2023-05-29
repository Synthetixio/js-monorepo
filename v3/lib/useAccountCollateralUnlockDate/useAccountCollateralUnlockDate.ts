import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useMulticall3 } from '@snx-v3/useMulticall3';

export function useAccountCollateralUnlockDate({ accountId }: { accountId?: string }) {
  const { data: CoreProxy } = useCoreProxy();
  const { data: Multicall3 } = useMulticall3();
  const network = useNetwork();

  return useQuery({
    queryKey: [network.name, { accountId }, 'AccountCollateralUnlockDate'],
    enabled: Boolean(CoreProxy && Multicall3 && accountId),
    queryFn: async function () {
      if (!CoreProxy || !Multicall3 || !accountId) throw 'OMG';

      const {
        returnData: [getAccountLastInteraction],
      } = await Multicall3.callStatic.aggregate([
        {
          target: CoreProxy.address,
          callData: CoreProxy.interface.encodeFunctionData('getAccountLastInteraction', [
            accountId,
          ]),
        },
        // TODO: add getConfig call when config is available
      ]);

      const [lastInteraction] = CoreProxy.interface.decodeFunctionResult(
        'getAccountLastInteraction',
        getAccountLastInteraction
      );
      // Hardcoded because getting config value from contract is not yet possible
      const accountTimeoutWithdraw = 24 * 60 * 60; // 1 day.

      // TODO: uncomment when config is available
      // const accountTimeoutWithdraw = parseInt(
      //   await CoreProxy.getConfig(ethers.utils.formatBytes32String('accountTimeoutWithdraw')),
      //   16
      // );

      const collateralUnlock = lastInteraction.add(accountTimeoutWithdraw);

      return new Date(collateralUnlock.toNumber() * 1000);
    },

    placeholderData: new Date(),
  });
}

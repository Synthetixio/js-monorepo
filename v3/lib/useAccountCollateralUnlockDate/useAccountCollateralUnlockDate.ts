import { ethers } from 'ethers';
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
        returnData: [getAccountLastInteraction, getConfigUintAccountTimeoutWithdraw],
      } = await Multicall3.callStatic.aggregate([
        {
          target: CoreProxy.address,
          callData: CoreProxy.interface.encodeFunctionData('getAccountLastInteraction', [
            accountId,
          ]),
        },
        {
          target: CoreProxy.address,
          // @ts-ignore TODO: remove when mainnet and goerli have getConfigUint
          callData: CoreProxy.interface.encodeFunctionData('getConfigUint', [
            ethers.utils.formatBytes32String('accountTimeoutWithdraw'),
          ]),
        },
        // TODO: add getConfig call when config is available
      ]);

      const [lastInteraction] = CoreProxy.interface.decodeFunctionResult(
        'getAccountLastInteraction',
        getAccountLastInteraction
      );
      const [accountTimeoutWithdraw] = CoreProxy.interface.decodeFunctionResult(
        // @ts-ignore TODO: remove when mainnet and goerli have getConfigUint
        'getConfigUint',
        getConfigUintAccountTimeoutWithdraw
      );

      const collateralUnlock = lastInteraction.add(accountTimeoutWithdraw);

      return new Date(collateralUnlock.toNumber() * 1000);
    },
  });
}

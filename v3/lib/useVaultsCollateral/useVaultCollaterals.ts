import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';

export const useVaultCollaterals = (poolId?: number) => {
  const { data: collateralTypes } = useCollateralTypes();
  const { data: CoreProxyContract } = useCoreProxy();

  return useQuery({
    queryKey: [{ poolId, collateralTypes }, 'VaultCollaterals'],
    queryFn: async () => {
      if (!CoreProxyContract || !collateralTypes || !poolId) {
        throw Error('Query should not be enabled when missing contract or collateral types');
      }
      // If there's only 1 collateral type, just call getVaultCollateral without multicall
      if (collateralTypes.length === 1) {
        const { value, amount } = await CoreProxyContract.callStatic.getVaultCollateral(
          poolId,
          collateralTypes[0].tokenAddress
        );
        return [
          {
            value: wei(value),
            amount: wei(amount),
            collateralType: collateralTypes[0],
          },
        ];
      }

      const calls = collateralTypes.map((collateralType) => {
        return CoreProxyContract.interface.encodeFunctionData('getVaultCollateral', [
          poolId,
          collateralType.tokenAddress,
        ]);
      });
      // `getVaultCollateral` is not a normal view function, it updates some state too
      // We can make it behave like a view function by using callStatic
      const multicallResult = await CoreProxyContract.callStatic.multicall(calls);
      return multicallResult.map((bytes, i) => {
        const decodedResult = CoreProxyContract.interface.decodeFunctionResult(
          'getVaultCollateral',
          bytes
          // Typechain not smart enough to type `decodeFunctionResult`
        ) as unknown as Awaited<ReturnType<typeof CoreProxyContract.getVaultCollateral>>;
        return {
          value: wei(decodedResult.value),
          amount: wei(decodedResult.amount),
          collateralType: collateralTypes[i],
        };
      });
    },
    enabled: Boolean(collateralTypes?.length && CoreProxyContract && poolId),
    staleTime: 300000,
  });
};

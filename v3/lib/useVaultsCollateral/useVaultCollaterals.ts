import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { ZodBigNumber } from '@snx-v3/zod';

const VaultCollateralSchema = z
  .object({ value: ZodBigNumber, amount: ZodBigNumber })
  .transform(({ value, amount }) => ({ value: wei(value), amount: wei(amount) }));

export const useVaultCollaterals = (poolId?: number) => {
  const { data: collateralTypes } = useCollateralTypes();
  const { data: CoreProxyContract } = useCoreProxy();

  return useQuery({
    queryKey: [{ poolId, collateralTypes }, 'VaultCollaterals'],
    queryFn: async () => {
      if (!CoreProxyContract || !collateralTypes || !poolId) {
        throw Error('Query should not be enabled when missing contract or collateral types');
      }

      const calls = collateralTypes.map((collateralType) =>
        CoreProxyContract.interface.encodeFunctionData('getVaultCollateral', [
          poolId,
          collateralType.tokenAddress,
        ])
      );
      // `getVaultCollateral` is not a normal view function, it updates some state too
      // We can make it behave like a view function by using callStatic
      const multicallResult = await CoreProxyContract.callStatic.multicall(calls);
      return multicallResult.map((bytes, i) => {
        const decoded = CoreProxyContract.interface.decodeFunctionResult(
          'getVaultCollateral',
          bytes
        );
        const { value, amount } = VaultCollateralSchema.parse({ ...decoded });

        return { value, amount, collateralType: collateralTypes[i] };
      });
    },
    enabled: Boolean(collateralTypes?.length && CoreProxyContract && poolId),
  });
};

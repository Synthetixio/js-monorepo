import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { ZodBigNumber } from '@snx-v3/zod';

function notNill<Value>(value: Value | null | undefined): value is Value {
  return value !== null && value !== undefined;
}
const VaultCollateralSchema = z
  .object({ value: ZodBigNumber, amount: ZodBigNumber })
  .transform(({ value, amount }) => ({ value: wei(value), amount: wei(amount) }));

const WETH_ORACLE_BROKEN = true;
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
        const result = await CoreProxyContract.callStatic.getVaultCollateral(
          poolId,
          collateralTypes[0].tokenAddress
        );
        const { value, amount } = VaultCollateralSchema.parse({ ...result });

        return [
          {
            value,
            amount,
            collateralType: collateralTypes[0],
          },
        ];
      }

      const calls = collateralTypes
        .map((collateralType) => {
          if (WETH_ORACLE_BROKEN && collateralType.symbol === 'WETH') return;
          return CoreProxyContract.interface.encodeFunctionData('getVaultCollateral', [
            poolId,
            collateralType.tokenAddress,
          ]);
        })
        .filter(notNill);
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

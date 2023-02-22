import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { ZodBigNumber } from '@snx-v3/zod';
import { useNetwork } from '@snx-v3/useBlockchain';

const VaultCollateralSchema = z
  .object({ value: ZodBigNumber, amount: ZodBigNumber })
  .transform(({ value, amount }) => ({ value: wei(value), amount: wei(amount) }));
const VaultDebtSchema = ZodBigNumber.transform((x) => wei(x));

export const useVaultsData = (poolId?: number) => {
  const network = useNetwork();
  const { data: collateralTypes } = useCollateralTypes();
  const { data: CoreProxyContract } = useCoreProxy();

  return useQuery({
    queryKey: [
      network.name,
      'VaultCollaterals',
      {
        pool: poolId,
        tokens: collateralTypes ? collateralTypes?.map((x) => x.tokenAddress).sort() : [],
      },
    ],
    queryFn: async () => {
      if (!CoreProxyContract || !collateralTypes || !poolId) {
        throw Error('Query should not be enabled when missing contract or collateral types');
      }

      const collateralCalls = collateralTypes.map((collateralType) =>
        CoreProxyContract.interface.encodeFunctionData('getVaultCollateral', [
          poolId,
          collateralType.tokenAddress,
        ])
      );
      const debtCalls = collateralTypes.map((collateralType) =>
        CoreProxyContract.interface.encodeFunctionData('getVaultDebt', [
          poolId,
          collateralType.tokenAddress,
        ])
      );
      const calls = collateralCalls.concat(debtCalls);
      // `getVaultCollateral` is not a normal view function, it updates some state too
      // We can make it behave like a view function by using callStatic
      const multicallResult = await CoreProxyContract.callStatic.multicall(calls);
      const collateralResult = multicallResult.slice(0, collateralCalls.length);
      const debtResult = multicallResult.slice(collateralCalls.length);

      return collateralResult.map((bytes, i) => {
        const debtBytes = debtResult[i];
        const decodedDebt = CoreProxyContract.interface.decodeFunctionResult(
          'getVaultDebt',
          debtBytes
        );

        const decodedCollateral = CoreProxyContract.interface.decodeFunctionResult(
          'getVaultCollateral',
          bytes
        );
        const collateral = VaultCollateralSchema.parse({ ...decodedCollateral });
        const debt = VaultDebtSchema.parse(decodedDebt[0]);
        return {
          debt,
          collateral,
          collateralType: collateralTypes[i],
        };
      });
    },
    enabled: Boolean(collateralTypes?.length && CoreProxyContract && poolId),
  });
};

export type VaultsDataType = ReturnType<typeof useVaultsData>['data'];

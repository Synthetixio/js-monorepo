import { CollateralType } from '@snx-v3/useCollateralTypes';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { ZodBigNumber } from '@snx-v3/zod';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

const PositionCollateralSchema = z.object({
  value: ZodBigNumber.transform((x) => wei(x)),
  amount: ZodBigNumber.transform((x) => wei(x)),
});
const DebtSchema = ZodBigNumber.transform((x) => wei(x));

const selectData = ({
  collateral,
  debt,
}: {
  collateral: z.infer<typeof PositionCollateralSchema>;
  debt: z.infer<typeof DebtSchema>;
}) => {
  const cRatio = debt.eq(0) ? wei(0) : collateral.value.mul(100).div(debt);
  return {
    collateralAmount: collateral.amount,
    collateralValue: collateral.value,
    cRatio,
    debt,
  };
};

export const useLiquidityPosition = ({
  collateral,
  accountId,
  poolId,
}: {
  collateral: CollateralType;
  accountId?: string;
  poolId?: string;
}) => {
  const { data: CoreProxy } = useCoreProxy();
  return useQuery({
    queryKey: [
      'LiquidityPosition',
      { collateralAddress: collateral.tokenAddress, poolId, accountId },
    ],
    queryFn: async () => {
      if (!CoreProxy || !accountId || !poolId) throw Error('Query should not be enabled');
      const calls = [
        CoreProxy.interface.encodeFunctionData('getPositionCollateral', [
          accountId,
          poolId,
          collateral.tokenAddress,
        ]),
        CoreProxy.interface.encodeFunctionData('getPositionDebt', [
          accountId,
          poolId,
          collateral.tokenAddress,
        ]),
      ];

      const [bytesCollateral, bytesDebt] = await CoreProxy.callStatic.multicall(calls);
      const decodedCollateral = CoreProxy.interface.decodeFunctionResult(
        'getPositionCollateral',
        bytesCollateral
      );
      const decodedDebt = CoreProxy.interface.decodeFunctionResult('getPositionDebt', bytesDebt)[0];

      return {
        debt: DebtSchema.parse(decodedDebt),
        collateral: PositionCollateralSchema.parse({ ...decodedCollateral }),
      };
    },
    select: selectData,
    enabled: Boolean(CoreProxy && poolId && accountId),
  });
};
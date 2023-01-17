import { CoreProxyContractType, useCoreProxy } from '@snx-v3/useCoreProxy';
import { ZodBigNumber } from '@snx-v3/zod';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

const PositionCollateralSchema = z.object({
  value: ZodBigNumber.transform((x) => wei(x)),
  amount: ZodBigNumber.transform((x) => wei(x)),
});
const DebtSchema = ZodBigNumber.transform((x) => wei(x));

export const selectPosition = ({
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
export type LiquidityPosition = ReturnType<typeof selectPosition>;

export const loadPosition = async ({
  CoreProxy,
  accountId,
  poolId,
  tokenAddress,
}: {
  CoreProxy: CoreProxyContractType;
  accountId: string;
  poolId: string;
  tokenAddress: string;
}) => {
  const calls = [
    CoreProxy.interface.encodeFunctionData('getPositionCollateral', [
      accountId,
      poolId,
      tokenAddress,
    ]),
    CoreProxy.interface.encodeFunctionData('getPositionDebt', [accountId, poolId, tokenAddress]),
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
};

export const useLiquidityPosition = ({
  tokenAddress,
  accountId,
  poolId,
}: {
  tokenAddress?: string;
  accountId?: string;
  poolId?: string;
}) => {
  const { data: CoreProxy } = useCoreProxy();
  return useQuery({
    queryKey: [
      'LiquidityPosition',
      {
        tokenAddress,
        poolId,
        accountId,
        CoreProxy: CoreProxy?.address,
      },
    ],
    queryFn: async () => {
      if (!CoreProxy || !accountId || !poolId || !tokenAddress)
        throw Error('Query should not be enabled');
      return loadPosition({ CoreProxy, accountId, poolId, tokenAddress });
    },
    select: selectPosition,
    enabled: Boolean(CoreProxy && poolId && accountId && tokenAddress),
  });
};

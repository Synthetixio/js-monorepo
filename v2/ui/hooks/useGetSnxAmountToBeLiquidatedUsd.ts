import { useQuery } from 'react-query';
import Connector from 'containers/Connector';
import Wei, { wei } from '@synthetixio/wei';

function calcAmountWithPenalty(value: Wei, penalty?: Wei): Wei {
  if (penalty !== undefined) {
    return wei(value).mul(wei(1).add(penalty));
  }
  return value;
}

const useGetSnxAmountToBeLiquidatedUsd = (
  debtBalance?: Wei,
  collateralInUsd?: Wei,
  selfLiquidationPenalty?: Wei,
  liquidationPenalty?: Wei,
  enabled?: boolean
) => {
  const { network, synthetixjs } = Connector.useContainer();

  return useQuery<{ amountToSelfLiquidateUsd: Wei; amountToLiquidateUsd: Wei }>(
    ['selfLiquidationData', network?.id],
    async () => {
      const amountToFixCRatioUsdSelfP =
        synthetixjs?.contracts.Liquidator.calculateAmountToFixCollateral(
          debtBalance?.toBN(),
          collateralInUsd?.toBN(),
          selfLiquidationPenalty?.toBN()
        );
      const amountToFixCratioUsdP =
        synthetixjs?.contracts.Liquidator.calculateAmountToFixCollateral(
          debtBalance?.toBN(),
          collateralInUsd?.toBN(),
          liquidationPenalty?.toBN()
        );

      const [amountToFixCRatioUsdSelf, amountToFixCratioUsd] = await Promise.all([
        amountToFixCRatioUsdSelfP,
        amountToFixCratioUsdP,
      ]).then((x) => x.map((x) => wei(x)));

      return {
        amountToSelfLiquidateUsd: calcAmountWithPenalty(
          amountToFixCRatioUsdSelf,
          selfLiquidationPenalty
        ),
        amountToLiquidateUsd: calcAmountWithPenalty(amountToFixCratioUsd, liquidationPenalty),
      };
    },
    {
      enabled: Boolean(
        enabled &&
          network?.id &&
          synthetixjs?.contracts &&
          selfLiquidationPenalty &&
          liquidationPenalty &&
          collateralInUsd &&
          debtBalance?.gt(0)
      ),
    }
  );
};
export default useGetSnxAmountToBeLiquidatedUsd;

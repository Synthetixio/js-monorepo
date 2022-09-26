import { useContext } from 'react';
import { useLiquidator } from '@snx-v2/useSynthetixContracts';
import { useQuery } from '@tanstack/react-query';
import { ContractContext } from '@snx-v2/ContractContext';
import { wei } from '@synthetixio/wei';

export const useLiquidationData = () => {
  const { networkId } = useContext(ContractContext);

  const { data: Liquidator } = useLiquidator();

  return useQuery(
    ['liquidationData', networkId],
    async () => {
      if (!networkId || !Liquidator) {
        throw Error('Query should not be enabled if contracts or network are missing');
      }

      const selfLiquidationPenalty = await Liquidator.selfLiquidationPenalty();
      // TODO add more as we build out liquidation ui
      return {
        selfLiquidationPenalty: wei(selfLiquidationPenalty),
      };
    },
    {
      enabled: Boolean(networkId && Liquidator),
      staleTime: 10000,
    }
  );
};

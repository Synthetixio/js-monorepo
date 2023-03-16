import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { FUTURES_TRADE_QUERY, MARGIN_TRANSFERED_QUERY } from '../queries/actions';
import { LIQUIDATION_QUERY } from '../queries/liquidation';

export type ActionData = {
  id: string;
  label: string;
  txHash: string;
  timestamp: string;
  price: string | null;
  address: string;
  asset: string;
  size: string;
  fees: string | null;
  leverage: string | null;
};

type ActionState = {
  actionData: ActionData[];
  loading: boolean;
};

export const useActions = (account?: string) => {
  const {
    loading: liquidationLoading,
    data: liquidationData,
    error: liquidationError,
  } = useQuery(LIQUIDATION_QUERY, {
    pollInterval: 10000,
    variables: {
      where: {
        account,
      },
    },
  });

  const {
    loading: marginLoading,
    data: marginData,
    error: marginError,
  } = useQuery(MARGIN_TRANSFERED_QUERY, {
    pollInterval: 10000,
    variables: {
      where: {
        account,
      },
    },
  });

  const {
    loading: futuresTradesLoading,
    data: futuresTradesData,
    error: futuresError,
  } = useQuery(FUTURES_TRADE_QUERY, {
    pollInterval: 10000,
    variables: {
      where: {
        account,
      },
    },
  });

  const [state, setState] = useState<ActionState>({ loading: true, actionData: [] });

  useEffect(() => {
    if (liquidationData && futuresTradesData) {
      const data: ActionData[] = [];

      liquidationData.positionLiquidateds.forEach((liquidatedPositions) => {
        data.push({
          label: 'Liquidation',
          address: liquidatedPositions.account,
          asset: liquidatedPositions.market.asset,
          fees: liquidatedPositions.fee,
          id: liquidatedPositions.id,
          price: liquidatedPositions.price,
          size: liquidatedPositions.size,
          timestamp: liquidatedPositions.timestamp,
          txHash: liquidatedPositions.txHash,
          leverage: liquidatedPositions.futuresPosition.leverage,
        });
      });

      marginData?.futuresMarginTransfers.forEach((marginTransfer) => {
        const withdraw = `${marginTransfer.size}`.includes('-');
        data.push({
          label: `${withdraw ? 'Withdraw' : 'Deposit'} Margin`,
          address: marginTransfer.account,
          asset: marginTransfer.market.asset,
          fees: null,
          id: marginTransfer.id,
          price: null,
          size: marginTransfer.size,
          timestamp: marginTransfer.timestamp,
          txHash: marginTransfer.txHash,
          leverage: null,
        });
      });

      futuresTradesData.futuresTrades.forEach((futuresTrade) => {
        data.push({
          label: 'Position Modified',
          address: futuresTrade.account,
          asset: futuresTrade.market.asset,
          fees: futuresTrade.feesPaidToSynthetix,
          id: futuresTrade.id,
          txHash: futuresTrade.txHash,
          price: futuresTrade.price,
          timestamp: futuresTrade.timestamp,
          size: futuresTrade.size,
          leverage: null,
        });
      });

      const sorted = data.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

      setState({ loading: false, actionData: sorted });
    }
  }, [liquidationData, marginData, futuresTradesData]);

  return {
    loading: liquidationLoading || marginLoading || futuresTradesLoading,
    data: state,
    error: liquidationError || marginError || futuresError,
  };
};

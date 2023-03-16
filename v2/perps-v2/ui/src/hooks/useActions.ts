import { useQuery } from '@apollo/client';
import { FUTURES_TRADE_QUERY, MARGIN_TRANSFERED_QUERY } from '../queries/actions';
import { LIQUIDATION_QUERY } from '../queries/liquidation';
import {
  FuturesMarginTransferQuery,
  FuturesTradesQuery,
  PositionLiquidatedQuery,
} from '../__generated__/graphql';

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

const mergeData = (
  liquidationData?: PositionLiquidatedQuery['positionLiquidateds'],
  futuresTradesData?: FuturesTradesQuery['futuresTrades'],
  marginData?: FuturesMarginTransferQuery['futuresMarginTransfers']
) => {
  if (!liquidationData || !futuresTradesData || !marginData) {
    return [];
  }
  const data: ActionData[] = [];

  marginData.forEach((marginTransfer) => {
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

  futuresTradesData.forEach((futuresTrade) => {
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

  liquidationData.forEach((liquidatedPosition) => {
    // When a liquidation happens we get both a liquidation event and a modify event.
    // Lets remove the modify event
    const liquidationModifyEventIndex = data.findIndex(
      (x) => x.timestamp === liquidatedPosition.timestamp
    );
    data.splice(liquidationModifyEventIndex, 1);

    data.push({
      label: 'Liquidation',
      address: liquidatedPosition.account,
      asset: liquidatedPosition.market.asset,
      fees: liquidatedPosition.fee,
      id: liquidatedPosition.id,
      price: liquidatedPosition.price,
      size: liquidatedPosition.size,
      timestamp: liquidatedPosition.timestamp,
      txHash: liquidatedPosition.txHash,
      leverage: liquidatedPosition.futuresPosition.leverage,
    });
  });

  return data.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
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
  const sortedData = mergeData(
    liquidationData?.positionLiquidateds,
    futuresTradesData?.futuresTrades,
    marginData?.futuresMarginTransfers
  );

  return {
    loading: liquidationLoading || marginLoading || futuresTradesLoading,
    data: sortedData,
    error: liquidationError || marginError || futuresError,
  };
};

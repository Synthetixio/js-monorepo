import { useQuery } from '@apollo/client';
import { FUTURES_TRADE_QUERY, MARGIN_TRANSFERRED_QUERY } from '../queries/actions';
import { LIQUIDATION_QUERY } from '../queries/liquidation';
import {
  FuturesMarginTransferQuery,
  FuturesMarginTransfer_OrderBy,
  FuturesTradesQuery,
  FuturesTrade_OrderBy,
  OrderDirection,
  PositionLiquidatedQuery,
  PositionLiquidated_OrderBy,
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
    if (futuresTrade.type === 'Liquidated') {
      // Liquidations are handled separately
      return;
    }
    const getTradeLabel = () => {
      const size = parseFloat(futuresTrade.size);
      const positionSize = parseFloat(futuresTrade.positionSize);
      const isLongTrade = size > 0;
      const isShortTrade = !isLongTrade;
      if (futuresTrade.type === 'PositionOpened') {
        return isLongTrade ? 'Long Opened' : 'Short Opened';
      }
      if (futuresTrade.type === 'PositionClosed') {
        return isLongTrade ? 'Short Closed' : 'Long Closed';
      }

      if (futuresTrade.type === 'PositionModified') {
        const sizeBeforeTrade = positionSize - size;
        const positionBeforeTradeWasShort = sizeBeforeTrade < 0;
        const positionBeforeTradeWasLong = !positionBeforeTradeWasShort;
        const positionIsLong = positionSize > 0;
        const positionIsShort = !positionIsLong;
        if (isLongTrade) {
          if (positionBeforeTradeWasShort) {
            return positionIsLong ? 'Short Flipped To Long' : 'Short Decreased';
          }
          if (positionBeforeTradeWasLong) {
            return 'Long Increased';
          }
        }
        if (isShortTrade) {
          if (positionBeforeTradeWasLong) {
            return positionIsShort ? 'Long Flipped To Short' : 'Long Decreased';
          }
          if (positionBeforeTradeWasShort) {
            return 'Short Increased';
          }
        }
      }
      debugger;
      throw Error('Missed to handle position update');
    };

    data.push({
      label: getTradeLabel(),
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
      first: account ? 1000 : 100,
      orderBy: PositionLiquidated_OrderBy.Timestamp,
      orderDirection: OrderDirection.Desc,
      where: {
        account,
      },
    },
  });

  const {
    loading: marginLoading,
    data: marginData,
    error: marginError,
  } = useQuery(MARGIN_TRANSFERRED_QUERY, {
    pollInterval: 10000,
    variables: {
      first: account ? 1000 : 100,
      orderBy: FuturesMarginTransfer_OrderBy.Timestamp,
      orderDirection: OrderDirection.Desc,
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
      first: account ? 1000 : 100,
      orderBy: FuturesTrade_OrderBy.Timestamp,
      orderDirection: OrderDirection.Desc,
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

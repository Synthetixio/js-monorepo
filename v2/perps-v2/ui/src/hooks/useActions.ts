import { useQuery } from '@apollo/client';
import { FUTURES_TRADE_QUERY, MARGIN_TRANSFERRED_QUERY } from '../queries/actions';
import {
  FuturesMarginTransferQuery,
  FuturesMarginTransfer_OrderBy,
  FuturesTradesQuery,
  FuturesTrade_OrderBy,
  OrderDirection,
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
// Exported for test
export const getTradeLabel = (futuresTrade: FuturesTradesQuery['futuresTrades'][number]) => {
  const size = parseFloat(futuresTrade.size);
  const positionSize = parseFloat(futuresTrade.positionSize);
  const isLongTrade = size > 0;
  const isShortTrade = !isLongTrade;
  if (futuresTrade.type === 'PositionOpened') {
    return isLongTrade ? 'Long Opened' : 'Short Opened';
  }
  if (futuresTrade.type === 'Liquidated') {
    return isLongTrade ? 'Short Liquidated' : 'Long Liquidated';
  }
  if (futuresTrade.type === 'PositionClosed') {
    return isLongTrade ? 'Short Closed' : 'Long Closed';
  }

  if (futuresTrade.type === 'PositionModified') {
    if (size === 0) {
      return 'Unexpected Action';
    }
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
  return 'Unexpected Action';
};

const mergeData = (
  futuresTradesData?: FuturesTradesQuery['futuresTrades'],
  marginData?: FuturesMarginTransferQuery['futuresMarginTransfers']
) => {
  if (!futuresTradesData || !marginData) {
    return [];
  }

  const parsedMarginData: ActionData[] = marginData.map((marginTransfer) => {
    const withdraw = `${marginTransfer.size}`.includes('-');
    return {
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
    };
  });

  const parsedTradeData: ActionData[] = futuresTradesData.map((futuresTrade) => {
    return {
      label: getTradeLabel(futuresTrade),
      address: futuresTrade.account,
      asset: futuresTrade.market.asset,
      fees: futuresTrade.feesPaidToSynthetix,
      id: futuresTrade.id,
      txHash: futuresTrade.txHash,
      price: futuresTrade.price,
      timestamp: futuresTrade.timestamp,
      size: futuresTrade.size,
      leverage: null,
    };
  });

  const data = parsedMarginData.concat(parsedTradeData);
  return data.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
};

export const useActions = (account?: string) => {
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
    futuresTradesData?.futuresTrades,
    marginData?.futuresMarginTransfers
  );

  return {
    loading: marginLoading || futuresTradesLoading,
    data: sortedData,
    error: marginError || futuresError,
  };
};

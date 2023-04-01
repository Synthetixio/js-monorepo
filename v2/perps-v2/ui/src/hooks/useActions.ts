import { useQuery } from '@apollo/client';
import Wei, { wei } from '@synthetixio/wei';
import { useSearchParams } from 'react-router-dom';
import { FUTURES_TRADE_QUERY, MARGIN_TRANSFERRED_QUERY } from '../queries/actions';
import {
  FuturesMarginTransferQuery,
  FuturesMarginTransfer_OrderBy,
  FuturesTradesQuery,
  FuturesTrade_OrderBy,
  OrderDirection,
} from '../__generated__/graphql';

const isLongTrade = (size: number) => size > 0;
const isShortTrade = (size: number) => !isLongTrade(size);
const positionIsLong = (positionSize: number) => positionSize > 0;
const positionIsShort = (positionSize: number) => !positionIsLong(positionSize);

const getTradeLabelForPositionModified = (size: number, positionSize: number) => {
  if (size === 0) {
    return 'Unexpected Action';
  }

  const sizeBeforeTrade = positionSize - size;
  const positionBeforeTradeWasShort = sizeBeforeTrade < 0;
  const positionBeforeTradeWasLong = !positionBeforeTradeWasShort;

  if (isLongTrade(size)) {
    if (positionBeforeTradeWasShort) {
      return positionIsLong(positionSize) ? 'Short Flipped To Long' : 'Short Decreased';
    }
    if (positionBeforeTradeWasLong) {
      return 'Long Increased';
    }
  }

  if (isShortTrade(size)) {
    if (positionBeforeTradeWasLong) {
      return positionIsShort(positionSize) ? 'Long Flipped To Short' : 'Long Decreased';
    }
    if (positionBeforeTradeWasShort) {
      return 'Short Increased';
    }
  }

  return 'Unexpected Action';
};

type TradeTypeHandler = {
  [key in FuturesTradesQuery['futuresTrades'][number]['type']]: () => string;
};

export const getTradeLabel = (futuresTrade: FuturesTradesQuery['futuresTrades'][number]) => {
  const size = parseFloat(futuresTrade.size);
  const positionSize = parseFloat(futuresTrade.positionSize);
  const tradeTypeHandlers: TradeTypeHandler = {
    PositionOpened: () => (isLongTrade(size) ? 'Long Opened' : 'Short Opened'),
    Liquidated: () => (isLongTrade(size) ? 'Short Liquidated' : 'Long Liquidated'),
    PositionClosed: () => (isLongTrade(size) ? 'Short Closed' : 'Long Closed'),
    PositionModified: () => getTradeLabelForPositionModified(size, positionSize),
    Unknown: () => 'Unexpected Action', // Add a handler for the 'Unknown' type
  };
  return tradeTypeHandlers[futuresTrade.type]?.() || tradeTypeHandlers.Unknown();
};

export type ActionData = {
  id: string;
  label: string;
  txHash: string;
  timestamp: Wei;
  price: Wei | null;
  address: string;
  asset: string;
  size: Wei;
  fees: Wei | null;
  leverage: Wei | null;
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
      size: wei(marginTransfer.size, 18, true),
      timestamp: wei(marginTransfer.timestamp),
      txHash: marginTransfer.txHash,
      leverage: null,
    };
  });

  const parsedTradeData: ActionData[] = futuresTradesData.map((futuresTrade) => {
    return {
      label: getTradeLabel(futuresTrade),
      address: futuresTrade.account,
      asset: futuresTrade.market.asset,
      fees: wei(futuresTrade.feesPaidToSynthetix, 18, true),
      id: futuresTrade.id,
      txHash: futuresTrade.txHash,
      price: wei(futuresTrade.price, 18, true),
      timestamp: wei(futuresTrade.timestamp),
      size: wei(futuresTrade.size, 18, true),
      leverage: null, // todo add leverage
    };
  });

  const data = parsedMarginData.concat(parsedTradeData);
  return data.sort((a, b) => b.timestamp.toNumber() - a.timestamp.toNumber());
};

export const useActions = (account?: string) => {
  const [searchParams] = useSearchParams();
  const marketAddress = searchParams.get('marketAddress') || undefined;

  const {
    loading: marginLoading,
    data: marginData,
    error: marginError,
  } = useQuery(MARGIN_TRANSFERRED_QUERY, {
    pollInterval: 10000,
    variables: {
      first: 50,
      orderBy: FuturesMarginTransfer_OrderBy.Timestamp,
      orderDirection: OrderDirection.Desc,
      where: {
        account,
        market: marketAddress,
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
      first: 50,
      orderBy: FuturesTrade_OrderBy.Timestamp,
      orderDirection: OrderDirection.Desc,
      where: {
        account,
        market: marketAddress,
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

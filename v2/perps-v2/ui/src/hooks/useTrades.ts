import { useEffect, useReducer } from 'react';
import { ApolloClient, useApolloClient } from '@apollo/client';
import { getDaysInMonth, subDays, getUnixTime, format, subMonths } from 'date-fns';
import { TRADES_QUERY } from '../queries/dashboard';

interface Trade {
  id: string;
  timestamp: string;
}

export interface TradesRange {
  label: string;
  timestamp: number;
  trades: Set<Trade>;
  count: number;
}

function calculateDays() {
  const days: TradesRange[] = [];

  const daysInMonth = getDaysInMonth(new Date());

  for (let i = 0; i <= daysInMonth; i++) {
    const day = subDays(new Date(), daysInMonth - i);
    const timestamp = getUnixTime(day);
    const label = format(day, 'dd/MM');

    days.push({ timestamp, label, trades: new Set(), count: 0 });
  }

  return days;
}

function calculateMonths() {
  const months: TradesRange[] = [];

  for (let i = 0; i <= 12; i++) {
    const day = subMonths(new Date(), 12 - i);
    const timestamp = getUnixTime(day);
    const label = format(day, 'dd/MM');
    months.push({ timestamp, label, trades: new Set(), count: 0 });
  }
  return months;
}

async function fetchRange(
  resolve: any,
  reject: any,
  lowerTimestamp: number,
  upperTimestamp: number,
  client: ApolloClient<object>,
  range: TradesRange,
  skip = 0
): Promise<{ hydratedRange: TradesRange }> {
  try {
    const { data } = await client.query({
      query: TRADES_QUERY,
      variables: {
        where: {
          timestamp_gte: `${lowerTimestamp}`,
          timestamp_lte: `${upperTimestamp}`,
        },
        skip,
        first: 1000,
      },
    });

    if (data.futuresTrades.length === 1000) {
      // Add the last data to the range
      data.futuresTrades.forEach(({ id, timestamp }) => {
        range.trades.add({ id, timestamp });
      });

      // Fetch more
      return fetchRange(
        resolve,
        reject,
        lowerTimestamp,
        upperTimestamp,
        client,
        range,
        skip + 1000
      );
    }

    // Otherwise just add the result and resolve
    data.futuresTrades.forEach(({ id, timestamp }) => {
      range.trades.add({ id, timestamp });
    });

    return resolve({ hydratedRange: range });
  } catch (error) {
    return reject(error);
  }
}

async function queryTrades(client: ApolloClient<object>, TradesRange: TradesRange[]) {
  const timeRange: TradesRange[] = [];

  for (const range of TradesRange) {
    const index = TradesRange.indexOf(range);
    const nextRange = TradesRange[index + 1];

    if (index && nextRange) {
      // Get all traders that have traded in this range
      const { hydratedRange } = await new Promise<{ hydratedRange: TradesRange }>(
        async (resolve, reject) =>
          fetchRange(resolve, reject, range.timestamp, nextRange?.timestamp, client, range)
      );
      timeRange.push({ ...hydratedRange, count: hydratedRange.trades.size });
    }
  }

  return timeRange;
}

export function useTrades(period = 'M') {
  const client = useApolloClient();

  const [state, dispatch] = useReducer(reducer, { loading: true, data: null, error: null });

  useEffect(() => {
    if (client) {
      (async () => {
        try {
          dispatch({ type: 'loading' });
          const TradesRange = period === 'M' ? calculateDays() : calculateMonths();
          const result = await queryTrades(client, TradesRange);
          dispatch({ type: 'data', payload: result });
        } catch (error: unknown) {
          dispatch({ type: 'error', payload: error });
        }
      })();
    }
  }, [period, client]);

  return state;
}

type State = {
  loading: boolean;
  data: TradesRange[] | null;
  error: unknown | null;
};

type Actions =
  | { type: 'loading' }
  | { type: 'error'; payload: unknown }
  | { type: 'data'; payload: TradesRange[] };

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true };
    case 'error':
      return { ...state, error: action.payload, loading: false };
    case 'data':
      return { ...state, data: action.payload, loading: false };
    default:
      return state;
  }
}

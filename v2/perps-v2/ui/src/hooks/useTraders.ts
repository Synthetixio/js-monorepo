import { useEffect, useReducer } from 'react';
import { ApolloClient, useApolloClient } from '@apollo/client';
import { getDaysInMonth, subDays, getUnixTime, format, subMonths } from 'date-fns';
import { TRADERS_QUERY } from '../queries/dashboard';

interface Trader {
  id: string;
  timestamp: string;
}

export interface TraderRange {
  label: string;
  timestamp: number;
  traders: Trader[];
  newTraders?: number;
  returningTraders?: number;
}

function calculateDays() {
  const days: TraderRange[] = [];

  const daysInMonth = getDaysInMonth(new Date());

  for (let i = 0; i <= daysInMonth; i++) {
    const day = subDays(new Date(), daysInMonth - i);
    const timestamp = getUnixTime(day);
    const label = format(day, 'dd/MM');

    days.push({ timestamp, label, traders: [] });
  }

  return days;
}

function calculateMonths() {
  const months: TraderRange[] = [];

  for (let i = 0; i <= 12; i++) {
    const day = subMonths(new Date(), 12 - i);
    const timestamp = getUnixTime(day);
    const label = format(day, 'dd/MM');
    months.push({ timestamp, label, traders: [] });
  }
  return months;
}

async function fetchRange(
  resolve: any,
  reject: any,
  lowerTimestamp: number,
  upperTimestamp: number,
  client: ApolloClient<object>,
  range: TraderRange,
  skip = 0
): Promise<{ hydratedRange: TraderRange }> {
  try {
    const { data } = await client.query({
      query: TRADERS_QUERY,
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
      data.futuresTrades.forEach(({ trader: { timestamp, id } }) => {
        // We first need to check if the trader has already been added
        const recordExists = range.traders.find((traderRecord) => id === traderRecord.id);

        if (!recordExists) {
          range.traders.push({ id, timestamp });
        }
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
    data.futuresTrades.forEach(({ trader: { timestamp, id } }) => {
      const recordExists = range.traders.find((traderRecord) => id === traderRecord.id);

      if (!recordExists) {
        range.traders.push({ id, timestamp });
      }
    });

    return resolve({ hydratedRange: range });
  } catch (error) {
    return reject(error);
  }
}

async function queryTraders(client: ApolloClient<object>, queryRange: TraderRange[]) {
  const timeRange: TraderRange[] = [];

  for (const range of queryRange) {
    const index = queryRange.indexOf(range);
    const nextRange = queryRange[index + 1];

    if (index && nextRange) {
      // Get all traders that have traded in this range
      const { hydratedRange } = await new Promise<{ hydratedRange: TraderRange }>(
        async (resolve, reject) =>
          fetchRange(resolve, reject, range.timestamp, nextRange?.timestamp, client, range)
      );
      timeRange.push(hydratedRange);
    }
  }

  return timeRange.map(({ label, timestamp, traders }, index) => {
    let newTraders = 0;
    let returningTraders = 0;

    traders.forEach((trader) => {
      // If the traders timestamp is within the current range, they are new.
      // Otherwise they are returning.
      const nextTimestamp = timeRange[index + 1]?.timestamp;
      const firstTrade = parseInt(trader.timestamp);

      if (
        typeof nextTimestamp === 'undefined' &&
        timestamp < firstTrade &&
        firstTrade < Math.floor(Date.now() / 1000)
      ) {
        newTraders++;
      } else if (timestamp < firstTrade && firstTrade < nextTimestamp) {
        newTraders++;
      } else {
        returningTraders++;
      }
    });

    return {
      label,
      timestamp,
      traders,
      newTraders,
      returningTraders,
    };
  });
}

export function useTraders(period = 'M') {
  const client = useApolloClient();

  const [state, dispatch] = useReducer(reducer, { loading: true, data: null, error: null });

  useEffect(() => {
    if (client) {
      (async () => {
        try {
          dispatch({ type: 'loading' });
          const queryRange = period === 'M' ? calculateDays() : calculateMonths();
          const result = await queryTraders(client, queryRange);
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
  data: TraderRange[] | null;
  error: unknown | null;
};

type Actions =
  | { type: 'loading' }
  | { type: 'error'; payload: unknown }
  | { type: 'data'; payload: TraderRange[] };

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

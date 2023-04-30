import { useQuery } from '@apollo/client';
import { wei } from '@synthetixio/wei';
import { format, getDaysInMonth, parse, subDays, subMonths } from 'date-fns';
import { DAILY_STATS_QUERY } from '../queries/dashboard';
import { DailyStat_OrderBy, OrderDirection, StatsQueryQuery } from '../__generated__/graphql';

function calculateMonthlyRange() {
  const daysInMonth = getDaysInMonth(new Date());
  const lower = format(subDays(new Date(), daysInMonth), 'yyyy-MM-dd');
  const upper = format(new Date(), 'yyyy-MM-dd');

  return { upper, lower };
}

function calculateYearlyRange() {
  const upper = format(new Date(), 'yyyy-MM-dd');
  const lower = format(subMonths(new Date(), 12), 'yyyy-MM-dd');

  return { upper, lower };
}

export const useStats = (queryInterval: 'M' | 'Y') => {
  const { upper, lower } = queryInterval === 'M' ? calculateMonthlyRange() : calculateYearlyRange();

  const { loading, data } = useQuery(DAILY_STATS_QUERY, {
    variables: {
      where: {
        day_gte: lower,
        day_lte: upper,
      },
      orderDirection: OrderDirection.Asc,
      orderBy: DailyStat_OrderBy.Day,
    },
  });

  const formattedData = formatData(data, queryInterval);

  return { loading, data: formattedData };
};

interface FormattedStatsData {
  cumulativeFees: number;
  cumulativeVolume: number;
  existingTraders: number;
  fees: number;
  newTraders: number;
  volume: number;
  cumulativeTraders: number;
  cumulativeTrades: number;
  trades: number;
  label?: string;
  labelType: 'M' | 'Y';
}

function formatData(data: StatsQueryQuery | undefined, queryInterval: 'M' | 'Y') {
  if (typeof data === 'undefined') return data;

  let formattedData: FormattedStatsData[] = [];

  if (queryInterval === 'M') {
    formattedData = data.dailyStats.map((stat) => {
      const label = format(new Date(parse(stat.day, 'yyyy-MM-dd', new Date())), 'dd/MM');

      return {
        cumulativeFees: wei(stat.cumulativeFees, 18, true).toNumber(),
        cumulativeVolume: wei(stat.cumulativeVolume, 18, true).toNumber(),
        day: stat.day,
        existingTraders: parseInt(stat.existingTraders),
        fees: wei(stat.fees, 18, true).toNumber(),
        newTraders: parseInt(stat.newTraders),
        volume: wei(stat.volume, 18, true).toNumber(),
        cumulativeTraders: parseInt(stat.cumulativeTraders),
        cumulativeTrades: parseInt(stat.cumulativeTrades),
        trades: parseInt(stat.trades),
        label,
        labelType: 'M',
      };
    });
  } else {
    data.dailyStats
      .map((stat) => {
        const label = format(new Date(parse(stat.day, 'yyyy-MM-dd', new Date())), 'MMM');

        return {
          cumulativeFees: wei(stat.cumulativeFees, 18, true).toNumber(),
          cumulativeVolume: wei(stat.cumulativeVolume, 18, true).toNumber(),
          day: stat.day,
          existingTraders: parseInt(stat.existingTraders),
          fees: wei(stat.fees, 18, true).toNumber(),
          newTraders: parseInt(stat.newTraders),
          volume: wei(stat.volume, 18, true).toNumber(),
          cumulativeTraders: parseInt(stat.cumulativeTraders),
          cumulativeTrades: parseInt(stat.cumulativeTrades),
          trades: parseInt(stat.trades),
          label,
          labelType: 'Y',
        };
      })
      .forEach((stat) => {
        const existing = formattedData.find((s) => s.label === stat.label);

        if (!existing) {
          return formattedData.push({ ...stat, labelType: 'Y' });
        }

        // If it is existing, we add the values and replace the existing one
        // In the case of cumulative, we replace with the lastest value
        return formattedData.splice(formattedData.indexOf(existing), 1, {
          ...existing,
          cumulativeFees: stat.cumulativeFees,
          cumulativeVolume: stat.cumulativeVolume,
          existingTraders: existing.existingTraders + stat.existingTraders,
          fees: existing.fees + stat.fees,
          newTraders: existing.newTraders + stat.newTraders,
          volume: existing.volume + stat.volume,
          cumulativeTraders: stat.cumulativeTraders,
          cumulativeTrades: stat.cumulativeTrades,
          trades: existing.trades + stat.trades,
        });
      });
  }

  return formattedData;
}

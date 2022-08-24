import Wei, { wei } from '@synthetixio/wei';
import subHours from 'date-fns/subHours';
import { MaxUint256 } from '@ethersproject/constants';
import { RateUpdateResult } from '../../subgraph/exchangesSubgraphQueries';

import { BaseRateUpdate } from '../../types';

export const getMinAndMaxRate = (rates: RateUpdateResult[]): [Wei, Wei] => {
  if (rates.length === 0) return [wei(0), wei(0)];

  return rates.reduce(
    ([minRate, maxRate], val) => {
      const { rate } = val;
      const newMax = rate.gt(maxRate) ? rate : maxRate;
      const newMin = rate.lt(minRate) ? rate : minRate;

      return [newMin, newMax];
    },
    [wei(MaxUint256), wei(0)]
  );
};

export const calculateRateChange = (rates: RateUpdateResult[]): Wei => {
  if (rates.length < 2) return wei(0);

  const newPrice = rates[0].rate;
  const oldPrice = rates[rates.length - 1].rate;
  const percentageChange = newPrice.sub(oldPrice).div(oldPrice);

  return percentageChange;
};

export const calculateTimestampForPeriod = (periodInHours: number): number =>
  Math.trunc(subHours(new Date().getTime(), periodInHours).getTime() / 1000);

export const usdHistoricalRates = (
  periodInHours: number,
  rate = 1,
  points = 100
): BaseRateUpdate[] => {
  let now = Date.now();

  const rates = [];

  for (let i = 0; i < points; i++) {
    rates.unshift({
      timestamp: now,
      rate,
    });
    now -= 1000 * 60 * periodInHours;
  }

  return rates;
};

// !!! DO NOT EDIT !!! Automatically generated file

import { useQuery, UseQueryOptions } from 'react-query';
import Wei, { WeiSource, wei } from '@synthetixio/wei';
import axios from 'axios';
import { generateGql } from '@synthetixio/generate-subgraph-query';
export type SingleQueryOptions = {
  id: string;
  block?:
    | {
        number: number;
      }
    | {
        hash: string;
      };
};
export type MultiQueryOptions<T, R> = {
  first?: number;
  where?: T;
  block?:
    | {
        number: number;
      }
    | {
        hash: string;
      };
  orderBy?: keyof R;
  orderDirection?: 'asc' | 'desc';
};
const MAX_PAGE = 1000;
export type DailyCandleFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  synth?: string | null;
  synth_not?: string | null;
  synth_gt?: string | null;
  synth_lt?: string | null;
  synth_gte?: string | null;
  synth_lte?: string | null;
  synth_in?: string[];
  synth_not_in?: string[];
  synth_contains?: string | null;
  synth_not_contains?: string | null;
  synth_starts_with?: string | null;
  synth_not_starts_with?: string | null;
  synth_ends_with?: string | null;
  synth_not_ends_with?: string | null;
  open?: WeiSource | null;
  open_not?: WeiSource | null;
  open_gt?: WeiSource | null;
  open_lt?: WeiSource | null;
  open_gte?: WeiSource | null;
  open_lte?: WeiSource | null;
  open_in?: WeiSource[];
  open_not_in?: WeiSource[];
  high?: WeiSource | null;
  high_not?: WeiSource | null;
  high_gt?: WeiSource | null;
  high_lt?: WeiSource | null;
  high_gte?: WeiSource | null;
  high_lte?: WeiSource | null;
  high_in?: WeiSource[];
  high_not_in?: WeiSource[];
  low?: WeiSource | null;
  low_not?: WeiSource | null;
  low_gt?: WeiSource | null;
  low_lt?: WeiSource | null;
  low_gte?: WeiSource | null;
  low_lte?: WeiSource | null;
  low_in?: WeiSource[];
  low_not_in?: WeiSource[];
  close?: WeiSource | null;
  close_not?: WeiSource | null;
  close_gt?: WeiSource | null;
  close_lt?: WeiSource | null;
  close_gte?: WeiSource | null;
  close_lte?: WeiSource | null;
  close_in?: WeiSource[];
  close_not_in?: WeiSource[];
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
};
export type DailyCandleResult = {
  id: string;
  synth: string;
  open: Wei;
  high: Wei;
  low: Wei;
  close: Wei;
  timestamp: Wei;
};
export type DailyCandleFields = {
  id: true;
  synth: true;
  open: true;
  high: true;
  low: true;
  close: true;
  timestamp: true;
};
export type DailyCandleArgs<K extends keyof DailyCandleResult> = {
  [Property in keyof Pick<DailyCandleFields, K>]: DailyCandleFields[Property];
};
export const useGetDailyCandleById = <K extends keyof DailyCandleResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: DailyCandleArgs<K>,
  queryOptions: UseQueryOptions<Pick<DailyCandleResult, K>> = {}
) => {
  const func = async function <K extends keyof DailyCandleResult>(
    url: string,
    options: SingleQueryOptions,
    args: DailyCandleArgs<K>
  ): Promise<Pick<DailyCandleResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('dailyCandle', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['synth']) formattedObj['synth'] = obj['synth'];
    if (obj['open']) formattedObj['open'] = wei(obj['open']);
    if (obj['high']) formattedObj['high'] = wei(obj['high']);
    if (obj['low']) formattedObj['low'] = wei(obj['low']);
    if (obj['close']) formattedObj['close'] = wei(obj['close']);
    if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
    return formattedObj as Pick<DailyCandleResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('DailyCandle', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetDailyCandles = <K extends keyof DailyCandleResult>(
  url: string,
  options?: MultiQueryOptions<DailyCandleFilter, DailyCandleResult>,
  args?: DailyCandleArgs<K>,
  queryOptions: UseQueryOptions<Pick<DailyCandleResult, K>[]> = {}
) => {
  const func = async function <K extends keyof DailyCandleResult>(
    url: string,
    options: MultiQueryOptions<DailyCandleFilter, DailyCandleResult>,
    args: DailyCandleArgs<K>
  ): Promise<Pick<DailyCandleResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<DailyCandleFilter, DailyCandleResult>> = {
      ...options,
    };
    let paginationKey: keyof DailyCandleFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof DailyCandleFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<DailyCandleResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('dailyCandles', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['synth']) formattedObj['synth'] = obj['synth'];
        if (obj['open']) formattedObj['open'] = wei(obj['open']);
        if (obj['high']) formattedObj['high'] = wei(obj['high']);
        if (obj['low']) formattedObj['low'] = wei(obj['low']);
        if (obj['close']) formattedObj['close'] = wei(obj['close']);
        if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
        return formattedObj as Pick<DailyCandleResult, K>;
      });
      results = results.concat(newResults);
      if (newResults.length < 1000) {
        break;
      }
      if (paginationKey) {
        paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
      }
    } while (paginationKey && options.first && results.length < options.first);
    return options.first ? results.slice(0, options.first) : results;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('DailyCandles', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type DailyExchangerFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
};
export type DailyExchangerResult = {
  id: string;
};
export type DailyExchangerFields = {
  id: true;
};
export type DailyExchangerArgs<K extends keyof DailyExchangerResult> = {
  [Property in keyof Pick<DailyExchangerFields, K>]: DailyExchangerFields[Property];
};
export const useGetDailyExchangerById = <K extends keyof DailyExchangerResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: DailyExchangerArgs<K>,
  queryOptions: UseQueryOptions<Pick<DailyExchangerResult, K>> = {}
) => {
  const func = async function <K extends keyof DailyExchangerResult>(
    url: string,
    options: SingleQueryOptions,
    args: DailyExchangerArgs<K>
  ): Promise<Pick<DailyExchangerResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('dailyExchanger', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    return formattedObj as Pick<DailyExchangerResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('DailyExchanger', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetDailyExchangers = <K extends keyof DailyExchangerResult>(
  url: string,
  options?: MultiQueryOptions<DailyExchangerFilter, DailyExchangerResult>,
  args?: DailyExchangerArgs<K>,
  queryOptions: UseQueryOptions<Pick<DailyExchangerResult, K>[]> = {}
) => {
  const func = async function <K extends keyof DailyExchangerResult>(
    url: string,
    options: MultiQueryOptions<DailyExchangerFilter, DailyExchangerResult>,
    args: DailyExchangerArgs<K>
  ): Promise<Pick<DailyExchangerResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<DailyExchangerFilter, DailyExchangerResult>> =
      { ...options };
    let paginationKey: keyof DailyExchangerFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof DailyExchangerFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<DailyExchangerResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('dailyExchangers', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        return formattedObj as Pick<DailyExchangerResult, K>;
      });
      results = results.concat(newResults);
      if (newResults.length < 1000) {
        break;
      }
      if (paginationKey) {
        paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
      }
    } while (paginationKey && options.first && results.length < options.first);
    return options.first ? results.slice(0, options.first) : results;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('DailyExchangers', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type DailySNXPriceFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  count?: WeiSource | null;
  count_not?: WeiSource | null;
  count_gt?: WeiSource | null;
  count_lt?: WeiSource | null;
  count_gte?: WeiSource | null;
  count_lte?: WeiSource | null;
  count_in?: WeiSource[];
  count_not_in?: WeiSource[];
  averagePrice?: WeiSource | null;
  averagePrice_not?: WeiSource | null;
  averagePrice_gt?: WeiSource | null;
  averagePrice_lt?: WeiSource | null;
  averagePrice_gte?: WeiSource | null;
  averagePrice_lte?: WeiSource | null;
  averagePrice_in?: WeiSource[];
  averagePrice_not_in?: WeiSource[];
};
export type DailySNXPriceResult = {
  id: string;
  count: Wei;
  averagePrice: Wei;
};
export type DailySNXPriceFields = {
  id: true;
  count: true;
  averagePrice: true;
};
export type DailySNXPriceArgs<K extends keyof DailySNXPriceResult> = {
  [Property in keyof Pick<DailySNXPriceFields, K>]: DailySNXPriceFields[Property];
};
export const useGetDailySNXPriceById = <K extends keyof DailySNXPriceResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: DailySNXPriceArgs<K>,
  queryOptions: UseQueryOptions<Pick<DailySNXPriceResult, K>> = {}
) => {
  const func = async function <K extends keyof DailySNXPriceResult>(
    url: string,
    options: SingleQueryOptions,
    args: DailySNXPriceArgs<K>
  ): Promise<Pick<DailySNXPriceResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('dailySNXPrice', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['count']) formattedObj['count'] = wei(obj['count'], 0);
    if (obj['averagePrice']) formattedObj['averagePrice'] = wei(obj['averagePrice']);
    return formattedObj as Pick<DailySNXPriceResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('DailySNXPrice', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetDailySNXPrices = <K extends keyof DailySNXPriceResult>(
  url: string,
  options?: MultiQueryOptions<DailySNXPriceFilter, DailySNXPriceResult>,
  args?: DailySNXPriceArgs<K>,
  queryOptions: UseQueryOptions<Pick<DailySNXPriceResult, K>[]> = {}
) => {
  const func = async function <K extends keyof DailySNXPriceResult>(
    url: string,
    options: MultiQueryOptions<DailySNXPriceFilter, DailySNXPriceResult>,
    args: DailySNXPriceArgs<K>
  ): Promise<Pick<DailySNXPriceResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<DailySNXPriceFilter, DailySNXPriceResult>> = {
      ...options,
    };
    let paginationKey: keyof DailySNXPriceFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof DailySNXPriceFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<DailySNXPriceResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('dailySNXPrices', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['count']) formattedObj['count'] = wei(obj['count'], 0);
        if (obj['averagePrice']) formattedObj['averagePrice'] = wei(obj['averagePrice']);
        return formattedObj as Pick<DailySNXPriceResult, K>;
      });
      results = results.concat(newResults);
      if (newResults.length < 1000) {
        break;
      }
      if (paginationKey) {
        paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
      }
    } while (paginationKey && options.first && results.length < options.first);
    return options.first ? results.slice(0, options.first) : results;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('DailySNXPrices', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type DailyTotalFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
  trades?: WeiSource | null;
  trades_not?: WeiSource | null;
  trades_gt?: WeiSource | null;
  trades_lt?: WeiSource | null;
  trades_gte?: WeiSource | null;
  trades_lte?: WeiSource | null;
  trades_in?: WeiSource[];
  trades_not_in?: WeiSource[];
  exchangers?: WeiSource | null;
  exchangers_not?: WeiSource | null;
  exchangers_gt?: WeiSource | null;
  exchangers_lt?: WeiSource | null;
  exchangers_gte?: WeiSource | null;
  exchangers_lte?: WeiSource | null;
  exchangers_in?: WeiSource[];
  exchangers_not_in?: WeiSource[];
  exchangeUSDTally?: WeiSource | null;
  exchangeUSDTally_not?: WeiSource | null;
  exchangeUSDTally_gt?: WeiSource | null;
  exchangeUSDTally_lt?: WeiSource | null;
  exchangeUSDTally_gte?: WeiSource | null;
  exchangeUSDTally_lte?: WeiSource | null;
  exchangeUSDTally_in?: WeiSource[];
  exchangeUSDTally_not_in?: WeiSource[];
  totalFeesGeneratedInUSD?: WeiSource | null;
  totalFeesGeneratedInUSD_not?: WeiSource | null;
  totalFeesGeneratedInUSD_gt?: WeiSource | null;
  totalFeesGeneratedInUSD_lt?: WeiSource | null;
  totalFeesGeneratedInUSD_gte?: WeiSource | null;
  totalFeesGeneratedInUSD_lte?: WeiSource | null;
  totalFeesGeneratedInUSD_in?: WeiSource[];
  totalFeesGeneratedInUSD_not_in?: WeiSource[];
};
export type DailyTotalResult = {
  id: string;
  timestamp: Wei;
  trades: Wei;
  exchangers: Wei;
  exchangeUSDTally: Wei;
  totalFeesGeneratedInUSD: Wei;
};
export type DailyTotalFields = {
  id: true;
  timestamp: true;
  trades: true;
  exchangers: true;
  exchangeUSDTally: true;
  totalFeesGeneratedInUSD: true;
};
export type DailyTotalArgs<K extends keyof DailyTotalResult> = {
  [Property in keyof Pick<DailyTotalFields, K>]: DailyTotalFields[Property];
};
export const useGetDailyTotalById = <K extends keyof DailyTotalResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: DailyTotalArgs<K>,
  queryOptions: UseQueryOptions<Pick<DailyTotalResult, K>> = {}
) => {
  const func = async function <K extends keyof DailyTotalResult>(
    url: string,
    options: SingleQueryOptions,
    args: DailyTotalArgs<K>
  ): Promise<Pick<DailyTotalResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('dailyTotal', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
    if (obj['trades']) formattedObj['trades'] = wei(obj['trades'], 0);
    if (obj['exchangers']) formattedObj['exchangers'] = wei(obj['exchangers'], 0);
    if (obj['exchangeUSDTally']) formattedObj['exchangeUSDTally'] = wei(obj['exchangeUSDTally']);
    if (obj['totalFeesGeneratedInUSD'])
      formattedObj['totalFeesGeneratedInUSD'] = wei(obj['totalFeesGeneratedInUSD']);
    return formattedObj as Pick<DailyTotalResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('DailyTotal', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetDailyTotals = <K extends keyof DailyTotalResult>(
  url: string,
  options?: MultiQueryOptions<DailyTotalFilter, DailyTotalResult>,
  args?: DailyTotalArgs<K>,
  queryOptions: UseQueryOptions<Pick<DailyTotalResult, K>[]> = {}
) => {
  const func = async function <K extends keyof DailyTotalResult>(
    url: string,
    options: MultiQueryOptions<DailyTotalFilter, DailyTotalResult>,
    args: DailyTotalArgs<K>
  ): Promise<Pick<DailyTotalResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<DailyTotalFilter, DailyTotalResult>> = {
      ...options,
    };
    let paginationKey: keyof DailyTotalFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof DailyTotalFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<DailyTotalResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('dailyTotals', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
        if (obj['trades']) formattedObj['trades'] = wei(obj['trades'], 0);
        if (obj['exchangers']) formattedObj['exchangers'] = wei(obj['exchangers'], 0);
        if (obj['exchangeUSDTally'])
          formattedObj['exchangeUSDTally'] = wei(obj['exchangeUSDTally']);
        if (obj['totalFeesGeneratedInUSD'])
          formattedObj['totalFeesGeneratedInUSD'] = wei(obj['totalFeesGeneratedInUSD']);
        return formattedObj as Pick<DailyTotalResult, K>;
      });
      results = results.concat(newResults);
      if (newResults.length < 1000) {
        break;
      }
      if (paginationKey) {
        paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
      }
    } while (paginationKey && options.first && results.length < options.first);
    return options.first ? results.slice(0, options.first) : results;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('DailyTotals', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type ExchangeFeeFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  fee?: WeiSource | null;
  fee_not?: WeiSource | null;
  fee_gt?: WeiSource | null;
  fee_lt?: WeiSource | null;
  fee_gte?: WeiSource | null;
  fee_lte?: WeiSource | null;
  fee_in?: WeiSource[];
  fee_not_in?: WeiSource[];
};
export type ExchangeFeeResult = {
  id: string;
  fee: Wei;
};
export type ExchangeFeeFields = {
  id: true;
  fee: true;
};
export type ExchangeFeeArgs<K extends keyof ExchangeFeeResult> = {
  [Property in keyof Pick<ExchangeFeeFields, K>]: ExchangeFeeFields[Property];
};
export const useGetExchangeFeeById = <K extends keyof ExchangeFeeResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: ExchangeFeeArgs<K>,
  queryOptions: UseQueryOptions<Pick<ExchangeFeeResult, K>> = {}
) => {
  const func = async function <K extends keyof ExchangeFeeResult>(
    url: string,
    options: SingleQueryOptions,
    args: ExchangeFeeArgs<K>
  ): Promise<Pick<ExchangeFeeResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('exchangeFee', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['fee']) formattedObj['fee'] = wei(obj['fee']);
    return formattedObj as Pick<ExchangeFeeResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('ExchangeFee', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetExchangeFees = <K extends keyof ExchangeFeeResult>(
  url: string,
  options?: MultiQueryOptions<ExchangeFeeFilter, ExchangeFeeResult>,
  args?: ExchangeFeeArgs<K>,
  queryOptions: UseQueryOptions<Pick<ExchangeFeeResult, K>[]> = {}
) => {
  const func = async function <K extends keyof ExchangeFeeResult>(
    url: string,
    options: MultiQueryOptions<ExchangeFeeFilter, ExchangeFeeResult>,
    args: ExchangeFeeArgs<K>
  ): Promise<Pick<ExchangeFeeResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<ExchangeFeeFilter, ExchangeFeeResult>> = {
      ...options,
    };
    let paginationKey: keyof ExchangeFeeFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof ExchangeFeeFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<ExchangeFeeResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('exchangeFees', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['fee']) formattedObj['fee'] = wei(obj['fee']);
        return formattedObj as Pick<ExchangeFeeResult, K>;
      });
      results = results.concat(newResults);
      if (newResults.length < 1000) {
        break;
      }
      if (paginationKey) {
        paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
      }
    } while (paginationKey && options.first && results.length < options.first);
    return options.first ? results.slice(0, options.first) : results;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('ExchangeFees', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type ExchangeRebateFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  account?: string | null;
  account_not?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  currencyKey?: string | null;
  currencyKey_not?: string | null;
  currencyKey_in?: string[];
  currencyKey_not_in?: string[];
  currencyKey_contains?: string | null;
  currencyKey_not_contains?: string | null;
  amount?: WeiSource | null;
  amount_not?: WeiSource | null;
  amount_gt?: WeiSource | null;
  amount_lt?: WeiSource | null;
  amount_gte?: WeiSource | null;
  amount_lte?: WeiSource | null;
  amount_in?: WeiSource[];
  amount_not_in?: WeiSource[];
  amountInUSD?: WeiSource | null;
  amountInUSD_not?: WeiSource | null;
  amountInUSD_gt?: WeiSource | null;
  amountInUSD_lt?: WeiSource | null;
  amountInUSD_gte?: WeiSource | null;
  amountInUSD_lte?: WeiSource | null;
  amountInUSD_in?: WeiSource[];
  amountInUSD_not_in?: WeiSource[];
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
  gasPrice?: WeiSource | null;
  gasPrice_not?: WeiSource | null;
  gasPrice_gt?: WeiSource | null;
  gasPrice_lt?: WeiSource | null;
  gasPrice_gte?: WeiSource | null;
  gasPrice_lte?: WeiSource | null;
  gasPrice_in?: WeiSource[];
  gasPrice_not_in?: WeiSource[];
  block?: WeiSource | null;
  block_not?: WeiSource | null;
  block_gt?: WeiSource | null;
  block_lt?: WeiSource | null;
  block_gte?: WeiSource | null;
  block_lte?: WeiSource | null;
  block_in?: WeiSource[];
  block_not_in?: WeiSource[];
};
export type ExchangeRebateResult = {
  id: string;
  account: string;
  currencyKey: string;
  amount: Wei;
  amountInUSD: Wei;
  timestamp: Wei;
  gasPrice: Wei;
  block: Wei;
};
export type ExchangeRebateFields = {
  id: true;
  account: true;
  currencyKey: true;
  amount: true;
  amountInUSD: true;
  timestamp: true;
  gasPrice: true;
  block: true;
};
export type ExchangeRebateArgs<K extends keyof ExchangeRebateResult> = {
  [Property in keyof Pick<ExchangeRebateFields, K>]: ExchangeRebateFields[Property];
};
export const useGetExchangeRebateById = <K extends keyof ExchangeRebateResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: ExchangeRebateArgs<K>,
  queryOptions: UseQueryOptions<Pick<ExchangeRebateResult, K>> = {}
) => {
  const func = async function <K extends keyof ExchangeRebateResult>(
    url: string,
    options: SingleQueryOptions,
    args: ExchangeRebateArgs<K>
  ): Promise<Pick<ExchangeRebateResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('exchangeRebate', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['account']) formattedObj['account'] = obj['account'];
    if (obj['currencyKey']) formattedObj['currencyKey'] = obj['currencyKey'];
    if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
    if (obj['amountInUSD']) formattedObj['amountInUSD'] = wei(obj['amountInUSD']);
    if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
    if (obj['gasPrice']) formattedObj['gasPrice'] = wei(obj['gasPrice'], 0);
    if (obj['block']) formattedObj['block'] = wei(obj['block'], 0);
    return formattedObj as Pick<ExchangeRebateResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('ExchangeRebate', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetExchangeRebates = <K extends keyof ExchangeRebateResult>(
  url: string,
  options?: MultiQueryOptions<ExchangeRebateFilter, ExchangeRebateResult>,
  args?: ExchangeRebateArgs<K>,
  queryOptions: UseQueryOptions<Pick<ExchangeRebateResult, K>[]> = {}
) => {
  const func = async function <K extends keyof ExchangeRebateResult>(
    url: string,
    options: MultiQueryOptions<ExchangeRebateFilter, ExchangeRebateResult>,
    args: ExchangeRebateArgs<K>
  ): Promise<Pick<ExchangeRebateResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<ExchangeRebateFilter, ExchangeRebateResult>> =
      { ...options };
    let paginationKey: keyof ExchangeRebateFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof ExchangeRebateFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<ExchangeRebateResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('exchangeRebates', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['account']) formattedObj['account'] = obj['account'];
        if (obj['currencyKey']) formattedObj['currencyKey'] = obj['currencyKey'];
        if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
        if (obj['amountInUSD']) formattedObj['amountInUSD'] = wei(obj['amountInUSD']);
        if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
        if (obj['gasPrice']) formattedObj['gasPrice'] = wei(obj['gasPrice'], 0);
        if (obj['block']) formattedObj['block'] = wei(obj['block'], 0);
        return formattedObj as Pick<ExchangeRebateResult, K>;
      });
      results = results.concat(newResults);
      if (newResults.length < 1000) {
        break;
      }
      if (paginationKey) {
        paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
      }
    } while (paginationKey && options.first && results.length < options.first);
    return options.first ? results.slice(0, options.first) : results;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('ExchangeRebates', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type ExchangeReclaimFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  account?: string | null;
  account_not?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  currencyKey?: string | null;
  currencyKey_not?: string | null;
  currencyKey_in?: string[];
  currencyKey_not_in?: string[];
  currencyKey_contains?: string | null;
  currencyKey_not_contains?: string | null;
  amount?: WeiSource | null;
  amount_not?: WeiSource | null;
  amount_gt?: WeiSource | null;
  amount_lt?: WeiSource | null;
  amount_gte?: WeiSource | null;
  amount_lte?: WeiSource | null;
  amount_in?: WeiSource[];
  amount_not_in?: WeiSource[];
  amountInUSD?: WeiSource | null;
  amountInUSD_not?: WeiSource | null;
  amountInUSD_gt?: WeiSource | null;
  amountInUSD_lt?: WeiSource | null;
  amountInUSD_gte?: WeiSource | null;
  amountInUSD_lte?: WeiSource | null;
  amountInUSD_in?: WeiSource[];
  amountInUSD_not_in?: WeiSource[];
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
  gasPrice?: WeiSource | null;
  gasPrice_not?: WeiSource | null;
  gasPrice_gt?: WeiSource | null;
  gasPrice_lt?: WeiSource | null;
  gasPrice_gte?: WeiSource | null;
  gasPrice_lte?: WeiSource | null;
  gasPrice_in?: WeiSource[];
  gasPrice_not_in?: WeiSource[];
  block?: WeiSource | null;
  block_not?: WeiSource | null;
  block_gt?: WeiSource | null;
  block_lt?: WeiSource | null;
  block_gte?: WeiSource | null;
  block_lte?: WeiSource | null;
  block_in?: WeiSource[];
  block_not_in?: WeiSource[];
};
export type ExchangeReclaimResult = {
  id: string;
  account: string;
  currencyKey: string;
  amount: Wei;
  amountInUSD: Wei;
  timestamp: Wei;
  gasPrice: Wei;
  block: Wei;
};
export type ExchangeReclaimFields = {
  id: true;
  account: true;
  currencyKey: true;
  amount: true;
  amountInUSD: true;
  timestamp: true;
  gasPrice: true;
  block: true;
};
export type ExchangeReclaimArgs<K extends keyof ExchangeReclaimResult> = {
  [Property in keyof Pick<ExchangeReclaimFields, K>]: ExchangeReclaimFields[Property];
};
export const useGetExchangeReclaimById = <K extends keyof ExchangeReclaimResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: ExchangeReclaimArgs<K>,
  queryOptions: UseQueryOptions<Pick<ExchangeReclaimResult, K>> = {}
) => {
  const func = async function <K extends keyof ExchangeReclaimResult>(
    url: string,
    options: SingleQueryOptions,
    args: ExchangeReclaimArgs<K>
  ): Promise<Pick<ExchangeReclaimResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('exchangeReclaim', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['account']) formattedObj['account'] = obj['account'];
    if (obj['currencyKey']) formattedObj['currencyKey'] = obj['currencyKey'];
    if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
    if (obj['amountInUSD']) formattedObj['amountInUSD'] = wei(obj['amountInUSD']);
    if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
    if (obj['gasPrice']) formattedObj['gasPrice'] = wei(obj['gasPrice'], 0);
    if (obj['block']) formattedObj['block'] = wei(obj['block'], 0);
    return formattedObj as Pick<ExchangeReclaimResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('ExchangeReclaim', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetExchangeReclaims = <K extends keyof ExchangeReclaimResult>(
  url: string,
  options?: MultiQueryOptions<ExchangeReclaimFilter, ExchangeReclaimResult>,
  args?: ExchangeReclaimArgs<K>,
  queryOptions: UseQueryOptions<Pick<ExchangeReclaimResult, K>[]> = {}
) => {
  const func = async function <K extends keyof ExchangeReclaimResult>(
    url: string,
    options: MultiQueryOptions<ExchangeReclaimFilter, ExchangeReclaimResult>,
    args: ExchangeReclaimArgs<K>
  ): Promise<Pick<ExchangeReclaimResult, K>[]> {
    const paginatedOptions: Partial<
      MultiQueryOptions<ExchangeReclaimFilter, ExchangeReclaimResult>
    > = { ...options };
    let paginationKey: keyof ExchangeReclaimFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof ExchangeReclaimFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<ExchangeReclaimResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('exchangeReclaims', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['account']) formattedObj['account'] = obj['account'];
        if (obj['currencyKey']) formattedObj['currencyKey'] = obj['currencyKey'];
        if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
        if (obj['amountInUSD']) formattedObj['amountInUSD'] = wei(obj['amountInUSD']);
        if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
        if (obj['gasPrice']) formattedObj['gasPrice'] = wei(obj['gasPrice'], 0);
        if (obj['block']) formattedObj['block'] = wei(obj['block'], 0);
        return formattedObj as Pick<ExchangeReclaimResult, K>;
      });
      results = results.concat(newResults);
      if (newResults.length < 1000) {
        break;
      }
      if (paginationKey) {
        paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
      }
    } while (paginationKey && options.first && results.length < options.first);
    return options.first ? results.slice(0, options.first) : results;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('ExchangeReclaims', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type ExchangerFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
};
export type ExchangerResult = {
  id: string;
};
export type ExchangerFields = {
  id: true;
};
export type ExchangerArgs<K extends keyof ExchangerResult> = {
  [Property in keyof Pick<ExchangerFields, K>]: ExchangerFields[Property];
};
export const useGetExchangerById = <K extends keyof ExchangerResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: ExchangerArgs<K>,
  queryOptions: UseQueryOptions<Pick<ExchangerResult, K>> = {}
) => {
  const func = async function <K extends keyof ExchangerResult>(
    url: string,
    options: SingleQueryOptions,
    args: ExchangerArgs<K>
  ): Promise<Pick<ExchangerResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('exchanger', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    return formattedObj as Pick<ExchangerResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('Exchanger', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetExchangers = <K extends keyof ExchangerResult>(
  url: string,
  options?: MultiQueryOptions<ExchangerFilter, ExchangerResult>,
  args?: ExchangerArgs<K>,
  queryOptions: UseQueryOptions<Pick<ExchangerResult, K>[]> = {}
) => {
  const func = async function <K extends keyof ExchangerResult>(
    url: string,
    options: MultiQueryOptions<ExchangerFilter, ExchangerResult>,
    args: ExchangerArgs<K>
  ): Promise<Pick<ExchangerResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<ExchangerFilter, ExchangerResult>> = {
      ...options,
    };
    let paginationKey: keyof ExchangerFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof ExchangerFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<ExchangerResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('exchangers', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        return formattedObj as Pick<ExchangerResult, K>;
      });
      results = results.concat(newResults);
      if (newResults.length < 1000) {
        break;
      }
      if (paginationKey) {
        paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
      }
    } while (paginationKey && options.first && results.length < options.first);
    return options.first ? results.slice(0, options.first) : results;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('Exchangers', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type FifteenMinuteExchangerFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
};
export type FifteenMinuteExchangerResult = {
  id: string;
};
export type FifteenMinuteExchangerFields = {
  id: true;
};
export type FifteenMinuteExchangerArgs<K extends keyof FifteenMinuteExchangerResult> = {
  [Property in keyof Pick<FifteenMinuteExchangerFields, K>]: FifteenMinuteExchangerFields[Property];
};
export const useGetFifteenMinuteExchangerById = <K extends keyof FifteenMinuteExchangerResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: FifteenMinuteExchangerArgs<K>,
  queryOptions: UseQueryOptions<Pick<FifteenMinuteExchangerResult, K>> = {}
) => {
  const func = async function <K extends keyof FifteenMinuteExchangerResult>(
    url: string,
    options: SingleQueryOptions,
    args: FifteenMinuteExchangerArgs<K>
  ): Promise<Pick<FifteenMinuteExchangerResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('fifteenMinuteExchanger', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    return formattedObj as Pick<FifteenMinuteExchangerResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('FifteenMinuteExchanger', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetFifteenMinuteExchangers = <K extends keyof FifteenMinuteExchangerResult>(
  url: string,
  options?: MultiQueryOptions<FifteenMinuteExchangerFilter, FifteenMinuteExchangerResult>,
  args?: FifteenMinuteExchangerArgs<K>,
  queryOptions: UseQueryOptions<Pick<FifteenMinuteExchangerResult, K>[]> = {}
) => {
  const func = async function <K extends keyof FifteenMinuteExchangerResult>(
    url: string,
    options: MultiQueryOptions<FifteenMinuteExchangerFilter, FifteenMinuteExchangerResult>,
    args: FifteenMinuteExchangerArgs<K>
  ): Promise<Pick<FifteenMinuteExchangerResult, K>[]> {
    const paginatedOptions: Partial<
      MultiQueryOptions<FifteenMinuteExchangerFilter, FifteenMinuteExchangerResult>
    > = { ...options };
    let paginationKey: keyof FifteenMinuteExchangerFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc'
          ? '_gt'
          : '_lt')) as keyof FifteenMinuteExchangerFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<FifteenMinuteExchangerResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('fifteenMinuteExchangers', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        return formattedObj as Pick<FifteenMinuteExchangerResult, K>;
      });
      results = results.concat(newResults);
      if (newResults.length < 1000) {
        break;
      }
      if (paginationKey) {
        paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
      }
    } while (paginationKey && options.first && results.length < options.first);
    return options.first ? results.slice(0, options.first) : results;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('FifteenMinuteExchangers', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type FifteenMinuteSNXPriceFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  count?: WeiSource | null;
  count_not?: WeiSource | null;
  count_gt?: WeiSource | null;
  count_lt?: WeiSource | null;
  count_gte?: WeiSource | null;
  count_lte?: WeiSource | null;
  count_in?: WeiSource[];
  count_not_in?: WeiSource[];
  averagePrice?: WeiSource | null;
  averagePrice_not?: WeiSource | null;
  averagePrice_gt?: WeiSource | null;
  averagePrice_lt?: WeiSource | null;
  averagePrice_gte?: WeiSource | null;
  averagePrice_lte?: WeiSource | null;
  averagePrice_in?: WeiSource[];
  averagePrice_not_in?: WeiSource[];
};
export type FifteenMinuteSNXPriceResult = {
  id: string;
  count: Wei;
  averagePrice: Wei;
};
export type FifteenMinuteSNXPriceFields = {
  id: true;
  count: true;
  averagePrice: true;
};
export type FifteenMinuteSNXPriceArgs<K extends keyof FifteenMinuteSNXPriceResult> = {
  [Property in keyof Pick<FifteenMinuteSNXPriceFields, K>]: FifteenMinuteSNXPriceFields[Property];
};
export const useGetFifteenMinuteSNXPriceById = <K extends keyof FifteenMinuteSNXPriceResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: FifteenMinuteSNXPriceArgs<K>,
  queryOptions: UseQueryOptions<Pick<FifteenMinuteSNXPriceResult, K>> = {}
) => {
  const func = async function <K extends keyof FifteenMinuteSNXPriceResult>(
    url: string,
    options: SingleQueryOptions,
    args: FifteenMinuteSNXPriceArgs<K>
  ): Promise<Pick<FifteenMinuteSNXPriceResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('fifteenMinuteSNXPrice', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['count']) formattedObj['count'] = wei(obj['count'], 0);
    if (obj['averagePrice']) formattedObj['averagePrice'] = wei(obj['averagePrice']);
    return formattedObj as Pick<FifteenMinuteSNXPriceResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('FifteenMinuteSNXPrice', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetFifteenMinuteSNXPrices = <K extends keyof FifteenMinuteSNXPriceResult>(
  url: string,
  options?: MultiQueryOptions<FifteenMinuteSNXPriceFilter, FifteenMinuteSNXPriceResult>,
  args?: FifteenMinuteSNXPriceArgs<K>,
  queryOptions: UseQueryOptions<Pick<FifteenMinuteSNXPriceResult, K>[]> = {}
) => {
  const func = async function <K extends keyof FifteenMinuteSNXPriceResult>(
    url: string,
    options: MultiQueryOptions<FifteenMinuteSNXPriceFilter, FifteenMinuteSNXPriceResult>,
    args: FifteenMinuteSNXPriceArgs<K>
  ): Promise<Pick<FifteenMinuteSNXPriceResult, K>[]> {
    const paginatedOptions: Partial<
      MultiQueryOptions<FifteenMinuteSNXPriceFilter, FifteenMinuteSNXPriceResult>
    > = { ...options };
    let paginationKey: keyof FifteenMinuteSNXPriceFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc'
          ? '_gt'
          : '_lt')) as keyof FifteenMinuteSNXPriceFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<FifteenMinuteSNXPriceResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('fifteenMinuteSNXPrices', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['count']) formattedObj['count'] = wei(obj['count'], 0);
        if (obj['averagePrice']) formattedObj['averagePrice'] = wei(obj['averagePrice']);
        return formattedObj as Pick<FifteenMinuteSNXPriceResult, K>;
      });
      results = results.concat(newResults);
      if (newResults.length < 1000) {
        break;
      }
      if (paginationKey) {
        paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
      }
    } while (paginationKey && options.first && results.length < options.first);
    return options.first ? results.slice(0, options.first) : results;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('FifteenMinuteSNXPrices', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type FifteenMinuteTotalFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
  trades?: WeiSource | null;
  trades_not?: WeiSource | null;
  trades_gt?: WeiSource | null;
  trades_lt?: WeiSource | null;
  trades_gte?: WeiSource | null;
  trades_lte?: WeiSource | null;
  trades_in?: WeiSource[];
  trades_not_in?: WeiSource[];
  exchangers?: WeiSource | null;
  exchangers_not?: WeiSource | null;
  exchangers_gt?: WeiSource | null;
  exchangers_lt?: WeiSource | null;
  exchangers_gte?: WeiSource | null;
  exchangers_lte?: WeiSource | null;
  exchangers_in?: WeiSource[];
  exchangers_not_in?: WeiSource[];
  exchangeUSDTally?: WeiSource | null;
  exchangeUSDTally_not?: WeiSource | null;
  exchangeUSDTally_gt?: WeiSource | null;
  exchangeUSDTally_lt?: WeiSource | null;
  exchangeUSDTally_gte?: WeiSource | null;
  exchangeUSDTally_lte?: WeiSource | null;
  exchangeUSDTally_in?: WeiSource[];
  exchangeUSDTally_not_in?: WeiSource[];
  totalFeesGeneratedInUSD?: WeiSource | null;
  totalFeesGeneratedInUSD_not?: WeiSource | null;
  totalFeesGeneratedInUSD_gt?: WeiSource | null;
  totalFeesGeneratedInUSD_lt?: WeiSource | null;
  totalFeesGeneratedInUSD_gte?: WeiSource | null;
  totalFeesGeneratedInUSD_lte?: WeiSource | null;
  totalFeesGeneratedInUSD_in?: WeiSource[];
  totalFeesGeneratedInUSD_not_in?: WeiSource[];
};
export type FifteenMinuteTotalResult = {
  id: string;
  timestamp: Wei;
  trades: Wei;
  exchangers: Wei;
  exchangeUSDTally: Wei;
  totalFeesGeneratedInUSD: Wei;
};
export type FifteenMinuteTotalFields = {
  id: true;
  timestamp: true;
  trades: true;
  exchangers: true;
  exchangeUSDTally: true;
  totalFeesGeneratedInUSD: true;
};
export type FifteenMinuteTotalArgs<K extends keyof FifteenMinuteTotalResult> = {
  [Property in keyof Pick<FifteenMinuteTotalFields, K>]: FifteenMinuteTotalFields[Property];
};
export const useGetFifteenMinuteTotalById = <K extends keyof FifteenMinuteTotalResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: FifteenMinuteTotalArgs<K>,
  queryOptions: UseQueryOptions<Pick<FifteenMinuteTotalResult, K>> = {}
) => {
  const func = async function <K extends keyof FifteenMinuteTotalResult>(
    url: string,
    options: SingleQueryOptions,
    args: FifteenMinuteTotalArgs<K>
  ): Promise<Pick<FifteenMinuteTotalResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('fifteenMinuteTotal', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
    if (obj['trades']) formattedObj['trades'] = wei(obj['trades'], 0);
    if (obj['exchangers']) formattedObj['exchangers'] = wei(obj['exchangers'], 0);
    if (obj['exchangeUSDTally']) formattedObj['exchangeUSDTally'] = wei(obj['exchangeUSDTally']);
    if (obj['totalFeesGeneratedInUSD'])
      formattedObj['totalFeesGeneratedInUSD'] = wei(obj['totalFeesGeneratedInUSD']);
    return formattedObj as Pick<FifteenMinuteTotalResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('FifteenMinuteTotal', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetFifteenMinuteTotals = <K extends keyof FifteenMinuteTotalResult>(
  url: string,
  options?: MultiQueryOptions<FifteenMinuteTotalFilter, FifteenMinuteTotalResult>,
  args?: FifteenMinuteTotalArgs<K>,
  queryOptions: UseQueryOptions<Pick<FifteenMinuteTotalResult, K>[]> = {}
) => {
  const func = async function <K extends keyof FifteenMinuteTotalResult>(
    url: string,
    options: MultiQueryOptions<FifteenMinuteTotalFilter, FifteenMinuteTotalResult>,
    args: FifteenMinuteTotalArgs<K>
  ): Promise<Pick<FifteenMinuteTotalResult, K>[]> {
    const paginatedOptions: Partial<
      MultiQueryOptions<FifteenMinuteTotalFilter, FifteenMinuteTotalResult>
    > = { ...options };
    let paginationKey: keyof FifteenMinuteTotalFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc'
          ? '_gt'
          : '_lt')) as keyof FifteenMinuteTotalFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<FifteenMinuteTotalResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('fifteenMinuteTotals', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
        if (obj['trades']) formattedObj['trades'] = wei(obj['trades'], 0);
        if (obj['exchangers']) formattedObj['exchangers'] = wei(obj['exchangers'], 0);
        if (obj['exchangeUSDTally'])
          formattedObj['exchangeUSDTally'] = wei(obj['exchangeUSDTally']);
        if (obj['totalFeesGeneratedInUSD'])
          formattedObj['totalFeesGeneratedInUSD'] = wei(obj['totalFeesGeneratedInUSD']);
        return formattedObj as Pick<FifteenMinuteTotalResult, K>;
      });
      results = results.concat(newResults);
      if (newResults.length < 1000) {
        break;
      }
      if (paginationKey) {
        paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
      }
    } while (paginationKey && options.first && results.length < options.first);
    return options.first ? results.slice(0, options.first) : results;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('FifteenMinuteTotals', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type InversePricingInfoFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  frozen?: boolean | null;
  frozen_not?: boolean | null;
  frozen_in?: boolean[];
  frozen_not_in?: boolean[];
  upperLimit?: WeiSource | null;
  upperLimit_not?: WeiSource | null;
  upperLimit_gt?: WeiSource | null;
  upperLimit_lt?: WeiSource | null;
  upperLimit_gte?: WeiSource | null;
  upperLimit_lte?: WeiSource | null;
  upperLimit_in?: WeiSource[];
  upperLimit_not_in?: WeiSource[];
  lowerLimit?: WeiSource | null;
  lowerLimit_not?: WeiSource | null;
  lowerLimit_gt?: WeiSource | null;
  lowerLimit_lt?: WeiSource | null;
  lowerLimit_gte?: WeiSource | null;
  lowerLimit_lte?: WeiSource | null;
  lowerLimit_in?: WeiSource[];
  lowerLimit_not_in?: WeiSource[];
  entryPoint?: WeiSource | null;
  entryPoint_not?: WeiSource | null;
  entryPoint_gt?: WeiSource | null;
  entryPoint_lt?: WeiSource | null;
  entryPoint_gte?: WeiSource | null;
  entryPoint_lte?: WeiSource | null;
  entryPoint_in?: WeiSource[];
  entryPoint_not_in?: WeiSource[];
};
export type InversePricingInfoResult = {
  id: string;
  frozen: boolean;
  upperLimit: Wei;
  lowerLimit: Wei;
  entryPoint: Wei;
};
export type InversePricingInfoFields = {
  id: true;
  frozen: true;
  upperLimit: true;
  lowerLimit: true;
  entryPoint: true;
};
export type InversePricingInfoArgs<K extends keyof InversePricingInfoResult> = {
  [Property in keyof Pick<InversePricingInfoFields, K>]: InversePricingInfoFields[Property];
};
export const useGetInversePricingInfoById = <K extends keyof InversePricingInfoResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: InversePricingInfoArgs<K>,
  queryOptions: UseQueryOptions<Pick<InversePricingInfoResult, K>> = {}
) => {
  const func = async function <K extends keyof InversePricingInfoResult>(
    url: string,
    options: SingleQueryOptions,
    args: InversePricingInfoArgs<K>
  ): Promise<Pick<InversePricingInfoResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('inversePricingInfo', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['frozen']) formattedObj['frozen'] = obj['frozen'];
    if (obj['upperLimit']) formattedObj['upperLimit'] = wei(obj['upperLimit']);
    if (obj['lowerLimit']) formattedObj['lowerLimit'] = wei(obj['lowerLimit']);
    if (obj['entryPoint']) formattedObj['entryPoint'] = wei(obj['entryPoint']);
    return formattedObj as Pick<InversePricingInfoResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('InversePricingInfo', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetInversePricingInfos = <K extends keyof InversePricingInfoResult>(
  url: string,
  options?: MultiQueryOptions<InversePricingInfoFilter, InversePricingInfoResult>,
  args?: InversePricingInfoArgs<K>,
  queryOptions: UseQueryOptions<Pick<InversePricingInfoResult, K>[]> = {}
) => {
  const func = async function <K extends keyof InversePricingInfoResult>(
    url: string,
    options: MultiQueryOptions<InversePricingInfoFilter, InversePricingInfoResult>,
    args: InversePricingInfoArgs<K>
  ): Promise<Pick<InversePricingInfoResult, K>[]> {
    const paginatedOptions: Partial<
      MultiQueryOptions<InversePricingInfoFilter, InversePricingInfoResult>
    > = { ...options };
    let paginationKey: keyof InversePricingInfoFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc'
          ? '_gt'
          : '_lt')) as keyof InversePricingInfoFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<InversePricingInfoResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('inversePricingInfos', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['frozen']) formattedObj['frozen'] = obj['frozen'];
        if (obj['upperLimit']) formattedObj['upperLimit'] = wei(obj['upperLimit']);
        if (obj['lowerLimit']) formattedObj['lowerLimit'] = wei(obj['lowerLimit']);
        if (obj['entryPoint']) formattedObj['entryPoint'] = wei(obj['entryPoint']);
        return formattedObj as Pick<InversePricingInfoResult, K>;
      });
      results = results.concat(newResults);
      if (newResults.length < 1000) {
        break;
      }
      if (paginationKey) {
        paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
      }
    } while (paginationKey && options.first && results.length < options.first);
    return options.first ? results.slice(0, options.first) : results;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('InversePricingInfos', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type LatestRateFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  rate?: WeiSource | null;
  rate_not?: WeiSource | null;
  rate_gt?: WeiSource | null;
  rate_lt?: WeiSource | null;
  rate_gte?: WeiSource | null;
  rate_lte?: WeiSource | null;
  rate_in?: WeiSource[];
  rate_not_in?: WeiSource[];
  aggregator?: string | null;
  aggregator_not?: string | null;
  aggregator_in?: string[];
  aggregator_not_in?: string[];
  aggregator_contains?: string | null;
  aggregator_not_contains?: string | null;
};
export type LatestRateResult = {
  id: string;
  rate: Wei;
  aggregator: string;
};
export type LatestRateFields = {
  id: true;
  rate: true;
  aggregator: true;
};
export type LatestRateArgs<K extends keyof LatestRateResult> = {
  [Property in keyof Pick<LatestRateFields, K>]: LatestRateFields[Property];
};
export const useGetLatestRateById = <K extends keyof LatestRateResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: LatestRateArgs<K>,
  queryOptions: UseQueryOptions<Pick<LatestRateResult, K>> = {}
) => {
  const func = async function <K extends keyof LatestRateResult>(
    url: string,
    options: SingleQueryOptions,
    args: LatestRateArgs<K>
  ): Promise<Pick<LatestRateResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('latestRate', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['rate']) formattedObj['rate'] = wei(obj['rate']);
    if (obj['aggregator']) formattedObj['aggregator'] = obj['aggregator'];
    return formattedObj as Pick<LatestRateResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('LatestRate', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetLatestRates = <K extends keyof LatestRateResult>(
  url: string,
  options?: MultiQueryOptions<LatestRateFilter, LatestRateResult>,
  args?: LatestRateArgs<K>,
  queryOptions: UseQueryOptions<Pick<LatestRateResult, K>[]> = {}
) => {
  const func = async function <K extends keyof LatestRateResult>(
    url: string,
    options: MultiQueryOptions<LatestRateFilter, LatestRateResult>,
    args: LatestRateArgs<K>
  ): Promise<Pick<LatestRateResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<LatestRateFilter, LatestRateResult>> = {
      ...options,
    };
    let paginationKey: keyof LatestRateFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof LatestRateFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<LatestRateResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('latestRates', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['rate']) formattedObj['rate'] = wei(obj['rate']);
        if (obj['aggregator']) formattedObj['aggregator'] = obj['aggregator'];
        return formattedObj as Pick<LatestRateResult, K>;
      });
      results = results.concat(newResults);
      if (newResults.length < 1000) {
        break;
      }
      if (paginationKey) {
        paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
      }
    } while (paginationKey && options.first && results.length < options.first);
    return options.first ? results.slice(0, options.first) : results;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('LatestRates', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type PostArchernarExchangerFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
};
export type PostArchernarExchangerResult = {
  id: string;
};
export type PostArchernarExchangerFields = {
  id: true;
};
export type PostArchernarExchangerArgs<K extends keyof PostArchernarExchangerResult> = {
  [Property in keyof Pick<PostArchernarExchangerFields, K>]: PostArchernarExchangerFields[Property];
};
export const useGetPostArchernarExchangerById = <K extends keyof PostArchernarExchangerResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: PostArchernarExchangerArgs<K>,
  queryOptions: UseQueryOptions<Pick<PostArchernarExchangerResult, K>> = {}
) => {
  const func = async function <K extends keyof PostArchernarExchangerResult>(
    url: string,
    options: SingleQueryOptions,
    args: PostArchernarExchangerArgs<K>
  ): Promise<Pick<PostArchernarExchangerResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('postArchernarExchanger', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    return formattedObj as Pick<PostArchernarExchangerResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('PostArchernarExchanger', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetPostArchernarExchangers = <K extends keyof PostArchernarExchangerResult>(
  url: string,
  options?: MultiQueryOptions<PostArchernarExchangerFilter, PostArchernarExchangerResult>,
  args?: PostArchernarExchangerArgs<K>,
  queryOptions: UseQueryOptions<Pick<PostArchernarExchangerResult, K>[]> = {}
) => {
  const func = async function <K extends keyof PostArchernarExchangerResult>(
    url: string,
    options: MultiQueryOptions<PostArchernarExchangerFilter, PostArchernarExchangerResult>,
    args: PostArchernarExchangerArgs<K>
  ): Promise<Pick<PostArchernarExchangerResult, K>[]> {
    const paginatedOptions: Partial<
      MultiQueryOptions<PostArchernarExchangerFilter, PostArchernarExchangerResult>
    > = { ...options };
    let paginationKey: keyof PostArchernarExchangerFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc'
          ? '_gt'
          : '_lt')) as keyof PostArchernarExchangerFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<PostArchernarExchangerResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('postArchernarExchangers', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        return formattedObj as Pick<PostArchernarExchangerResult, K>;
      });
      results = results.concat(newResults);
      if (newResults.length < 1000) {
        break;
      }
      if (paginationKey) {
        paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
      }
    } while (paginationKey && options.first && results.length < options.first);
    return options.first ? results.slice(0, options.first) : results;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('PostArchernarExchangers', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type PostArchernarTotalFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  trades?: WeiSource | null;
  trades_not?: WeiSource | null;
  trades_gt?: WeiSource | null;
  trades_lt?: WeiSource | null;
  trades_gte?: WeiSource | null;
  trades_lte?: WeiSource | null;
  trades_in?: WeiSource[];
  trades_not_in?: WeiSource[];
  exchangers?: WeiSource | null;
  exchangers_not?: WeiSource | null;
  exchangers_gt?: WeiSource | null;
  exchangers_lt?: WeiSource | null;
  exchangers_gte?: WeiSource | null;
  exchangers_lte?: WeiSource | null;
  exchangers_in?: WeiSource[];
  exchangers_not_in?: WeiSource[];
  exchangeUSDTally?: WeiSource | null;
  exchangeUSDTally_not?: WeiSource | null;
  exchangeUSDTally_gt?: WeiSource | null;
  exchangeUSDTally_lt?: WeiSource | null;
  exchangeUSDTally_gte?: WeiSource | null;
  exchangeUSDTally_lte?: WeiSource | null;
  exchangeUSDTally_in?: WeiSource[];
  exchangeUSDTally_not_in?: WeiSource[];
  totalFeesGeneratedInUSD?: WeiSource | null;
  totalFeesGeneratedInUSD_not?: WeiSource | null;
  totalFeesGeneratedInUSD_gt?: WeiSource | null;
  totalFeesGeneratedInUSD_lt?: WeiSource | null;
  totalFeesGeneratedInUSD_gte?: WeiSource | null;
  totalFeesGeneratedInUSD_lte?: WeiSource | null;
  totalFeesGeneratedInUSD_in?: WeiSource[];
  totalFeesGeneratedInUSD_not_in?: WeiSource[];
};
export type PostArchernarTotalResult = {
  id: string;
  trades: Wei;
  exchangers: Wei;
  exchangeUSDTally: Wei;
  totalFeesGeneratedInUSD: Wei;
};
export type PostArchernarTotalFields = {
  id: true;
  trades: true;
  exchangers: true;
  exchangeUSDTally: true;
  totalFeesGeneratedInUSD: true;
};
export type PostArchernarTotalArgs<K extends keyof PostArchernarTotalResult> = {
  [Property in keyof Pick<PostArchernarTotalFields, K>]: PostArchernarTotalFields[Property];
};
export const useGetPostArchernarTotalById = <K extends keyof PostArchernarTotalResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: PostArchernarTotalArgs<K>,
  queryOptions: UseQueryOptions<Pick<PostArchernarTotalResult, K>> = {}
) => {
  const func = async function <K extends keyof PostArchernarTotalResult>(
    url: string,
    options: SingleQueryOptions,
    args: PostArchernarTotalArgs<K>
  ): Promise<Pick<PostArchernarTotalResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('postArchernarTotal', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['trades']) formattedObj['trades'] = wei(obj['trades'], 0);
    if (obj['exchangers']) formattedObj['exchangers'] = wei(obj['exchangers'], 0);
    if (obj['exchangeUSDTally']) formattedObj['exchangeUSDTally'] = wei(obj['exchangeUSDTally']);
    if (obj['totalFeesGeneratedInUSD'])
      formattedObj['totalFeesGeneratedInUSD'] = wei(obj['totalFeesGeneratedInUSD']);
    return formattedObj as Pick<PostArchernarTotalResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('PostArchernarTotal', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetPostArchernarTotals = <K extends keyof PostArchernarTotalResult>(
  url: string,
  options?: MultiQueryOptions<PostArchernarTotalFilter, PostArchernarTotalResult>,
  args?: PostArchernarTotalArgs<K>,
  queryOptions: UseQueryOptions<Pick<PostArchernarTotalResult, K>[]> = {}
) => {
  const func = async function <K extends keyof PostArchernarTotalResult>(
    url: string,
    options: MultiQueryOptions<PostArchernarTotalFilter, PostArchernarTotalResult>,
    args: PostArchernarTotalArgs<K>
  ): Promise<Pick<PostArchernarTotalResult, K>[]> {
    const paginatedOptions: Partial<
      MultiQueryOptions<PostArchernarTotalFilter, PostArchernarTotalResult>
    > = { ...options };
    let paginationKey: keyof PostArchernarTotalFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc'
          ? '_gt'
          : '_lt')) as keyof PostArchernarTotalFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<PostArchernarTotalResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('postArchernarTotals', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['trades']) formattedObj['trades'] = wei(obj['trades'], 0);
        if (obj['exchangers']) formattedObj['exchangers'] = wei(obj['exchangers'], 0);
        if (obj['exchangeUSDTally'])
          formattedObj['exchangeUSDTally'] = wei(obj['exchangeUSDTally']);
        if (obj['totalFeesGeneratedInUSD'])
          formattedObj['totalFeesGeneratedInUSD'] = wei(obj['totalFeesGeneratedInUSD']);
        return formattedObj as Pick<PostArchernarTotalResult, K>;
      });
      results = results.concat(newResults);
      if (newResults.length < 1000) {
        break;
      }
      if (paginationKey) {
        paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
      }
    } while (paginationKey && options.first && results.length < options.first);
    return options.first ? results.slice(0, options.first) : results;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('PostArchernarTotals', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type RateUpdateFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  currencyKey?: string | null;
  currencyKey_not?: string | null;
  currencyKey_in?: string[];
  currencyKey_not_in?: string[];
  currencyKey_contains?: string | null;
  currencyKey_not_contains?: string | null;
  synth?: string | null;
  synth_not?: string | null;
  synth_gt?: string | null;
  synth_lt?: string | null;
  synth_gte?: string | null;
  synth_lte?: string | null;
  synth_in?: string[];
  synth_not_in?: string[];
  synth_contains?: string | null;
  synth_not_contains?: string | null;
  synth_starts_with?: string | null;
  synth_not_starts_with?: string | null;
  synth_ends_with?: string | null;
  synth_not_ends_with?: string | null;
  rate?: WeiSource | null;
  rate_not?: WeiSource | null;
  rate_gt?: WeiSource | null;
  rate_lt?: WeiSource | null;
  rate_gte?: WeiSource | null;
  rate_lte?: WeiSource | null;
  rate_in?: WeiSource[];
  rate_not_in?: WeiSource[];
  block?: WeiSource | null;
  block_not?: WeiSource | null;
  block_gt?: WeiSource | null;
  block_lt?: WeiSource | null;
  block_gte?: WeiSource | null;
  block_lte?: WeiSource | null;
  block_in?: WeiSource[];
  block_not_in?: WeiSource[];
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
};
export type RateUpdateResult = {
  id: string;
  currencyKey: string;
  synth: string;
  rate: Wei;
  block: Wei;
  timestamp: Wei;
};
export type RateUpdateFields = {
  id: true;
  currencyKey: true;
  synth: true;
  rate: true;
  block: true;
  timestamp: true;
};
export type RateUpdateArgs<K extends keyof RateUpdateResult> = {
  [Property in keyof Pick<RateUpdateFields, K>]: RateUpdateFields[Property];
};
export const useGetRateUpdateById = <K extends keyof RateUpdateResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: RateUpdateArgs<K>,
  queryOptions: UseQueryOptions<Pick<RateUpdateResult, K>> = {}
) => {
  const func = async function <K extends keyof RateUpdateResult>(
    url: string,
    options: SingleQueryOptions,
    args: RateUpdateArgs<K>
  ): Promise<Pick<RateUpdateResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('rateUpdate', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['currencyKey']) formattedObj['currencyKey'] = obj['currencyKey'];
    if (obj['synth']) formattedObj['synth'] = obj['synth'];
    if (obj['rate']) formattedObj['rate'] = wei(obj['rate']);
    if (obj['block']) formattedObj['block'] = wei(obj['block'], 0);
    if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
    return formattedObj as Pick<RateUpdateResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('RateUpdate', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetRateUpdates = <K extends keyof RateUpdateResult>(
  url: string,
  options?: MultiQueryOptions<RateUpdateFilter, RateUpdateResult>,
  args?: RateUpdateArgs<K>,
  queryOptions: UseQueryOptions<Pick<RateUpdateResult, K>[]> = {}
) => {
  const func = async function <K extends keyof RateUpdateResult>(
    url: string,
    options: MultiQueryOptions<RateUpdateFilter, RateUpdateResult>,
    args: RateUpdateArgs<K>
  ): Promise<Pick<RateUpdateResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<RateUpdateFilter, RateUpdateResult>> = {
      ...options,
    };
    let paginationKey: keyof RateUpdateFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof RateUpdateFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<RateUpdateResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('rateUpdates', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['currencyKey']) formattedObj['currencyKey'] = obj['currencyKey'];
        if (obj['synth']) formattedObj['synth'] = obj['synth'];
        if (obj['rate']) formattedObj['rate'] = wei(obj['rate']);
        if (obj['block']) formattedObj['block'] = wei(obj['block'], 0);
        if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
        return formattedObj as Pick<RateUpdateResult, K>;
      });
      results = results.concat(newResults);
      if (newResults.length < 1000) {
        break;
      }
      if (paginationKey) {
        paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
      }
    } while (paginationKey && options.first && results.length < options.first);
    return options.first ? results.slice(0, options.first) : results;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('RateUpdates', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type SynthExchangeFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  account?: string | null;
  account_not?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  from?: string | null;
  from_not?: string | null;
  from_in?: string[];
  from_not_in?: string[];
  from_contains?: string | null;
  from_not_contains?: string | null;
  fromCurrencyKey?: string | null;
  fromCurrencyKey_not?: string | null;
  fromCurrencyKey_in?: string[];
  fromCurrencyKey_not_in?: string[];
  fromCurrencyKey_contains?: string | null;
  fromCurrencyKey_not_contains?: string | null;
  fromSynth?: string | null;
  fromSynth_not?: string | null;
  fromSynth_gt?: string | null;
  fromSynth_lt?: string | null;
  fromSynth_gte?: string | null;
  fromSynth_lte?: string | null;
  fromSynth_in?: string[];
  fromSynth_not_in?: string[];
  fromSynth_contains?: string | null;
  fromSynth_not_contains?: string | null;
  fromSynth_starts_with?: string | null;
  fromSynth_not_starts_with?: string | null;
  fromSynth_ends_with?: string | null;
  fromSynth_not_ends_with?: string | null;
  fromAmount?: WeiSource | null;
  fromAmount_not?: WeiSource | null;
  fromAmount_gt?: WeiSource | null;
  fromAmount_lt?: WeiSource | null;
  fromAmount_gte?: WeiSource | null;
  fromAmount_lte?: WeiSource | null;
  fromAmount_in?: WeiSource[];
  fromAmount_not_in?: WeiSource[];
  fromAmountInUSD?: WeiSource | null;
  fromAmountInUSD_not?: WeiSource | null;
  fromAmountInUSD_gt?: WeiSource | null;
  fromAmountInUSD_lt?: WeiSource | null;
  fromAmountInUSD_gte?: WeiSource | null;
  fromAmountInUSD_lte?: WeiSource | null;
  fromAmountInUSD_in?: WeiSource[];
  fromAmountInUSD_not_in?: WeiSource[];
  toCurrencyKey?: string | null;
  toCurrencyKey_not?: string | null;
  toCurrencyKey_in?: string[];
  toCurrencyKey_not_in?: string[];
  toCurrencyKey_contains?: string | null;
  toCurrencyKey_not_contains?: string | null;
  toSynth?: string | null;
  toSynth_not?: string | null;
  toSynth_gt?: string | null;
  toSynth_lt?: string | null;
  toSynth_gte?: string | null;
  toSynth_lte?: string | null;
  toSynth_in?: string[];
  toSynth_not_in?: string[];
  toSynth_contains?: string | null;
  toSynth_not_contains?: string | null;
  toSynth_starts_with?: string | null;
  toSynth_not_starts_with?: string | null;
  toSynth_ends_with?: string | null;
  toSynth_not_ends_with?: string | null;
  toAmount?: WeiSource | null;
  toAmount_not?: WeiSource | null;
  toAmount_gt?: WeiSource | null;
  toAmount_lt?: WeiSource | null;
  toAmount_gte?: WeiSource | null;
  toAmount_lte?: WeiSource | null;
  toAmount_in?: WeiSource[];
  toAmount_not_in?: WeiSource[];
  toAmountInUSD?: WeiSource | null;
  toAmountInUSD_not?: WeiSource | null;
  toAmountInUSD_gt?: WeiSource | null;
  toAmountInUSD_lt?: WeiSource | null;
  toAmountInUSD_gte?: WeiSource | null;
  toAmountInUSD_lte?: WeiSource | null;
  toAmountInUSD_in?: WeiSource[];
  toAmountInUSD_not_in?: WeiSource[];
  feesInUSD?: WeiSource | null;
  feesInUSD_not?: WeiSource | null;
  feesInUSD_gt?: WeiSource | null;
  feesInUSD_lt?: WeiSource | null;
  feesInUSD_gte?: WeiSource | null;
  feesInUSD_lte?: WeiSource | null;
  feesInUSD_in?: WeiSource[];
  feesInUSD_not_in?: WeiSource[];
  toAddress?: string | null;
  toAddress_not?: string | null;
  toAddress_in?: string[];
  toAddress_not_in?: string[];
  toAddress_contains?: string | null;
  toAddress_not_contains?: string | null;
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
  gasPrice?: WeiSource | null;
  gasPrice_not?: WeiSource | null;
  gasPrice_gt?: WeiSource | null;
  gasPrice_lt?: WeiSource | null;
  gasPrice_gte?: WeiSource | null;
  gasPrice_lte?: WeiSource | null;
  gasPrice_in?: WeiSource[];
  gasPrice_not_in?: WeiSource[];
  block?: WeiSource | null;
  block_not?: WeiSource | null;
  block_gt?: WeiSource | null;
  block_lt?: WeiSource | null;
  block_gte?: WeiSource | null;
  block_lte?: WeiSource | null;
  block_in?: WeiSource[];
  block_not_in?: WeiSource[];
};
export type SynthExchangeResult = {
  id: string;
  account: string;
  from: string;
  fromCurrencyKey: string;
  fromSynth: string;
  fromAmount: Wei;
  fromAmountInUSD: Wei;
  toCurrencyKey: string;
  toSynth: string;
  toAmount: Wei;
  toAmountInUSD: Wei;
  feesInUSD: Wei;
  toAddress: string;
  timestamp: Wei;
  gasPrice: Wei;
  block: Wei;
};
export type SynthExchangeFields = {
  id: true;
  account: true;
  from: true;
  fromCurrencyKey: true;
  fromSynth: true;
  fromAmount: true;
  fromAmountInUSD: true;
  toCurrencyKey: true;
  toSynth: true;
  toAmount: true;
  toAmountInUSD: true;
  feesInUSD: true;
  toAddress: true;
  timestamp: true;
  gasPrice: true;
  block: true;
};
export type SynthExchangeArgs<K extends keyof SynthExchangeResult> = {
  [Property in keyof Pick<SynthExchangeFields, K>]: SynthExchangeFields[Property];
};
export const useGetSynthExchangeById = <K extends keyof SynthExchangeResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: SynthExchangeArgs<K>,
  queryOptions: UseQueryOptions<Pick<SynthExchangeResult, K>> = {}
) => {
  const func = async function <K extends keyof SynthExchangeResult>(
    url: string,
    options: SingleQueryOptions,
    args: SynthExchangeArgs<K>
  ): Promise<Pick<SynthExchangeResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('synthExchange', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['account']) formattedObj['account'] = obj['account'];
    if (obj['from']) formattedObj['from'] = obj['from'];
    if (obj['fromCurrencyKey']) formattedObj['fromCurrencyKey'] = obj['fromCurrencyKey'];
    if (obj['fromSynth']) formattedObj['fromSynth'] = obj['fromSynth'];
    if (obj['fromAmount']) formattedObj['fromAmount'] = wei(obj['fromAmount']);
    if (obj['fromAmountInUSD']) formattedObj['fromAmountInUSD'] = wei(obj['fromAmountInUSD']);
    if (obj['toCurrencyKey']) formattedObj['toCurrencyKey'] = obj['toCurrencyKey'];
    if (obj['toSynth']) formattedObj['toSynth'] = obj['toSynth'];
    if (obj['toAmount']) formattedObj['toAmount'] = wei(obj['toAmount']);
    if (obj['toAmountInUSD']) formattedObj['toAmountInUSD'] = wei(obj['toAmountInUSD']);
    if (obj['feesInUSD']) formattedObj['feesInUSD'] = wei(obj['feesInUSD']);
    if (obj['toAddress']) formattedObj['toAddress'] = obj['toAddress'];
    if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
    if (obj['gasPrice']) formattedObj['gasPrice'] = wei(obj['gasPrice'], 0);
    if (obj['block']) formattedObj['block'] = wei(obj['block'], 0);
    return formattedObj as Pick<SynthExchangeResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('SynthExchange', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetSynthExchanges = <K extends keyof SynthExchangeResult>(
  url: string,
  options?: MultiQueryOptions<SynthExchangeFilter, SynthExchangeResult>,
  args?: SynthExchangeArgs<K>,
  queryOptions: UseQueryOptions<Pick<SynthExchangeResult, K>[]> = {}
) => {
  const func = async function <K extends keyof SynthExchangeResult>(
    url: string,
    options: MultiQueryOptions<SynthExchangeFilter, SynthExchangeResult>,
    args: SynthExchangeArgs<K>
  ): Promise<Pick<SynthExchangeResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<SynthExchangeFilter, SynthExchangeResult>> = {
      ...options,
    };
    let paginationKey: keyof SynthExchangeFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof SynthExchangeFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<SynthExchangeResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('synthExchanges', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['account']) formattedObj['account'] = obj['account'];
        if (obj['from']) formattedObj['from'] = obj['from'];
        if (obj['fromCurrencyKey']) formattedObj['fromCurrencyKey'] = obj['fromCurrencyKey'];
        if (obj['fromSynth']) formattedObj['fromSynth'] = obj['fromSynth'];
        if (obj['fromAmount']) formattedObj['fromAmount'] = wei(obj['fromAmount']);
        if (obj['fromAmountInUSD']) formattedObj['fromAmountInUSD'] = wei(obj['fromAmountInUSD']);
        if (obj['toCurrencyKey']) formattedObj['toCurrencyKey'] = obj['toCurrencyKey'];
        if (obj['toSynth']) formattedObj['toSynth'] = obj['toSynth'];
        if (obj['toAmount']) formattedObj['toAmount'] = wei(obj['toAmount']);
        if (obj['toAmountInUSD']) formattedObj['toAmountInUSD'] = wei(obj['toAmountInUSD']);
        if (obj['feesInUSD']) formattedObj['feesInUSD'] = wei(obj['feesInUSD']);
        if (obj['toAddress']) formattedObj['toAddress'] = obj['toAddress'];
        if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
        if (obj['gasPrice']) formattedObj['gasPrice'] = wei(obj['gasPrice'], 0);
        if (obj['block']) formattedObj['block'] = wei(obj['block'], 0);
        return formattedObj as Pick<SynthExchangeResult, K>;
      });
      results = results.concat(newResults);
      if (newResults.length < 1000) {
        break;
      }
      if (paginationKey) {
        paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
      }
    } while (paginationKey && options.first && results.length < options.first);
    return options.first ? results.slice(0, options.first) : results;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('SynthExchanges', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type TotalFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  trades?: WeiSource | null;
  trades_not?: WeiSource | null;
  trades_gt?: WeiSource | null;
  trades_lt?: WeiSource | null;
  trades_gte?: WeiSource | null;
  trades_lte?: WeiSource | null;
  trades_in?: WeiSource[];
  trades_not_in?: WeiSource[];
  exchangers?: WeiSource | null;
  exchangers_not?: WeiSource | null;
  exchangers_gt?: WeiSource | null;
  exchangers_lt?: WeiSource | null;
  exchangers_gte?: WeiSource | null;
  exchangers_lte?: WeiSource | null;
  exchangers_in?: WeiSource[];
  exchangers_not_in?: WeiSource[];
  exchangeUSDTally?: WeiSource | null;
  exchangeUSDTally_not?: WeiSource | null;
  exchangeUSDTally_gt?: WeiSource | null;
  exchangeUSDTally_lt?: WeiSource | null;
  exchangeUSDTally_gte?: WeiSource | null;
  exchangeUSDTally_lte?: WeiSource | null;
  exchangeUSDTally_in?: WeiSource[];
  exchangeUSDTally_not_in?: WeiSource[];
  totalFeesGeneratedInUSD?: WeiSource | null;
  totalFeesGeneratedInUSD_not?: WeiSource | null;
  totalFeesGeneratedInUSD_gt?: WeiSource | null;
  totalFeesGeneratedInUSD_lt?: WeiSource | null;
  totalFeesGeneratedInUSD_gte?: WeiSource | null;
  totalFeesGeneratedInUSD_lte?: WeiSource | null;
  totalFeesGeneratedInUSD_in?: WeiSource[];
  totalFeesGeneratedInUSD_not_in?: WeiSource[];
};
export type TotalResult = {
  id: string;
  trades: Wei;
  exchangers: Wei;
  exchangeUSDTally: Wei;
  totalFeesGeneratedInUSD: Wei;
};
export type TotalFields = {
  id: true;
  trades: true;
  exchangers: true;
  exchangeUSDTally: true;
  totalFeesGeneratedInUSD: true;
};
export type TotalArgs<K extends keyof TotalResult> = {
  [Property in keyof Pick<TotalFields, K>]: TotalFields[Property];
};
export const useGetTotalById = <K extends keyof TotalResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: TotalArgs<K>,
  queryOptions: UseQueryOptions<Pick<TotalResult, K>> = {}
) => {
  const func = async function <K extends keyof TotalResult>(
    url: string,
    options: SingleQueryOptions,
    args: TotalArgs<K>
  ): Promise<Pick<TotalResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('total', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['trades']) formattedObj['trades'] = wei(obj['trades'], 0);
    if (obj['exchangers']) formattedObj['exchangers'] = wei(obj['exchangers'], 0);
    if (obj['exchangeUSDTally']) formattedObj['exchangeUSDTally'] = wei(obj['exchangeUSDTally']);
    if (obj['totalFeesGeneratedInUSD'])
      formattedObj['totalFeesGeneratedInUSD'] = wei(obj['totalFeesGeneratedInUSD']);
    return formattedObj as Pick<TotalResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('Total', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetTotals = <K extends keyof TotalResult>(
  url: string,
  options?: MultiQueryOptions<TotalFilter, TotalResult>,
  args?: TotalArgs<K>,
  queryOptions: UseQueryOptions<Pick<TotalResult, K>[]> = {}
) => {
  const func = async function <K extends keyof TotalResult>(
    url: string,
    options: MultiQueryOptions<TotalFilter, TotalResult>,
    args: TotalArgs<K>
  ): Promise<Pick<TotalResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<TotalFilter, TotalResult>> = { ...options };
    let paginationKey: keyof TotalFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof TotalFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<TotalResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('totals', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['trades']) formattedObj['trades'] = wei(obj['trades'], 0);
        if (obj['exchangers']) formattedObj['exchangers'] = wei(obj['exchangers'], 0);
        if (obj['exchangeUSDTally'])
          formattedObj['exchangeUSDTally'] = wei(obj['exchangeUSDTally']);
        if (obj['totalFeesGeneratedInUSD'])
          formattedObj['totalFeesGeneratedInUSD'] = wei(obj['totalFeesGeneratedInUSD']);
        return formattedObj as Pick<TotalResult, K>;
      });
      results = results.concat(newResults);
      if (newResults.length < 1000) {
        break;
      }
      if (paginationKey) {
        paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
      }
    } while (paginationKey && options.first && results.length < options.first);
    return options.first ? results.slice(0, options.first) : results;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('Totals', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};

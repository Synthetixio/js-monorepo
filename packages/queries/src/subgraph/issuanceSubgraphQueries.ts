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
export type ActiveStakerFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
};
export type ActiveStakerResult = {
  id: string;
};
export type ActiveStakerFields = {
  id: true;
};
export type ActiveStakerArgs<K extends keyof ActiveStakerResult> = {
  [Property in keyof Pick<ActiveStakerFields, K>]: ActiveStakerFields[Property];
};
export const useGetActiveStakerById = <K extends keyof ActiveStakerResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: ActiveStakerArgs<K>,
  queryOptions: UseQueryOptions<Pick<ActiveStakerResult, K>> = {}
) => {
  const func = async function <K extends keyof ActiveStakerResult>(
    url: string,
    options: SingleQueryOptions,
    args: ActiveStakerArgs<K>
  ): Promise<Pick<ActiveStakerResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('activeStaker', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    return formattedObj as Pick<ActiveStakerResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('ActiveStaker', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetActiveStakers = <K extends keyof ActiveStakerResult>(
  url: string,
  options?: MultiQueryOptions<ActiveStakerFilter, ActiveStakerResult>,
  args?: ActiveStakerArgs<K>,
  queryOptions: UseQueryOptions<Pick<ActiveStakerResult, K>[]> = {}
) => {
  const func = async function <K extends keyof ActiveStakerResult>(
    url: string,
    options: MultiQueryOptions<ActiveStakerFilter, ActiveStakerResult>,
    args: ActiveStakerArgs<K>
  ): Promise<Pick<ActiveStakerResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<ActiveStakerFilter, ActiveStakerResult>> = {
      ...options,
    };
    let paginationKey: keyof ActiveStakerFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof ActiveStakerFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<ActiveStakerResult, K>[] = [];
    do {
      if (paginationKey && paginationValue)
        paginatedOptions.where![paginationKey] = paginationValue as any;
      const res = await axios.post(url, {
        query: generateGql('activeStakers', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        return formattedObj as Pick<ActiveStakerResult, K>;
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
      enabled ? generateGql('ActiveStakers', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type BurnedFilter = {
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
  value?: WeiSource | null;
  value_not?: WeiSource | null;
  value_gt?: WeiSource | null;
  value_lt?: WeiSource | null;
  value_gte?: WeiSource | null;
  value_lte?: WeiSource | null;
  value_in?: WeiSource[];
  value_not_in?: WeiSource[];
  source?: string | null;
  source_not?: string | null;
  source_gt?: string | null;
  source_lt?: string | null;
  source_gte?: string | null;
  source_lte?: string | null;
  source_in?: string[];
  source_not_in?: string[];
  source_contains?: string | null;
  source_not_contains?: string | null;
  source_starts_with?: string | null;
  source_not_starts_with?: string | null;
  source_ends_with?: string | null;
  source_not_ends_with?: string | null;
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
export type BurnedResult = {
  id: string;
  account: string;
  value: Wei;
  source: string;
  timestamp: Wei;
  gasPrice: Wei;
  block: Wei;
};
export type BurnedFields = {
  id: true;
  account: true;
  value: true;
  source: true;
  timestamp: true;
  gasPrice: true;
  block: true;
};
export type BurnedArgs<K extends keyof BurnedResult> = {
  [Property in keyof Pick<BurnedFields, K>]: BurnedFields[Property];
};
export const useGetBurnedById = <K extends keyof BurnedResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: BurnedArgs<K>,
  queryOptions: UseQueryOptions<Pick<BurnedResult, K>> = {}
) => {
  const func = async function <K extends keyof BurnedResult>(
    url: string,
    options: SingleQueryOptions,
    args: BurnedArgs<K>
  ): Promise<Pick<BurnedResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('burned', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['account']) formattedObj['account'] = obj['account'];
    if (obj['value']) formattedObj['value'] = wei(obj['value']);
    if (obj['source']) formattedObj['source'] = obj['source'];
    if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
    if (obj['gasPrice']) formattedObj['gasPrice'] = wei(obj['gasPrice'], 0);
    if (obj['block']) formattedObj['block'] = wei(obj['block'], 0);
    return formattedObj as Pick<BurnedResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('Burned', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetBurneds = <K extends keyof BurnedResult>(
  url: string,
  options?: MultiQueryOptions<BurnedFilter, BurnedResult>,
  args?: BurnedArgs<K>,
  queryOptions: UseQueryOptions<Pick<BurnedResult, K>[]> = {}
) => {
  const func = async function <K extends keyof BurnedResult>(
    url: string,
    options: MultiQueryOptions<BurnedFilter, BurnedResult>,
    args: BurnedArgs<K>
  ): Promise<Pick<BurnedResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<BurnedFilter, BurnedResult>> = { ...options };
    let paginationKey: keyof BurnedFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof BurnedFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<BurnedResult, K>[] = [];
    do {
      if (paginationKey && paginationValue)
        paginatedOptions.where![paginationKey] = paginationValue as any;
      const res = await axios.post(url, {
        query: generateGql('burneds', paginatedOptions, args),
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
        if (obj['value']) formattedObj['value'] = wei(obj['value']);
        if (obj['source']) formattedObj['source'] = obj['source'];
        if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
        if (obj['gasPrice']) formattedObj['gasPrice'] = wei(obj['gasPrice'], 0);
        if (obj['block']) formattedObj['block'] = wei(obj['block'], 0);
        return formattedObj as Pick<BurnedResult, K>;
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
      enabled ? generateGql('Burneds', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type DailyBurnedFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  value?: WeiSource | null;
  value_not?: WeiSource | null;
  value_gt?: WeiSource | null;
  value_lt?: WeiSource | null;
  value_gte?: WeiSource | null;
  value_lte?: WeiSource | null;
  value_in?: WeiSource[];
  value_not_in?: WeiSource[];
  totalDebt?: WeiSource | null;
  totalDebt_not?: WeiSource | null;
  totalDebt_gt?: WeiSource | null;
  totalDebt_lt?: WeiSource | null;
  totalDebt_gte?: WeiSource | null;
  totalDebt_lte?: WeiSource | null;
  totalDebt_in?: WeiSource[];
  totalDebt_not_in?: WeiSource[];
};
export type DailyBurnedResult = {
  id: string;
  value: Wei;
  totalDebt: Wei;
};
export type DailyBurnedFields = {
  id: true;
  value: true;
  totalDebt: true;
};
export type DailyBurnedArgs<K extends keyof DailyBurnedResult> = {
  [Property in keyof Pick<DailyBurnedFields, K>]: DailyBurnedFields[Property];
};
export const useGetDailyBurnedById = <K extends keyof DailyBurnedResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: DailyBurnedArgs<K>,
  queryOptions: UseQueryOptions<Pick<DailyBurnedResult, K>> = {}
) => {
  const func = async function <K extends keyof DailyBurnedResult>(
    url: string,
    options: SingleQueryOptions,
    args: DailyBurnedArgs<K>
  ): Promise<Pick<DailyBurnedResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('dailyBurned', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['value']) formattedObj['value'] = wei(obj['value']);
    if (obj['totalDebt']) formattedObj['totalDebt'] = wei(obj['totalDebt']);
    return formattedObj as Pick<DailyBurnedResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('DailyBurned', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetDailyBurneds = <K extends keyof DailyBurnedResult>(
  url: string,
  options?: MultiQueryOptions<DailyBurnedFilter, DailyBurnedResult>,
  args?: DailyBurnedArgs<K>,
  queryOptions: UseQueryOptions<Pick<DailyBurnedResult, K>[]> = {}
) => {
  const func = async function <K extends keyof DailyBurnedResult>(
    url: string,
    options: MultiQueryOptions<DailyBurnedFilter, DailyBurnedResult>,
    args: DailyBurnedArgs<K>
  ): Promise<Pick<DailyBurnedResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<DailyBurnedFilter, DailyBurnedResult>> = {
      ...options,
    };
    let paginationKey: keyof DailyBurnedFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof DailyBurnedFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<DailyBurnedResult, K>[] = [];
    do {
      if (paginationKey && paginationValue)
        paginatedOptions.where![paginationKey] = paginationValue as any;
      const res = await axios.post(url, {
        query: generateGql('dailyBurneds', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['value']) formattedObj['value'] = wei(obj['value']);
        if (obj['totalDebt']) formattedObj['totalDebt'] = wei(obj['totalDebt']);
        return formattedObj as Pick<DailyBurnedResult, K>;
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
      enabled ? generateGql('DailyBurneds', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type DailyIssuedFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  value?: WeiSource | null;
  value_not?: WeiSource | null;
  value_gt?: WeiSource | null;
  value_lt?: WeiSource | null;
  value_gte?: WeiSource | null;
  value_lte?: WeiSource | null;
  value_in?: WeiSource[];
  value_not_in?: WeiSource[];
  totalDebt?: WeiSource | null;
  totalDebt_not?: WeiSource | null;
  totalDebt_gt?: WeiSource | null;
  totalDebt_lt?: WeiSource | null;
  totalDebt_gte?: WeiSource | null;
  totalDebt_lte?: WeiSource | null;
  totalDebt_in?: WeiSource[];
  totalDebt_not_in?: WeiSource[];
};
export type DailyIssuedResult = {
  id: string;
  value: Wei;
  totalDebt: Wei;
};
export type DailyIssuedFields = {
  id: true;
  value: true;
  totalDebt: true;
};
export type DailyIssuedArgs<K extends keyof DailyIssuedResult> = {
  [Property in keyof Pick<DailyIssuedFields, K>]: DailyIssuedFields[Property];
};
export const useGetDailyIssuedById = <K extends keyof DailyIssuedResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: DailyIssuedArgs<K>,
  queryOptions: UseQueryOptions<Pick<DailyIssuedResult, K>> = {}
) => {
  const func = async function <K extends keyof DailyIssuedResult>(
    url: string,
    options: SingleQueryOptions,
    args: DailyIssuedArgs<K>
  ): Promise<Pick<DailyIssuedResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('dailyIssued', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['value']) formattedObj['value'] = wei(obj['value']);
    if (obj['totalDebt']) formattedObj['totalDebt'] = wei(obj['totalDebt']);
    return formattedObj as Pick<DailyIssuedResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('DailyIssued', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetDailyIssueds = <K extends keyof DailyIssuedResult>(
  url: string,
  options?: MultiQueryOptions<DailyIssuedFilter, DailyIssuedResult>,
  args?: DailyIssuedArgs<K>,
  queryOptions: UseQueryOptions<Pick<DailyIssuedResult, K>[]> = {}
) => {
  const func = async function <K extends keyof DailyIssuedResult>(
    url: string,
    options: MultiQueryOptions<DailyIssuedFilter, DailyIssuedResult>,
    args: DailyIssuedArgs<K>
  ): Promise<Pick<DailyIssuedResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<DailyIssuedFilter, DailyIssuedResult>> = {
      ...options,
    };
    let paginationKey: keyof DailyIssuedFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof DailyIssuedFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<DailyIssuedResult, K>[] = [];
    do {
      if (paginationKey && paginationValue)
        paginatedOptions.where![paginationKey] = paginationValue as any;
      const res = await axios.post(url, {
        query: generateGql('dailyIssueds', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['value']) formattedObj['value'] = wei(obj['value']);
        if (obj['totalDebt']) formattedObj['totalDebt'] = wei(obj['totalDebt']);
        return formattedObj as Pick<DailyIssuedResult, K>;
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
      enabled ? generateGql('DailyIssueds', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type DebtSnapshotFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
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
  account?: string | null;
  account_not?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  balanceOf?: WeiSource | null;
  balanceOf_not?: WeiSource | null;
  balanceOf_gt?: WeiSource | null;
  balanceOf_lt?: WeiSource | null;
  balanceOf_gte?: WeiSource | null;
  balanceOf_lte?: WeiSource | null;
  balanceOf_in?: WeiSource[];
  balanceOf_not_in?: WeiSource[];
  collateral?: WeiSource | null;
  collateral_not?: WeiSource | null;
  collateral_gt?: WeiSource | null;
  collateral_lt?: WeiSource | null;
  collateral_gte?: WeiSource | null;
  collateral_lte?: WeiSource | null;
  collateral_in?: WeiSource[];
  collateral_not_in?: WeiSource[];
  debtBalanceOf?: WeiSource | null;
  debtBalanceOf_not?: WeiSource | null;
  debtBalanceOf_gt?: WeiSource | null;
  debtBalanceOf_lt?: WeiSource | null;
  debtBalanceOf_gte?: WeiSource | null;
  debtBalanceOf_lte?: WeiSource | null;
  debtBalanceOf_in?: WeiSource[];
  debtBalanceOf_not_in?: WeiSource[];
};
export type DebtSnapshotResult = {
  id: string;
  block: Wei;
  timestamp: Wei;
  account: string;
  balanceOf: Wei | null;
  collateral: Wei | null;
  debtBalanceOf: Wei | null;
};
export type DebtSnapshotFields = {
  id: true;
  block: true;
  timestamp: true;
  account: true;
  balanceOf: true;
  collateral: true;
  debtBalanceOf: true;
};
export type DebtSnapshotArgs<K extends keyof DebtSnapshotResult> = {
  [Property in keyof Pick<DebtSnapshotFields, K>]: DebtSnapshotFields[Property];
};
export const useGetDebtSnapshotById = <K extends keyof DebtSnapshotResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: DebtSnapshotArgs<K>,
  queryOptions: UseQueryOptions<Pick<DebtSnapshotResult, K>> = {}
) => {
  const func = async function <K extends keyof DebtSnapshotResult>(
    url: string,
    options: SingleQueryOptions,
    args: DebtSnapshotArgs<K>
  ): Promise<Pick<DebtSnapshotResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('debtSnapshot', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['block']) formattedObj['block'] = wei(obj['block'], 0);
    if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
    if (obj['account']) formattedObj['account'] = obj['account'];
    if (obj['balanceOf']) formattedObj['balanceOf'] = wei(obj['balanceOf']);
    if (obj['collateral']) formattedObj['collateral'] = wei(obj['collateral']);
    if (obj['debtBalanceOf']) formattedObj['debtBalanceOf'] = wei(obj['debtBalanceOf']);
    return formattedObj as Pick<DebtSnapshotResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('DebtSnapshot', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetDebtSnapshots = <K extends keyof DebtSnapshotResult>(
  url: string,
  options?: MultiQueryOptions<DebtSnapshotFilter, DebtSnapshotResult>,
  args?: DebtSnapshotArgs<K>,
  queryOptions: UseQueryOptions<Pick<DebtSnapshotResult, K>[]> = {}
) => {
  const func = async function <K extends keyof DebtSnapshotResult>(
    url: string,
    options: MultiQueryOptions<DebtSnapshotFilter, DebtSnapshotResult>,
    args: DebtSnapshotArgs<K>
  ): Promise<Pick<DebtSnapshotResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<DebtSnapshotFilter, DebtSnapshotResult>> = {
      ...options,
    };
    let paginationKey: keyof DebtSnapshotFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof DebtSnapshotFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<DebtSnapshotResult, K>[] = [];
    do {
      if (paginationKey && paginationValue)
        paginatedOptions.where![paginationKey] = paginationValue as any;
      const res = await axios.post(url, {
        query: generateGql('debtSnapshots', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['block']) formattedObj['block'] = wei(obj['block'], 0);
        if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
        if (obj['account']) formattedObj['account'] = obj['account'];
        if (obj['balanceOf']) formattedObj['balanceOf'] = wei(obj['balanceOf']);
        if (obj['collateral']) formattedObj['collateral'] = wei(obj['collateral']);
        if (obj['debtBalanceOf']) formattedObj['debtBalanceOf'] = wei(obj['debtBalanceOf']);
        return formattedObj as Pick<DebtSnapshotResult, K>;
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
      enabled ? generateGql('DebtSnapshots', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type FeesClaimedFilter = {
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
  value?: WeiSource | null;
  value_not?: WeiSource | null;
  value_gt?: WeiSource | null;
  value_lt?: WeiSource | null;
  value_gte?: WeiSource | null;
  value_lte?: WeiSource | null;
  value_in?: WeiSource[];
  value_not_in?: WeiSource[];
  rewards?: WeiSource | null;
  rewards_not?: WeiSource | null;
  rewards_gt?: WeiSource | null;
  rewards_lt?: WeiSource | null;
  rewards_gte?: WeiSource | null;
  rewards_lte?: WeiSource | null;
  rewards_in?: WeiSource[];
  rewards_not_in?: WeiSource[];
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
export type FeesClaimedResult = {
  id: string;
  account: string;
  value: Wei;
  rewards: Wei;
  block: Wei;
  timestamp: Wei;
};
export type FeesClaimedFields = {
  id: true;
  account: true;
  value: true;
  rewards: true;
  block: true;
  timestamp: true;
};
export type FeesClaimedArgs<K extends keyof FeesClaimedResult> = {
  [Property in keyof Pick<FeesClaimedFields, K>]: FeesClaimedFields[Property];
};
export const useGetFeesClaimedById = <K extends keyof FeesClaimedResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: FeesClaimedArgs<K>,
  queryOptions: UseQueryOptions<Pick<FeesClaimedResult, K>> = {}
) => {
  const func = async function <K extends keyof FeesClaimedResult>(
    url: string,
    options: SingleQueryOptions,
    args: FeesClaimedArgs<K>
  ): Promise<Pick<FeesClaimedResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('feesClaimed', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['account']) formattedObj['account'] = obj['account'];
    if (obj['value']) formattedObj['value'] = wei(obj['value']);
    if (obj['rewards']) formattedObj['rewards'] = wei(obj['rewards']);
    if (obj['block']) formattedObj['block'] = wei(obj['block'], 0);
    if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
    return formattedObj as Pick<FeesClaimedResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('FeesClaimed', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetFeesClaimeds = <K extends keyof FeesClaimedResult>(
  url: string,
  options?: MultiQueryOptions<FeesClaimedFilter, FeesClaimedResult>,
  args?: FeesClaimedArgs<K>,
  queryOptions: UseQueryOptions<Pick<FeesClaimedResult, K>[]> = {}
) => {
  const func = async function <K extends keyof FeesClaimedResult>(
    url: string,
    options: MultiQueryOptions<FeesClaimedFilter, FeesClaimedResult>,
    args: FeesClaimedArgs<K>
  ): Promise<Pick<FeesClaimedResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<FeesClaimedFilter, FeesClaimedResult>> = {
      ...options,
    };
    let paginationKey: keyof FeesClaimedFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof FeesClaimedFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<FeesClaimedResult, K>[] = [];
    do {
      if (paginationKey && paginationValue)
        paginatedOptions.where![paginationKey] = paginationValue as any;
      const res = await axios.post(url, {
        query: generateGql('feesClaimeds', paginatedOptions, args),
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
        if (obj['value']) formattedObj['value'] = wei(obj['value']);
        if (obj['rewards']) formattedObj['rewards'] = wei(obj['rewards']);
        if (obj['block']) formattedObj['block'] = wei(obj['block'], 0);
        if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
        return formattedObj as Pick<FeesClaimedResult, K>;
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
      enabled ? generateGql('FeesClaimeds', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type IssuedFilter = {
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
  value?: WeiSource | null;
  value_not?: WeiSource | null;
  value_gt?: WeiSource | null;
  value_lt?: WeiSource | null;
  value_gte?: WeiSource | null;
  value_lte?: WeiSource | null;
  value_in?: WeiSource[];
  value_not_in?: WeiSource[];
  source?: string | null;
  source_not?: string | null;
  source_gt?: string | null;
  source_lt?: string | null;
  source_gte?: string | null;
  source_lte?: string | null;
  source_in?: string[];
  source_not_in?: string[];
  source_contains?: string | null;
  source_not_contains?: string | null;
  source_starts_with?: string | null;
  source_not_starts_with?: string | null;
  source_ends_with?: string | null;
  source_not_ends_with?: string | null;
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
export type IssuedResult = {
  id: string;
  account: string;
  value: Wei;
  source: string;
  timestamp: Wei;
  gasPrice: Wei;
  block: Wei;
};
export type IssuedFields = {
  id: true;
  account: true;
  value: true;
  source: true;
  timestamp: true;
  gasPrice: true;
  block: true;
};
export type IssuedArgs<K extends keyof IssuedResult> = {
  [Property in keyof Pick<IssuedFields, K>]: IssuedFields[Property];
};
export const useGetIssuedById = <K extends keyof IssuedResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: IssuedArgs<K>,
  queryOptions: UseQueryOptions<Pick<IssuedResult, K>> = {}
) => {
  const func = async function <K extends keyof IssuedResult>(
    url: string,
    options: SingleQueryOptions,
    args: IssuedArgs<K>
  ): Promise<Pick<IssuedResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('issued', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['account']) formattedObj['account'] = obj['account'];
    if (obj['value']) formattedObj['value'] = wei(obj['value']);
    if (obj['source']) formattedObj['source'] = obj['source'];
    if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
    if (obj['gasPrice']) formattedObj['gasPrice'] = wei(obj['gasPrice'], 0);
    if (obj['block']) formattedObj['block'] = wei(obj['block'], 0);
    return formattedObj as Pick<IssuedResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('Issued', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetIssueds = <K extends keyof IssuedResult>(
  url: string,
  options?: MultiQueryOptions<IssuedFilter, IssuedResult>,
  args?: IssuedArgs<K>,
  queryOptions: UseQueryOptions<Pick<IssuedResult, K>[]> = {}
) => {
  const func = async function <K extends keyof IssuedResult>(
    url: string,
    options: MultiQueryOptions<IssuedFilter, IssuedResult>,
    args: IssuedArgs<K>
  ): Promise<Pick<IssuedResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<IssuedFilter, IssuedResult>> = { ...options };
    let paginationKey: keyof IssuedFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof IssuedFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<IssuedResult, K>[] = [];
    do {
      if (paginationKey && paginationValue)
        paginatedOptions.where![paginationKey] = paginationValue as any;
      const res = await axios.post(url, {
        query: generateGql('issueds', paginatedOptions, args),
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
        if (obj['value']) formattedObj['value'] = wei(obj['value']);
        if (obj['source']) formattedObj['source'] = obj['source'];
        if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
        if (obj['gasPrice']) formattedObj['gasPrice'] = wei(obj['gasPrice'], 0);
        if (obj['block']) formattedObj['block'] = wei(obj['block'], 0);
        return formattedObj as Pick<IssuedResult, K>;
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
      enabled ? generateGql('Issueds', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type IssuerFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
};
export type IssuerResult = {
  id: string;
};
export type IssuerFields = {
  id: true;
};
export type IssuerArgs<K extends keyof IssuerResult> = {
  [Property in keyof Pick<IssuerFields, K>]: IssuerFields[Property];
};
export const useGetIssuerById = <K extends keyof IssuerResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: IssuerArgs<K>,
  queryOptions: UseQueryOptions<Pick<IssuerResult, K>> = {}
) => {
  const func = async function <K extends keyof IssuerResult>(
    url: string,
    options: SingleQueryOptions,
    args: IssuerArgs<K>
  ): Promise<Pick<IssuerResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('issuer', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    return formattedObj as Pick<IssuerResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('Issuer', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetIssuers = <K extends keyof IssuerResult>(
  url: string,
  options?: MultiQueryOptions<IssuerFilter, IssuerResult>,
  args?: IssuerArgs<K>,
  queryOptions: UseQueryOptions<Pick<IssuerResult, K>[]> = {}
) => {
  const func = async function <K extends keyof IssuerResult>(
    url: string,
    options: MultiQueryOptions<IssuerFilter, IssuerResult>,
    args: IssuerArgs<K>
  ): Promise<Pick<IssuerResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<IssuerFilter, IssuerResult>> = { ...options };
    let paginationKey: keyof IssuerFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof IssuerFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<IssuerResult, K>[] = [];
    do {
      if (paginationKey && paginationValue)
        paginatedOptions.where![paginationKey] = paginationValue as any;
      const res = await axios.post(url, {
        query: generateGql('issuers', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        return formattedObj as Pick<IssuerResult, K>;
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
      enabled ? generateGql('Issuers', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type RewardEscrowHolderFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  balanceOf?: WeiSource | null;
  balanceOf_not?: WeiSource | null;
  balanceOf_gt?: WeiSource | null;
  balanceOf_lt?: WeiSource | null;
  balanceOf_gte?: WeiSource | null;
  balanceOf_lte?: WeiSource | null;
  balanceOf_in?: WeiSource[];
  balanceOf_not_in?: WeiSource[];
  vestedBalanceOf?: WeiSource | null;
  vestedBalanceOf_not?: WeiSource | null;
  vestedBalanceOf_gt?: WeiSource | null;
  vestedBalanceOf_lt?: WeiSource | null;
  vestedBalanceOf_gte?: WeiSource | null;
  vestedBalanceOf_lte?: WeiSource | null;
  vestedBalanceOf_in?: WeiSource[];
  vestedBalanceOf_not_in?: WeiSource[];
};
export type RewardEscrowHolderResult = {
  id: string;
  balanceOf: Wei;
  vestedBalanceOf: Wei;
};
export type RewardEscrowHolderFields = {
  id: true;
  balanceOf: true;
  vestedBalanceOf: true;
};
export type RewardEscrowHolderArgs<K extends keyof RewardEscrowHolderResult> = {
  [Property in keyof Pick<RewardEscrowHolderFields, K>]: RewardEscrowHolderFields[Property];
};
export const useGetRewardEscrowHolderById = <K extends keyof RewardEscrowHolderResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: RewardEscrowHolderArgs<K>,
  queryOptions: UseQueryOptions<Pick<RewardEscrowHolderResult, K>> = {}
) => {
  const func = async function <K extends keyof RewardEscrowHolderResult>(
    url: string,
    options: SingleQueryOptions,
    args: RewardEscrowHolderArgs<K>
  ): Promise<Pick<RewardEscrowHolderResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('rewardEscrowHolder', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['balanceOf']) formattedObj['balanceOf'] = wei(obj['balanceOf']);
    if (obj['vestedBalanceOf']) formattedObj['vestedBalanceOf'] = wei(obj['vestedBalanceOf']);
    return formattedObj as Pick<RewardEscrowHolderResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('RewardEscrowHolder', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetRewardEscrowHolders = <K extends keyof RewardEscrowHolderResult>(
  url: string,
  options?: MultiQueryOptions<RewardEscrowHolderFilter, RewardEscrowHolderResult>,
  args?: RewardEscrowHolderArgs<K>,
  queryOptions: UseQueryOptions<Pick<RewardEscrowHolderResult, K>[]> = {}
) => {
  const func = async function <K extends keyof RewardEscrowHolderResult>(
    url: string,
    options: MultiQueryOptions<RewardEscrowHolderFilter, RewardEscrowHolderResult>,
    args: RewardEscrowHolderArgs<K>
  ): Promise<Pick<RewardEscrowHolderResult, K>[]> {
    const paginatedOptions: Partial<
      MultiQueryOptions<RewardEscrowHolderFilter, RewardEscrowHolderResult>
    > = { ...options };
    let paginationKey: keyof RewardEscrowHolderFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc'
          ? '_gt'
          : '_lt')) as keyof RewardEscrowHolderFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<RewardEscrowHolderResult, K>[] = [];
    do {
      if (paginationKey && paginationValue)
        paginatedOptions.where![paginationKey] = paginationValue as any;
      const res = await axios.post(url, {
        query: generateGql('rewardEscrowHolders', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['balanceOf']) formattedObj['balanceOf'] = wei(obj['balanceOf']);
        if (obj['vestedBalanceOf']) formattedObj['vestedBalanceOf'] = wei(obj['vestedBalanceOf']);
        return formattedObj as Pick<RewardEscrowHolderResult, K>;
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
      enabled ? generateGql('RewardEscrowHolders', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type SNXHolderFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
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
  balanceOf?: WeiSource | null;
  balanceOf_not?: WeiSource | null;
  balanceOf_gt?: WeiSource | null;
  balanceOf_lt?: WeiSource | null;
  balanceOf_gte?: WeiSource | null;
  balanceOf_lte?: WeiSource | null;
  balanceOf_in?: WeiSource[];
  balanceOf_not_in?: WeiSource[];
  collateral?: WeiSource | null;
  collateral_not?: WeiSource | null;
  collateral_gt?: WeiSource | null;
  collateral_lt?: WeiSource | null;
  collateral_gte?: WeiSource | null;
  collateral_lte?: WeiSource | null;
  collateral_in?: WeiSource[];
  collateral_not_in?: WeiSource[];
  transferable?: WeiSource | null;
  transferable_not?: WeiSource | null;
  transferable_gt?: WeiSource | null;
  transferable_lt?: WeiSource | null;
  transferable_gte?: WeiSource | null;
  transferable_lte?: WeiSource | null;
  transferable_in?: WeiSource[];
  transferable_not_in?: WeiSource[];
  initialDebtOwnership?: WeiSource | null;
  initialDebtOwnership_not?: WeiSource | null;
  initialDebtOwnership_gt?: WeiSource | null;
  initialDebtOwnership_lt?: WeiSource | null;
  initialDebtOwnership_gte?: WeiSource | null;
  initialDebtOwnership_lte?: WeiSource | null;
  initialDebtOwnership_in?: WeiSource[];
  initialDebtOwnership_not_in?: WeiSource[];
  debtEntryAtIndex?: WeiSource | null;
  debtEntryAtIndex_not?: WeiSource | null;
  debtEntryAtIndex_gt?: WeiSource | null;
  debtEntryAtIndex_lt?: WeiSource | null;
  debtEntryAtIndex_gte?: WeiSource | null;
  debtEntryAtIndex_lte?: WeiSource | null;
  debtEntryAtIndex_in?: WeiSource[];
  debtEntryAtIndex_not_in?: WeiSource[];
  claims?: WeiSource | null;
  claims_not?: WeiSource | null;
  claims_gt?: WeiSource | null;
  claims_lt?: WeiSource | null;
  claims_gte?: WeiSource | null;
  claims_lte?: WeiSource | null;
  claims_in?: WeiSource[];
  claims_not_in?: WeiSource[];
  mints?: WeiSource | null;
  mints_not?: WeiSource | null;
  mints_gt?: WeiSource | null;
  mints_lt?: WeiSource | null;
  mints_gte?: WeiSource | null;
  mints_lte?: WeiSource | null;
  mints_in?: WeiSource[];
  mints_not_in?: WeiSource[];
};
export type SNXHolderResult = {
  id: string;
  block: Wei;
  timestamp: Wei;
  balanceOf: Wei | null;
  collateral: Wei | null;
  transferable: Wei | null;
  initialDebtOwnership: Wei | null;
  debtEntryAtIndex: Wei | null;
  claims: Wei | null;
  mints: Wei | null;
};
export type SNXHolderFields = {
  id: true;
  block: true;
  timestamp: true;
  balanceOf: true;
  collateral: true;
  transferable: true;
  initialDebtOwnership: true;
  debtEntryAtIndex: true;
  claims: true;
  mints: true;
};
export type SNXHolderArgs<K extends keyof SNXHolderResult> = {
  [Property in keyof Pick<SNXHolderFields, K>]: SNXHolderFields[Property];
};
export const useGetSNXHolderById = <K extends keyof SNXHolderResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: SNXHolderArgs<K>,
  queryOptions: UseQueryOptions<Pick<SNXHolderResult, K>> = {}
) => {
  const func = async function <K extends keyof SNXHolderResult>(
    url: string,
    options: SingleQueryOptions,
    args: SNXHolderArgs<K>
  ): Promise<Pick<SNXHolderResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('snxholder', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['block']) formattedObj['block'] = wei(obj['block'], 0);
    if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
    if (obj['balanceOf']) formattedObj['balanceOf'] = wei(obj['balanceOf']);
    if (obj['collateral']) formattedObj['collateral'] = wei(obj['collateral']);
    if (obj['transferable']) formattedObj['transferable'] = wei(obj['transferable']);
    if (obj['initialDebtOwnership'])
      formattedObj['initialDebtOwnership'] = wei(obj['initialDebtOwnership'], 0);
    if (obj['debtEntryAtIndex']) formattedObj['debtEntryAtIndex'] = wei(obj['debtEntryAtIndex'], 0);
    if (obj['claims']) formattedObj['claims'] = wei(obj['claims'], 0);
    if (obj['mints']) formattedObj['mints'] = wei(obj['mints'], 0);
    return formattedObj as Pick<SNXHolderResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('SNXHolder', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetSNXHolders = <K extends keyof SNXHolderResult>(
  url: string,
  options?: MultiQueryOptions<SNXHolderFilter, SNXHolderResult>,
  args?: SNXHolderArgs<K>,
  queryOptions: UseQueryOptions<Pick<SNXHolderResult, K>[]> = {}
) => {
  const func = async function <K extends keyof SNXHolderResult>(
    url: string,
    options: MultiQueryOptions<SNXHolderFilter, SNXHolderResult>,
    args: SNXHolderArgs<K>
  ): Promise<Pick<SNXHolderResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<SNXHolderFilter, SNXHolderResult>> = {
      ...options,
    };
    let paginationKey: keyof SNXHolderFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof SNXHolderFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<SNXHolderResult, K>[] = [];
    do {
      if (paginationKey && paginationValue)
        paginatedOptions.where![paginationKey] = paginationValue as any;
      const res = await axios.post(url, {
        query: generateGql('snxholders', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['block']) formattedObj['block'] = wei(obj['block'], 0);
        if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
        if (obj['balanceOf']) formattedObj['balanceOf'] = wei(obj['balanceOf']);
        if (obj['collateral']) formattedObj['collateral'] = wei(obj['collateral']);
        if (obj['transferable']) formattedObj['transferable'] = wei(obj['transferable']);
        if (obj['initialDebtOwnership'])
          formattedObj['initialDebtOwnership'] = wei(obj['initialDebtOwnership'], 0);
        if (obj['debtEntryAtIndex'])
          formattedObj['debtEntryAtIndex'] = wei(obj['debtEntryAtIndex'], 0);
        if (obj['claims']) formattedObj['claims'] = wei(obj['claims'], 0);
        if (obj['mints']) formattedObj['mints'] = wei(obj['mints'], 0);
        return formattedObj as Pick<SNXHolderResult, K>;
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
      enabled ? generateGql('SNXHolders', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type SynthHolderFilter = {
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
  balanceOf?: WeiSource | null;
  balanceOf_not?: WeiSource | null;
  balanceOf_gt?: WeiSource | null;
  balanceOf_lt?: WeiSource | null;
  balanceOf_gte?: WeiSource | null;
  balanceOf_lte?: WeiSource | null;
  balanceOf_in?: WeiSource[];
  balanceOf_not_in?: WeiSource[];
};
export type SynthHolderResult = {
  id: string;
  synth: string;
  balanceOf: Wei;
};
export type SynthHolderFields = {
  id: true;
  synth: true;
  balanceOf: true;
};
export type SynthHolderArgs<K extends keyof SynthHolderResult> = {
  [Property in keyof Pick<SynthHolderFields, K>]: SynthHolderFields[Property];
};
export const useGetSynthHolderById = <K extends keyof SynthHolderResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: SynthHolderArgs<K>,
  queryOptions: UseQueryOptions<Pick<SynthHolderResult, K>> = {}
) => {
  const func = async function <K extends keyof SynthHolderResult>(
    url: string,
    options: SingleQueryOptions,
    args: SynthHolderArgs<K>
  ): Promise<Pick<SynthHolderResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('synthHolder', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['synth']) formattedObj['synth'] = obj['synth'];
    if (obj['balanceOf']) formattedObj['balanceOf'] = wei(obj['balanceOf']);
    return formattedObj as Pick<SynthHolderResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('SynthHolder', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetSynthHolders = <K extends keyof SynthHolderResult>(
  url: string,
  options?: MultiQueryOptions<SynthHolderFilter, SynthHolderResult>,
  args?: SynthHolderArgs<K>,
  queryOptions: UseQueryOptions<Pick<SynthHolderResult, K>[]> = {}
) => {
  const func = async function <K extends keyof SynthHolderResult>(
    url: string,
    options: MultiQueryOptions<SynthHolderFilter, SynthHolderResult>,
    args: SynthHolderArgs<K>
  ): Promise<Pick<SynthHolderResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<SynthHolderFilter, SynthHolderResult>> = {
      ...options,
    };
    let paginationKey: keyof SynthHolderFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof SynthHolderFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<SynthHolderResult, K>[] = [];
    do {
      if (paginationKey && paginationValue)
        paginatedOptions.where![paginationKey] = paginationValue as any;
      const res = await axios.post(url, {
        query: generateGql('synthHolders', paginatedOptions, args),
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
        if (obj['balanceOf']) formattedObj['balanceOf'] = wei(obj['balanceOf']);
        return formattedObj as Pick<SynthHolderResult, K>;
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
      enabled ? generateGql('SynthHolders', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type SynthetixFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  issuers?: WeiSource | null;
  issuers_not?: WeiSource | null;
  issuers_gt?: WeiSource | null;
  issuers_lt?: WeiSource | null;
  issuers_gte?: WeiSource | null;
  issuers_lte?: WeiSource | null;
  issuers_in?: WeiSource[];
  issuers_not_in?: WeiSource[];
  snxHolders?: WeiSource | null;
  snxHolders_not?: WeiSource | null;
  snxHolders_gt?: WeiSource | null;
  snxHolders_lt?: WeiSource | null;
  snxHolders_gte?: WeiSource | null;
  snxHolders_lte?: WeiSource | null;
  snxHolders_in?: WeiSource[];
  snxHolders_not_in?: WeiSource[];
};
export type SynthetixResult = {
  id: string;
  issuers: Wei;
  snxHolders: Wei;
};
export type SynthetixFields = {
  id: true;
  issuers: true;
  snxHolders: true;
};
export type SynthetixArgs<K extends keyof SynthetixResult> = {
  [Property in keyof Pick<SynthetixFields, K>]: SynthetixFields[Property];
};
export const useGetSynthetixById = <K extends keyof SynthetixResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: SynthetixArgs<K>,
  queryOptions: UseQueryOptions<Pick<SynthetixResult, K>> = {}
) => {
  const func = async function <K extends keyof SynthetixResult>(
    url: string,
    options: SingleQueryOptions,
    args: SynthetixArgs<K>
  ): Promise<Pick<SynthetixResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('synthetix', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['issuers']) formattedObj['issuers'] = wei(obj['issuers'], 0);
    if (obj['snxHolders']) formattedObj['snxHolders'] = wei(obj['snxHolders'], 0);
    return formattedObj as Pick<SynthetixResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('Synthetix', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetSynthetixs = <K extends keyof SynthetixResult>(
  url: string,
  options?: MultiQueryOptions<SynthetixFilter, SynthetixResult>,
  args?: SynthetixArgs<K>,
  queryOptions: UseQueryOptions<Pick<SynthetixResult, K>[]> = {}
) => {
  const func = async function <K extends keyof SynthetixResult>(
    url: string,
    options: MultiQueryOptions<SynthetixFilter, SynthetixResult>,
    args: SynthetixArgs<K>
  ): Promise<Pick<SynthetixResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<SynthetixFilter, SynthetixResult>> = {
      ...options,
    };
    let paginationKey: keyof SynthetixFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof SynthetixFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<SynthetixResult, K>[] = [];
    do {
      if (paginationKey && paginationValue)
        paginatedOptions.where![paginationKey] = paginationValue as any;
      const res = await axios.post(url, {
        query: generateGql('synthetixs', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['issuers']) formattedObj['issuers'] = wei(obj['issuers'], 0);
        if (obj['snxHolders']) formattedObj['snxHolders'] = wei(obj['snxHolders'], 0);
        return formattedObj as Pick<SynthetixResult, K>;
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
      enabled ? generateGql('Synthetixs', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type TotalActiveStakerFilter = {
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
};
export type TotalActiveStakerResult = {
  id: string;
  count: Wei;
};
export type TotalActiveStakerFields = {
  id: true;
  count: true;
};
export type TotalActiveStakerArgs<K extends keyof TotalActiveStakerResult> = {
  [Property in keyof Pick<TotalActiveStakerFields, K>]: TotalActiveStakerFields[Property];
};
export const useGetTotalActiveStakerById = <K extends keyof TotalActiveStakerResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: TotalActiveStakerArgs<K>,
  queryOptions: UseQueryOptions<Pick<TotalActiveStakerResult, K>> = {}
) => {
  const func = async function <K extends keyof TotalActiveStakerResult>(
    url: string,
    options: SingleQueryOptions,
    args: TotalActiveStakerArgs<K>
  ): Promise<Pick<TotalActiveStakerResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('totalActiveStaker', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['count']) formattedObj['count'] = wei(obj['count'], 0);
    return formattedObj as Pick<TotalActiveStakerResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('TotalActiveStaker', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetTotalActiveStakers = <K extends keyof TotalActiveStakerResult>(
  url: string,
  options?: MultiQueryOptions<TotalActiveStakerFilter, TotalActiveStakerResult>,
  args?: TotalActiveStakerArgs<K>,
  queryOptions: UseQueryOptions<Pick<TotalActiveStakerResult, K>[]> = {}
) => {
  const func = async function <K extends keyof TotalActiveStakerResult>(
    url: string,
    options: MultiQueryOptions<TotalActiveStakerFilter, TotalActiveStakerResult>,
    args: TotalActiveStakerArgs<K>
  ): Promise<Pick<TotalActiveStakerResult, K>[]> {
    const paginatedOptions: Partial<
      MultiQueryOptions<TotalActiveStakerFilter, TotalActiveStakerResult>
    > = { ...options };
    let paginationKey: keyof TotalActiveStakerFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc'
          ? '_gt'
          : '_lt')) as keyof TotalActiveStakerFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<TotalActiveStakerResult, K>[] = [];
    do {
      if (paginationKey && paginationValue)
        paginatedOptions.where![paginationKey] = paginationValue as any;
      const res = await axios.post(url, {
        query: generateGql('totalActiveStakers', paginatedOptions, args),
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
        return formattedObj as Pick<TotalActiveStakerResult, K>;
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
      enabled ? generateGql('TotalActiveStakers', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type TotalDailyActiveStakerFilter = {
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
  count?: WeiSource | null;
  count_not?: WeiSource | null;
  count_gt?: WeiSource | null;
  count_lt?: WeiSource | null;
  count_gte?: WeiSource | null;
  count_lte?: WeiSource | null;
  count_in?: WeiSource[];
  count_not_in?: WeiSource[];
};
export type TotalDailyActiveStakerResult = {
  id: string;
  timestamp: Wei;
  count: Wei;
};
export type TotalDailyActiveStakerFields = {
  id: true;
  timestamp: true;
  count: true;
};
export type TotalDailyActiveStakerArgs<K extends keyof TotalDailyActiveStakerResult> = {
  [Property in keyof Pick<TotalDailyActiveStakerFields, K>]: TotalDailyActiveStakerFields[Property];
};
export const useGetTotalDailyActiveStakerById = <K extends keyof TotalDailyActiveStakerResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: TotalDailyActiveStakerArgs<K>,
  queryOptions: UseQueryOptions<Pick<TotalDailyActiveStakerResult, K>> = {}
) => {
  const func = async function <K extends keyof TotalDailyActiveStakerResult>(
    url: string,
    options: SingleQueryOptions,
    args: TotalDailyActiveStakerArgs<K>
  ): Promise<Pick<TotalDailyActiveStakerResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('totalDailyActiveStaker', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
    if (obj['count']) formattedObj['count'] = wei(obj['count'], 0);
    return formattedObj as Pick<TotalDailyActiveStakerResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('TotalDailyActiveStaker', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetTotalDailyActiveStakers = <K extends keyof TotalDailyActiveStakerResult>(
  url: string,
  options?: MultiQueryOptions<TotalDailyActiveStakerFilter, TotalDailyActiveStakerResult>,
  args?: TotalDailyActiveStakerArgs<K>,
  queryOptions: UseQueryOptions<Pick<TotalDailyActiveStakerResult, K>[]> = {}
) => {
  const func = async function <K extends keyof TotalDailyActiveStakerResult>(
    url: string,
    options: MultiQueryOptions<TotalDailyActiveStakerFilter, TotalDailyActiveStakerResult>,
    args: TotalDailyActiveStakerArgs<K>
  ): Promise<Pick<TotalDailyActiveStakerResult, K>[]> {
    const paginatedOptions: Partial<
      MultiQueryOptions<TotalDailyActiveStakerFilter, TotalDailyActiveStakerResult>
    > = { ...options };
    let paginationKey: keyof TotalDailyActiveStakerFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc'
          ? '_gt'
          : '_lt')) as keyof TotalDailyActiveStakerFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<TotalDailyActiveStakerResult, K>[] = [];
    do {
      if (paginationKey && paginationValue)
        paginatedOptions.where![paginationKey] = paginationValue as any;
      const res = await axios.post(url, {
        query: generateGql('totalDailyActiveStakers', paginatedOptions, args),
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
        if (obj['count']) formattedObj['count'] = wei(obj['count'], 0);
        return formattedObj as Pick<TotalDailyActiveStakerResult, K>;
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
      enabled ? generateGql('TotalDailyActiveStakers', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};

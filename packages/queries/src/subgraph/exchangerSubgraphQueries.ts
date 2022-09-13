// !!! DO NOT EDIT !!! Automatically generated file
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
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
export type DailyExchangePartnerFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  usdVolume?: WeiSource | null;
  usdVolume_not?: WeiSource | null;
  usdVolume_gt?: WeiSource | null;
  usdVolume_lt?: WeiSource | null;
  usdVolume_gte?: WeiSource | null;
  usdVolume_lte?: WeiSource | null;
  usdVolume_in?: WeiSource[];
  usdVolume_not_in?: WeiSource[];
  usdFees?: WeiSource | null;
  usdFees_not?: WeiSource | null;
  usdFees_gt?: WeiSource | null;
  usdFees_lt?: WeiSource | null;
  usdFees_gte?: WeiSource | null;
  usdFees_lte?: WeiSource | null;
  usdFees_in?: WeiSource[];
  usdFees_not_in?: WeiSource[];
  trades?: WeiSource | null;
  trades_not?: WeiSource | null;
  trades_gt?: WeiSource | null;
  trades_lt?: WeiSource | null;
  trades_gte?: WeiSource | null;
  trades_lte?: WeiSource | null;
  trades_in?: WeiSource[];
  trades_not_in?: WeiSource[];
  partner?: string | null;
  partner_not?: string | null;
  partner_gt?: string | null;
  partner_lt?: string | null;
  partner_gte?: string | null;
  partner_lte?: string | null;
  partner_in?: string[];
  partner_not_in?: string[];
  partner_contains?: string | null;
  partner_not_contains?: string | null;
  partner_starts_with?: string | null;
  partner_not_starts_with?: string | null;
  partner_ends_with?: string | null;
  partner_not_ends_with?: string | null;
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
};
export type DailyExchangePartnerResult = {
  id: string;
  usdVolume: Wei;
  usdFees: Wei;
  trades: Wei;
  partner: string;
  timestamp: Wei;
};
export type DailyExchangePartnerFields = {
  id: true;
  usdVolume: true;
  usdFees: true;
  trades: true;
  partner: true;
  timestamp: true;
};
export type DailyExchangePartnerArgs<K extends keyof DailyExchangePartnerResult> = {
  [Property in keyof Pick<DailyExchangePartnerFields, K>]: DailyExchangePartnerFields[Property];
};
export const useGetDailyExchangePartnerById = <K extends keyof DailyExchangePartnerResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: DailyExchangePartnerArgs<K>,
  queryOptions: UseQueryOptions<Pick<DailyExchangePartnerResult, K>> = {}
) => {
  const func = async function <K extends keyof DailyExchangePartnerResult>(
    url: string,
    options: SingleQueryOptions,
    args: DailyExchangePartnerArgs<K>
  ): Promise<Pick<DailyExchangePartnerResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('dailyExchangePartner', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['usdVolume']) formattedObj['usdVolume'] = wei(obj['usdVolume']);
    if (obj['usdFees']) formattedObj['usdFees'] = wei(obj['usdFees']);
    if (obj['trades']) formattedObj['trades'] = wei(obj['trades'], 0);
    if (obj['partner']) formattedObj['partner'] = obj['partner'];
    if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
    return formattedObj as Pick<DailyExchangePartnerResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('DailyExchangePartner', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetDailyExchangePartners = <K extends keyof DailyExchangePartnerResult>(
  url: string,
  options?: MultiQueryOptions<DailyExchangePartnerFilter, DailyExchangePartnerResult>,
  args?: DailyExchangePartnerArgs<K>,
  queryOptions: UseQueryOptions<Pick<DailyExchangePartnerResult, K>[]> = {}
) => {
  const func = async function <K extends keyof DailyExchangePartnerResult>(
    url: string,
    options: MultiQueryOptions<DailyExchangePartnerFilter, DailyExchangePartnerResult>,
    args: DailyExchangePartnerArgs<K>
  ): Promise<Pick<DailyExchangePartnerResult, K>[]> {
    const paginatedOptions: Partial<
      MultiQueryOptions<DailyExchangePartnerFilter, DailyExchangePartnerResult>
    > = { ...options };
    let paginationKey: keyof DailyExchangePartnerFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc'
          ? '_gt'
          : '_lt')) as keyof DailyExchangePartnerFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<DailyExchangePartnerResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('dailyExchangePartners', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['usdVolume']) formattedObj['usdVolume'] = wei(obj['usdVolume']);
        if (obj['usdFees']) formattedObj['usdFees'] = wei(obj['usdFees']);
        if (obj['trades']) formattedObj['trades'] = wei(obj['trades'], 0);
        if (obj['partner']) formattedObj['partner'] = obj['partner'];
        if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
        return formattedObj as Pick<DailyExchangePartnerResult, K>;
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
      enabled ? generateGql('DailyExchangePartners', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type ExchangeEntryAppendedFilter = {
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
  src?: string | null;
  src_not?: string | null;
  src_in?: string[];
  src_not_in?: string[];
  src_contains?: string | null;
  src_not_contains?: string | null;
  amount?: WeiSource | null;
  amount_not?: WeiSource | null;
  amount_gt?: WeiSource | null;
  amount_lt?: WeiSource | null;
  amount_gte?: WeiSource | null;
  amount_lte?: WeiSource | null;
  amount_in?: WeiSource[];
  amount_not_in?: WeiSource[];
  dest?: string | null;
  dest_not?: string | null;
  dest_in?: string[];
  dest_not_in?: string[];
  dest_contains?: string | null;
  dest_not_contains?: string | null;
  amountReceived?: WeiSource | null;
  amountReceived_not?: WeiSource | null;
  amountReceived_gt?: WeiSource | null;
  amountReceived_lt?: WeiSource | null;
  amountReceived_gte?: WeiSource | null;
  amountReceived_lte?: WeiSource | null;
  amountReceived_in?: WeiSource[];
  amountReceived_not_in?: WeiSource[];
  exchangeFeeRate?: WeiSource | null;
  exchangeFeeRate_not?: WeiSource | null;
  exchangeFeeRate_gt?: WeiSource | null;
  exchangeFeeRate_lt?: WeiSource | null;
  exchangeFeeRate_gte?: WeiSource | null;
  exchangeFeeRate_lte?: WeiSource | null;
  exchangeFeeRate_in?: WeiSource[];
  exchangeFeeRate_not_in?: WeiSource[];
  roundIdForSrc?: WeiSource | null;
  roundIdForSrc_not?: WeiSource | null;
  roundIdForSrc_gt?: WeiSource | null;
  roundIdForSrc_lt?: WeiSource | null;
  roundIdForSrc_gte?: WeiSource | null;
  roundIdForSrc_lte?: WeiSource | null;
  roundIdForSrc_in?: WeiSource[];
  roundIdForSrc_not_in?: WeiSource[];
  roundIdForDest?: WeiSource | null;
  roundIdForDest_not?: WeiSource | null;
  roundIdForDest_gt?: WeiSource | null;
  roundIdForDest_lt?: WeiSource | null;
  roundIdForDest_gte?: WeiSource | null;
  roundIdForDest_lte?: WeiSource | null;
  roundIdForDest_in?: WeiSource[];
  roundIdForDest_not_in?: WeiSource[];
};
export type ExchangeEntryAppendedResult = {
  id: string;
  account: string;
  src: string;
  amount: Wei;
  dest: string;
  amountReceived: Wei;
  exchangeFeeRate: Wei;
  roundIdForSrc: Wei;
  roundIdForDest: Wei;
};
export type ExchangeEntryAppendedFields = {
  id: true;
  account: true;
  src: true;
  amount: true;
  dest: true;
  amountReceived: true;
  exchangeFeeRate: true;
  roundIdForSrc: true;
  roundIdForDest: true;
};
export type ExchangeEntryAppendedArgs<K extends keyof ExchangeEntryAppendedResult> = {
  [Property in keyof Pick<ExchangeEntryAppendedFields, K>]: ExchangeEntryAppendedFields[Property];
};
export const useGetExchangeEntryAppendedById = <K extends keyof ExchangeEntryAppendedResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: ExchangeEntryAppendedArgs<K>,
  queryOptions: UseQueryOptions<Pick<ExchangeEntryAppendedResult, K>> = {}
) => {
  const func = async function <K extends keyof ExchangeEntryAppendedResult>(
    url: string,
    options: SingleQueryOptions,
    args: ExchangeEntryAppendedArgs<K>
  ): Promise<Pick<ExchangeEntryAppendedResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('exchangeEntryAppended', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['account']) formattedObj['account'] = obj['account'];
    if (obj['src']) formattedObj['src'] = obj['src'];
    if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
    if (obj['dest']) formattedObj['dest'] = obj['dest'];
    if (obj['amountReceived']) formattedObj['amountReceived'] = wei(obj['amountReceived']);
    if (obj['exchangeFeeRate']) formattedObj['exchangeFeeRate'] = wei(obj['exchangeFeeRate']);
    if (obj['roundIdForSrc']) formattedObj['roundIdForSrc'] = wei(obj['roundIdForSrc'], 0);
    if (obj['roundIdForDest']) formattedObj['roundIdForDest'] = wei(obj['roundIdForDest'], 0);
    return formattedObj as Pick<ExchangeEntryAppendedResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('ExchangeEntryAppended', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetExchangeEntryAppendeds = <K extends keyof ExchangeEntryAppendedResult>(
  url: string,
  options?: MultiQueryOptions<ExchangeEntryAppendedFilter, ExchangeEntryAppendedResult>,
  args?: ExchangeEntryAppendedArgs<K>,
  queryOptions: UseQueryOptions<Pick<ExchangeEntryAppendedResult, K>[]> = {}
) => {
  const func = async function <K extends keyof ExchangeEntryAppendedResult>(
    url: string,
    options: MultiQueryOptions<ExchangeEntryAppendedFilter, ExchangeEntryAppendedResult>,
    args: ExchangeEntryAppendedArgs<K>
  ): Promise<Pick<ExchangeEntryAppendedResult, K>[]> {
    const paginatedOptions: Partial<
      MultiQueryOptions<ExchangeEntryAppendedFilter, ExchangeEntryAppendedResult>
    > = { ...options };
    let paginationKey: keyof ExchangeEntryAppendedFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc'
          ? '_gt'
          : '_lt')) as keyof ExchangeEntryAppendedFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<ExchangeEntryAppendedResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('exchangeEntryAppendeds', paginatedOptions, args),
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
        if (obj['src']) formattedObj['src'] = obj['src'];
        if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
        if (obj['dest']) formattedObj['dest'] = obj['dest'];
        if (obj['amountReceived']) formattedObj['amountReceived'] = wei(obj['amountReceived']);
        if (obj['exchangeFeeRate']) formattedObj['exchangeFeeRate'] = wei(obj['exchangeFeeRate']);
        if (obj['roundIdForSrc']) formattedObj['roundIdForSrc'] = wei(obj['roundIdForSrc'], 0);
        if (obj['roundIdForDest']) formattedObj['roundIdForDest'] = wei(obj['roundIdForDest'], 0);
        return formattedObj as Pick<ExchangeEntryAppendedResult, K>;
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
      enabled ? generateGql('ExchangeEntryAppendeds', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type ExchangeEntrySettledFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  from?: string | null;
  from_not?: string | null;
  from_in?: string[];
  from_not_in?: string[];
  from_contains?: string | null;
  from_not_contains?: string | null;
  src?: string | null;
  src_not?: string | null;
  src_in?: string[];
  src_not_in?: string[];
  src_contains?: string | null;
  src_not_contains?: string | null;
  amount?: WeiSource | null;
  amount_not?: WeiSource | null;
  amount_gt?: WeiSource | null;
  amount_lt?: WeiSource | null;
  amount_gte?: WeiSource | null;
  amount_lte?: WeiSource | null;
  amount_in?: WeiSource[];
  amount_not_in?: WeiSource[];
  dest?: string | null;
  dest_not?: string | null;
  dest_in?: string[];
  dest_not_in?: string[];
  dest_contains?: string | null;
  dest_not_contains?: string | null;
  reclaim?: WeiSource | null;
  reclaim_not?: WeiSource | null;
  reclaim_gt?: WeiSource | null;
  reclaim_lt?: WeiSource | null;
  reclaim_gte?: WeiSource | null;
  reclaim_lte?: WeiSource | null;
  reclaim_in?: WeiSource[];
  reclaim_not_in?: WeiSource[];
  rebate?: WeiSource | null;
  rebate_not?: WeiSource | null;
  rebate_gt?: WeiSource | null;
  rebate_lt?: WeiSource | null;
  rebate_gte?: WeiSource | null;
  rebate_lte?: WeiSource | null;
  rebate_in?: WeiSource[];
  rebate_not_in?: WeiSource[];
  srcRoundIdAtPeriodEnd?: WeiSource | null;
  srcRoundIdAtPeriodEnd_not?: WeiSource | null;
  srcRoundIdAtPeriodEnd_gt?: WeiSource | null;
  srcRoundIdAtPeriodEnd_lt?: WeiSource | null;
  srcRoundIdAtPeriodEnd_gte?: WeiSource | null;
  srcRoundIdAtPeriodEnd_lte?: WeiSource | null;
  srcRoundIdAtPeriodEnd_in?: WeiSource[];
  srcRoundIdAtPeriodEnd_not_in?: WeiSource[];
  destRoundIdAtPeriodEnd?: WeiSource | null;
  destRoundIdAtPeriodEnd_not?: WeiSource | null;
  destRoundIdAtPeriodEnd_gt?: WeiSource | null;
  destRoundIdAtPeriodEnd_lt?: WeiSource | null;
  destRoundIdAtPeriodEnd_gte?: WeiSource | null;
  destRoundIdAtPeriodEnd_lte?: WeiSource | null;
  destRoundIdAtPeriodEnd_in?: WeiSource[];
  destRoundIdAtPeriodEnd_not_in?: WeiSource[];
  exchangeTimestamp?: WeiSource | null;
  exchangeTimestamp_not?: WeiSource | null;
  exchangeTimestamp_gt?: WeiSource | null;
  exchangeTimestamp_lt?: WeiSource | null;
  exchangeTimestamp_gte?: WeiSource | null;
  exchangeTimestamp_lte?: WeiSource | null;
  exchangeTimestamp_in?: WeiSource[];
  exchangeTimestamp_not_in?: WeiSource[];
};
export type ExchangeEntrySettledResult = {
  id: string;
  from: string;
  src: string;
  amount: Wei;
  dest: string;
  reclaim: Wei;
  rebate: Wei;
  srcRoundIdAtPeriodEnd: Wei;
  destRoundIdAtPeriodEnd: Wei;
  exchangeTimestamp: Wei;
};
export type ExchangeEntrySettledFields = {
  id: true;
  from: true;
  src: true;
  amount: true;
  dest: true;
  reclaim: true;
  rebate: true;
  srcRoundIdAtPeriodEnd: true;
  destRoundIdAtPeriodEnd: true;
  exchangeTimestamp: true;
};
export type ExchangeEntrySettledArgs<K extends keyof ExchangeEntrySettledResult> = {
  [Property in keyof Pick<ExchangeEntrySettledFields, K>]: ExchangeEntrySettledFields[Property];
};
export const useGetExchangeEntrySettledById = <K extends keyof ExchangeEntrySettledResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: ExchangeEntrySettledArgs<K>,
  queryOptions: UseQueryOptions<Pick<ExchangeEntrySettledResult, K>> = {}
) => {
  const func = async function <K extends keyof ExchangeEntrySettledResult>(
    url: string,
    options: SingleQueryOptions,
    args: ExchangeEntrySettledArgs<K>
  ): Promise<Pick<ExchangeEntrySettledResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('exchangeEntrySettled', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['from']) formattedObj['from'] = obj['from'];
    if (obj['src']) formattedObj['src'] = obj['src'];
    if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
    if (obj['dest']) formattedObj['dest'] = obj['dest'];
    if (obj['reclaim']) formattedObj['reclaim'] = wei(obj['reclaim']);
    if (obj['rebate']) formattedObj['rebate'] = wei(obj['rebate']);
    if (obj['srcRoundIdAtPeriodEnd'])
      formattedObj['srcRoundIdAtPeriodEnd'] = wei(obj['srcRoundIdAtPeriodEnd'], 0);
    if (obj['destRoundIdAtPeriodEnd'])
      formattedObj['destRoundIdAtPeriodEnd'] = wei(obj['destRoundIdAtPeriodEnd'], 0);
    if (obj['exchangeTimestamp'])
      formattedObj['exchangeTimestamp'] = wei(obj['exchangeTimestamp'], 0);
    return formattedObj as Pick<ExchangeEntrySettledResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('ExchangeEntrySettled', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetExchangeEntrySettleds = <K extends keyof ExchangeEntrySettledResult>(
  url: string,
  options?: MultiQueryOptions<ExchangeEntrySettledFilter, ExchangeEntrySettledResult>,
  args?: ExchangeEntrySettledArgs<K>,
  queryOptions: UseQueryOptions<Pick<ExchangeEntrySettledResult, K>[]> = {}
) => {
  const func = async function <K extends keyof ExchangeEntrySettledResult>(
    url: string,
    options: MultiQueryOptions<ExchangeEntrySettledFilter, ExchangeEntrySettledResult>,
    args: ExchangeEntrySettledArgs<K>
  ): Promise<Pick<ExchangeEntrySettledResult, K>[]> {
    const paginatedOptions: Partial<
      MultiQueryOptions<ExchangeEntrySettledFilter, ExchangeEntrySettledResult>
    > = { ...options };
    let paginationKey: keyof ExchangeEntrySettledFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc'
          ? '_gt'
          : '_lt')) as keyof ExchangeEntrySettledFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<ExchangeEntrySettledResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('exchangeEntrySettleds', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['from']) formattedObj['from'] = obj['from'];
        if (obj['src']) formattedObj['src'] = obj['src'];
        if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
        if (obj['dest']) formattedObj['dest'] = obj['dest'];
        if (obj['reclaim']) formattedObj['reclaim'] = wei(obj['reclaim']);
        if (obj['rebate']) formattedObj['rebate'] = wei(obj['rebate']);
        if (obj['srcRoundIdAtPeriodEnd'])
          formattedObj['srcRoundIdAtPeriodEnd'] = wei(obj['srcRoundIdAtPeriodEnd'], 0);
        if (obj['destRoundIdAtPeriodEnd'])
          formattedObj['destRoundIdAtPeriodEnd'] = wei(obj['destRoundIdAtPeriodEnd'], 0);
        if (obj['exchangeTimestamp'])
          formattedObj['exchangeTimestamp'] = wei(obj['exchangeTimestamp'], 0);
        return formattedObj as Pick<ExchangeEntrySettledResult, K>;
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
      enabled ? generateGql('ExchangeEntrySettleds', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export type ExchangePartnerFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  usdVolume?: WeiSource | null;
  usdVolume_not?: WeiSource | null;
  usdVolume_gt?: WeiSource | null;
  usdVolume_lt?: WeiSource | null;
  usdVolume_gte?: WeiSource | null;
  usdVolume_lte?: WeiSource | null;
  usdVolume_in?: WeiSource[];
  usdVolume_not_in?: WeiSource[];
  usdFees?: WeiSource | null;
  usdFees_not?: WeiSource | null;
  usdFees_gt?: WeiSource | null;
  usdFees_lt?: WeiSource | null;
  usdFees_gte?: WeiSource | null;
  usdFees_lte?: WeiSource | null;
  usdFees_in?: WeiSource[];
  usdFees_not_in?: WeiSource[];
  trades?: WeiSource | null;
  trades_not?: WeiSource | null;
  trades_gt?: WeiSource | null;
  trades_lt?: WeiSource | null;
  trades_gte?: WeiSource | null;
  trades_lte?: WeiSource | null;
  trades_in?: WeiSource[];
  trades_not_in?: WeiSource[];
};
export type ExchangePartnerResult = {
  id: string;
  usdVolume: Wei;
  usdFees: Wei;
  trades: Wei;
};
export type ExchangePartnerFields = {
  id: true;
  usdVolume: true;
  usdFees: true;
  trades: true;
};
export type ExchangePartnerArgs<K extends keyof ExchangePartnerResult> = {
  [Property in keyof Pick<ExchangePartnerFields, K>]: ExchangePartnerFields[Property];
};
export const useGetExchangePartnerById = <K extends keyof ExchangePartnerResult>(
  url: string,
  options?: SingleQueryOptions,
  args?: ExchangePartnerArgs<K>,
  queryOptions: UseQueryOptions<Pick<ExchangePartnerResult, K>> = {}
) => {
  const func = async function <K extends keyof ExchangePartnerResult>(
    url: string,
    options: SingleQueryOptions,
    args: ExchangePartnerArgs<K>
  ): Promise<Pick<ExchangePartnerResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('exchangePartner', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['usdVolume']) formattedObj['usdVolume'] = wei(obj['usdVolume']);
    if (obj['usdFees']) formattedObj['usdFees'] = wei(obj['usdFees']);
    if (obj['trades']) formattedObj['trades'] = wei(obj['trades'], 0);
    return formattedObj as Pick<ExchangePartnerResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('ExchangePartner', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetExchangePartners = <K extends keyof ExchangePartnerResult>(
  url: string,
  options?: MultiQueryOptions<ExchangePartnerFilter, ExchangePartnerResult>,
  args?: ExchangePartnerArgs<K>,
  queryOptions: UseQueryOptions<Pick<ExchangePartnerResult, K>[]> = {}
) => {
  const func = async function <K extends keyof ExchangePartnerResult>(
    url: string,
    options: MultiQueryOptions<ExchangePartnerFilter, ExchangePartnerResult>,
    args: ExchangePartnerArgs<K>
  ): Promise<Pick<ExchangePartnerResult, K>[]> {
    const paginatedOptions: Partial<
      MultiQueryOptions<ExchangePartnerFilter, ExchangePartnerResult>
    > = { ...options };
    let paginationKey: keyof ExchangePartnerFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof ExchangePartnerFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<ExchangePartnerResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('exchangePartners', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['usdVolume']) formattedObj['usdVolume'] = wei(obj['usdVolume']);
        if (obj['usdFees']) formattedObj['usdFees'] = wei(obj['usdFees']);
        if (obj['trades']) formattedObj['trades'] = wei(obj['trades'], 0);
        return formattedObj as Pick<ExchangePartnerResult, K>;
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
      enabled ? generateGql('ExchangePartners', options, args) : null,
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
export type TemporaryExchangePartnerTrackerFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  usdVolume?: WeiSource | null;
  usdVolume_not?: WeiSource | null;
  usdVolume_gt?: WeiSource | null;
  usdVolume_lt?: WeiSource | null;
  usdVolume_gte?: WeiSource | null;
  usdVolume_lte?: WeiSource | null;
  usdVolume_in?: WeiSource[];
  usdVolume_not_in?: WeiSource[];
  usdFees?: WeiSource | null;
  usdFees_not?: WeiSource | null;
  usdFees_gt?: WeiSource | null;
  usdFees_lt?: WeiSource | null;
  usdFees_gte?: WeiSource | null;
  usdFees_lte?: WeiSource | null;
  usdFees_in?: WeiSource[];
  usdFees_not_in?: WeiSource[];
  partner?: string | null;
  partner_not?: string | null;
  partner_gt?: string | null;
  partner_lt?: string | null;
  partner_gte?: string | null;
  partner_lte?: string | null;
  partner_in?: string[];
  partner_not_in?: string[];
  partner_contains?: string | null;
  partner_not_contains?: string | null;
  partner_starts_with?: string | null;
  partner_not_starts_with?: string | null;
  partner_ends_with?: string | null;
  partner_not_ends_with?: string | null;
};
export type TemporaryExchangePartnerTrackerResult = {
  id: string;
  usdVolume: Wei | null;
  usdFees: Wei | null;
  partner: string | null;
};
export type TemporaryExchangePartnerTrackerFields = {
  id: true;
  usdVolume: true;
  usdFees: true;
  partner: true;
};
export type TemporaryExchangePartnerTrackerArgs<
  K extends keyof TemporaryExchangePartnerTrackerResult
> = {
  [Property in keyof Pick<
    TemporaryExchangePartnerTrackerFields,
    K
  >]: TemporaryExchangePartnerTrackerFields[Property];
};
export const useGetTemporaryExchangePartnerTrackerById = <
  K extends keyof TemporaryExchangePartnerTrackerResult
>(
  url: string,
  options?: SingleQueryOptions,
  args?: TemporaryExchangePartnerTrackerArgs<K>,
  queryOptions: UseQueryOptions<Pick<TemporaryExchangePartnerTrackerResult, K>> = {}
) => {
  const func = async function <K extends keyof TemporaryExchangePartnerTrackerResult>(
    url: string,
    options: SingleQueryOptions,
    args: TemporaryExchangePartnerTrackerArgs<K>
  ): Promise<Pick<TemporaryExchangePartnerTrackerResult, K>> {
    const res = await axios.post(url, {
      query: generateGql('temporaryExchangePartnerTracker', options, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const obj = r.data[Object.keys(r.data)[0]] as any;
    const formattedObj: any = {};
    if (obj['id']) formattedObj['id'] = obj['id'];
    if (obj['usdVolume']) formattedObj['usdVolume'] = wei(obj['usdVolume']);
    if (obj['usdFees']) formattedObj['usdFees'] = wei(obj['usdFees']);
    if (obj['partner']) formattedObj['partner'] = obj['partner'];
    return formattedObj as Pick<TemporaryExchangePartnerTrackerResult, K>;
  };
  const enabled = options && args;
  return useQuery(
    [
      'codegen-graphql',
      enabled ? generateGql('TemporaryExchangePartnerTracker', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};
export const useGetTemporaryExchangePartnerTrackers = <
  K extends keyof TemporaryExchangePartnerTrackerResult
>(
  url: string,
  options?: MultiQueryOptions<
    TemporaryExchangePartnerTrackerFilter,
    TemporaryExchangePartnerTrackerResult
  >,
  args?: TemporaryExchangePartnerTrackerArgs<K>,
  queryOptions: UseQueryOptions<Pick<TemporaryExchangePartnerTrackerResult, K>[]> = {}
) => {
  const func = async function <K extends keyof TemporaryExchangePartnerTrackerResult>(
    url: string,
    options: MultiQueryOptions<
      TemporaryExchangePartnerTrackerFilter,
      TemporaryExchangePartnerTrackerResult
    >,
    args: TemporaryExchangePartnerTrackerArgs<K>
  ): Promise<Pick<TemporaryExchangePartnerTrackerResult, K>[]> {
    const paginatedOptions: Partial<
      MultiQueryOptions<
        TemporaryExchangePartnerTrackerFilter,
        TemporaryExchangePartnerTrackerResult
      >
    > = { ...options };
    let paginationKey: keyof TemporaryExchangePartnerTrackerFilter | null = null;
    let paginationValue = '';
    if (options.first && options.first > MAX_PAGE) {
      paginatedOptions.first = MAX_PAGE;
      paginatedOptions.orderBy = options.orderBy || 'id';
      paginatedOptions.orderDirection = options.orderDirection || 'asc';
      paginationKey = (paginatedOptions.orderBy +
        (paginatedOptions.orderDirection === 'asc'
          ? '_gt'
          : '_lt')) as keyof TemporaryExchangePartnerTrackerFilter;
      paginatedOptions.where = { ...options.where };
    }
    let results: Pick<TemporaryExchangePartnerTrackerResult, K>[] = [];
    do {
      if (paginationKey && paginationValue) {
        // @ts-ignore
        paginatedOptions.where![paginationKey] = paginationValue as any;
      }
      const res = await axios.post(url, {
        query: generateGql('temporaryExchangePartnerTrackers', paginatedOptions, args),
      });
      const r = res.data as any;
      if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
      }
      const rawResults = r.data[Object.keys(r.data)[0]] as any[];
      const newResults = rawResults.map((obj) => {
        const formattedObj: any = {};
        if (obj['id']) formattedObj['id'] = obj['id'];
        if (obj['usdVolume']) formattedObj['usdVolume'] = wei(obj['usdVolume']);
        if (obj['usdFees']) formattedObj['usdFees'] = wei(obj['usdFees']);
        if (obj['partner']) formattedObj['partner'] = obj['partner'];
        return formattedObj as Pick<TemporaryExchangePartnerTrackerResult, K>;
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
      enabled ? generateGql('TemporaryExchangePartnerTrackers', options, args) : null,
      queryOptions?.queryKey?.toString(),
    ],
    async () => func(url, options!, args!),
    {
      ...queryOptions,
      enabled: !!options && !!args,
    }
  );
};

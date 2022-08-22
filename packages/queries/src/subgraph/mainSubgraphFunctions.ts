// !!! DO NOT EDIT !!! Automatically generated file

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
export type AccountFlaggedForLiquidationFilter = {
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
  deadline?: WeiSource | null;
  deadline_not?: WeiSource | null;
  deadline_gt?: WeiSource | null;
  deadline_lt?: WeiSource | null;
  deadline_gte?: WeiSource | null;
  deadline_lte?: WeiSource | null;
  deadline_in?: WeiSource[];
  deadline_not_in?: WeiSource[];
  collateralRatio?: WeiSource | null;
  collateralRatio_not?: WeiSource | null;
  collateralRatio_gt?: WeiSource | null;
  collateralRatio_lt?: WeiSource | null;
  collateralRatio_gte?: WeiSource | null;
  collateralRatio_lte?: WeiSource | null;
  collateralRatio_in?: WeiSource[];
  collateralRatio_not_in?: WeiSource[];
  liquidatableNonEscrowSNX?: WeiSource | null;
  liquidatableNonEscrowSNX_not?: WeiSource | null;
  liquidatableNonEscrowSNX_gt?: WeiSource | null;
  liquidatableNonEscrowSNX_lt?: WeiSource | null;
  liquidatableNonEscrowSNX_gte?: WeiSource | null;
  liquidatableNonEscrowSNX_lte?: WeiSource | null;
  liquidatableNonEscrowSNX_in?: WeiSource[];
  liquidatableNonEscrowSNX_not_in?: WeiSource[];
  collateral?: WeiSource | null;
  collateral_not?: WeiSource | null;
  collateral_gt?: WeiSource | null;
  collateral_lt?: WeiSource | null;
  collateral_gte?: WeiSource | null;
  collateral_lte?: WeiSource | null;
  collateral_in?: WeiSource[];
  collateral_not_in?: WeiSource[];
};
export type AccountFlaggedForLiquidationResult = {
  id: string;
  account: string;
  deadline: Wei;
  collateralRatio: Wei;
  liquidatableNonEscrowSNX: Wei;
  collateral: Wei;
};
export type AccountFlaggedForLiquidationFields = {
  id: true;
  account: true;
  deadline: true;
  collateralRatio: true;
  liquidatableNonEscrowSNX: true;
  collateral: true;
};
export type AccountFlaggedForLiquidationArgs<K extends keyof AccountFlaggedForLiquidationResult> = {
  [Property in keyof Pick<
    AccountFlaggedForLiquidationFields,
    K
  >]: AccountFlaggedForLiquidationFields[Property];
};
export const getAccountFlaggedForLiquidationById = async function <
  K extends keyof AccountFlaggedForLiquidationResult
>(
  url: string,
  options: SingleQueryOptions,
  args: AccountFlaggedForLiquidationArgs<K>
): Promise<Pick<AccountFlaggedForLiquidationResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('accountFlaggedForLiquidation', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['account']) formattedObj['account'] = obj['account'];
  if (obj['deadline']) formattedObj['deadline'] = wei(obj['deadline'], 0);
  if (obj['collateralRatio']) formattedObj['collateralRatio'] = wei(obj['collateralRatio'], 0);
  if (obj['liquidatableNonEscrowSNX'])
    formattedObj['liquidatableNonEscrowSNX'] = wei(obj['liquidatableNonEscrowSNX']);
  if (obj['collateral']) formattedObj['collateral'] = wei(obj['collateral']);
  return formattedObj as Pick<AccountFlaggedForLiquidationResult, K>;
};
export const getAccountFlaggedForLiquidations = async function <
  K extends keyof AccountFlaggedForLiquidationResult
>(
  url: string,
  options: MultiQueryOptions<
    AccountFlaggedForLiquidationFilter,
    AccountFlaggedForLiquidationResult
  >,
  args: AccountFlaggedForLiquidationArgs<K>
): Promise<Pick<AccountFlaggedForLiquidationResult, K>[]> {
  const paginatedOptions: Partial<
    MultiQueryOptions<AccountFlaggedForLiquidationFilter, AccountFlaggedForLiquidationResult>
  > = { ...options };
  let paginationKey: keyof AccountFlaggedForLiquidationFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc'
        ? '_gt'
        : '_lt')) as keyof AccountFlaggedForLiquidationFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<AccountFlaggedForLiquidationResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('accountFlaggedForLiquidations', paginatedOptions, args),
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
      if (obj['deadline']) formattedObj['deadline'] = wei(obj['deadline'], 0);
      if (obj['collateralRatio']) formattedObj['collateralRatio'] = wei(obj['collateralRatio'], 0);
      if (obj['liquidatableNonEscrowSNX'])
        formattedObj['liquidatableNonEscrowSNX'] = wei(obj['liquidatableNonEscrowSNX']);
      if (obj['collateral']) formattedObj['collateral'] = wei(obj['collateral']);
      return formattedObj as Pick<AccountFlaggedForLiquidationResult, K>;
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
export type AccountLiquidatedFilter = {
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
  snxRedeemed?: WeiSource | null;
  snxRedeemed_not?: WeiSource | null;
  snxRedeemed_gt?: WeiSource | null;
  snxRedeemed_lt?: WeiSource | null;
  snxRedeemed_gte?: WeiSource | null;
  snxRedeemed_lte?: WeiSource | null;
  snxRedeemed_in?: WeiSource[];
  snxRedeemed_not_in?: WeiSource[];
  amountLiquidated?: WeiSource | null;
  amountLiquidated_not?: WeiSource | null;
  amountLiquidated_gt?: WeiSource | null;
  amountLiquidated_lt?: WeiSource | null;
  amountLiquidated_gte?: WeiSource | null;
  amountLiquidated_lte?: WeiSource | null;
  amountLiquidated_in?: WeiSource[];
  amountLiquidated_not_in?: WeiSource[];
  liquidator?: string | null;
  liquidator_not?: string | null;
  liquidator_in?: string[];
  liquidator_not_in?: string[];
  liquidator_contains?: string | null;
  liquidator_not_contains?: string | null;
  time?: WeiSource | null;
  time_not?: WeiSource | null;
  time_gt?: WeiSource | null;
  time_lt?: WeiSource | null;
  time_gte?: WeiSource | null;
  time_lte?: WeiSource | null;
  time_in?: WeiSource[];
  time_not_in?: WeiSource[];
};
export type AccountLiquidatedResult = {
  id: string;
  account: string;
  snxRedeemed: Wei;
  amountLiquidated: Wei;
  liquidator: string;
  time: Wei;
};
export type AccountLiquidatedFields = {
  id: true;
  account: true;
  snxRedeemed: true;
  amountLiquidated: true;
  liquidator: true;
  time: true;
};
export type AccountLiquidatedArgs<K extends keyof AccountLiquidatedResult> = {
  [Property in keyof Pick<AccountLiquidatedFields, K>]: AccountLiquidatedFields[Property];
};
export const getAccountLiquidatedById = async function <K extends keyof AccountLiquidatedResult>(
  url: string,
  options: SingleQueryOptions,
  args: AccountLiquidatedArgs<K>
): Promise<Pick<AccountLiquidatedResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('accountLiquidated', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['account']) formattedObj['account'] = obj['account'];
  if (obj['snxRedeemed']) formattedObj['snxRedeemed'] = wei(obj['snxRedeemed']);
  if (obj['amountLiquidated']) formattedObj['amountLiquidated'] = wei(obj['amountLiquidated']);
  if (obj['liquidator']) formattedObj['liquidator'] = obj['liquidator'];
  if (obj['time']) formattedObj['time'] = wei(obj['time'], 0);
  return formattedObj as Pick<AccountLiquidatedResult, K>;
};
export const getAccountLiquidateds = async function <K extends keyof AccountLiquidatedResult>(
  url: string,
  options: MultiQueryOptions<AccountLiquidatedFilter, AccountLiquidatedResult>,
  args: AccountLiquidatedArgs<K>
): Promise<Pick<AccountLiquidatedResult, K>[]> {
  const paginatedOptions: Partial<
    MultiQueryOptions<AccountLiquidatedFilter, AccountLiquidatedResult>
  > = { ...options };
  let paginationKey: keyof AccountLiquidatedFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof AccountLiquidatedFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<AccountLiquidatedResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('accountLiquidateds', paginatedOptions, args),
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
      if (obj['snxRedeemed']) formattedObj['snxRedeemed'] = wei(obj['snxRedeemed']);
      if (obj['amountLiquidated']) formattedObj['amountLiquidated'] = wei(obj['amountLiquidated']);
      if (obj['liquidator']) formattedObj['liquidator'] = obj['liquidator'];
      if (obj['time']) formattedObj['time'] = wei(obj['time'], 0);
      return formattedObj as Pick<AccountLiquidatedResult, K>;
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
export type AccountRemovedFromLiquidationFilter = {
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
  time?: WeiSource | null;
  time_not?: WeiSource | null;
  time_gt?: WeiSource | null;
  time_lt?: WeiSource | null;
  time_gte?: WeiSource | null;
  time_lte?: WeiSource | null;
  time_in?: WeiSource[];
  time_not_in?: WeiSource[];
};
export type AccountRemovedFromLiquidationResult = {
  id: string;
  account: string;
  time: Wei;
};
export type AccountRemovedFromLiquidationFields = {
  id: true;
  account: true;
  time: true;
};
export type AccountRemovedFromLiquidationArgs<K extends keyof AccountRemovedFromLiquidationResult> =
  {
    [Property in keyof Pick<
      AccountRemovedFromLiquidationFields,
      K
    >]: AccountRemovedFromLiquidationFields[Property];
  };
export const getAccountRemovedFromLiquidationById = async function <
  K extends keyof AccountRemovedFromLiquidationResult
>(
  url: string,
  options: SingleQueryOptions,
  args: AccountRemovedFromLiquidationArgs<K>
): Promise<Pick<AccountRemovedFromLiquidationResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('accountRemovedFromLiquidation', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['account']) formattedObj['account'] = obj['account'];
  if (obj['time']) formattedObj['time'] = wei(obj['time'], 0);
  return formattedObj as Pick<AccountRemovedFromLiquidationResult, K>;
};
export const getAccountRemovedFromLiquidations = async function <
  K extends keyof AccountRemovedFromLiquidationResult
>(
  url: string,
  options: MultiQueryOptions<
    AccountRemovedFromLiquidationFilter,
    AccountRemovedFromLiquidationResult
  >,
  args: AccountRemovedFromLiquidationArgs<K>
): Promise<Pick<AccountRemovedFromLiquidationResult, K>[]> {
  const paginatedOptions: Partial<
    MultiQueryOptions<AccountRemovedFromLiquidationFilter, AccountRemovedFromLiquidationResult>
  > = { ...options };
  let paginationKey: keyof AccountRemovedFromLiquidationFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc'
        ? '_gt'
        : '_lt')) as keyof AccountRemovedFromLiquidationFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<AccountRemovedFromLiquidationResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('accountRemovedFromLiquidations', paginatedOptions, args),
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
      if (obj['time']) formattedObj['time'] = wei(obj['time'], 0);
      return formattedObj as Pick<AccountRemovedFromLiquidationResult, K>;
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
export const getActiveStakerById = async function <K extends keyof ActiveStakerResult>(
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
export const getActiveStakers = async function <K extends keyof ActiveStakerResult>(
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
export type AtomicSynthExchangeFilter = {
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
  account_gt?: string | null;
  account_lt?: string | null;
  account_gte?: string | null;
  account_lte?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  account_starts_with?: string | null;
  account_not_starts_with?: string | null;
  account_ends_with?: string | null;
  account_not_ends_with?: string | null;
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
};
export type AtomicSynthExchangeResult = {
  id: string;
  account: Partial<ExchangerResult>;
  fromSynth: Partial<SynthResult> | null;
  toSynth: Partial<SynthResult> | null;
  fromAmount: Wei;
  fromAmountInUSD: Wei;
  toAmount: Wei;
  toAmountInUSD: Wei;
  feesInUSD: Wei;
  toAddress: string;
  timestamp: Wei;
  gasPrice: Wei;
};
export type AtomicSynthExchangeFields = {
  id: true;
  account: ExchangerFields;
  fromSynth: SynthFields;
  toSynth: SynthFields;
  fromAmount: true;
  fromAmountInUSD: true;
  toAmount: true;
  toAmountInUSD: true;
  feesInUSD: true;
  toAddress: true;
  timestamp: true;
  gasPrice: true;
};
export type AtomicSynthExchangeArgs<K extends keyof AtomicSynthExchangeResult> = {
  [Property in keyof Pick<AtomicSynthExchangeFields, K>]: AtomicSynthExchangeFields[Property];
};
export const getAtomicSynthExchangeById = async function <
  K extends keyof AtomicSynthExchangeResult
>(
  url: string,
  options: SingleQueryOptions,
  args: AtomicSynthExchangeArgs<K>
): Promise<Pick<AtomicSynthExchangeResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('atomicSynthExchange', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['account']) formattedObj['account'] = obj['account'];
  if (obj['fromSynth']) formattedObj['fromSynth'] = obj['fromSynth'];
  if (obj['toSynth']) formattedObj['toSynth'] = obj['toSynth'];
  if (obj['fromAmount']) formattedObj['fromAmount'] = wei(obj['fromAmount']);
  if (obj['fromAmountInUSD']) formattedObj['fromAmountInUSD'] = wei(obj['fromAmountInUSD']);
  if (obj['toAmount']) formattedObj['toAmount'] = wei(obj['toAmount']);
  if (obj['toAmountInUSD']) formattedObj['toAmountInUSD'] = wei(obj['toAmountInUSD']);
  if (obj['feesInUSD']) formattedObj['feesInUSD'] = wei(obj['feesInUSD']);
  if (obj['toAddress']) formattedObj['toAddress'] = obj['toAddress'];
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  if (obj['gasPrice']) formattedObj['gasPrice'] = wei(obj['gasPrice'], 0);
  return formattedObj as Pick<AtomicSynthExchangeResult, K>;
};
export const getAtomicSynthExchanges = async function <K extends keyof AtomicSynthExchangeResult>(
  url: string,
  options: MultiQueryOptions<AtomicSynthExchangeFilter, AtomicSynthExchangeResult>,
  args: AtomicSynthExchangeArgs<K>
): Promise<Pick<AtomicSynthExchangeResult, K>[]> {
  const paginatedOptions: Partial<
    MultiQueryOptions<AtomicSynthExchangeFilter, AtomicSynthExchangeResult>
  > = { ...options };
  let paginationKey: keyof AtomicSynthExchangeFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc'
        ? '_gt'
        : '_lt')) as keyof AtomicSynthExchangeFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<AtomicSynthExchangeResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('atomicSynthExchanges', paginatedOptions, args),
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
      if (obj['fromSynth']) formattedObj['fromSynth'] = obj['fromSynth'];
      if (obj['toSynth']) formattedObj['toSynth'] = obj['toSynth'];
      if (obj['fromAmount']) formattedObj['fromAmount'] = wei(obj['fromAmount']);
      if (obj['fromAmountInUSD']) formattedObj['fromAmountInUSD'] = wei(obj['fromAmountInUSD']);
      if (obj['toAmount']) formattedObj['toAmount'] = wei(obj['toAmount']);
      if (obj['toAmountInUSD']) formattedObj['toAmountInUSD'] = wei(obj['toAmountInUSD']);
      if (obj['feesInUSD']) formattedObj['feesInUSD'] = wei(obj['feesInUSD']);
      if (obj['toAddress']) formattedObj['toAddress'] = obj['toAddress'];
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      if (obj['gasPrice']) formattedObj['gasPrice'] = wei(obj['gasPrice'], 0);
      return formattedObj as Pick<AtomicSynthExchangeResult, K>;
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
export const getBurnedById = async function <K extends keyof BurnedResult>(
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
export const getBurneds = async function <K extends keyof BurnedResult>(
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
export type CandleFilter = {
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
  average?: WeiSource | null;
  average_not?: WeiSource | null;
  average_gt?: WeiSource | null;
  average_lt?: WeiSource | null;
  average_gte?: WeiSource | null;
  average_lte?: WeiSource | null;
  average_in?: WeiSource[];
  average_not_in?: WeiSource[];
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
  period?: WeiSource | null;
  period_not?: WeiSource | null;
  period_gt?: WeiSource | null;
  period_lt?: WeiSource | null;
  period_gte?: WeiSource | null;
  period_lte?: WeiSource | null;
  period_in?: WeiSource[];
  period_not_in?: WeiSource[];
  aggregatedPrices?: WeiSource | null;
  aggregatedPrices_not?: WeiSource | null;
  aggregatedPrices_gt?: WeiSource | null;
  aggregatedPrices_lt?: WeiSource | null;
  aggregatedPrices_gte?: WeiSource | null;
  aggregatedPrices_lte?: WeiSource | null;
  aggregatedPrices_in?: WeiSource[];
  aggregatedPrices_not_in?: WeiSource[];
};
export type CandleResult = {
  id: string;
  synth: string;
  open: Wei;
  high: Wei;
  low: Wei;
  close: Wei;
  average: Wei;
  timestamp: Wei;
  period: Wei;
  aggregatedPrices: Wei;
};
export type CandleFields = {
  id: true;
  synth: true;
  open: true;
  high: true;
  low: true;
  close: true;
  average: true;
  timestamp: true;
  period: true;
  aggregatedPrices: true;
};
export type CandleArgs<K extends keyof CandleResult> = {
  [Property in keyof Pick<CandleFields, K>]: CandleFields[Property];
};
export const getCandleById = async function <K extends keyof CandleResult>(
  url: string,
  options: SingleQueryOptions,
  args: CandleArgs<K>
): Promise<Pick<CandleResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('candle', options, args),
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
  if (obj['average']) formattedObj['average'] = wei(obj['average']);
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  if (obj['period']) formattedObj['period'] = wei(obj['period'], 0);
  if (obj['aggregatedPrices']) formattedObj['aggregatedPrices'] = wei(obj['aggregatedPrices'], 0);
  return formattedObj as Pick<CandleResult, K>;
};
export const getCandles = async function <K extends keyof CandleResult>(
  url: string,
  options: MultiQueryOptions<CandleFilter, CandleResult>,
  args: CandleArgs<K>
): Promise<Pick<CandleResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<CandleFilter, CandleResult>> = { ...options };
  let paginationKey: keyof CandleFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof CandleFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<CandleResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('candles', paginatedOptions, args),
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
      if (obj['average']) formattedObj['average'] = wei(obj['average']);
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      if (obj['period']) formattedObj['period'] = wei(obj['period'], 0);
      if (obj['aggregatedPrices'])
        formattedObj['aggregatedPrices'] = wei(obj['aggregatedPrices'], 0);
      return formattedObj as Pick<CandleResult, K>;
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
export type CollateralDepositedFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  collateralAmount?: WeiSource | null;
  collateralAmount_not?: WeiSource | null;
  collateralAmount_gt?: WeiSource | null;
  collateralAmount_lt?: WeiSource | null;
  collateralAmount_gte?: WeiSource | null;
  collateralAmount_lte?: WeiSource | null;
  collateralAmount_in?: WeiSource[];
  collateralAmount_not_in?: WeiSource[];
  collateralAfter?: WeiSource | null;
  collateralAfter_not?: WeiSource | null;
  collateralAfter_gt?: WeiSource | null;
  collateralAfter_lt?: WeiSource | null;
  collateralAfter_gte?: WeiSource | null;
  collateralAfter_lte?: WeiSource | null;
  collateralAfter_in?: WeiSource[];
  collateralAfter_not_in?: WeiSource[];
  account?: string | null;
  account_not?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  loanId?: WeiSource | null;
  loanId_not?: WeiSource | null;
  loanId_gt?: WeiSource | null;
  loanId_lt?: WeiSource | null;
  loanId_gte?: WeiSource | null;
  loanId_lte?: WeiSource | null;
  loanId_in?: WeiSource[];
  loanId_not_in?: WeiSource[];
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
};
export type CollateralDepositedResult = {
  id: string;
  collateralAmount: Wei;
  collateralAfter: Wei;
  account: string;
  loanId: Wei;
  timestamp: Wei;
};
export type CollateralDepositedFields = {
  id: true;
  collateralAmount: true;
  collateralAfter: true;
  account: true;
  loanId: true;
  timestamp: true;
};
export type CollateralDepositedArgs<K extends keyof CollateralDepositedResult> = {
  [Property in keyof Pick<CollateralDepositedFields, K>]: CollateralDepositedFields[Property];
};
export const getCollateralDepositedById = async function <
  K extends keyof CollateralDepositedResult
>(
  url: string,
  options: SingleQueryOptions,
  args: CollateralDepositedArgs<K>
): Promise<Pick<CollateralDepositedResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('collateralDeposited', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['collateralAmount']) formattedObj['collateralAmount'] = wei(obj['collateralAmount']);
  if (obj['collateralAfter']) formattedObj['collateralAfter'] = wei(obj['collateralAfter']);
  if (obj['account']) formattedObj['account'] = obj['account'];
  if (obj['loanId']) formattedObj['loanId'] = wei(obj['loanId'], 0);
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  return formattedObj as Pick<CollateralDepositedResult, K>;
};
export const getCollateralDepositeds = async function <K extends keyof CollateralDepositedResult>(
  url: string,
  options: MultiQueryOptions<CollateralDepositedFilter, CollateralDepositedResult>,
  args: CollateralDepositedArgs<K>
): Promise<Pick<CollateralDepositedResult, K>[]> {
  const paginatedOptions: Partial<
    MultiQueryOptions<CollateralDepositedFilter, CollateralDepositedResult>
  > = { ...options };
  let paginationKey: keyof CollateralDepositedFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc'
        ? '_gt'
        : '_lt')) as keyof CollateralDepositedFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<CollateralDepositedResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('collateralDepositeds', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['collateralAmount']) formattedObj['collateralAmount'] = wei(obj['collateralAmount']);
      if (obj['collateralAfter']) formattedObj['collateralAfter'] = wei(obj['collateralAfter']);
      if (obj['account']) formattedObj['account'] = obj['account'];
      if (obj['loanId']) formattedObj['loanId'] = wei(obj['loanId'], 0);
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      return formattedObj as Pick<CollateralDepositedResult, K>;
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
export type CollateralWithdrawnFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  amountWithdrawn?: WeiSource | null;
  amountWithdrawn_not?: WeiSource | null;
  amountWithdrawn_gt?: WeiSource | null;
  amountWithdrawn_lt?: WeiSource | null;
  amountWithdrawn_gte?: WeiSource | null;
  amountWithdrawn_lte?: WeiSource | null;
  amountWithdrawn_in?: WeiSource[];
  amountWithdrawn_not_in?: WeiSource[];
  collateralAfter?: WeiSource | null;
  collateralAfter_not?: WeiSource | null;
  collateralAfter_gt?: WeiSource | null;
  collateralAfter_lt?: WeiSource | null;
  collateralAfter_gte?: WeiSource | null;
  collateralAfter_lte?: WeiSource | null;
  collateralAfter_in?: WeiSource[];
  collateralAfter_not_in?: WeiSource[];
  account?: string | null;
  account_not?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  loanId?: WeiSource | null;
  loanId_not?: WeiSource | null;
  loanId_gt?: WeiSource | null;
  loanId_lt?: WeiSource | null;
  loanId_gte?: WeiSource | null;
  loanId_lte?: WeiSource | null;
  loanId_in?: WeiSource[];
  loanId_not_in?: WeiSource[];
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
};
export type CollateralWithdrawnResult = {
  id: string;
  amountWithdrawn: Wei;
  collateralAfter: Wei;
  account: string;
  loanId: Wei;
  timestamp: Wei;
};
export type CollateralWithdrawnFields = {
  id: true;
  amountWithdrawn: true;
  collateralAfter: true;
  account: true;
  loanId: true;
  timestamp: true;
};
export type CollateralWithdrawnArgs<K extends keyof CollateralWithdrawnResult> = {
  [Property in keyof Pick<CollateralWithdrawnFields, K>]: CollateralWithdrawnFields[Property];
};
export const getCollateralWithdrawnById = async function <
  K extends keyof CollateralWithdrawnResult
>(
  url: string,
  options: SingleQueryOptions,
  args: CollateralWithdrawnArgs<K>
): Promise<Pick<CollateralWithdrawnResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('collateralWithdrawn', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['amountWithdrawn']) formattedObj['amountWithdrawn'] = wei(obj['amountWithdrawn']);
  if (obj['collateralAfter']) formattedObj['collateralAfter'] = wei(obj['collateralAfter']);
  if (obj['account']) formattedObj['account'] = obj['account'];
  if (obj['loanId']) formattedObj['loanId'] = wei(obj['loanId'], 0);
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  return formattedObj as Pick<CollateralWithdrawnResult, K>;
};
export const getCollateralWithdrawns = async function <K extends keyof CollateralWithdrawnResult>(
  url: string,
  options: MultiQueryOptions<CollateralWithdrawnFilter, CollateralWithdrawnResult>,
  args: CollateralWithdrawnArgs<K>
): Promise<Pick<CollateralWithdrawnResult, K>[]> {
  const paginatedOptions: Partial<
    MultiQueryOptions<CollateralWithdrawnFilter, CollateralWithdrawnResult>
  > = { ...options };
  let paginationKey: keyof CollateralWithdrawnFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc'
        ? '_gt'
        : '_lt')) as keyof CollateralWithdrawnFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<CollateralWithdrawnResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('collateralWithdrawns', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['amountWithdrawn']) formattedObj['amountWithdrawn'] = wei(obj['amountWithdrawn']);
      if (obj['collateralAfter']) formattedObj['collateralAfter'] = wei(obj['collateralAfter']);
      if (obj['account']) formattedObj['account'] = obj['account'];
      if (obj['loanId']) formattedObj['loanId'] = wei(obj['loanId'], 0);
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      return formattedObj as Pick<CollateralWithdrawnResult, K>;
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
export const getDailyBurnedById = async function <K extends keyof DailyBurnedResult>(
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
export const getDailyBurneds = async function <K extends keyof DailyBurnedResult>(
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
export const getDailyCandleById = async function <K extends keyof DailyCandleResult>(
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
export const getDailyCandles = async function <K extends keyof DailyCandleResult>(
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
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
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
export const getDailyExchangePartnerById = async function <
  K extends keyof DailyExchangePartnerResult
>(
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
export const getDailyExchangePartners = async function <K extends keyof DailyExchangePartnerResult>(
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
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
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
export const getDailyIssuedById = async function <K extends keyof DailyIssuedResult>(
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
export const getDailyIssueds = async function <K extends keyof DailyIssuedResult>(
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
};
export type DebtSnapshotResult = {
  id: string;
  block: Wei;
  timestamp: Wei;
  account: string;
  balanceOf: Wei | null;
  collateral: Wei | null;
  debtBalanceOf: Wei | null;
  initialDebtOwnership: Wei | null;
  debtEntryAtIndex: Wei | null;
};
export type DebtSnapshotFields = {
  id: true;
  block: true;
  timestamp: true;
  account: true;
  balanceOf: true;
  collateral: true;
  debtBalanceOf: true;
  initialDebtOwnership: true;
  debtEntryAtIndex: true;
};
export type DebtSnapshotArgs<K extends keyof DebtSnapshotResult> = {
  [Property in keyof Pick<DebtSnapshotFields, K>]: DebtSnapshotFields[Property];
};
export const getDebtSnapshotById = async function <K extends keyof DebtSnapshotResult>(
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
  if (obj['initialDebtOwnership'])
    formattedObj['initialDebtOwnership'] = wei(obj['initialDebtOwnership']);
  if (obj['debtEntryAtIndex']) formattedObj['debtEntryAtIndex'] = wei(obj['debtEntryAtIndex'], 0);
  return formattedObj as Pick<DebtSnapshotResult, K>;
};
export const getDebtSnapshots = async function <K extends keyof DebtSnapshotResult>(
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
      if (obj['initialDebtOwnership'])
        formattedObj['initialDebtOwnership'] = wei(obj['initialDebtOwnership']);
      if (obj['debtEntryAtIndex'])
        formattedObj['debtEntryAtIndex'] = wei(obj['debtEntryAtIndex'], 0);
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
export type DebtStateFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  period?: WeiSource | null;
  period_not?: WeiSource | null;
  period_gt?: WeiSource | null;
  period_lt?: WeiSource | null;
  period_gte?: WeiSource | null;
  period_lte?: WeiSource | null;
  period_in?: WeiSource[];
  period_not_in?: WeiSource[];
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
  debtEntry?: WeiSource | null;
  debtEntry_not?: WeiSource | null;
  debtEntry_gt?: WeiSource | null;
  debtEntry_lt?: WeiSource | null;
  debtEntry_gte?: WeiSource | null;
  debtEntry_lte?: WeiSource | null;
  debtEntry_in?: WeiSource[];
  debtEntry_not_in?: WeiSource[];
  totalIssuedSynths?: WeiSource | null;
  totalIssuedSynths_not?: WeiSource | null;
  totalIssuedSynths_gt?: WeiSource | null;
  totalIssuedSynths_lt?: WeiSource | null;
  totalIssuedSynths_gte?: WeiSource | null;
  totalIssuedSynths_lte?: WeiSource | null;
  totalIssuedSynths_in?: WeiSource[];
  totalIssuedSynths_not_in?: WeiSource[];
  debtRatio?: WeiSource | null;
  debtRatio_not?: WeiSource | null;
  debtRatio_gt?: WeiSource | null;
  debtRatio_lt?: WeiSource | null;
  debtRatio_gte?: WeiSource | null;
  debtRatio_lte?: WeiSource | null;
  debtRatio_in?: WeiSource[];
  debtRatio_not_in?: WeiSource[];
};
export type DebtStateResult = {
  id: string;
  period: Wei;
  timestamp: Wei;
  debtEntry: Wei;
  totalIssuedSynths: Wei;
  debtRatio: Wei;
};
export type DebtStateFields = {
  id: true;
  period: true;
  timestamp: true;
  debtEntry: true;
  totalIssuedSynths: true;
  debtRatio: true;
};
export type DebtStateArgs<K extends keyof DebtStateResult> = {
  [Property in keyof Pick<DebtStateFields, K>]: DebtStateFields[Property];
};
export const getDebtStateById = async function <K extends keyof DebtStateResult>(
  url: string,
  options: SingleQueryOptions,
  args: DebtStateArgs<K>
): Promise<Pick<DebtStateResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('debtState', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['period']) formattedObj['period'] = wei(obj['period'], 0);
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  if (obj['debtEntry']) formattedObj['debtEntry'] = wei(obj['debtEntry']);
  if (obj['totalIssuedSynths']) formattedObj['totalIssuedSynths'] = wei(obj['totalIssuedSynths']);
  if (obj['debtRatio']) formattedObj['debtRatio'] = wei(obj['debtRatio']);
  return formattedObj as Pick<DebtStateResult, K>;
};
export const getDebtStates = async function <K extends keyof DebtStateResult>(
  url: string,
  options: MultiQueryOptions<DebtStateFilter, DebtStateResult>,
  args: DebtStateArgs<K>
): Promise<Pick<DebtStateResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<DebtStateFilter, DebtStateResult>> = {
    ...options,
  };
  let paginationKey: keyof DebtStateFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof DebtStateFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<DebtStateResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('debtStates', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['period']) formattedObj['period'] = wei(obj['period'], 0);
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      if (obj['debtEntry']) formattedObj['debtEntry'] = wei(obj['debtEntry']);
      if (obj['totalIssuedSynths'])
        formattedObj['totalIssuedSynths'] = wei(obj['totalIssuedSynths']);
      if (obj['debtRatio']) formattedObj['debtRatio'] = wei(obj['debtRatio']);
      return formattedObj as Pick<DebtStateResult, K>;
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
export type DelegatedWalletFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  authoriser?: string | null;
  authoriser_not?: string | null;
  authoriser_in?: string[];
  authoriser_not_in?: string[];
  authoriser_contains?: string | null;
  authoriser_not_contains?: string | null;
  delegate?: string | null;
  delegate_not?: string | null;
  delegate_in?: string[];
  delegate_not_in?: string[];
  delegate_contains?: string | null;
  delegate_not_contains?: string | null;
  canMint?: boolean | null;
  canMint_not?: boolean | null;
  canMint_in?: boolean[];
  canMint_not_in?: boolean[];
  canBurn?: boolean | null;
  canBurn_not?: boolean | null;
  canBurn_in?: boolean[];
  canBurn_not_in?: boolean[];
  canClaim?: boolean | null;
  canClaim_not?: boolean | null;
  canClaim_in?: boolean[];
  canClaim_not_in?: boolean[];
  canExchange?: boolean | null;
  canExchange_not?: boolean | null;
  canExchange_in?: boolean[];
  canExchange_not_in?: boolean[];
};
export type DelegatedWalletResult = {
  id: string;
  authoriser: string;
  delegate: string;
  canMint: boolean | null;
  canBurn: boolean | null;
  canClaim: boolean | null;
  canExchange: boolean | null;
};
export type DelegatedWalletFields = {
  id: true;
  authoriser: true;
  delegate: true;
  canMint: true;
  canBurn: true;
  canClaim: true;
  canExchange: true;
};
export type DelegatedWalletArgs<K extends keyof DelegatedWalletResult> = {
  [Property in keyof Pick<DelegatedWalletFields, K>]: DelegatedWalletFields[Property];
};
export const getDelegatedWalletById = async function <K extends keyof DelegatedWalletResult>(
  url: string,
  options: SingleQueryOptions,
  args: DelegatedWalletArgs<K>
): Promise<Pick<DelegatedWalletResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('delegatedWallet', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['authoriser']) formattedObj['authoriser'] = obj['authoriser'];
  if (obj['delegate']) formattedObj['delegate'] = obj['delegate'];
  if (obj['canMint']) formattedObj['canMint'] = obj['canMint'];
  if (obj['canBurn']) formattedObj['canBurn'] = obj['canBurn'];
  if (obj['canClaim']) formattedObj['canClaim'] = obj['canClaim'];
  if (obj['canExchange']) formattedObj['canExchange'] = obj['canExchange'];
  return formattedObj as Pick<DelegatedWalletResult, K>;
};
export const getDelegatedWallets = async function <K extends keyof DelegatedWalletResult>(
  url: string,
  options: MultiQueryOptions<DelegatedWalletFilter, DelegatedWalletResult>,
  args: DelegatedWalletArgs<K>
): Promise<Pick<DelegatedWalletResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<DelegatedWalletFilter, DelegatedWalletResult>> =
    { ...options };
  let paginationKey: keyof DelegatedWalletFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof DelegatedWalletFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<DelegatedWalletResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('delegatedWallets', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['authoriser']) formattedObj['authoriser'] = obj['authoriser'];
      if (obj['delegate']) formattedObj['delegate'] = obj['delegate'];
      if (obj['canMint']) formattedObj['canMint'] = obj['canMint'];
      if (obj['canBurn']) formattedObj['canBurn'] = obj['canBurn'];
      if (obj['canClaim']) formattedObj['canClaim'] = obj['canClaim'];
      if (obj['canExchange']) formattedObj['canExchange'] = obj['canExchange'];
      return formattedObj as Pick<DelegatedWalletResult, K>;
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
export const getExchangeEntryAppendedById = async function <
  K extends keyof ExchangeEntryAppendedResult
>(
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
export const getExchangeEntryAppendeds = async function <
  K extends keyof ExchangeEntryAppendedResult
>(
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
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
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
export const getExchangeEntrySettledById = async function <
  K extends keyof ExchangeEntrySettledResult
>(
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
export const getExchangeEntrySettleds = async function <K extends keyof ExchangeEntrySettledResult>(
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
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
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
export const getExchangeFeeById = async function <K extends keyof ExchangeFeeResult>(
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
export const getExchangeFees = async function <K extends keyof ExchangeFeeResult>(
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
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
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
export const getExchangePartnerById = async function <K extends keyof ExchangePartnerResult>(
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
export const getExchangePartners = async function <K extends keyof ExchangePartnerResult>(
  url: string,
  options: MultiQueryOptions<ExchangePartnerFilter, ExchangePartnerResult>,
  args: ExchangePartnerArgs<K>
): Promise<Pick<ExchangePartnerResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<ExchangePartnerFilter, ExchangePartnerResult>> =
    { ...options };
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
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
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
  account_gt?: string | null;
  account_lt?: string | null;
  account_gte?: string | null;
  account_lte?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  account_starts_with?: string | null;
  account_not_starts_with?: string | null;
  account_ends_with?: string | null;
  account_not_ends_with?: string | null;
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
  account: Partial<ExchangerResult>;
  currencyKey: string;
  amount: Wei;
  amountInUSD: Wei;
  timestamp: Wei;
  gasPrice: Wei;
  block: Wei;
};
export type ExchangeRebateFields = {
  id: true;
  account: ExchangerFields;
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
export const getExchangeRebateById = async function <K extends keyof ExchangeRebateResult>(
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
export const getExchangeRebates = async function <K extends keyof ExchangeRebateResult>(
  url: string,
  options: MultiQueryOptions<ExchangeRebateFilter, ExchangeRebateResult>,
  args: ExchangeRebateArgs<K>
): Promise<Pick<ExchangeRebateResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<ExchangeRebateFilter, ExchangeRebateResult>> = {
    ...options,
  };
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
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
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
  account_gt?: string | null;
  account_lt?: string | null;
  account_gte?: string | null;
  account_lte?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  account_starts_with?: string | null;
  account_not_starts_with?: string | null;
  account_ends_with?: string | null;
  account_not_ends_with?: string | null;
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
  account: Partial<ExchangerResult>;
  currencyKey: string;
  amount: Wei;
  amountInUSD: Wei;
  timestamp: Wei;
  gasPrice: Wei;
  block: Wei;
};
export type ExchangeReclaimFields = {
  id: true;
  account: ExchangerFields;
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
export const getExchangeReclaimById = async function <K extends keyof ExchangeReclaimResult>(
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
export const getExchangeReclaims = async function <K extends keyof ExchangeReclaimResult>(
  url: string,
  options: MultiQueryOptions<ExchangeReclaimFilter, ExchangeReclaimResult>,
  args: ExchangeReclaimArgs<K>
): Promise<Pick<ExchangeReclaimResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<ExchangeReclaimFilter, ExchangeReclaimResult>> =
    { ...options };
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
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
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
export type ExchangerFilter = {
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
  period?: WeiSource | null;
  period_not?: WeiSource | null;
  period_gt?: WeiSource | null;
  period_lt?: WeiSource | null;
  period_gte?: WeiSource | null;
  period_lte?: WeiSource | null;
  period_in?: WeiSource[];
  period_not_in?: WeiSource[];
  bucketMagnitude?: WeiSource | null;
  bucketMagnitude_not?: WeiSource | null;
  bucketMagnitude_gt?: WeiSource | null;
  bucketMagnitude_lt?: WeiSource | null;
  bucketMagnitude_gte?: WeiSource | null;
  bucketMagnitude_lte?: WeiSource | null;
  bucketMagnitude_in?: WeiSource[];
  bucketMagnitude_not_in?: WeiSource[];
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
  firstSeen?: WeiSource | null;
  firstSeen_not?: WeiSource | null;
  firstSeen_gt?: WeiSource | null;
  firstSeen_lt?: WeiSource | null;
  firstSeen_gte?: WeiSource | null;
  firstSeen_lte?: WeiSource | null;
  firstSeen_in?: WeiSource[];
  firstSeen_not_in?: WeiSource[];
  lastSeen?: WeiSource | null;
  lastSeen_not?: WeiSource | null;
  lastSeen_gt?: WeiSource | null;
  lastSeen_lt?: WeiSource | null;
  lastSeen_gte?: WeiSource | null;
  lastSeen_lte?: WeiSource | null;
  lastSeen_in?: WeiSource[];
  lastSeen_not_in?: WeiSource[];
  trades?: WeiSource | null;
  trades_not?: WeiSource | null;
  trades_gt?: WeiSource | null;
  trades_lt?: WeiSource | null;
  trades_gte?: WeiSource | null;
  trades_lte?: WeiSource | null;
  trades_in?: WeiSource[];
  trades_not_in?: WeiSource[];
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
  balances?: string[];
  balances_not?: string[];
  balances_contains?: string[];
  balances_not_contains?: string[];
};
export type ExchangerResult = {
  id: string;
  timestamp: Wei;
  period: Wei;
  bucketMagnitude: Wei;
  synth: Partial<SynthResult> | null;
  firstSeen: Wei;
  lastSeen: Wei;
  trades: Wei;
  exchangeUSDTally: Wei;
  totalFeesGeneratedInUSD: Wei;
  balances: Partial<LatestSynthBalanceResult>[];
  exchanges: Partial<SynthExchangeResult>[];
};
export type ExchangerFields = {
  id: true;
  timestamp: true;
  period: true;
  bucketMagnitude: true;
  synth: SynthFields;
  firstSeen: true;
  lastSeen: true;
  trades: true;
  exchangeUSDTally: true;
  totalFeesGeneratedInUSD: true;
  balances: LatestSynthBalanceFields;
  exchanges: SynthExchangeFields;
};
export type ExchangerArgs<K extends keyof ExchangerResult> = {
  [Property in keyof Pick<ExchangerFields, K>]: ExchangerFields[Property];
};
export const getExchangerById = async function <K extends keyof ExchangerResult>(
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
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  if (obj['period']) formattedObj['period'] = wei(obj['period'], 0);
  if (obj['bucketMagnitude']) formattedObj['bucketMagnitude'] = wei(obj['bucketMagnitude'], 0);
  if (obj['synth']) formattedObj['synth'] = obj['synth'];
  if (obj['firstSeen']) formattedObj['firstSeen'] = wei(obj['firstSeen'], 0);
  if (obj['lastSeen']) formattedObj['lastSeen'] = wei(obj['lastSeen'], 0);
  if (obj['trades']) formattedObj['trades'] = wei(obj['trades'], 0);
  if (obj['exchangeUSDTally']) formattedObj['exchangeUSDTally'] = wei(obj['exchangeUSDTally']);
  if (obj['totalFeesGeneratedInUSD'])
    formattedObj['totalFeesGeneratedInUSD'] = wei(obj['totalFeesGeneratedInUSD']);
  if (obj['balances']) formattedObj['balances'] = obj['balances'];
  if (obj['exchanges']) formattedObj['exchanges'] = obj['exchanges'];
  return formattedObj as Pick<ExchangerResult, K>;
};
export const getExchangers = async function <K extends keyof ExchangerResult>(
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
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
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
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      if (obj['period']) formattedObj['period'] = wei(obj['period'], 0);
      if (obj['bucketMagnitude']) formattedObj['bucketMagnitude'] = wei(obj['bucketMagnitude'], 0);
      if (obj['synth']) formattedObj['synth'] = obj['synth'];
      if (obj['firstSeen']) formattedObj['firstSeen'] = wei(obj['firstSeen'], 0);
      if (obj['lastSeen']) formattedObj['lastSeen'] = wei(obj['lastSeen'], 0);
      if (obj['trades']) formattedObj['trades'] = wei(obj['trades'], 0);
      if (obj['exchangeUSDTally']) formattedObj['exchangeUSDTally'] = wei(obj['exchangeUSDTally']);
      if (obj['totalFeesGeneratedInUSD'])
        formattedObj['totalFeesGeneratedInUSD'] = wei(obj['totalFeesGeneratedInUSD']);
      if (obj['balances']) formattedObj['balances'] = obj['balances'];
      if (obj['exchanges']) formattedObj['exchanges'] = obj['exchanges'];
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
export type FeePeriodFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  startTime?: WeiSource | null;
  startTime_not?: WeiSource | null;
  startTime_gt?: WeiSource | null;
  startTime_lt?: WeiSource | null;
  startTime_gte?: WeiSource | null;
  startTime_lte?: WeiSource | null;
  startTime_in?: WeiSource[];
  startTime_not_in?: WeiSource[];
  feesToDistribute?: WeiSource | null;
  feesToDistribute_not?: WeiSource | null;
  feesToDistribute_gt?: WeiSource | null;
  feesToDistribute_lt?: WeiSource | null;
  feesToDistribute_gte?: WeiSource | null;
  feesToDistribute_lte?: WeiSource | null;
  feesToDistribute_in?: WeiSource[];
  feesToDistribute_not_in?: WeiSource[];
  feesClaimed?: WeiSource | null;
  feesClaimed_not?: WeiSource | null;
  feesClaimed_gt?: WeiSource | null;
  feesClaimed_lt?: WeiSource | null;
  feesClaimed_gte?: WeiSource | null;
  feesClaimed_lte?: WeiSource | null;
  feesClaimed_in?: WeiSource[];
  feesClaimed_not_in?: WeiSource[];
  rewardsToDistribute?: WeiSource | null;
  rewardsToDistribute_not?: WeiSource | null;
  rewardsToDistribute_gt?: WeiSource | null;
  rewardsToDistribute_lt?: WeiSource | null;
  rewardsToDistribute_gte?: WeiSource | null;
  rewardsToDistribute_lte?: WeiSource | null;
  rewardsToDistribute_in?: WeiSource[];
  rewardsToDistribute_not_in?: WeiSource[];
  rewardsClaimed?: WeiSource | null;
  rewardsClaimed_not?: WeiSource | null;
  rewardsClaimed_gt?: WeiSource | null;
  rewardsClaimed_lt?: WeiSource | null;
  rewardsClaimed_gte?: WeiSource | null;
  rewardsClaimed_lte?: WeiSource | null;
  rewardsClaimed_in?: WeiSource[];
  rewardsClaimed_not_in?: WeiSource[];
};
export type FeePeriodResult = {
  id: string;
  startTime: Wei;
  feesToDistribute: Wei;
  feesClaimed: Wei;
  rewardsToDistribute: Wei;
  rewardsClaimed: Wei;
};
export type FeePeriodFields = {
  id: true;
  startTime: true;
  feesToDistribute: true;
  feesClaimed: true;
  rewardsToDistribute: true;
  rewardsClaimed: true;
};
export type FeePeriodArgs<K extends keyof FeePeriodResult> = {
  [Property in keyof Pick<FeePeriodFields, K>]: FeePeriodFields[Property];
};
export const getFeePeriodById = async function <K extends keyof FeePeriodResult>(
  url: string,
  options: SingleQueryOptions,
  args: FeePeriodArgs<K>
): Promise<Pick<FeePeriodResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('feePeriod', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['startTime']) formattedObj['startTime'] = wei(obj['startTime'], 0);
  if (obj['feesToDistribute']) formattedObj['feesToDistribute'] = wei(obj['feesToDistribute']);
  if (obj['feesClaimed']) formattedObj['feesClaimed'] = wei(obj['feesClaimed']);
  if (obj['rewardsToDistribute'])
    formattedObj['rewardsToDistribute'] = wei(obj['rewardsToDistribute']);
  if (obj['rewardsClaimed']) formattedObj['rewardsClaimed'] = wei(obj['rewardsClaimed']);
  return formattedObj as Pick<FeePeriodResult, K>;
};
export const getFeePeriods = async function <K extends keyof FeePeriodResult>(
  url: string,
  options: MultiQueryOptions<FeePeriodFilter, FeePeriodResult>,
  args: FeePeriodArgs<K>
): Promise<Pick<FeePeriodResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<FeePeriodFilter, FeePeriodResult>> = {
    ...options,
  };
  let paginationKey: keyof FeePeriodFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof FeePeriodFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<FeePeriodResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('feePeriods', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['startTime']) formattedObj['startTime'] = wei(obj['startTime'], 0);
      if (obj['feesToDistribute']) formattedObj['feesToDistribute'] = wei(obj['feesToDistribute']);
      if (obj['feesClaimed']) formattedObj['feesClaimed'] = wei(obj['feesClaimed']);
      if (obj['rewardsToDistribute'])
        formattedObj['rewardsToDistribute'] = wei(obj['rewardsToDistribute']);
      if (obj['rewardsClaimed']) formattedObj['rewardsClaimed'] = wei(obj['rewardsClaimed']);
      return formattedObj as Pick<FeePeriodResult, K>;
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
export const getFeesClaimedById = async function <K extends keyof FeesClaimedResult>(
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
export const getFeesClaimeds = async function <K extends keyof FeesClaimedResult>(
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
export const getInversePricingInfoById = async function <K extends keyof InversePricingInfoResult>(
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
export const getInversePricingInfos = async function <K extends keyof InversePricingInfoResult>(
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
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
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
export const getIssuedById = async function <K extends keyof IssuedResult>(
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
export const getIssueds = async function <K extends keyof IssuedResult>(
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
export const getIssuerById = async function <K extends keyof IssuerResult>(
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
export const getIssuers = async function <K extends keyof IssuerResult>(
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
export const getLatestRateById = async function <K extends keyof LatestRateResult>(
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
export const getLatestRates = async function <K extends keyof LatestRateResult>(
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
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
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
export type LatestSynthBalanceFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  amount?: WeiSource | null;
  amount_not?: WeiSource | null;
  amount_gt?: WeiSource | null;
  amount_lt?: WeiSource | null;
  amount_gte?: WeiSource | null;
  amount_lte?: WeiSource | null;
  amount_in?: WeiSource[];
  amount_not_in?: WeiSource[];
  address?: string | null;
  address_not?: string | null;
  address_in?: string[];
  address_not_in?: string[];
  address_contains?: string | null;
  address_not_contains?: string | null;
  account?: string | null;
  account_not?: string | null;
  account_gt?: string | null;
  account_lt?: string | null;
  account_gte?: string | null;
  account_lte?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  account_starts_with?: string | null;
  account_not_starts_with?: string | null;
  account_ends_with?: string | null;
  account_not_ends_with?: string | null;
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
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
};
export type LatestSynthBalanceResult = {
  id: string;
  amount: Wei;
  address: string;
  account: string;
  timestamp: Wei;
  synth: Partial<SynthResult> | null;
};
export type LatestSynthBalanceFields = {
  id: true;
  amount: true;
  address: true;
  account: true;
  timestamp: true;
  synth: SynthFields;
};
export type LatestSynthBalanceArgs<K extends keyof LatestSynthBalanceResult> = {
  [Property in keyof Pick<LatestSynthBalanceFields, K>]: LatestSynthBalanceFields[Property];
};
export const getLatestSynthBalanceById = async function <K extends keyof LatestSynthBalanceResult>(
  url: string,
  options: SingleQueryOptions,
  args: LatestSynthBalanceArgs<K>
): Promise<Pick<LatestSynthBalanceResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('latestSynthBalance', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
  if (obj['address']) formattedObj['address'] = obj['address'];
  if (obj['account']) formattedObj['account'] = obj['account'];
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  if (obj['synth']) formattedObj['synth'] = obj['synth'];
  return formattedObj as Pick<LatestSynthBalanceResult, K>;
};
export const getLatestSynthBalances = async function <K extends keyof LatestSynthBalanceResult>(
  url: string,
  options: MultiQueryOptions<LatestSynthBalanceFilter, LatestSynthBalanceResult>,
  args: LatestSynthBalanceArgs<K>
): Promise<Pick<LatestSynthBalanceResult, K>[]> {
  const paginatedOptions: Partial<
    MultiQueryOptions<LatestSynthBalanceFilter, LatestSynthBalanceResult>
  > = { ...options };
  let paginationKey: keyof LatestSynthBalanceFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc'
        ? '_gt'
        : '_lt')) as keyof LatestSynthBalanceFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<LatestSynthBalanceResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('latestSynthBalances', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
      if (obj['address']) formattedObj['address'] = obj['address'];
      if (obj['account']) formattedObj['account'] = obj['account'];
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      if (obj['synth']) formattedObj['synth'] = obj['synth'];
      return formattedObj as Pick<LatestSynthBalanceResult, K>;
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
export type LoanFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  txHash?: string | null;
  txHash_not?: string | null;
  txHash_gt?: string | null;
  txHash_lt?: string | null;
  txHash_gte?: string | null;
  txHash_lte?: string | null;
  txHash_in?: string[];
  txHash_not_in?: string[];
  txHash_contains?: string | null;
  txHash_not_contains?: string | null;
  txHash_starts_with?: string | null;
  txHash_not_starts_with?: string | null;
  txHash_ends_with?: string | null;
  txHash_not_ends_with?: string | null;
  account?: string | null;
  account_not?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  currency?: string | null;
  currency_not?: string | null;
  currency_gt?: string | null;
  currency_lt?: string | null;
  currency_gte?: string | null;
  currency_lte?: string | null;
  currency_in?: string[];
  currency_not_in?: string[];
  currency_contains?: string | null;
  currency_not_contains?: string | null;
  currency_starts_with?: string | null;
  currency_not_starts_with?: string | null;
  currency_ends_with?: string | null;
  currency_not_ends_with?: string | null;
  collateralMinted?: string | null;
  collateralMinted_not?: string | null;
  collateralMinted_gt?: string | null;
  collateralMinted_lt?: string | null;
  collateralMinted_gte?: string | null;
  collateralMinted_lte?: string | null;
  collateralMinted_in?: string[];
  collateralMinted_not_in?: string[];
  collateralMinted_contains?: string | null;
  collateralMinted_not_contains?: string | null;
  collateralMinted_starts_with?: string | null;
  collateralMinted_not_starts_with?: string | null;
  collateralMinted_ends_with?: string | null;
  collateralMinted_not_ends_with?: string | null;
  amount?: WeiSource | null;
  amount_not?: WeiSource | null;
  amount_gt?: WeiSource | null;
  amount_lt?: WeiSource | null;
  amount_gte?: WeiSource | null;
  amount_lte?: WeiSource | null;
  amount_in?: WeiSource[];
  amount_not_in?: WeiSource[];
  collateralAmount?: WeiSource | null;
  collateralAmount_not?: WeiSource | null;
  collateralAmount_gt?: WeiSource | null;
  collateralAmount_lt?: WeiSource | null;
  collateralAmount_gte?: WeiSource | null;
  collateralAmount_lte?: WeiSource | null;
  collateralAmount_in?: WeiSource[];
  collateralAmount_not_in?: WeiSource[];
  isOpen?: boolean | null;
  isOpen_not?: boolean | null;
  isOpen_in?: boolean[];
  isOpen_not_in?: boolean[];
  createdAt?: WeiSource | null;
  createdAt_not?: WeiSource | null;
  createdAt_gt?: WeiSource | null;
  createdAt_lt?: WeiSource | null;
  createdAt_gte?: WeiSource | null;
  createdAt_lte?: WeiSource | null;
  createdAt_in?: WeiSource[];
  createdAt_not_in?: WeiSource[];
  closedAt?: WeiSource | null;
  closedAt_not?: WeiSource | null;
  closedAt_gt?: WeiSource | null;
  closedAt_lt?: WeiSource | null;
  closedAt_gte?: WeiSource | null;
  closedAt_lte?: WeiSource | null;
  closedAt_in?: WeiSource[];
  closedAt_not_in?: WeiSource[];
  hasPartialLiquidations?: boolean | null;
  hasPartialLiquidations_not?: boolean | null;
  hasPartialLiquidations_in?: boolean[];
  hasPartialLiquidations_not_in?: boolean[];
};
export type LoanResult = {
  id: string;
  txHash: string;
  account: string;
  currency: string;
  collateralMinted: string;
  amount: Wei;
  collateralAmount: Wei;
  isOpen: boolean;
  createdAt: Wei;
  closedAt: Wei | null;
  hasPartialLiquidations: boolean;
};
export type LoanFields = {
  id: true;
  txHash: true;
  account: true;
  currency: true;
  collateralMinted: true;
  amount: true;
  collateralAmount: true;
  isOpen: true;
  createdAt: true;
  closedAt: true;
  hasPartialLiquidations: true;
};
export type LoanArgs<K extends keyof LoanResult> = {
  [Property in keyof Pick<LoanFields, K>]: LoanFields[Property];
};
export const getLoanById = async function <K extends keyof LoanResult>(
  url: string,
  options: SingleQueryOptions,
  args: LoanArgs<K>
): Promise<Pick<LoanResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('loan', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['txHash']) formattedObj['txHash'] = obj['txHash'];
  if (obj['account']) formattedObj['account'] = obj['account'];
  if (obj['currency']) formattedObj['currency'] = obj['currency'];
  if (obj['collateralMinted']) formattedObj['collateralMinted'] = obj['collateralMinted'];
  if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
  if (obj['collateralAmount']) formattedObj['collateralAmount'] = wei(obj['collateralAmount']);
  if (obj['isOpen']) formattedObj['isOpen'] = obj['isOpen'];
  if (obj['createdAt']) formattedObj['createdAt'] = wei(obj['createdAt'], 0);
  if (obj['closedAt']) formattedObj['closedAt'] = wei(obj['closedAt'], 0);
  if (obj['hasPartialLiquidations'])
    formattedObj['hasPartialLiquidations'] = obj['hasPartialLiquidations'];
  return formattedObj as Pick<LoanResult, K>;
};
export const getLoans = async function <K extends keyof LoanResult>(
  url: string,
  options: MultiQueryOptions<LoanFilter, LoanResult>,
  args: LoanArgs<K>
): Promise<Pick<LoanResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<LoanFilter, LoanResult>> = { ...options };
  let paginationKey: keyof LoanFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof LoanFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<LoanResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('loans', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['txHash']) formattedObj['txHash'] = obj['txHash'];
      if (obj['account']) formattedObj['account'] = obj['account'];
      if (obj['currency']) formattedObj['currency'] = obj['currency'];
      if (obj['collateralMinted']) formattedObj['collateralMinted'] = obj['collateralMinted'];
      if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
      if (obj['collateralAmount']) formattedObj['collateralAmount'] = wei(obj['collateralAmount']);
      if (obj['isOpen']) formattedObj['isOpen'] = obj['isOpen'];
      if (obj['createdAt']) formattedObj['createdAt'] = wei(obj['createdAt'], 0);
      if (obj['closedAt']) formattedObj['closedAt'] = wei(obj['closedAt'], 0);
      if (obj['hasPartialLiquidations'])
        formattedObj['hasPartialLiquidations'] = obj['hasPartialLiquidations'];
      return formattedObj as Pick<LoanResult, K>;
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
export type LoanLiquidatedFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  loanId?: WeiSource | null;
  loanId_not?: WeiSource | null;
  loanId_gt?: WeiSource | null;
  loanId_lt?: WeiSource | null;
  loanId_gte?: WeiSource | null;
  loanId_lte?: WeiSource | null;
  loanId_in?: WeiSource[];
  loanId_not_in?: WeiSource[];
  account?: string | null;
  account_not?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  liquidator?: string | null;
  liquidator_not?: string | null;
  liquidator_in?: string[];
  liquidator_not_in?: string[];
  liquidator_contains?: string | null;
  liquidator_not_contains?: string | null;
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
};
export type LoanLiquidatedResult = {
  id: string;
  loanId: Wei;
  account: string;
  liquidator: string;
  timestamp: Wei;
};
export type LoanLiquidatedFields = {
  id: true;
  loanId: true;
  account: true;
  liquidator: true;
  timestamp: true;
};
export type LoanLiquidatedArgs<K extends keyof LoanLiquidatedResult> = {
  [Property in keyof Pick<LoanLiquidatedFields, K>]: LoanLiquidatedFields[Property];
};
export const getLoanLiquidatedById = async function <K extends keyof LoanLiquidatedResult>(
  url: string,
  options: SingleQueryOptions,
  args: LoanLiquidatedArgs<K>
): Promise<Pick<LoanLiquidatedResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('loanLiquidated', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['loanId']) formattedObj['loanId'] = wei(obj['loanId'], 0);
  if (obj['account']) formattedObj['account'] = obj['account'];
  if (obj['liquidator']) formattedObj['liquidator'] = obj['liquidator'];
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  return formattedObj as Pick<LoanLiquidatedResult, K>;
};
export const getLoanLiquidateds = async function <K extends keyof LoanLiquidatedResult>(
  url: string,
  options: MultiQueryOptions<LoanLiquidatedFilter, LoanLiquidatedResult>,
  args: LoanLiquidatedArgs<K>
): Promise<Pick<LoanLiquidatedResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<LoanLiquidatedFilter, LoanLiquidatedResult>> = {
    ...options,
  };
  let paginationKey: keyof LoanLiquidatedFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof LoanLiquidatedFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<LoanLiquidatedResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('loanLiquidateds', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['loanId']) formattedObj['loanId'] = wei(obj['loanId'], 0);
      if (obj['account']) formattedObj['account'] = obj['account'];
      if (obj['liquidator']) formattedObj['liquidator'] = obj['liquidator'];
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      return formattedObj as Pick<LoanLiquidatedResult, K>;
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
export type LoanPartiallyLiquidatedFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  loanId?: WeiSource | null;
  loanId_not?: WeiSource | null;
  loanId_gt?: WeiSource | null;
  loanId_lt?: WeiSource | null;
  loanId_gte?: WeiSource | null;
  loanId_lte?: WeiSource | null;
  loanId_in?: WeiSource[];
  loanId_not_in?: WeiSource[];
  account?: string | null;
  account_not?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  liquidator?: string | null;
  liquidator_not?: string | null;
  liquidator_in?: string[];
  liquidator_not_in?: string[];
  liquidator_contains?: string | null;
  liquidator_not_contains?: string | null;
  liquidatedAmount?: WeiSource | null;
  liquidatedAmount_not?: WeiSource | null;
  liquidatedAmount_gt?: WeiSource | null;
  liquidatedAmount_lt?: WeiSource | null;
  liquidatedAmount_gte?: WeiSource | null;
  liquidatedAmount_lte?: WeiSource | null;
  liquidatedAmount_in?: WeiSource[];
  liquidatedAmount_not_in?: WeiSource[];
  liquidatedCollateral?: WeiSource | null;
  liquidatedCollateral_not?: WeiSource | null;
  liquidatedCollateral_gt?: WeiSource | null;
  liquidatedCollateral_lt?: WeiSource | null;
  liquidatedCollateral_gte?: WeiSource | null;
  liquidatedCollateral_lte?: WeiSource | null;
  liquidatedCollateral_in?: WeiSource[];
  liquidatedCollateral_not_in?: WeiSource[];
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
};
export type LoanPartiallyLiquidatedResult = {
  id: string;
  loanId: Wei;
  account: string;
  liquidator: string;
  liquidatedAmount: Wei;
  liquidatedCollateral: Wei;
  timestamp: Wei;
};
export type LoanPartiallyLiquidatedFields = {
  id: true;
  loanId: true;
  account: true;
  liquidator: true;
  liquidatedAmount: true;
  liquidatedCollateral: true;
  timestamp: true;
};
export type LoanPartiallyLiquidatedArgs<K extends keyof LoanPartiallyLiquidatedResult> = {
  [Property in keyof Pick<
    LoanPartiallyLiquidatedFields,
    K
  >]: LoanPartiallyLiquidatedFields[Property];
};
export const getLoanPartiallyLiquidatedById = async function <
  K extends keyof LoanPartiallyLiquidatedResult
>(
  url: string,
  options: SingleQueryOptions,
  args: LoanPartiallyLiquidatedArgs<K>
): Promise<Pick<LoanPartiallyLiquidatedResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('loanPartiallyLiquidated', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['loanId']) formattedObj['loanId'] = wei(obj['loanId'], 0);
  if (obj['account']) formattedObj['account'] = obj['account'];
  if (obj['liquidator']) formattedObj['liquidator'] = obj['liquidator'];
  if (obj['liquidatedAmount']) formattedObj['liquidatedAmount'] = wei(obj['liquidatedAmount']);
  if (obj['liquidatedCollateral'])
    formattedObj['liquidatedCollateral'] = wei(obj['liquidatedCollateral']);
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  return formattedObj as Pick<LoanPartiallyLiquidatedResult, K>;
};
export const getLoanPartiallyLiquidateds = async function <
  K extends keyof LoanPartiallyLiquidatedResult
>(
  url: string,
  options: MultiQueryOptions<LoanPartiallyLiquidatedFilter, LoanPartiallyLiquidatedResult>,
  args: LoanPartiallyLiquidatedArgs<K>
): Promise<Pick<LoanPartiallyLiquidatedResult, K>[]> {
  const paginatedOptions: Partial<
    MultiQueryOptions<LoanPartiallyLiquidatedFilter, LoanPartiallyLiquidatedResult>
  > = { ...options };
  let paginationKey: keyof LoanPartiallyLiquidatedFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc'
        ? '_gt'
        : '_lt')) as keyof LoanPartiallyLiquidatedFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<LoanPartiallyLiquidatedResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('loanPartiallyLiquidateds', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['loanId']) formattedObj['loanId'] = wei(obj['loanId'], 0);
      if (obj['account']) formattedObj['account'] = obj['account'];
      if (obj['liquidator']) formattedObj['liquidator'] = obj['liquidator'];
      if (obj['liquidatedAmount']) formattedObj['liquidatedAmount'] = wei(obj['liquidatedAmount']);
      if (obj['liquidatedCollateral'])
        formattedObj['liquidatedCollateral'] = wei(obj['liquidatedCollateral']);
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      return formattedObj as Pick<LoanPartiallyLiquidatedResult, K>;
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
export type LoanRepaidFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  repaidAmount?: WeiSource | null;
  repaidAmount_not?: WeiSource | null;
  repaidAmount_gt?: WeiSource | null;
  repaidAmount_lt?: WeiSource | null;
  repaidAmount_gte?: WeiSource | null;
  repaidAmount_lte?: WeiSource | null;
  repaidAmount_in?: WeiSource[];
  repaidAmount_not_in?: WeiSource[];
  newLoanAmount?: WeiSource | null;
  newLoanAmount_not?: WeiSource | null;
  newLoanAmount_gt?: WeiSource | null;
  newLoanAmount_lt?: WeiSource | null;
  newLoanAmount_gte?: WeiSource | null;
  newLoanAmount_lte?: WeiSource | null;
  newLoanAmount_in?: WeiSource[];
  newLoanAmount_not_in?: WeiSource[];
  account?: string | null;
  account_not?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  loanId?: WeiSource | null;
  loanId_not?: WeiSource | null;
  loanId_gt?: WeiSource | null;
  loanId_lt?: WeiSource | null;
  loanId_gte?: WeiSource | null;
  loanId_lte?: WeiSource | null;
  loanId_in?: WeiSource[];
  loanId_not_in?: WeiSource[];
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
};
export type LoanRepaidResult = {
  id: string;
  repaidAmount: Wei;
  newLoanAmount: Wei;
  account: string;
  loanId: Wei;
  timestamp: Wei;
};
export type LoanRepaidFields = {
  id: true;
  repaidAmount: true;
  newLoanAmount: true;
  account: true;
  loanId: true;
  timestamp: true;
};
export type LoanRepaidArgs<K extends keyof LoanRepaidResult> = {
  [Property in keyof Pick<LoanRepaidFields, K>]: LoanRepaidFields[Property];
};
export const getLoanRepaidById = async function <K extends keyof LoanRepaidResult>(
  url: string,
  options: SingleQueryOptions,
  args: LoanRepaidArgs<K>
): Promise<Pick<LoanRepaidResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('loanRepaid', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['repaidAmount']) formattedObj['repaidAmount'] = wei(obj['repaidAmount']);
  if (obj['newLoanAmount']) formattedObj['newLoanAmount'] = wei(obj['newLoanAmount']);
  if (obj['account']) formattedObj['account'] = obj['account'];
  if (obj['loanId']) formattedObj['loanId'] = wei(obj['loanId'], 0);
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  return formattedObj as Pick<LoanRepaidResult, K>;
};
export const getLoanRepaids = async function <K extends keyof LoanRepaidResult>(
  url: string,
  options: MultiQueryOptions<LoanRepaidFilter, LoanRepaidResult>,
  args: LoanRepaidArgs<K>
): Promise<Pick<LoanRepaidResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<LoanRepaidFilter, LoanRepaidResult>> = {
    ...options,
  };
  let paginationKey: keyof LoanRepaidFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof LoanRepaidFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<LoanRepaidResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('loanRepaids', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['repaidAmount']) formattedObj['repaidAmount'] = wei(obj['repaidAmount']);
      if (obj['newLoanAmount']) formattedObj['newLoanAmount'] = wei(obj['newLoanAmount']);
      if (obj['account']) formattedObj['account'] = obj['account'];
      if (obj['loanId']) formattedObj['loanId'] = wei(obj['loanId'], 0);
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      return formattedObj as Pick<LoanRepaidResult, K>;
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
export const getRateUpdateById = async function <K extends keyof RateUpdateResult>(
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
export const getRateUpdates = async function <K extends keyof RateUpdateResult>(
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
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
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
export const getRewardEscrowHolderById = async function <K extends keyof RewardEscrowHolderResult>(
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
export const getRewardEscrowHolders = async function <K extends keyof RewardEscrowHolderResult>(
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
export const getSNXHolderById = async function <K extends keyof SNXHolderResult>(
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
export const getSNXHolders = async function <K extends keyof SNXHolderResult>(
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
export type ShortFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  contractData?: string | null;
  contractData_not?: string | null;
  contractData_gt?: string | null;
  contractData_lt?: string | null;
  contractData_gte?: string | null;
  contractData_lte?: string | null;
  contractData_in?: string[];
  contractData_not_in?: string[];
  contractData_contains?: string | null;
  contractData_not_contains?: string | null;
  contractData_starts_with?: string | null;
  contractData_not_starts_with?: string | null;
  contractData_ends_with?: string | null;
  contractData_not_ends_with?: string | null;
  txHash?: string | null;
  txHash_not?: string | null;
  txHash_gt?: string | null;
  txHash_lt?: string | null;
  txHash_gte?: string | null;
  txHash_lte?: string | null;
  txHash_in?: string[];
  txHash_not_in?: string[];
  txHash_contains?: string | null;
  txHash_not_contains?: string | null;
  txHash_starts_with?: string | null;
  txHash_not_starts_with?: string | null;
  txHash_ends_with?: string | null;
  txHash_not_ends_with?: string | null;
  account?: string | null;
  account_not?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  collateralLocked?: string | null;
  collateralLocked_not?: string | null;
  collateralLocked_in?: string[];
  collateralLocked_not_in?: string[];
  collateralLocked_contains?: string | null;
  collateralLocked_not_contains?: string | null;
  collateralLockedAmount?: WeiSource | null;
  collateralLockedAmount_not?: WeiSource | null;
  collateralLockedAmount_gt?: WeiSource | null;
  collateralLockedAmount_lt?: WeiSource | null;
  collateralLockedAmount_gte?: WeiSource | null;
  collateralLockedAmount_lte?: WeiSource | null;
  collateralLockedAmount_in?: WeiSource[];
  collateralLockedAmount_not_in?: WeiSource[];
  synthBorrowed?: string | null;
  synthBorrowed_not?: string | null;
  synthBorrowed_in?: string[];
  synthBorrowed_not_in?: string[];
  synthBorrowed_contains?: string | null;
  synthBorrowed_not_contains?: string | null;
  synthBorrowedAmount?: WeiSource | null;
  synthBorrowedAmount_not?: WeiSource | null;
  synthBorrowedAmount_gt?: WeiSource | null;
  synthBorrowedAmount_lt?: WeiSource | null;
  synthBorrowedAmount_gte?: WeiSource | null;
  synthBorrowedAmount_lte?: WeiSource | null;
  synthBorrowedAmount_in?: WeiSource[];
  synthBorrowedAmount_not_in?: WeiSource[];
  accruedInterestLastUpdateTimestamp?: WeiSource | null;
  accruedInterestLastUpdateTimestamp_not?: WeiSource | null;
  accruedInterestLastUpdateTimestamp_gt?: WeiSource | null;
  accruedInterestLastUpdateTimestamp_lt?: WeiSource | null;
  accruedInterestLastUpdateTimestamp_gte?: WeiSource | null;
  accruedInterestLastUpdateTimestamp_lte?: WeiSource | null;
  accruedInterestLastUpdateTimestamp_in?: WeiSource[];
  accruedInterestLastUpdateTimestamp_not_in?: WeiSource[];
  isOpen?: boolean | null;
  isOpen_not?: boolean | null;
  isOpen_in?: boolean[];
  isOpen_not_in?: boolean[];
  createdAtBlock?: WeiSource | null;
  createdAtBlock_not?: WeiSource | null;
  createdAtBlock_gt?: WeiSource | null;
  createdAtBlock_lt?: WeiSource | null;
  createdAtBlock_gte?: WeiSource | null;
  createdAtBlock_lte?: WeiSource | null;
  createdAtBlock_in?: WeiSource[];
  createdAtBlock_not_in?: WeiSource[];
  createdAt?: WeiSource | null;
  createdAt_not?: WeiSource | null;
  createdAt_gt?: WeiSource | null;
  createdAt_lt?: WeiSource | null;
  createdAt_gte?: WeiSource | null;
  createdAt_lte?: WeiSource | null;
  createdAt_in?: WeiSource[];
  createdAt_not_in?: WeiSource[];
  closedAt?: WeiSource | null;
  closedAt_not?: WeiSource | null;
  closedAt_gt?: WeiSource | null;
  closedAt_lt?: WeiSource | null;
  closedAt_gte?: WeiSource | null;
  closedAt_lte?: WeiSource | null;
  closedAt_in?: WeiSource[];
  closedAt_not_in?: WeiSource[];
};
export type ShortResult = {
  id: string;
  contractData: Partial<ShortContractResult>;
  txHash: string;
  account: string;
  collateralLocked: string;
  collateralLockedAmount: Wei;
  synthBorrowed: string;
  synthBorrowedAmount: Wei;
  accruedInterestLastUpdateTimestamp: Wei;
  isOpen: boolean;
  createdAtBlock: Wei;
  createdAt: Wei;
  closedAt: Wei | null;
  liquidations: Partial<ShortLiquidationResult>[];
  collateralChanges: Partial<ShortCollateralChangeResult>[];
  loanChanges: Partial<ShortLoanChangeResult>[];
};
export type ShortFields = {
  id: true;
  contractData: ShortContractFields;
  txHash: true;
  account: true;
  collateralLocked: true;
  collateralLockedAmount: true;
  synthBorrowed: true;
  synthBorrowedAmount: true;
  accruedInterestLastUpdateTimestamp: true;
  isOpen: true;
  createdAtBlock: true;
  createdAt: true;
  closedAt: true;
  liquidations: ShortLiquidationFields;
  collateralChanges: ShortCollateralChangeFields;
  loanChanges: ShortLoanChangeFields;
};
export type ShortArgs<K extends keyof ShortResult> = {
  [Property in keyof Pick<ShortFields, K>]: ShortFields[Property];
};
export const getShortById = async function <K extends keyof ShortResult>(
  url: string,
  options: SingleQueryOptions,
  args: ShortArgs<K>
): Promise<Pick<ShortResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('short', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['contractData']) formattedObj['contractData'] = obj['contractData'];
  if (obj['txHash']) formattedObj['txHash'] = obj['txHash'];
  if (obj['account']) formattedObj['account'] = obj['account'];
  if (obj['collateralLocked']) formattedObj['collateralLocked'] = obj['collateralLocked'];
  if (obj['collateralLockedAmount'])
    formattedObj['collateralLockedAmount'] = wei(obj['collateralLockedAmount']);
  if (obj['synthBorrowed']) formattedObj['synthBorrowed'] = obj['synthBorrowed'];
  if (obj['synthBorrowedAmount'])
    formattedObj['synthBorrowedAmount'] = wei(obj['synthBorrowedAmount']);
  if (obj['accruedInterestLastUpdateTimestamp'])
    formattedObj['accruedInterestLastUpdateTimestamp'] = wei(
      obj['accruedInterestLastUpdateTimestamp'],
      0
    );
  if (obj['isOpen']) formattedObj['isOpen'] = obj['isOpen'];
  if (obj['createdAtBlock']) formattedObj['createdAtBlock'] = wei(obj['createdAtBlock'], 0);
  if (obj['createdAt']) formattedObj['createdAt'] = wei(obj['createdAt'], 0);
  if (obj['closedAt']) formattedObj['closedAt'] = wei(obj['closedAt'], 0);
  if (obj['liquidations']) formattedObj['liquidations'] = obj['liquidations'];
  if (obj['collateralChanges']) formattedObj['collateralChanges'] = obj['collateralChanges'];
  if (obj['loanChanges']) formattedObj['loanChanges'] = obj['loanChanges'];
  return formattedObj as Pick<ShortResult, K>;
};
export const getShorts = async function <K extends keyof ShortResult>(
  url: string,
  options: MultiQueryOptions<ShortFilter, ShortResult>,
  args: ShortArgs<K>
): Promise<Pick<ShortResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<ShortFilter, ShortResult>> = { ...options };
  let paginationKey: keyof ShortFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof ShortFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<ShortResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('shorts', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['contractData']) formattedObj['contractData'] = obj['contractData'];
      if (obj['txHash']) formattedObj['txHash'] = obj['txHash'];
      if (obj['account']) formattedObj['account'] = obj['account'];
      if (obj['collateralLocked']) formattedObj['collateralLocked'] = obj['collateralLocked'];
      if (obj['collateralLockedAmount'])
        formattedObj['collateralLockedAmount'] = wei(obj['collateralLockedAmount']);
      if (obj['synthBorrowed']) formattedObj['synthBorrowed'] = obj['synthBorrowed'];
      if (obj['synthBorrowedAmount'])
        formattedObj['synthBorrowedAmount'] = wei(obj['synthBorrowedAmount']);
      if (obj['accruedInterestLastUpdateTimestamp'])
        formattedObj['accruedInterestLastUpdateTimestamp'] = wei(
          obj['accruedInterestLastUpdateTimestamp'],
          0
        );
      if (obj['isOpen']) formattedObj['isOpen'] = obj['isOpen'];
      if (obj['createdAtBlock']) formattedObj['createdAtBlock'] = wei(obj['createdAtBlock'], 0);
      if (obj['createdAt']) formattedObj['createdAt'] = wei(obj['createdAt'], 0);
      if (obj['closedAt']) formattedObj['closedAt'] = wei(obj['closedAt'], 0);
      if (obj['liquidations']) formattedObj['liquidations'] = obj['liquidations'];
      if (obj['collateralChanges']) formattedObj['collateralChanges'] = obj['collateralChanges'];
      if (obj['loanChanges']) formattedObj['loanChanges'] = obj['loanChanges'];
      return formattedObj as Pick<ShortResult, K>;
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
export type ShortCollateralChangeFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  isDeposit?: boolean | null;
  isDeposit_not?: boolean | null;
  isDeposit_in?: boolean[];
  isDeposit_not_in?: boolean[];
  amount?: WeiSource | null;
  amount_not?: WeiSource | null;
  amount_gt?: WeiSource | null;
  amount_lt?: WeiSource | null;
  amount_gte?: WeiSource | null;
  amount_lte?: WeiSource | null;
  amount_in?: WeiSource[];
  amount_not_in?: WeiSource[];
  collateralAfter?: WeiSource | null;
  collateralAfter_not?: WeiSource | null;
  collateralAfter_gt?: WeiSource | null;
  collateralAfter_lt?: WeiSource | null;
  collateralAfter_gte?: WeiSource | null;
  collateralAfter_lte?: WeiSource | null;
  collateralAfter_in?: WeiSource[];
  collateralAfter_not_in?: WeiSource[];
  short?: string | null;
  short_not?: string | null;
  short_gt?: string | null;
  short_lt?: string | null;
  short_gte?: string | null;
  short_lte?: string | null;
  short_in?: string[];
  short_not_in?: string[];
  short_contains?: string | null;
  short_not_contains?: string | null;
  short_starts_with?: string | null;
  short_not_starts_with?: string | null;
  short_ends_with?: string | null;
  short_not_ends_with?: string | null;
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
  blockNumber?: WeiSource | null;
  blockNumber_not?: WeiSource | null;
  blockNumber_gt?: WeiSource | null;
  blockNumber_lt?: WeiSource | null;
  blockNumber_gte?: WeiSource | null;
  blockNumber_lte?: WeiSource | null;
  blockNumber_in?: WeiSource[];
  blockNumber_not_in?: WeiSource[];
};
export type ShortCollateralChangeResult = {
  id: string;
  isDeposit: boolean;
  amount: Wei;
  collateralAfter: Wei;
  short: Partial<ShortResult>;
  timestamp: Wei;
  blockNumber: Wei;
};
export type ShortCollateralChangeFields = {
  id: true;
  isDeposit: true;
  amount: true;
  collateralAfter: true;
  short: ShortFields;
  timestamp: true;
  blockNumber: true;
};
export type ShortCollateralChangeArgs<K extends keyof ShortCollateralChangeResult> = {
  [Property in keyof Pick<ShortCollateralChangeFields, K>]: ShortCollateralChangeFields[Property];
};
export const getShortCollateralChangeById = async function <
  K extends keyof ShortCollateralChangeResult
>(
  url: string,
  options: SingleQueryOptions,
  args: ShortCollateralChangeArgs<K>
): Promise<Pick<ShortCollateralChangeResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('shortCollateralChange', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['isDeposit']) formattedObj['isDeposit'] = obj['isDeposit'];
  if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
  if (obj['collateralAfter']) formattedObj['collateralAfter'] = wei(obj['collateralAfter']);
  if (obj['short']) formattedObj['short'] = obj['short'];
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  if (obj['blockNumber']) formattedObj['blockNumber'] = wei(obj['blockNumber'], 0);
  return formattedObj as Pick<ShortCollateralChangeResult, K>;
};
export const getShortCollateralChanges = async function <
  K extends keyof ShortCollateralChangeResult
>(
  url: string,
  options: MultiQueryOptions<ShortCollateralChangeFilter, ShortCollateralChangeResult>,
  args: ShortCollateralChangeArgs<K>
): Promise<Pick<ShortCollateralChangeResult, K>[]> {
  const paginatedOptions: Partial<
    MultiQueryOptions<ShortCollateralChangeFilter, ShortCollateralChangeResult>
  > = { ...options };
  let paginationKey: keyof ShortCollateralChangeFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc'
        ? '_gt'
        : '_lt')) as keyof ShortCollateralChangeFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<ShortCollateralChangeResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('shortCollateralChanges', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['isDeposit']) formattedObj['isDeposit'] = obj['isDeposit'];
      if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
      if (obj['collateralAfter']) formattedObj['collateralAfter'] = wei(obj['collateralAfter']);
      if (obj['short']) formattedObj['short'] = obj['short'];
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      if (obj['blockNumber']) formattedObj['blockNumber'] = wei(obj['blockNumber'], 0);
      return formattedObj as Pick<ShortCollateralChangeResult, K>;
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
export type ShortContractFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  minCratio?: WeiSource | null;
  minCratio_not?: WeiSource | null;
  minCratio_gt?: WeiSource | null;
  minCratio_lt?: WeiSource | null;
  minCratio_gte?: WeiSource | null;
  minCratio_lte?: WeiSource | null;
  minCratio_in?: WeiSource[];
  minCratio_not_in?: WeiSource[];
  minCollateral?: WeiSource | null;
  minCollateral_not?: WeiSource | null;
  minCollateral_gt?: WeiSource | null;
  minCollateral_lt?: WeiSource | null;
  minCollateral_gte?: WeiSource | null;
  minCollateral_lte?: WeiSource | null;
  minCollateral_in?: WeiSource[];
  minCollateral_not_in?: WeiSource[];
  issueFeeRate?: WeiSource | null;
  issueFeeRate_not?: WeiSource | null;
  issueFeeRate_gt?: WeiSource | null;
  issueFeeRate_lt?: WeiSource | null;
  issueFeeRate_gte?: WeiSource | null;
  issueFeeRate_lte?: WeiSource | null;
  issueFeeRate_in?: WeiSource[];
  issueFeeRate_not_in?: WeiSource[];
  maxLoansPerAccount?: WeiSource | null;
  maxLoansPerAccount_not?: WeiSource | null;
  maxLoansPerAccount_gt?: WeiSource | null;
  maxLoansPerAccount_lt?: WeiSource | null;
  maxLoansPerAccount_gte?: WeiSource | null;
  maxLoansPerAccount_lte?: WeiSource | null;
  maxLoansPerAccount_in?: WeiSource[];
  maxLoansPerAccount_not_in?: WeiSource[];
  interactionDelay?: WeiSource | null;
  interactionDelay_not?: WeiSource | null;
  interactionDelay_gt?: WeiSource | null;
  interactionDelay_lt?: WeiSource | null;
  interactionDelay_gte?: WeiSource | null;
  interactionDelay_lte?: WeiSource | null;
  interactionDelay_in?: WeiSource[];
  interactionDelay_not_in?: WeiSource[];
  manager?: string | null;
  manager_not?: string | null;
  manager_in?: string[];
  manager_not_in?: string[];
  manager_contains?: string | null;
  manager_not_contains?: string | null;
  canOpenLoans?: boolean | null;
  canOpenLoans_not?: boolean | null;
  canOpenLoans_in?: boolean[];
  canOpenLoans_not_in?: boolean[];
};
export type ShortContractResult = {
  id: string;
  shorts: Partial<ShortResult>[];
  contractUpdates: Partial<ShortContractUpdateResult>[];
  minCratio: Wei;
  minCollateral: Wei;
  issueFeeRate: Wei;
  maxLoansPerAccount: Wei;
  interactionDelay: Wei;
  manager: string;
  canOpenLoans: boolean;
};
export type ShortContractFields = {
  id: true;
  shorts: ShortFields;
  contractUpdates: ShortContractUpdateFields;
  minCratio: true;
  minCollateral: true;
  issueFeeRate: true;
  maxLoansPerAccount: true;
  interactionDelay: true;
  manager: true;
  canOpenLoans: true;
};
export type ShortContractArgs<K extends keyof ShortContractResult> = {
  [Property in keyof Pick<ShortContractFields, K>]: ShortContractFields[Property];
};
export const getShortContractById = async function <K extends keyof ShortContractResult>(
  url: string,
  options: SingleQueryOptions,
  args: ShortContractArgs<K>
): Promise<Pick<ShortContractResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('shortContract', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['shorts']) formattedObj['shorts'] = obj['shorts'];
  if (obj['contractUpdates']) formattedObj['contractUpdates'] = obj['contractUpdates'];
  if (obj['minCratio']) formattedObj['minCratio'] = wei(obj['minCratio'], 0);
  if (obj['minCollateral']) formattedObj['minCollateral'] = wei(obj['minCollateral']);
  if (obj['issueFeeRate']) formattedObj['issueFeeRate'] = wei(obj['issueFeeRate']);
  if (obj['maxLoansPerAccount'])
    formattedObj['maxLoansPerAccount'] = wei(obj['maxLoansPerAccount'], 0);
  if (obj['interactionDelay']) formattedObj['interactionDelay'] = wei(obj['interactionDelay'], 0);
  if (obj['manager']) formattedObj['manager'] = obj['manager'];
  if (obj['canOpenLoans']) formattedObj['canOpenLoans'] = obj['canOpenLoans'];
  return formattedObj as Pick<ShortContractResult, K>;
};
export const getShortContracts = async function <K extends keyof ShortContractResult>(
  url: string,
  options: MultiQueryOptions<ShortContractFilter, ShortContractResult>,
  args: ShortContractArgs<K>
): Promise<Pick<ShortContractResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<ShortContractFilter, ShortContractResult>> = {
    ...options,
  };
  let paginationKey: keyof ShortContractFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof ShortContractFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<ShortContractResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('shortContracts', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['shorts']) formattedObj['shorts'] = obj['shorts'];
      if (obj['contractUpdates']) formattedObj['contractUpdates'] = obj['contractUpdates'];
      if (obj['minCratio']) formattedObj['minCratio'] = wei(obj['minCratio'], 0);
      if (obj['minCollateral']) formattedObj['minCollateral'] = wei(obj['minCollateral']);
      if (obj['issueFeeRate']) formattedObj['issueFeeRate'] = wei(obj['issueFeeRate']);
      if (obj['maxLoansPerAccount'])
        formattedObj['maxLoansPerAccount'] = wei(obj['maxLoansPerAccount'], 0);
      if (obj['interactionDelay'])
        formattedObj['interactionDelay'] = wei(obj['interactionDelay'], 0);
      if (obj['manager']) formattedObj['manager'] = obj['manager'];
      if (obj['canOpenLoans']) formattedObj['canOpenLoans'] = obj['canOpenLoans'];
      return formattedObj as Pick<ShortContractResult, K>;
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
export type ShortContractUpdateFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  field?: string | null;
  field_not?: string | null;
  field_gt?: string | null;
  field_lt?: string | null;
  field_gte?: string | null;
  field_lte?: string | null;
  field_in?: string[];
  field_not_in?: string[];
  field_contains?: string | null;
  field_not_contains?: string | null;
  field_starts_with?: string | null;
  field_not_starts_with?: string | null;
  field_ends_with?: string | null;
  field_not_ends_with?: string | null;
  value?: string | null;
  value_not?: string | null;
  value_gt?: string | null;
  value_lt?: string | null;
  value_gte?: string | null;
  value_lte?: string | null;
  value_in?: string[];
  value_not_in?: string[];
  value_contains?: string | null;
  value_not_contains?: string | null;
  value_starts_with?: string | null;
  value_not_starts_with?: string | null;
  value_ends_with?: string | null;
  value_not_ends_with?: string | null;
  contractData?: string | null;
  contractData_not?: string | null;
  contractData_gt?: string | null;
  contractData_lt?: string | null;
  contractData_gte?: string | null;
  contractData_lte?: string | null;
  contractData_in?: string[];
  contractData_not_in?: string[];
  contractData_contains?: string | null;
  contractData_not_contains?: string | null;
  contractData_starts_with?: string | null;
  contractData_not_starts_with?: string | null;
  contractData_ends_with?: string | null;
  contractData_not_ends_with?: string | null;
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
  blockNumber?: WeiSource | null;
  blockNumber_not?: WeiSource | null;
  blockNumber_gt?: WeiSource | null;
  blockNumber_lt?: WeiSource | null;
  blockNumber_gte?: WeiSource | null;
  blockNumber_lte?: WeiSource | null;
  blockNumber_in?: WeiSource[];
  blockNumber_not_in?: WeiSource[];
};
export type ShortContractUpdateResult = {
  id: string;
  field: string;
  value: string;
  contractData: Partial<ShortContractResult>;
  timestamp: Wei;
  blockNumber: Wei;
};
export type ShortContractUpdateFields = {
  id: true;
  field: true;
  value: true;
  contractData: ShortContractFields;
  timestamp: true;
  blockNumber: true;
};
export type ShortContractUpdateArgs<K extends keyof ShortContractUpdateResult> = {
  [Property in keyof Pick<ShortContractUpdateFields, K>]: ShortContractUpdateFields[Property];
};
export const getShortContractUpdateById = async function <
  K extends keyof ShortContractUpdateResult
>(
  url: string,
  options: SingleQueryOptions,
  args: ShortContractUpdateArgs<K>
): Promise<Pick<ShortContractUpdateResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('shortContractUpdate', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['field']) formattedObj['field'] = obj['field'];
  if (obj['value']) formattedObj['value'] = obj['value'];
  if (obj['contractData']) formattedObj['contractData'] = obj['contractData'];
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  if (obj['blockNumber']) formattedObj['blockNumber'] = wei(obj['blockNumber'], 0);
  return formattedObj as Pick<ShortContractUpdateResult, K>;
};
export const getShortContractUpdates = async function <K extends keyof ShortContractUpdateResult>(
  url: string,
  options: MultiQueryOptions<ShortContractUpdateFilter, ShortContractUpdateResult>,
  args: ShortContractUpdateArgs<K>
): Promise<Pick<ShortContractUpdateResult, K>[]> {
  const paginatedOptions: Partial<
    MultiQueryOptions<ShortContractUpdateFilter, ShortContractUpdateResult>
  > = { ...options };
  let paginationKey: keyof ShortContractUpdateFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc'
        ? '_gt'
        : '_lt')) as keyof ShortContractUpdateFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<ShortContractUpdateResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('shortContractUpdates', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['field']) formattedObj['field'] = obj['field'];
      if (obj['value']) formattedObj['value'] = obj['value'];
      if (obj['contractData']) formattedObj['contractData'] = obj['contractData'];
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      if (obj['blockNumber']) formattedObj['blockNumber'] = wei(obj['blockNumber'], 0);
      return formattedObj as Pick<ShortContractUpdateResult, K>;
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
export type ShortLiquidationFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  liquidator?: string | null;
  liquidator_not?: string | null;
  liquidator_in?: string[];
  liquidator_not_in?: string[];
  liquidator_contains?: string | null;
  liquidator_not_contains?: string | null;
  isClosed?: boolean | null;
  isClosed_not?: boolean | null;
  isClosed_in?: boolean[];
  isClosed_not_in?: boolean[];
  liquidatedAmount?: WeiSource | null;
  liquidatedAmount_not?: WeiSource | null;
  liquidatedAmount_gt?: WeiSource | null;
  liquidatedAmount_lt?: WeiSource | null;
  liquidatedAmount_gte?: WeiSource | null;
  liquidatedAmount_lte?: WeiSource | null;
  liquidatedAmount_in?: WeiSource[];
  liquidatedAmount_not_in?: WeiSource[];
  liquidatedCollateral?: WeiSource | null;
  liquidatedCollateral_not?: WeiSource | null;
  liquidatedCollateral_gt?: WeiSource | null;
  liquidatedCollateral_lt?: WeiSource | null;
  liquidatedCollateral_gte?: WeiSource | null;
  liquidatedCollateral_lte?: WeiSource | null;
  liquidatedCollateral_in?: WeiSource[];
  liquidatedCollateral_not_in?: WeiSource[];
  short?: string | null;
  short_not?: string | null;
  short_gt?: string | null;
  short_lt?: string | null;
  short_gte?: string | null;
  short_lte?: string | null;
  short_in?: string[];
  short_not_in?: string[];
  short_contains?: string | null;
  short_not_contains?: string | null;
  short_starts_with?: string | null;
  short_not_starts_with?: string | null;
  short_ends_with?: string | null;
  short_not_ends_with?: string | null;
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
  blockNumber?: WeiSource | null;
  blockNumber_not?: WeiSource | null;
  blockNumber_gt?: WeiSource | null;
  blockNumber_lt?: WeiSource | null;
  blockNumber_gte?: WeiSource | null;
  blockNumber_lte?: WeiSource | null;
  blockNumber_in?: WeiSource[];
  blockNumber_not_in?: WeiSource[];
};
export type ShortLiquidationResult = {
  id: string;
  liquidator: string;
  isClosed: boolean;
  liquidatedAmount: Wei;
  liquidatedCollateral: Wei;
  short: Partial<ShortResult>;
  timestamp: Wei;
  blockNumber: Wei;
};
export type ShortLiquidationFields = {
  id: true;
  liquidator: true;
  isClosed: true;
  liquidatedAmount: true;
  liquidatedCollateral: true;
  short: ShortFields;
  timestamp: true;
  blockNumber: true;
};
export type ShortLiquidationArgs<K extends keyof ShortLiquidationResult> = {
  [Property in keyof Pick<ShortLiquidationFields, K>]: ShortLiquidationFields[Property];
};
export const getShortLiquidationById = async function <K extends keyof ShortLiquidationResult>(
  url: string,
  options: SingleQueryOptions,
  args: ShortLiquidationArgs<K>
): Promise<Pick<ShortLiquidationResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('shortLiquidation', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['liquidator']) formattedObj['liquidator'] = obj['liquidator'];
  if (obj['isClosed']) formattedObj['isClosed'] = obj['isClosed'];
  if (obj['liquidatedAmount']) formattedObj['liquidatedAmount'] = wei(obj['liquidatedAmount']);
  if (obj['liquidatedCollateral'])
    formattedObj['liquidatedCollateral'] = wei(obj['liquidatedCollateral']);
  if (obj['short']) formattedObj['short'] = obj['short'];
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  if (obj['blockNumber']) formattedObj['blockNumber'] = wei(obj['blockNumber'], 0);
  return formattedObj as Pick<ShortLiquidationResult, K>;
};
export const getShortLiquidations = async function <K extends keyof ShortLiquidationResult>(
  url: string,
  options: MultiQueryOptions<ShortLiquidationFilter, ShortLiquidationResult>,
  args: ShortLiquidationArgs<K>
): Promise<Pick<ShortLiquidationResult, K>[]> {
  const paginatedOptions: Partial<
    MultiQueryOptions<ShortLiquidationFilter, ShortLiquidationResult>
  > = { ...options };
  let paginationKey: keyof ShortLiquidationFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof ShortLiquidationFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<ShortLiquidationResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('shortLiquidations', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['liquidator']) formattedObj['liquidator'] = obj['liquidator'];
      if (obj['isClosed']) formattedObj['isClosed'] = obj['isClosed'];
      if (obj['liquidatedAmount']) formattedObj['liquidatedAmount'] = wei(obj['liquidatedAmount']);
      if (obj['liquidatedCollateral'])
        formattedObj['liquidatedCollateral'] = wei(obj['liquidatedCollateral']);
      if (obj['short']) formattedObj['short'] = obj['short'];
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      if (obj['blockNumber']) formattedObj['blockNumber'] = wei(obj['blockNumber'], 0);
      return formattedObj as Pick<ShortLiquidationResult, K>;
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
export type ShortLoanChangeFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  isRepayment?: boolean | null;
  isRepayment_not?: boolean | null;
  isRepayment_in?: boolean[];
  isRepayment_not_in?: boolean[];
  amount?: WeiSource | null;
  amount_not?: WeiSource | null;
  amount_gt?: WeiSource | null;
  amount_lt?: WeiSource | null;
  amount_gte?: WeiSource | null;
  amount_lte?: WeiSource | null;
  amount_in?: WeiSource[];
  amount_not_in?: WeiSource[];
  loanAfter?: WeiSource | null;
  loanAfter_not?: WeiSource | null;
  loanAfter_gt?: WeiSource | null;
  loanAfter_lt?: WeiSource | null;
  loanAfter_gte?: WeiSource | null;
  loanAfter_lte?: WeiSource | null;
  loanAfter_in?: WeiSource[];
  loanAfter_not_in?: WeiSource[];
  short?: string | null;
  short_not?: string | null;
  short_gt?: string | null;
  short_lt?: string | null;
  short_gte?: string | null;
  short_lte?: string | null;
  short_in?: string[];
  short_not_in?: string[];
  short_contains?: string | null;
  short_not_contains?: string | null;
  short_starts_with?: string | null;
  short_not_starts_with?: string | null;
  short_ends_with?: string | null;
  short_not_ends_with?: string | null;
  rate?: WeiSource | null;
  rate_not?: WeiSource | null;
  rate_gt?: WeiSource | null;
  rate_lt?: WeiSource | null;
  rate_gte?: WeiSource | null;
  rate_lte?: WeiSource | null;
  rate_in?: WeiSource[];
  rate_not_in?: WeiSource[];
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
  blockNumber?: WeiSource | null;
  blockNumber_not?: WeiSource | null;
  blockNumber_gt?: WeiSource | null;
  blockNumber_lt?: WeiSource | null;
  blockNumber_gte?: WeiSource | null;
  blockNumber_lte?: WeiSource | null;
  blockNumber_in?: WeiSource[];
  blockNumber_not_in?: WeiSource[];
};
export type ShortLoanChangeResult = {
  id: string;
  isRepayment: boolean;
  amount: Wei;
  loanAfter: Wei;
  short: Partial<ShortResult>;
  rate: Wei;
  timestamp: Wei;
  blockNumber: Wei;
};
export type ShortLoanChangeFields = {
  id: true;
  isRepayment: true;
  amount: true;
  loanAfter: true;
  short: ShortFields;
  rate: true;
  timestamp: true;
  blockNumber: true;
};
export type ShortLoanChangeArgs<K extends keyof ShortLoanChangeResult> = {
  [Property in keyof Pick<ShortLoanChangeFields, K>]: ShortLoanChangeFields[Property];
};
export const getShortLoanChangeById = async function <K extends keyof ShortLoanChangeResult>(
  url: string,
  options: SingleQueryOptions,
  args: ShortLoanChangeArgs<K>
): Promise<Pick<ShortLoanChangeResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('shortLoanChange', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['isRepayment']) formattedObj['isRepayment'] = obj['isRepayment'];
  if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
  if (obj['loanAfter']) formattedObj['loanAfter'] = wei(obj['loanAfter']);
  if (obj['short']) formattedObj['short'] = obj['short'];
  if (obj['rate']) formattedObj['rate'] = wei(obj['rate']);
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  if (obj['blockNumber']) formattedObj['blockNumber'] = wei(obj['blockNumber'], 0);
  return formattedObj as Pick<ShortLoanChangeResult, K>;
};
export const getShortLoanChanges = async function <K extends keyof ShortLoanChangeResult>(
  url: string,
  options: MultiQueryOptions<ShortLoanChangeFilter, ShortLoanChangeResult>,
  args: ShortLoanChangeArgs<K>
): Promise<Pick<ShortLoanChangeResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<ShortLoanChangeFilter, ShortLoanChangeResult>> =
    { ...options };
  let paginationKey: keyof ShortLoanChangeFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof ShortLoanChangeFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<ShortLoanChangeResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('shortLoanChanges', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['isRepayment']) formattedObj['isRepayment'] = obj['isRepayment'];
      if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
      if (obj['loanAfter']) formattedObj['loanAfter'] = wei(obj['loanAfter']);
      if (obj['short']) formattedObj['short'] = obj['short'];
      if (obj['rate']) formattedObj['rate'] = wei(obj['rate']);
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      if (obj['blockNumber']) formattedObj['blockNumber'] = wei(obj['blockNumber'], 0);
      return formattedObj as Pick<ShortLoanChangeResult, K>;
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
export type SynthFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  name?: string | null;
  name_not?: string | null;
  name_gt?: string | null;
  name_lt?: string | null;
  name_gte?: string | null;
  name_lte?: string | null;
  name_in?: string[];
  name_not_in?: string[];
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  symbol?: string | null;
  symbol_not?: string | null;
  symbol_gt?: string | null;
  symbol_lt?: string | null;
  symbol_gte?: string | null;
  symbol_lte?: string | null;
  symbol_in?: string[];
  symbol_not_in?: string[];
  symbol_contains?: string | null;
  symbol_not_contains?: string | null;
  symbol_starts_with?: string | null;
  symbol_not_starts_with?: string | null;
  symbol_ends_with?: string | null;
  symbol_not_ends_with?: string | null;
  totalSupply?: WeiSource | null;
  totalSupply_not?: WeiSource | null;
  totalSupply_gt?: WeiSource | null;
  totalSupply_lt?: WeiSource | null;
  totalSupply_gte?: WeiSource | null;
  totalSupply_lte?: WeiSource | null;
  totalSupply_in?: WeiSource[];
  totalSupply_not_in?: WeiSource[];
};
export type SynthResult = {
  id: string;
  name: string;
  symbol: string;
  totalSupply: Wei;
};
export type SynthFields = {
  id: true;
  name: true;
  symbol: true;
  totalSupply: true;
};
export type SynthArgs<K extends keyof SynthResult> = {
  [Property in keyof Pick<SynthFields, K>]: SynthFields[Property];
};
export const getSynthById = async function <K extends keyof SynthResult>(
  url: string,
  options: SingleQueryOptions,
  args: SynthArgs<K>
): Promise<Pick<SynthResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('synth', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['name']) formattedObj['name'] = obj['name'];
  if (obj['symbol']) formattedObj['symbol'] = obj['symbol'];
  if (obj['totalSupply']) formattedObj['totalSupply'] = wei(obj['totalSupply']);
  return formattedObj as Pick<SynthResult, K>;
};
export const getSynths = async function <K extends keyof SynthResult>(
  url: string,
  options: MultiQueryOptions<SynthFilter, SynthResult>,
  args: SynthArgs<K>
): Promise<Pick<SynthResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<SynthFilter, SynthResult>> = { ...options };
  let paginationKey: keyof SynthFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof SynthFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<SynthResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('synths', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['name']) formattedObj['name'] = obj['name'];
      if (obj['symbol']) formattedObj['symbol'] = obj['symbol'];
      if (obj['totalSupply']) formattedObj['totalSupply'] = wei(obj['totalSupply']);
      return formattedObj as Pick<SynthResult, K>;
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
export type SynthBalanceFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  amount?: WeiSource | null;
  amount_not?: WeiSource | null;
  amount_gt?: WeiSource | null;
  amount_lt?: WeiSource | null;
  amount_gte?: WeiSource | null;
  amount_lte?: WeiSource | null;
  amount_in?: WeiSource[];
  amount_not_in?: WeiSource[];
  address?: string | null;
  address_not?: string | null;
  address_in?: string[];
  address_not_in?: string[];
  address_contains?: string | null;
  address_not_contains?: string | null;
  account?: string | null;
  account_not?: string | null;
  account_gt?: string | null;
  account_lt?: string | null;
  account_gte?: string | null;
  account_lte?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  account_starts_with?: string | null;
  account_not_starts_with?: string | null;
  account_ends_with?: string | null;
  account_not_ends_with?: string | null;
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
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
};
export type SynthBalanceResult = {
  id: string;
  amount: Wei;
  address: string;
  account: string;
  timestamp: Wei;
  synth: Partial<SynthResult> | null;
};
export type SynthBalanceFields = {
  id: true;
  amount: true;
  address: true;
  account: true;
  timestamp: true;
  synth: SynthFields;
};
export type SynthBalanceArgs<K extends keyof SynthBalanceResult> = {
  [Property in keyof Pick<SynthBalanceFields, K>]: SynthBalanceFields[Property];
};
export const getSynthBalanceById = async function <K extends keyof SynthBalanceResult>(
  url: string,
  options: SingleQueryOptions,
  args: SynthBalanceArgs<K>
): Promise<Pick<SynthBalanceResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('synthBalance', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
  if (obj['address']) formattedObj['address'] = obj['address'];
  if (obj['account']) formattedObj['account'] = obj['account'];
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  if (obj['synth']) formattedObj['synth'] = obj['synth'];
  return formattedObj as Pick<SynthBalanceResult, K>;
};
export const getSynthBalances = async function <K extends keyof SynthBalanceResult>(
  url: string,
  options: MultiQueryOptions<SynthBalanceFilter, SynthBalanceResult>,
  args: SynthBalanceArgs<K>
): Promise<Pick<SynthBalanceResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<SynthBalanceFilter, SynthBalanceResult>> = {
    ...options,
  };
  let paginationKey: keyof SynthBalanceFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof SynthBalanceFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<SynthBalanceResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('synthBalances', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
      if (obj['address']) formattedObj['address'] = obj['address'];
      if (obj['account']) formattedObj['account'] = obj['account'];
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      if (obj['synth']) formattedObj['synth'] = obj['synth'];
      return formattedObj as Pick<SynthBalanceResult, K>;
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
export type SynthByCurrencyKeyFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  proxyAddress?: string | null;
  proxyAddress_not?: string | null;
  proxyAddress_in?: string[];
  proxyAddress_not_in?: string[];
  proxyAddress_contains?: string | null;
  proxyAddress_not_contains?: string | null;
};
export type SynthByCurrencyKeyResult = {
  id: string;
  proxyAddress: string;
};
export type SynthByCurrencyKeyFields = {
  id: true;
  proxyAddress: true;
};
export type SynthByCurrencyKeyArgs<K extends keyof SynthByCurrencyKeyResult> = {
  [Property in keyof Pick<SynthByCurrencyKeyFields, K>]: SynthByCurrencyKeyFields[Property];
};
export const getSynthByCurrencyKeyById = async function <K extends keyof SynthByCurrencyKeyResult>(
  url: string,
  options: SingleQueryOptions,
  args: SynthByCurrencyKeyArgs<K>
): Promise<Pick<SynthByCurrencyKeyResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('synthByCurrencyKey', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['proxyAddress']) formattedObj['proxyAddress'] = obj['proxyAddress'];
  return formattedObj as Pick<SynthByCurrencyKeyResult, K>;
};
export const getSynthByCurrencyKeys = async function <K extends keyof SynthByCurrencyKeyResult>(
  url: string,
  options: MultiQueryOptions<SynthByCurrencyKeyFilter, SynthByCurrencyKeyResult>,
  args: SynthByCurrencyKeyArgs<K>
): Promise<Pick<SynthByCurrencyKeyResult, K>[]> {
  const paginatedOptions: Partial<
    MultiQueryOptions<SynthByCurrencyKeyFilter, SynthByCurrencyKeyResult>
  > = { ...options };
  let paginationKey: keyof SynthByCurrencyKeyFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc'
        ? '_gt'
        : '_lt')) as keyof SynthByCurrencyKeyFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<SynthByCurrencyKeyResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('synthByCurrencyKeys', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['proxyAddress']) formattedObj['proxyAddress'] = obj['proxyAddress'];
      return formattedObj as Pick<SynthByCurrencyKeyResult, K>;
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
  account_gt?: string | null;
  account_lt?: string | null;
  account_gte?: string | null;
  account_lte?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  account_starts_with?: string | null;
  account_not_starts_with?: string | null;
  account_ends_with?: string | null;
  account_not_ends_with?: string | null;
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
};
export type SynthExchangeResult = {
  id: string;
  account: Partial<ExchangerResult>;
  fromSynth: Partial<SynthResult> | null;
  toSynth: Partial<SynthResult> | null;
  fromAmount: Wei;
  fromAmountInUSD: Wei;
  toAmount: Wei;
  toAmountInUSD: Wei;
  feesInUSD: Wei;
  toAddress: string;
  timestamp: Wei;
  gasPrice: Wei;
};
export type SynthExchangeFields = {
  id: true;
  account: ExchangerFields;
  fromSynth: SynthFields;
  toSynth: SynthFields;
  fromAmount: true;
  fromAmountInUSD: true;
  toAmount: true;
  toAmountInUSD: true;
  feesInUSD: true;
  toAddress: true;
  timestamp: true;
  gasPrice: true;
};
export type SynthExchangeArgs<K extends keyof SynthExchangeResult> = {
  [Property in keyof Pick<SynthExchangeFields, K>]: SynthExchangeFields[Property];
};
export const getSynthExchangeById = async function <K extends keyof SynthExchangeResult>(
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
  if (obj['fromSynth']) formattedObj['fromSynth'] = obj['fromSynth'];
  if (obj['toSynth']) formattedObj['toSynth'] = obj['toSynth'];
  if (obj['fromAmount']) formattedObj['fromAmount'] = wei(obj['fromAmount']);
  if (obj['fromAmountInUSD']) formattedObj['fromAmountInUSD'] = wei(obj['fromAmountInUSD']);
  if (obj['toAmount']) formattedObj['toAmount'] = wei(obj['toAmount']);
  if (obj['toAmountInUSD']) formattedObj['toAmountInUSD'] = wei(obj['toAmountInUSD']);
  if (obj['feesInUSD']) formattedObj['feesInUSD'] = wei(obj['feesInUSD']);
  if (obj['toAddress']) formattedObj['toAddress'] = obj['toAddress'];
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  if (obj['gasPrice']) formattedObj['gasPrice'] = wei(obj['gasPrice'], 0);
  return formattedObj as Pick<SynthExchangeResult, K>;
};
export const getSynthExchanges = async function <K extends keyof SynthExchangeResult>(
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
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
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
      if (obj['fromSynth']) formattedObj['fromSynth'] = obj['fromSynth'];
      if (obj['toSynth']) formattedObj['toSynth'] = obj['toSynth'];
      if (obj['fromAmount']) formattedObj['fromAmount'] = wei(obj['fromAmount']);
      if (obj['fromAmountInUSD']) formattedObj['fromAmountInUSD'] = wei(obj['fromAmountInUSD']);
      if (obj['toAmount']) formattedObj['toAmount'] = wei(obj['toAmount']);
      if (obj['toAmountInUSD']) formattedObj['toAmountInUSD'] = wei(obj['toAmountInUSD']);
      if (obj['feesInUSD']) formattedObj['feesInUSD'] = wei(obj['feesInUSD']);
      if (obj['toAddress']) formattedObj['toAddress'] = obj['toAddress'];
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      if (obj['gasPrice']) formattedObj['gasPrice'] = wei(obj['gasPrice'], 0);
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
export const getSynthetixById = async function <K extends keyof SynthetixResult>(
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
export const getSynthetixs = async function <K extends keyof SynthetixResult>(
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
export type SystemSettingFilter = {
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
  waitingPeriodSecs?: WeiSource | null;
  waitingPeriodSecs_not?: WeiSource | null;
  waitingPeriodSecs_gt?: WeiSource | null;
  waitingPeriodSecs_lt?: WeiSource | null;
  waitingPeriodSecs_gte?: WeiSource | null;
  waitingPeriodSecs_lte?: WeiSource | null;
  waitingPeriodSecs_in?: WeiSource[];
  waitingPeriodSecs_not_in?: WeiSource[];
  priceDeviationThresholdFactor?: WeiSource | null;
  priceDeviationThresholdFactor_not?: WeiSource | null;
  priceDeviationThresholdFactor_gt?: WeiSource | null;
  priceDeviationThresholdFactor_lt?: WeiSource | null;
  priceDeviationThresholdFactor_gte?: WeiSource | null;
  priceDeviationThresholdFactor_lte?: WeiSource | null;
  priceDeviationThresholdFactor_in?: WeiSource[];
  priceDeviationThresholdFactor_not_in?: WeiSource[];
  issuanceRatio?: WeiSource | null;
  issuanceRatio_not?: WeiSource | null;
  issuanceRatio_gt?: WeiSource | null;
  issuanceRatio_lt?: WeiSource | null;
  issuanceRatio_gte?: WeiSource | null;
  issuanceRatio_lte?: WeiSource | null;
  issuanceRatio_in?: WeiSource[];
  issuanceRatio_not_in?: WeiSource[];
  feePeriodDuration?: WeiSource | null;
  feePeriodDuration_not?: WeiSource | null;
  feePeriodDuration_gt?: WeiSource | null;
  feePeriodDuration_lt?: WeiSource | null;
  feePeriodDuration_gte?: WeiSource | null;
  feePeriodDuration_lte?: WeiSource | null;
  feePeriodDuration_in?: WeiSource[];
  feePeriodDuration_not_in?: WeiSource[];
  targetThreshold?: WeiSource | null;
  targetThreshold_not?: WeiSource | null;
  targetThreshold_gt?: WeiSource | null;
  targetThreshold_lt?: WeiSource | null;
  targetThreshold_gte?: WeiSource | null;
  targetThreshold_lte?: WeiSource | null;
  targetThreshold_in?: WeiSource[];
  targetThreshold_not_in?: WeiSource[];
  liquidationDelay?: WeiSource | null;
  liquidationDelay_not?: WeiSource | null;
  liquidationDelay_gt?: WeiSource | null;
  liquidationDelay_lt?: WeiSource | null;
  liquidationDelay_gte?: WeiSource | null;
  liquidationDelay_lte?: WeiSource | null;
  liquidationDelay_in?: WeiSource[];
  liquidationDelay_not_in?: WeiSource[];
  liquidationRatio?: WeiSource | null;
  liquidationRatio_not?: WeiSource | null;
  liquidationRatio_gt?: WeiSource | null;
  liquidationRatio_lt?: WeiSource | null;
  liquidationRatio_gte?: WeiSource | null;
  liquidationRatio_lte?: WeiSource | null;
  liquidationRatio_in?: WeiSource[];
  liquidationRatio_not_in?: WeiSource[];
  liquidationPenalty?: WeiSource | null;
  liquidationPenalty_not?: WeiSource | null;
  liquidationPenalty_gt?: WeiSource | null;
  liquidationPenalty_lt?: WeiSource | null;
  liquidationPenalty_gte?: WeiSource | null;
  liquidationPenalty_lte?: WeiSource | null;
  liquidationPenalty_in?: WeiSource[];
  liquidationPenalty_not_in?: WeiSource[];
  rateStalePeriod?: WeiSource | null;
  rateStalePeriod_not?: WeiSource | null;
  rateStalePeriod_gt?: WeiSource | null;
  rateStalePeriod_lt?: WeiSource | null;
  rateStalePeriod_gte?: WeiSource | null;
  rateStalePeriod_lte?: WeiSource | null;
  rateStalePeriod_in?: WeiSource[];
  rateStalePeriod_not_in?: WeiSource[];
  minimumStakeTime?: WeiSource | null;
  minimumStakeTime_not?: WeiSource | null;
  minimumStakeTime_gt?: WeiSource | null;
  minimumStakeTime_lt?: WeiSource | null;
  minimumStakeTime_gte?: WeiSource | null;
  minimumStakeTime_lte?: WeiSource | null;
  minimumStakeTime_in?: WeiSource[];
  minimumStakeTime_not_in?: WeiSource[];
  debtSnapshotStaleTime?: WeiSource | null;
  debtSnapshotStaleTime_not?: WeiSource | null;
  debtSnapshotStaleTime_gt?: WeiSource | null;
  debtSnapshotStaleTime_lt?: WeiSource | null;
  debtSnapshotStaleTime_gte?: WeiSource | null;
  debtSnapshotStaleTime_lte?: WeiSource | null;
  debtSnapshotStaleTime_in?: WeiSource[];
  debtSnapshotStaleTime_not_in?: WeiSource[];
  aggregatorWarningFlags?: string | null;
  aggregatorWarningFlags_not?: string | null;
  aggregatorWarningFlags_gt?: string | null;
  aggregatorWarningFlags_lt?: string | null;
  aggregatorWarningFlags_gte?: string | null;
  aggregatorWarningFlags_lte?: string | null;
  aggregatorWarningFlags_in?: string[];
  aggregatorWarningFlags_not_in?: string[];
  aggregatorWarningFlags_contains?: string | null;
  aggregatorWarningFlags_not_contains?: string | null;
  aggregatorWarningFlags_starts_with?: string | null;
  aggregatorWarningFlags_not_starts_with?: string | null;
  aggregatorWarningFlags_ends_with?: string | null;
  aggregatorWarningFlags_not_ends_with?: string | null;
  etherWrapperMaxETH?: WeiSource | null;
  etherWrapperMaxETH_not?: WeiSource | null;
  etherWrapperMaxETH_gt?: WeiSource | null;
  etherWrapperMaxETH_lt?: WeiSource | null;
  etherWrapperMaxETH_gte?: WeiSource | null;
  etherWrapperMaxETH_lte?: WeiSource | null;
  etherWrapperMaxETH_in?: WeiSource[];
  etherWrapperMaxETH_not_in?: WeiSource[];
  etherWrapperMintFeeRate?: WeiSource | null;
  etherWrapperMintFeeRate_not?: WeiSource | null;
  etherWrapperMintFeeRate_gt?: WeiSource | null;
  etherWrapperMintFeeRate_lt?: WeiSource | null;
  etherWrapperMintFeeRate_gte?: WeiSource | null;
  etherWrapperMintFeeRate_lte?: WeiSource | null;
  etherWrapperMintFeeRate_in?: WeiSource[];
  etherWrapperMintFeeRate_not_in?: WeiSource[];
  etherWrapperBurnFeeRate?: WeiSource | null;
  etherWrapperBurnFeeRate_not?: WeiSource | null;
  etherWrapperBurnFeeRate_gt?: WeiSource | null;
  etherWrapperBurnFeeRate_lt?: WeiSource | null;
  etherWrapperBurnFeeRate_gte?: WeiSource | null;
  etherWrapperBurnFeeRate_lte?: WeiSource | null;
  etherWrapperBurnFeeRate_in?: WeiSource[];
  etherWrapperBurnFeeRate_not_in?: WeiSource[];
  atomicMaxVolumePerBlock?: WeiSource | null;
  atomicMaxVolumePerBlock_not?: WeiSource | null;
  atomicMaxVolumePerBlock_gt?: WeiSource | null;
  atomicMaxVolumePerBlock_lt?: WeiSource | null;
  atomicMaxVolumePerBlock_gte?: WeiSource | null;
  atomicMaxVolumePerBlock_lte?: WeiSource | null;
  atomicMaxVolumePerBlock_in?: WeiSource[];
  atomicMaxVolumePerBlock_not_in?: WeiSource[];
  atomicTwapWindow?: WeiSource | null;
  atomicTwapWindow_not?: WeiSource | null;
  atomicTwapWindow_gt?: WeiSource | null;
  atomicTwapWindow_lt?: WeiSource | null;
  atomicTwapWindow_gte?: WeiSource | null;
  atomicTwapWindow_lte?: WeiSource | null;
  atomicTwapWindow_in?: WeiSource[];
  atomicTwapWindow_not_in?: WeiSource[];
};
export type SystemSettingResult = {
  id: string;
  timestamp: Wei;
  waitingPeriodSecs: Wei;
  priceDeviationThresholdFactor: Wei;
  issuanceRatio: Wei;
  feePeriodDuration: Wei;
  targetThreshold: Wei;
  liquidationDelay: Wei;
  liquidationRatio: Wei;
  liquidationPenalty: Wei;
  rateStalePeriod: Wei;
  minimumStakeTime: Wei;
  debtSnapshotStaleTime: Wei;
  aggregatorWarningFlags: string;
  etherWrapperMaxETH: Wei;
  etherWrapperMintFeeRate: Wei;
  etherWrapperBurnFeeRate: Wei;
  atomicMaxVolumePerBlock: Wei;
  atomicTwapWindow: Wei;
};
export type SystemSettingFields = {
  id: true;
  timestamp: true;
  waitingPeriodSecs: true;
  priceDeviationThresholdFactor: true;
  issuanceRatio: true;
  feePeriodDuration: true;
  targetThreshold: true;
  liquidationDelay: true;
  liquidationRatio: true;
  liquidationPenalty: true;
  rateStalePeriod: true;
  minimumStakeTime: true;
  debtSnapshotStaleTime: true;
  aggregatorWarningFlags: true;
  etherWrapperMaxETH: true;
  etherWrapperMintFeeRate: true;
  etherWrapperBurnFeeRate: true;
  atomicMaxVolumePerBlock: true;
  atomicTwapWindow: true;
};
export type SystemSettingArgs<K extends keyof SystemSettingResult> = {
  [Property in keyof Pick<SystemSettingFields, K>]: SystemSettingFields[Property];
};
export const getSystemSettingById = async function <K extends keyof SystemSettingResult>(
  url: string,
  options: SingleQueryOptions,
  args: SystemSettingArgs<K>
): Promise<Pick<SystemSettingResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('systemSetting', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  if (obj['waitingPeriodSecs'])
    formattedObj['waitingPeriodSecs'] = wei(obj['waitingPeriodSecs'], 0);
  if (obj['priceDeviationThresholdFactor'])
    formattedObj['priceDeviationThresholdFactor'] = wei(obj['priceDeviationThresholdFactor']);
  if (obj['issuanceRatio']) formattedObj['issuanceRatio'] = wei(obj['issuanceRatio']);
  if (obj['feePeriodDuration'])
    formattedObj['feePeriodDuration'] = wei(obj['feePeriodDuration'], 0);
  if (obj['targetThreshold']) formattedObj['targetThreshold'] = wei(obj['targetThreshold']);
  if (obj['liquidationDelay']) formattedObj['liquidationDelay'] = wei(obj['liquidationDelay'], 0);
  if (obj['liquidationRatio']) formattedObj['liquidationRatio'] = wei(obj['liquidationRatio']);
  if (obj['liquidationPenalty'])
    formattedObj['liquidationPenalty'] = wei(obj['liquidationPenalty']);
  if (obj['rateStalePeriod']) formattedObj['rateStalePeriod'] = wei(obj['rateStalePeriod'], 0);
  if (obj['minimumStakeTime']) formattedObj['minimumStakeTime'] = wei(obj['minimumStakeTime'], 0);
  if (obj['debtSnapshotStaleTime'])
    formattedObj['debtSnapshotStaleTime'] = wei(obj['debtSnapshotStaleTime'], 0);
  if (obj['aggregatorWarningFlags'])
    formattedObj['aggregatorWarningFlags'] = obj['aggregatorWarningFlags'];
  if (obj['etherWrapperMaxETH'])
    formattedObj['etherWrapperMaxETH'] = wei(obj['etherWrapperMaxETH']);
  if (obj['etherWrapperMintFeeRate'])
    formattedObj['etherWrapperMintFeeRate'] = wei(obj['etherWrapperMintFeeRate']);
  if (obj['etherWrapperBurnFeeRate'])
    formattedObj['etherWrapperBurnFeeRate'] = wei(obj['etherWrapperBurnFeeRate']);
  if (obj['atomicMaxVolumePerBlock'])
    formattedObj['atomicMaxVolumePerBlock'] = wei(obj['atomicMaxVolumePerBlock'], 0);
  if (obj['atomicTwapWindow']) formattedObj['atomicTwapWindow'] = wei(obj['atomicTwapWindow'], 0);
  return formattedObj as Pick<SystemSettingResult, K>;
};
export const getSystemSettings = async function <K extends keyof SystemSettingResult>(
  url: string,
  options: MultiQueryOptions<SystemSettingFilter, SystemSettingResult>,
  args: SystemSettingArgs<K>
): Promise<Pick<SystemSettingResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<SystemSettingFilter, SystemSettingResult>> = {
    ...options,
  };
  let paginationKey: keyof SystemSettingFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof SystemSettingFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<SystemSettingResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('systemSettings', paginatedOptions, args),
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
      if (obj['waitingPeriodSecs'])
        formattedObj['waitingPeriodSecs'] = wei(obj['waitingPeriodSecs'], 0);
      if (obj['priceDeviationThresholdFactor'])
        formattedObj['priceDeviationThresholdFactor'] = wei(obj['priceDeviationThresholdFactor']);
      if (obj['issuanceRatio']) formattedObj['issuanceRatio'] = wei(obj['issuanceRatio']);
      if (obj['feePeriodDuration'])
        formattedObj['feePeriodDuration'] = wei(obj['feePeriodDuration'], 0);
      if (obj['targetThreshold']) formattedObj['targetThreshold'] = wei(obj['targetThreshold']);
      if (obj['liquidationDelay'])
        formattedObj['liquidationDelay'] = wei(obj['liquidationDelay'], 0);
      if (obj['liquidationRatio']) formattedObj['liquidationRatio'] = wei(obj['liquidationRatio']);
      if (obj['liquidationPenalty'])
        formattedObj['liquidationPenalty'] = wei(obj['liquidationPenalty']);
      if (obj['rateStalePeriod']) formattedObj['rateStalePeriod'] = wei(obj['rateStalePeriod'], 0);
      if (obj['minimumStakeTime'])
        formattedObj['minimumStakeTime'] = wei(obj['minimumStakeTime'], 0);
      if (obj['debtSnapshotStaleTime'])
        formattedObj['debtSnapshotStaleTime'] = wei(obj['debtSnapshotStaleTime'], 0);
      if (obj['aggregatorWarningFlags'])
        formattedObj['aggregatorWarningFlags'] = obj['aggregatorWarningFlags'];
      if (obj['etherWrapperMaxETH'])
        formattedObj['etherWrapperMaxETH'] = wei(obj['etherWrapperMaxETH']);
      if (obj['etherWrapperMintFeeRate'])
        formattedObj['etherWrapperMintFeeRate'] = wei(obj['etherWrapperMintFeeRate']);
      if (obj['etherWrapperBurnFeeRate'])
        formattedObj['etherWrapperBurnFeeRate'] = wei(obj['etherWrapperBurnFeeRate']);
      if (obj['atomicMaxVolumePerBlock'])
        formattedObj['atomicMaxVolumePerBlock'] = wei(obj['atomicMaxVolumePerBlock'], 0);
      if (obj['atomicTwapWindow'])
        formattedObj['atomicTwapWindow'] = wei(obj['atomicTwapWindow'], 0);
      return formattedObj as Pick<SystemSettingResult, K>;
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
export const getTemporaryExchangePartnerTrackerById = async function <
  K extends keyof TemporaryExchangePartnerTrackerResult
>(
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
export const getTemporaryExchangePartnerTrackers = async function <
  K extends keyof TemporaryExchangePartnerTrackerResult
>(
  url: string,
  options: MultiQueryOptions<
    TemporaryExchangePartnerTrackerFilter,
    TemporaryExchangePartnerTrackerResult
  >,
  args: TemporaryExchangePartnerTrackerArgs<K>
): Promise<Pick<TemporaryExchangePartnerTrackerResult, K>[]> {
  const paginatedOptions: Partial<
    MultiQueryOptions<TemporaryExchangePartnerTrackerFilter, TemporaryExchangePartnerTrackerResult>
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
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
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
export type TotalFilter = {
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
  period?: WeiSource | null;
  period_not?: WeiSource | null;
  period_gt?: WeiSource | null;
  period_lt?: WeiSource | null;
  period_gte?: WeiSource | null;
  period_lte?: WeiSource | null;
  period_in?: WeiSource[];
  period_not_in?: WeiSource[];
  bucketMagnitude?: WeiSource | null;
  bucketMagnitude_not?: WeiSource | null;
  bucketMagnitude_gt?: WeiSource | null;
  bucketMagnitude_lt?: WeiSource | null;
  bucketMagnitude_gte?: WeiSource | null;
  bucketMagnitude_lte?: WeiSource | null;
  bucketMagnitude_in?: WeiSource[];
  bucketMagnitude_not_in?: WeiSource[];
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
  trades?: WeiSource | null;
  trades_not?: WeiSource | null;
  trades_gt?: WeiSource | null;
  trades_lt?: WeiSource | null;
  trades_gte?: WeiSource | null;
  trades_lte?: WeiSource | null;
  trades_in?: WeiSource[];
  trades_not_in?: WeiSource[];
  newExchangers?: WeiSource | null;
  newExchangers_not?: WeiSource | null;
  newExchangers_gt?: WeiSource | null;
  newExchangers_lt?: WeiSource | null;
  newExchangers_gte?: WeiSource | null;
  newExchangers_lte?: WeiSource | null;
  newExchangers_in?: WeiSource[];
  newExchangers_not_in?: WeiSource[];
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
  timestamp: Wei;
  period: Wei;
  bucketMagnitude: Wei;
  synth: Partial<SynthResult> | null;
  trades: Wei;
  newExchangers: Wei;
  exchangers: Wei;
  exchangeUSDTally: Wei;
  totalFeesGeneratedInUSD: Wei;
};
export type TotalFields = {
  id: true;
  timestamp: true;
  period: true;
  bucketMagnitude: true;
  synth: SynthFields;
  trades: true;
  newExchangers: true;
  exchangers: true;
  exchangeUSDTally: true;
  totalFeesGeneratedInUSD: true;
};
export type TotalArgs<K extends keyof TotalResult> = {
  [Property in keyof Pick<TotalFields, K>]: TotalFields[Property];
};
export const getTotalById = async function <K extends keyof TotalResult>(
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
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  if (obj['period']) formattedObj['period'] = wei(obj['period'], 0);
  if (obj['bucketMagnitude']) formattedObj['bucketMagnitude'] = wei(obj['bucketMagnitude'], 0);
  if (obj['synth']) formattedObj['synth'] = obj['synth'];
  if (obj['trades']) formattedObj['trades'] = wei(obj['trades'], 0);
  if (obj['newExchangers']) formattedObj['newExchangers'] = wei(obj['newExchangers'], 0);
  if (obj['exchangers']) formattedObj['exchangers'] = wei(obj['exchangers'], 0);
  if (obj['exchangeUSDTally']) formattedObj['exchangeUSDTally'] = wei(obj['exchangeUSDTally']);
  if (obj['totalFeesGeneratedInUSD'])
    formattedObj['totalFeesGeneratedInUSD'] = wei(obj['totalFeesGeneratedInUSD']);
  return formattedObj as Pick<TotalResult, K>;
};
export const getTotals = async function <K extends keyof TotalResult>(
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
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
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
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      if (obj['period']) formattedObj['period'] = wei(obj['period'], 0);
      if (obj['bucketMagnitude']) formattedObj['bucketMagnitude'] = wei(obj['bucketMagnitude'], 0);
      if (obj['synth']) formattedObj['synth'] = obj['synth'];
      if (obj['trades']) formattedObj['trades'] = wei(obj['trades'], 0);
      if (obj['newExchangers']) formattedObj['newExchangers'] = wei(obj['newExchangers'], 0);
      if (obj['exchangers']) formattedObj['exchangers'] = wei(obj['exchangers'], 0);
      if (obj['exchangeUSDTally']) formattedObj['exchangeUSDTally'] = wei(obj['exchangeUSDTally']);
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
export const getTotalActiveStakerById = async function <K extends keyof TotalActiveStakerResult>(
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
export const getTotalActiveStakers = async function <K extends keyof TotalActiveStakerResult>(
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
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof TotalActiveStakerFilter;
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
export const getTotalDailyActiveStakerById = async function <
  K extends keyof TotalDailyActiveStakerResult
>(
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
export const getTotalDailyActiveStakers = async function <
  K extends keyof TotalDailyActiveStakerResult
>(
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
export type WrapperFilter = {
  id?: string | null;
  id_not?: string | null;
  id_gt?: string | null;
  id_lt?: string | null;
  id_gte?: string | null;
  id_lte?: string | null;
  id_in?: string[];
  id_not_in?: string[];
  tokenAddress?: string | null;
  tokenAddress_not?: string | null;
  tokenAddress_gt?: string | null;
  tokenAddress_lt?: string | null;
  tokenAddress_gte?: string | null;
  tokenAddress_lte?: string | null;
  tokenAddress_in?: string[];
  tokenAddress_not_in?: string[];
  tokenAddress_contains?: string | null;
  tokenAddress_not_contains?: string | null;
  tokenAddress_starts_with?: string | null;
  tokenAddress_not_starts_with?: string | null;
  tokenAddress_ends_with?: string | null;
  tokenAddress_not_ends_with?: string | null;
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
  maxAmount?: WeiSource | null;
  maxAmount_not?: WeiSource | null;
  maxAmount_gt?: WeiSource | null;
  maxAmount_lt?: WeiSource | null;
  maxAmount_gte?: WeiSource | null;
  maxAmount_lte?: WeiSource | null;
  maxAmount_in?: WeiSource[];
  maxAmount_not_in?: WeiSource[];
  currencyKey?: string | null;
  currencyKey_not?: string | null;
  currencyKey_gt?: string | null;
  currencyKey_lt?: string | null;
  currencyKey_gte?: string | null;
  currencyKey_lte?: string | null;
  currencyKey_in?: string[];
  currencyKey_not_in?: string[];
  currencyKey_contains?: string | null;
  currencyKey_not_contains?: string | null;
  currencyKey_starts_with?: string | null;
  currencyKey_not_starts_with?: string | null;
  currencyKey_ends_with?: string | null;
  currencyKey_not_ends_with?: string | null;
  totalFees?: WeiSource | null;
  totalFees_not?: WeiSource | null;
  totalFees_gt?: WeiSource | null;
  totalFees_lt?: WeiSource | null;
  totalFees_gte?: WeiSource | null;
  totalFees_lte?: WeiSource | null;
  totalFees_in?: WeiSource[];
  totalFees_not_in?: WeiSource[];
  totalFeesInUSD?: WeiSource | null;
  totalFeesInUSD_not?: WeiSource | null;
  totalFeesInUSD_gt?: WeiSource | null;
  totalFeesInUSD_lt?: WeiSource | null;
  totalFeesInUSD_gte?: WeiSource | null;
  totalFeesInUSD_lte?: WeiSource | null;
  totalFeesInUSD_in?: WeiSource[];
  totalFeesInUSD_not_in?: WeiSource[];
};
export type WrapperResult = {
  id: string;
  tokenAddress: string;
  amount: Wei;
  amountInUSD: Wei;
  maxAmount: Wei;
  currencyKey: string;
  totalFees: Wei;
  totalFeesInUSD: Wei;
};
export type WrapperFields = {
  id: true;
  tokenAddress: true;
  amount: true;
  amountInUSD: true;
  maxAmount: true;
  currencyKey: true;
  totalFees: true;
  totalFeesInUSD: true;
};
export type WrapperArgs<K extends keyof WrapperResult> = {
  [Property in keyof Pick<WrapperFields, K>]: WrapperFields[Property];
};
export const getWrapperById = async function <K extends keyof WrapperResult>(
  url: string,
  options: SingleQueryOptions,
  args: WrapperArgs<K>
): Promise<Pick<WrapperResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('wrapper', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['tokenAddress']) formattedObj['tokenAddress'] = obj['tokenAddress'];
  if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
  if (obj['amountInUSD']) formattedObj['amountInUSD'] = wei(obj['amountInUSD']);
  if (obj['maxAmount']) formattedObj['maxAmount'] = wei(obj['maxAmount']);
  if (obj['currencyKey']) formattedObj['currencyKey'] = obj['currencyKey'];
  if (obj['totalFees']) formattedObj['totalFees'] = wei(obj['totalFees']);
  if (obj['totalFeesInUSD']) formattedObj['totalFeesInUSD'] = wei(obj['totalFeesInUSD']);
  return formattedObj as Pick<WrapperResult, K>;
};
export const getWrappers = async function <K extends keyof WrapperResult>(
  url: string,
  options: MultiQueryOptions<WrapperFilter, WrapperResult>,
  args: WrapperArgs<K>
): Promise<Pick<WrapperResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<WrapperFilter, WrapperResult>> = { ...options };
  let paginationKey: keyof WrapperFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof WrapperFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<WrapperResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('wrappers', paginatedOptions, args),
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
      throw new Error(r.errors[0].message);
    }
    const rawResults = r.data[Object.keys(r.data)[0]] as any[];
    const newResults = rawResults.map((obj) => {
      const formattedObj: any = {};
      if (obj['id']) formattedObj['id'] = obj['id'];
      if (obj['tokenAddress']) formattedObj['tokenAddress'] = obj['tokenAddress'];
      if (obj['amount']) formattedObj['amount'] = wei(obj['amount']);
      if (obj['amountInUSD']) formattedObj['amountInUSD'] = wei(obj['amountInUSD']);
      if (obj['maxAmount']) formattedObj['maxAmount'] = wei(obj['maxAmount']);
      if (obj['currencyKey']) formattedObj['currencyKey'] = obj['currencyKey'];
      if (obj['totalFees']) formattedObj['totalFees'] = wei(obj['totalFees']);
      if (obj['totalFeesInUSD']) formattedObj['totalFeesInUSD'] = wei(obj['totalFeesInUSD']);
      return formattedObj as Pick<WrapperResult, K>;
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
export type WrapperBurnFilter = {
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
  account_gt?: string | null;
  account_lt?: string | null;
  account_gte?: string | null;
  account_lte?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  account_starts_with?: string | null;
  account_not_starts_with?: string | null;
  account_ends_with?: string | null;
  account_not_ends_with?: string | null;
  principal?: WeiSource | null;
  principal_not?: WeiSource | null;
  principal_gt?: WeiSource | null;
  principal_lt?: WeiSource | null;
  principal_gte?: WeiSource | null;
  principal_lte?: WeiSource | null;
  principal_in?: WeiSource[];
  principal_not_in?: WeiSource[];
  fee?: WeiSource | null;
  fee_not?: WeiSource | null;
  fee_gt?: WeiSource | null;
  fee_lt?: WeiSource | null;
  fee_gte?: WeiSource | null;
  fee_lte?: WeiSource | null;
  fee_in?: WeiSource[];
  fee_not_in?: WeiSource[];
  amountOut?: WeiSource | null;
  amountOut_not?: WeiSource | null;
  amountOut_gt?: WeiSource | null;
  amountOut_lt?: WeiSource | null;
  amountOut_gte?: WeiSource | null;
  amountOut_lte?: WeiSource | null;
  amountOut_in?: WeiSource[];
  amountOut_not_in?: WeiSource[];
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
  wrapperAddress?: string | null;
  wrapperAddress_not?: string | null;
  wrapperAddress_gt?: string | null;
  wrapperAddress_lt?: string | null;
  wrapperAddress_gte?: string | null;
  wrapperAddress_lte?: string | null;
  wrapperAddress_in?: string[];
  wrapperAddress_not_in?: string[];
  wrapperAddress_contains?: string | null;
  wrapperAddress_not_contains?: string | null;
  wrapperAddress_starts_with?: string | null;
  wrapperAddress_not_starts_with?: string | null;
  wrapperAddress_ends_with?: string | null;
  wrapperAddress_not_ends_with?: string | null;
};
export type WrapperBurnResult = {
  id: string;
  account: string;
  principal: Wei;
  fee: Wei;
  amountOut: Wei;
  timestamp: Wei;
  wrapperAddress: string;
};
export type WrapperBurnFields = {
  id: true;
  account: true;
  principal: true;
  fee: true;
  amountOut: true;
  timestamp: true;
  wrapperAddress: true;
};
export type WrapperBurnArgs<K extends keyof WrapperBurnResult> = {
  [Property in keyof Pick<WrapperBurnFields, K>]: WrapperBurnFields[Property];
};
export const getWrapperBurnById = async function <K extends keyof WrapperBurnResult>(
  url: string,
  options: SingleQueryOptions,
  args: WrapperBurnArgs<K>
): Promise<Pick<WrapperBurnResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('wrapperBurn', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['account']) formattedObj['account'] = obj['account'];
  if (obj['principal']) formattedObj['principal'] = wei(obj['principal']);
  if (obj['fee']) formattedObj['fee'] = wei(obj['fee']);
  if (obj['amountOut']) formattedObj['amountOut'] = wei(obj['amountOut']);
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  if (obj['wrapperAddress']) formattedObj['wrapperAddress'] = obj['wrapperAddress'];
  return formattedObj as Pick<WrapperBurnResult, K>;
};
export const getWrapperBurns = async function <K extends keyof WrapperBurnResult>(
  url: string,
  options: MultiQueryOptions<WrapperBurnFilter, WrapperBurnResult>,
  args: WrapperBurnArgs<K>
): Promise<Pick<WrapperBurnResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<WrapperBurnFilter, WrapperBurnResult>> = {
    ...options,
  };
  let paginationKey: keyof WrapperBurnFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof WrapperBurnFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<WrapperBurnResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('wrapperBurns', paginatedOptions, args),
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
      if (obj['principal']) formattedObj['principal'] = wei(obj['principal']);
      if (obj['fee']) formattedObj['fee'] = wei(obj['fee']);
      if (obj['amountOut']) formattedObj['amountOut'] = wei(obj['amountOut']);
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      if (obj['wrapperAddress']) formattedObj['wrapperAddress'] = obj['wrapperAddress'];
      return formattedObj as Pick<WrapperBurnResult, K>;
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
export type WrapperMintFilter = {
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
  account_gt?: string | null;
  account_lt?: string | null;
  account_gte?: string | null;
  account_lte?: string | null;
  account_in?: string[];
  account_not_in?: string[];
  account_contains?: string | null;
  account_not_contains?: string | null;
  account_starts_with?: string | null;
  account_not_starts_with?: string | null;
  account_ends_with?: string | null;
  account_not_ends_with?: string | null;
  principal?: WeiSource | null;
  principal_not?: WeiSource | null;
  principal_gt?: WeiSource | null;
  principal_lt?: WeiSource | null;
  principal_gte?: WeiSource | null;
  principal_lte?: WeiSource | null;
  principal_in?: WeiSource[];
  principal_not_in?: WeiSource[];
  fee?: WeiSource | null;
  fee_not?: WeiSource | null;
  fee_gt?: WeiSource | null;
  fee_lt?: WeiSource | null;
  fee_gte?: WeiSource | null;
  fee_lte?: WeiSource | null;
  fee_in?: WeiSource[];
  fee_not_in?: WeiSource[];
  amountIn?: WeiSource | null;
  amountIn_not?: WeiSource | null;
  amountIn_gt?: WeiSource | null;
  amountIn_lt?: WeiSource | null;
  amountIn_gte?: WeiSource | null;
  amountIn_lte?: WeiSource | null;
  amountIn_in?: WeiSource[];
  amountIn_not_in?: WeiSource[];
  timestamp?: WeiSource | null;
  timestamp_not?: WeiSource | null;
  timestamp_gt?: WeiSource | null;
  timestamp_lt?: WeiSource | null;
  timestamp_gte?: WeiSource | null;
  timestamp_lte?: WeiSource | null;
  timestamp_in?: WeiSource[];
  timestamp_not_in?: WeiSource[];
  wrapperAddress?: string | null;
  wrapperAddress_not?: string | null;
  wrapperAddress_gt?: string | null;
  wrapperAddress_lt?: string | null;
  wrapperAddress_gte?: string | null;
  wrapperAddress_lte?: string | null;
  wrapperAddress_in?: string[];
  wrapperAddress_not_in?: string[];
  wrapperAddress_contains?: string | null;
  wrapperAddress_not_contains?: string | null;
  wrapperAddress_starts_with?: string | null;
  wrapperAddress_not_starts_with?: string | null;
  wrapperAddress_ends_with?: string | null;
  wrapperAddress_not_ends_with?: string | null;
};
export type WrapperMintResult = {
  id: string;
  account: string;
  principal: Wei;
  fee: Wei;
  amountIn: Wei;
  timestamp: Wei;
  wrapperAddress: string;
};
export type WrapperMintFields = {
  id: true;
  account: true;
  principal: true;
  fee: true;
  amountIn: true;
  timestamp: true;
  wrapperAddress: true;
};
export type WrapperMintArgs<K extends keyof WrapperMintResult> = {
  [Property in keyof Pick<WrapperMintFields, K>]: WrapperMintFields[Property];
};
export const getWrapperMintById = async function <K extends keyof WrapperMintResult>(
  url: string,
  options: SingleQueryOptions,
  args: WrapperMintArgs<K>
): Promise<Pick<WrapperMintResult, K>> {
  const res = await axios.post(url, {
    query: generateGql('wrapperMint', options, args),
  });
  const r = res.data as any;
  if (r.errors && r.errors.length) {
    throw new Error(r.errors[0].message);
  }
  const obj = r.data[Object.keys(r.data)[0]] as any;
  const formattedObj: any = {};
  if (obj['id']) formattedObj['id'] = obj['id'];
  if (obj['account']) formattedObj['account'] = obj['account'];
  if (obj['principal']) formattedObj['principal'] = wei(obj['principal']);
  if (obj['fee']) formattedObj['fee'] = wei(obj['fee']);
  if (obj['amountIn']) formattedObj['amountIn'] = wei(obj['amountIn']);
  if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
  if (obj['wrapperAddress']) formattedObj['wrapperAddress'] = obj['wrapperAddress'];
  return formattedObj as Pick<WrapperMintResult, K>;
};
export const getWrapperMints = async function <K extends keyof WrapperMintResult>(
  url: string,
  options: MultiQueryOptions<WrapperMintFilter, WrapperMintResult>,
  args: WrapperMintArgs<K>
): Promise<Pick<WrapperMintResult, K>[]> {
  const paginatedOptions: Partial<MultiQueryOptions<WrapperMintFilter, WrapperMintResult>> = {
    ...options,
  };
  let paginationKey: keyof WrapperMintFilter | null = null;
  let paginationValue = '';
  if (options.first && options.first > MAX_PAGE) {
    paginatedOptions.first = MAX_PAGE;
    paginatedOptions.orderBy = options.orderBy || 'id';
    paginatedOptions.orderDirection = options.orderDirection || 'asc';
    paginationKey = (paginatedOptions.orderBy +
      (paginatedOptions.orderDirection === 'asc' ? '_gt' : '_lt')) as keyof WrapperMintFilter;
    paginatedOptions.where = { ...options.where };
  }
  let results: Pick<WrapperMintResult, K>[] = [];
  do {
    if (paginationKey && paginationValue)
      paginatedOptions.where![paginationKey] = paginationValue as any;
    const res = await axios.post(url, {
      query: generateGql('wrapperMints', paginatedOptions, args),
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
      if (obj['principal']) formattedObj['principal'] = wei(obj['principal']);
      if (obj['fee']) formattedObj['fee'] = wei(obj['fee']);
      if (obj['amountIn']) formattedObj['amountIn'] = wei(obj['amountIn']);
      if (obj['timestamp']) formattedObj['timestamp'] = wei(obj['timestamp'], 0);
      if (obj['wrapperAddress']) formattedObj['wrapperAddress'] = obj['wrapperAddress'];
      return formattedObj as Pick<WrapperMintResult, K>;
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

import { useEffect, useMemo, useState } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import Wei, { wei } from '@synthetixio/wei';
import { QueryContext } from '../../context';
import { BaseProvider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import { formatBytes32String, parseBytes32String } from '@ethersproject/strings';

import {
  useGetLoans,
  useGetShorts,
  useGetSynths,
  useGetWrappers,
} from '../../subgraph/mainSubgraphQueries';
import { DEFAULT_SUBGRAPH_ENDPOINTS } from '../../constants';
import { Debt, DebtData } from './useGetDebtL2';
import { Contract } from '@ethersproject/contracts';
import { address, abi } from '@synthetixio/contracts/build/mainnet/deployment/ExchangeRates';

const useGetDebtL1 = (
  _: QueryContext,
  L1Provider: BaseProvider,
  options?: UseQueryOptions<Debt[]>
) => {
  const [debtData, setDebtData] = useState<DebtData | null>(null);

  const ExchangeRatesMainnet = useMemo(() => new Contract(address, abi, L1Provider), []);

  const wrappers = useGetWrappers(
    DEFAULT_SUBGRAPH_ENDPOINTS[1].subgraph,
    {
      where: {
        maxAmount_gt: 0,
      },
      first: 1000,
    },
    {
      currencyKey: true,
      amount: true,
    },
    {
      queryKey: ['L1', 'wrappers'],
    }
  );
  const synths = useGetSynths(
    DEFAULT_SUBGRAPH_ENDPOINTS[1].subgraph,
    {
      first: 1000,
      where: { symbol_not_in: ['SNX', 'HAV'] },
      orderBy: 'symbol',
      orderDirection: 'desc',
    },
    {
      totalSupply: true,
      symbol: true,
    },
    {
      queryKey: ['L1', 'synths'],
    }
  );
  const shorts = useGetShorts(
    DEFAULT_SUBGRAPH_ENDPOINTS[1].subgraph,
    {
      where: { isOpen: true },
      first: 1000,
      orderBy: 'synthBorrowedAmount',
      orderDirection: 'desc',
    },
    {
      synthBorrowed: true,
      synthBorrowedAmount: true,
      collateralLocked: true,
      collateralLockedAmount: true,
    },
    {
      queryKey: ['L1', 'shorts'],
    }
  );

  const loans = useGetLoans(
    // TODO @DEV update once L1 subgraph is synced
    'https://api.thegraph.com/subgraphs/name/noahlitvin/mainnet-loans',
    { where: { isOpen: true }, first: 1000, orderDirection: 'desc', orderBy: 'amount' },
    { amount: true, currency: true },
    { queryKey: ['L1', 'loans'] }
  );

  useEffect(() => {
    if (wrappers.isSuccess && synths.isSuccess && loans.isSuccess && shorts.isSuccess) {
      const wrapperData =
        wrappers.isSuccess &&
        wrappers.data.reduce((acc, wrapper) => {
          // Graph returns ETH instead of sETH like on L2
          if (wrapper.currencyKey === 'ETH') wrapper.currencyKey = 'sETH';
          acc[wrapper.currencyKey] = (acc[wrapper.currencyKey] || wei(0)).add(wrapper.amount);
          return acc;
        }, {} as DebtData['wrapperData']);
      const synthsQuery = synths.isSuccess && synths.data;
      let alreadyAccumulatedIndexes: number[] = [];
      const synthsData = synthsQuery
        .map((synth, index) => {
          if (synthsQuery[index + 1]?.symbol && synth.symbol === synthsQuery[index + 1].symbol) {
            alreadyAccumulatedIndexes.push(index + 1);
            return {
              ...synth,
              totalSupply: synth.totalSupply.add(synthsQuery[index + 1].totalSupply),
            };
          }
          if (alreadyAccumulatedIndexes.includes(index)) {
            return null;
          }
          return synth;
        })
        .filter((synth) => !!synth) as {
        totalSupply: Wei;
        symbol: string;
      }[];
      alreadyAccumulatedIndexes = [];
      const shortsData =
        shorts.isSuccess &&
        shorts.data
          .map((short) => {
            if (short.synthBorrowed.length !== 66 && short.synthBorrowed) {
              short.synthBorrowed = short.synthBorrowed.padEnd(66, '0');
            }
            if (short.collateralLocked.length !== 66 && short.collateralLocked) {
              short.collateralLocked = short.collateralLocked.padEnd(66, '0');
            }
            return {
              ...short,
              synthBorrowed: parseBytes32String(short.synthBorrowed),
              collateralLocked: parseBytes32String(short.collateralLocked),
            };
          })
          .reduce((acc, short) => {
            acc[short.synthBorrowed] = (acc[short.synthBorrowed] || wei(0)).add(
              short.synthBorrowedAmount
            );
            return acc;
          }, {} as DebtData['shortsData']);
      const loansData =
        loans.isSuccess &&
        loans.data.reduce((acc, loan) => {
          acc[loan.currency] = (acc[loan.currency] || wei(0)).add(loan.amount);
          return acc;
        }, {} as DebtData['loansData']);
      setDebtData({ wrapperData, synthsData, shortsData, loansData });
    }
  }, [wrappers.isSuccess, synths.isSuccess, loans.isSuccess, shorts.isSuccess]);
  return useQuery<Debt[]>(
    ['debt', 'data', 'L1'],
    async () => {
      const synthDataWithSkew = debtData!.synthsData.map((synth) => {
        if (!(synth.symbol in debtData!.wrapperData)) return { ...synth };
        return {
          ...synth,
          totalSupply: synth.totalSupply.sub(debtData!.wrapperData[synth.symbol]),
        };
      });

      const synthDataWithShorts = synthDataWithSkew.map((synth) => {
        if (synth.symbol === 'sUSD') return synth;
        if (debtData?.shortsData && synth.symbol in debtData.shortsData) {
          return {
            ...synth,
            totalSupply: synth.totalSupply.sub(debtData.shortsData[synth.symbol] as Wei),
          };
        }
        return synth;
      });

      const synthDataWithLoans = synthDataWithShorts.map((synth) => {
        if (!(synth.symbol in debtData!.loansData)) return synth;
        return {
          ...synth,
          totalSupply: synth.totalSupply?.sub(debtData!.loansData[synth.symbol] as Wei),
        };
      });

      const promises = synthDataWithLoans.map((synth) => {
        return ExchangeRatesMainnet.rateForCurrency(formatBytes32String(synth.symbol));
      });

      const rates: BigNumber[] = await Promise.all(promises);
      return synthDataWithLoans.map((synth, index) => ({
        ...synth,
        inUSD: synth.totalSupply.mul(rates[index]),
      }));
    },
    {
      enabled:
        !!debtData?.loansData &&
        !!debtData?.shortsData &&
        !!debtData?.synthsData &&
        !!debtData?.wrapperData,
      ...options,
    }
  );
};

export default useGetDebtL1;

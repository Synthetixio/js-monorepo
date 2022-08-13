import { useQuery, UseQueryOptions } from 'react-query';
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
} from '../../../generated/mainSubgraphQueries';
import { DEFAULT_SUBGRAPH_ENDPOINTS } from '../../constants';
import { useEffect, useMemo, useState } from 'react';
import { Contract } from '@ethersproject/contracts';
import { address, abi } from '@synthetixio/contracts/build/mainnet-ovm/deployment/ExchangeRates';

export interface Debt {
  totalSupply: Wei;
  symbol: string;
  inUSD: Wei;
}

export interface DebtData {
  wrapperData: Record<string, Wei>;
  synthsData: {
    totalSupply: Wei;
    symbol: string;
  }[];
  shortsData: Record<string, Wei>;
  loansData: Record<string, Wei>;
}

const useGetDebtL2 = (
  _: QueryContext,
  L2Provider: BaseProvider,
  options?: UseQueryOptions<Debt[]>
) => {
  const [debtData, setDebtData] = useState<DebtData | null>(null);

  const ExchangeRatesOptimism = useMemo(() => new Contract(address, abi, L2Provider), []);
  const wrappers = useGetWrappers(
    DEFAULT_SUBGRAPH_ENDPOINTS[10].subgraph,
    {
      where: {
        maxAmount_gt: 0,
      },
      first: 1000,
    },
    {
      currencyKey: true,
      amount: true,
      maxAmount: true,
    },
    {
      queryKey: ['L2', 'wrappers'],
    }
  );
  const synths = useGetSynths(
    DEFAULT_SUBGRAPH_ENDPOINTS[10].subgraph,
    { first: 1000, where: { symbol_not: 'SNX' } },
    {
      totalSupply: true,
      symbol: true,
    },

    {
      queryKey: ['L2', 'synths'],
    }
  );
  const shorts = useGetShorts(
    DEFAULT_SUBGRAPH_ENDPOINTS[10].subgraph,
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
      queryKey: ['L2', 'shorts'],
    }
  );

  const loans = useGetLoans(
    DEFAULT_SUBGRAPH_ENDPOINTS[10].subgraph,
    { where: { isOpen: true }, first: 1000, orderDirection: 'desc', orderBy: 'amount' },
    {
      amount: true,
      currency: true,
    },
    {
      queryKey: ['L2', 'loans'],
    }
  );

  useEffect(() => {
    if (wrappers.isSuccess && synths.isSuccess && loans.isSuccess && shorts.isSuccess) {
      const wrapperData =
        wrappers.isSuccess &&
        wrappers.data.reduce((acc, wrapper) => {
          acc[wrapper.currencyKey] = (acc[wrapper.currencyKey] || wei(0)).add(wrapper.amount);
          return acc;
        }, {} as DebtData['wrapperData']);
      const synthsData = synths.isSuccess && synths.data;
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
    ['debt', 'data', 'L2'],
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
        return ExchangeRatesOptimism.rateForCurrency(formatBytes32String(synth.symbol));
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

export default useGetDebtL2;

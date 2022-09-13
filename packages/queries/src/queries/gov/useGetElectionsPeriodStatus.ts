import { BaseProvider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { isObjKey } from '../../utils';
import { QueryContext } from '../../context';
import { COUNCIL_CONTRACTS_V3, ELECTION_MODULE_PERIODS } from './constants';

const useGetElectionsPeriodStatus = (
  _ctx: QueryContext,
  optimismProvider: BaseProvider,
  options?: UseQueryOptions<{ currentPeriodLabel: string; code: number }[]>
) => {
  return useQuery(
    ['gov', 'period-status'],
    () => {
      const contracts = COUNCIL_CONTRACTS_V3.map(
        ({ address, abi }) => new Contract(address, abi, optimismProvider)
      );

      const promises = contracts.map(async (c) => {
        const code: BigNumber = await c.getCurrentPeriod();
        const codeAsNumber = code.toNumber();
        const { periodLabel } = isObjKey(codeAsNumber, ELECTION_MODULE_PERIODS)
          ? ELECTION_MODULE_PERIODS[codeAsNumber]
          : { periodLabel: 'Unknown' };
        return {
          code: codeAsNumber,
          currentPeriodLabel: periodLabel,
        };
      });
      return Promise.all(promises);
    },
    { ...options }
  );
};
export default useGetElectionsPeriodStatus;

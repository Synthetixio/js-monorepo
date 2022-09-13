import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { wei } from '@synthetixio/wei';
import { QueryContext } from '../../context';
import { TokenSaleEscrow, Schedule } from '../../types';

const useTokenSaleEscrowQuery = (
  ctx: QueryContext,
  walletAddress: string | null,
  options?: UseQueryOptions<TokenSaleEscrow | null>
) => {
  return useQuery<TokenSaleEscrow | null>(
    ['escrow', 'tokenSale', ctx.networkId, walletAddress],
    async () => {
      if (!ctx.snxjs) throw Error('Expected snxjs to be defined');
      const {
        contracts: { EscrowChecker, SynthetixEscrow },
      } = ctx.snxjs;
      const [accountSchedule, totalEscrowed] = await Promise.all([
        EscrowChecker.checkAccountSchedule(walletAddress),
        SynthetixEscrow.balanceOf(walletAddress),
      ]);
      const currentUnixTime = new Date().getTime();
      const vestStartTime = 1520899200;
      const monthInSeconds = 2592000;
      const dataReversed = accountSchedule.slice().reverse();
      let totalPeriod = 0;
      let hasVesting = false;
      let lastVestTime;
      const schedule: Schedule = [];
      const claimableAmount = wei(0);
      let totalVested;

      for (let i = 0; i < dataReversed.length - 1; i += 2) {
        const parsedQuantity = wei(dataReversed[i]);
        const parsedDate = parseInt(dataReversed[i + 1]) * 1000;

        if (parsedDate !== 0) {
          hasVesting = true;
          totalPeriod++;
        }

        if (parsedDate === 0 && hasVesting) {
          totalPeriod++;
        }

        if (parsedDate !== 0 && !lastVestTime) {
          lastVestTime = dataReversed[i + 1];
        }

        if (parsedDate > 0 && parsedDate < currentUnixTime) {
          claimableAmount.add(parsedQuantity);
        }

        if (lastVestTime) {
          totalVested = totalVested ? totalVested.add(dataReversed[i]) : dataReversed[i];
          schedule.push({ date: new Date(parsedDate), quantity: parsedQuantity });
        }
      }

      const escrowPeriod = Math.floor((lastVestTime - vestStartTime) / monthInSeconds);
      const releaseIntervalMonths = Math.floor(escrowPeriod / totalPeriod);
      return hasVesting
        ? {
            escrowPeriod,
            releaseIntervalMonths,
            totalPeriod,
            claimableAmount,
            schedule,
            totalEscrowed: wei(totalEscrowed),
            totalVested: wei(totalVested),
          }
        : null;
    },
    {
      enabled: ctx.snxjs != null && !!walletAddress,
      ...options,
    }
  );
};

export default useTokenSaleEscrowQuery;

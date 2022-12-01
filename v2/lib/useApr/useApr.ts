import { useDebtData } from '@snx-v2/useDebtData';
import { useGlobalStakingApr } from '@snx-v2/useGlobalStakingApr';
import { useStakingApr } from '@snx-v2/useStakingApr';

export const useApr = () => {
  const { data: debtData } = useDebtData();
  const stakingAprQuery = useStakingApr();
  const notStaking = debtData?.debtBalance.eq(0);
  const enableGlobalStakingApr = Boolean(notStaking);
  const globalAprQuery = useGlobalStakingApr(enableGlobalStakingApr);
  return notStaking ? globalAprQuery : stakingAprQuery;
};

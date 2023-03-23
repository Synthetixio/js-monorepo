import { FC, useContext } from 'react';
import { Flex, Link } from '@chakra-ui/react';
import { StatBox } from '@snx-v2/StatBox';
import { formatNumberToUsd, formatPercent } from '@snx-v2/formatters';
import { useApr } from '@snx-v2/useApr';
import { useFeesBurnedInPeriod } from '@snx-v2/useFeesBurnedInPeriod';
import { DelegateWallet, useDelegateWallet } from '@snx-v2/useDelegateWallet';
import { ContractContext } from '@snx-v2/ContractContext';
import { ArrowTopRight } from '@snx-v2/icons';

export const BurnStatsUi: FC<{
  lastEpochBurned: string;
  burningAPR: string;
  isLoading: boolean;
  walletAddress: string | DelegateWallet | null;
}> = ({ lastEpochBurned, burningAPR, isLoading, walletAddress }) => {
  return (
    <Flex my={1} flexDirection={['column', 'column', 'row', 'row']} justifyContent="space-between">
      <StatBox
        label="Last Epoch Fees Burned"
        amount={lastEpochBurned}
        mb={[3, 3, 0, 0]}
        alignItems="start"
        mr={3}
        width="100%"
        maxW={['100%', '100%', 'initial', 'initial']}
        isLoading={isLoading}
      />
      <StatBox
        label="Earning"
        amount={burningAPR}
        mb={[3, 3, 0, 0]}
        alignItems={['start', 'start', 'center', 'center']}
        mr={3}
        width="100%"
        maxW={['100%', '100%', 'initial', 'initial']}
        isLoading={isLoading}
      />
      <StatBox
        titleToolTip="Estimate of your Lifetime Fees Burned (can take a few minutes to process)"
        label="Lifetime Fees Burned"
        amount={
          <Link
            href={`https://dune.com/synthetix_community/fee-burn?address_t29bb9=${walletAddress}`}
            target="_blank"
            color="cyan.500"
            fontSize="18px"
            fontFamily="heading"
            fontWeight={700}
          >
            See Detail
            <ArrowTopRight ml={2} />
          </Link>
        }
        mb={[3, 3, 0, 0]}
        alignItems={['start', 'start', 'end', 'end']}
        width="100%"
        maxW={['100%', '100%', 'initial', 'initial']}
        isLoading={isLoading}
      />
    </Flex>
  );
};

export const BurnStats = () => {
  const { delegateWallet } = useDelegateWallet();
  const { walletAddress } = useContext(ContractContext);

  const { data: earning, isLoading: isAprLoading } = useApr();
  const { data: feesBurned, isLoading: isFeesLoading } = useFeesBurnedInPeriod();

  const isLoading = isAprLoading || isFeesLoading;

  return (
    <BurnStatsUi
      walletAddress={delegateWallet?.address ? delegateWallet.address : walletAddress}
      isLoading={isLoading}
      lastEpochBurned={formatNumberToUsd(feesBurned?.toNumber() || 0)}
      burningAPR={formatPercent(earning?.feesApr?.toNumber() || 0)}
    />
  );
};

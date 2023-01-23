import { Box, Flex, Text, Heading, Button, Skeleton, Tooltip } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { FC } from 'react';
import { usePoolData } from '@snx-v3/usePoolData';
import { calculatePoolPerformanceSevenDays } from '@snx-v3/calculations';
import { createSearchParams, generatePath, NavigateFunction, useNavigate } from 'react-router-dom';
import { wei, Wei } from '@synthetixio/wei';
import { useParams } from '@snx-v3/useParams';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { TrendText } from '@snx-v3/TrendText';
import { currency } from '@snx-v3/format';

const PoolBoxUi: FC<{
  poolName?: string;
  poolId?: string;
  accountId?: string;
  navigate: NavigateFunction;
  sevenDaysPoolPerformance?: Wei;
}> = ({ poolName, poolId, accountId, navigate, sevenDaysPoolPerformance }) => {
  return (
    <BorderBox h="100%" p={4}>
      {poolId ? (
        <Flex justifyContent="space-between">
          <Flex flexDirection="column">
            <Heading fontSize="xl">{poolName}</Heading>
            <Text fontSize="sm" color="gray.400">
              Pool #{poolId}
            </Text>
          </Flex>
          <Button
            size="sm"
            onClick={() =>
              navigate({
                pathname: generatePath('/pools/:poolId', { poolId: poolId }),
                search: accountId ? createSearchParams({ accountId }).toString() : '',
              })
            }
            variant="outline"
          >
            See Pool
          </Button>
        </Flex>
      ) : (
        <Flex justifyContent="space-between">
          <Box>
            <Skeleton w={16} height={8} />
            <Skeleton mt={1} w={8} height={6} />
          </Box>
          <Skeleton w={16} height={6} />
        </Flex>
      )}
      <Text color="gray.400" mt={2} fontSize="sm">
        The Spartan Council Pool is the primary pool of Synthetix. All collateral will be deposited
        in this pool by default.
      </Text>
      <BorderBox mt={4} p={4}>
        <Heading fontSize="md" alignItems="center" display="flex">
          Performance Last 7 Days{' '}
          <Tooltip label="Average growth of all markets in the pool for the last 7 days">
            <InfoOutlineIcon ml={1} />
          </Tooltip>
        </Heading>
        <TrendText fontSize="2xl" fontWeight="bold" value={sevenDaysPoolPerformance || wei(0)}>
          {sevenDaysPoolPerformance ? (
            currency(sevenDaysPoolPerformance, { style: 'percent' })
          ) : (
            <Skeleton mt={1} w={16} height={9} />
          )}
        </TrendText>
      </BorderBox>
    </BorderBox>
  );
};

export const PoolBox = () => {
  const params = useParams();

  const navigate = useNavigate();
  const { data: poolData } = usePoolData(params.poolId);
  const sevenDaysPoolPerformance = calculatePoolPerformanceSevenDays(poolData);

  return (
    <PoolBoxUi
      poolName={poolData?.name}
      poolId={poolData?.id}
      navigate={navigate}
      accountId={params.accountId}
      sevenDaysPoolPerformance={sevenDaysPoolPerformance?.growthPercentage}
    />
  );
};

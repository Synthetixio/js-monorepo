import {
  Table,
  Tbody,
  Thead,
  Flex,
  Text,
  Image,
  Heading,
  Tr,
  SkeletonText,
  Tooltip,
  Box,
} from '@chakra-ui/react';
import { formatNumberToUsd, formatPercent } from '@synthetixio/formatters';
import { InfoIcon } from '@snx-v2/icons';
import { getPngSynthIconUrl } from '@snx-v2/SynthIcons';
import { StyledTd, StyledTh } from '@snx-v2/TableComponents';
import { useDebtData } from '@snx-v2/useDebtData';
import { useDebtPoolData } from '@snx-v2/useDebtPoolData';
import { FC } from 'react';

type HedgeData = {
  name: string;
  totalSupply: number;
  poolProportion: number;
  value: number;
  positionInUsd: number;
  userDebtHedgeWithCorrelationInUsd: number;
};
const ManualHedgingUi: FC<{ ethData?: HedgeData; usdData?: HedgeData; activeDebt?: number }> = ({
  ethData,
  usdData,
  activeDebt,
}) => {
  const ethPct = ethData ? ethData?.userDebtHedgeWithCorrelationInUsd / 100 : undefined;
  const usdPct = usdData ? usdData?.userDebtHedgeWithCorrelationInUsd / 100 : undefined;
  return (
    <Flex
      bg="navy.700"
      borderWidth="1px"
      borderColor="gray.900"
      borderRadius="base"
      height="100%"
      py={4}
      px={2}
      gap={2}
      flexDir="column"
    >
      <Heading fontSize="lg" fontWeight="700">
        Option 2: Manual Hedging
      </Heading>
      <Text fontSize="xs" color="gray.500">
        To approximately hedge the Debt Pool, swap your borrowed sUSD into the following amounts,
        and adjust these amounts periodically.
      </Text>

      <Table>
        <Thead>
          <StyledTh p={2}>Asset</StyledTh>
          <StyledTh p={2}>
            <Flex alignItems="center" gap={1}>
              Recommended Hedge
              <Tooltip label="Values to hedge your staking position, assuming eth/btc correlation">
                <Box>
                  <InfoIcon />
                </Box>
              </Tooltip>
            </Flex>
          </StyledTh>
          <StyledTh p={2}>Percentage</StyledTh>
        </Thead>
        <Tbody>
          <Tr>
            <StyledTd p={2}>
              <Flex>
                <Flex flexShrink={0} alignItems="center">
                  <Image
                    src={getPngSynthIconUrl('sUSD')}
                    width="30px"
                    height="30px"
                    alt="USD icon"
                  />
                </Flex>
                <Flex ml={1} flexDirection="column">
                  <Text fontSize="sm">USD</Text>
                  <Text fontSize="xs" color="gray.500">
                    Dollar
                  </Text>
                </Flex>
              </Flex>
            </StyledTd>
            <StyledTd p={2}>
              <SkeletonText isLoaded={usdPct !== undefined && activeDebt !== undefined}>
                {usdPct !== undefined && activeDebt !== undefined
                  ? formatNumberToUsd(usdPct * activeDebt)
                  : 0}
              </SkeletonText>
            </StyledTd>
            <StyledTd p={2}>
              <SkeletonText isLoaded={usdPct !== undefined}>
                {formatPercent(usdPct || 0)}
              </SkeletonText>
            </StyledTd>
          </Tr>
          <Tr>
            <StyledTd p={2}>
              <Flex>
                <Flex flexShrink={0} alignItems="center">
                  <Image
                    src={getPngSynthIconUrl('sETH')}
                    width="30px"
                    height="30px"
                    alt="ETH icon"
                  />
                </Flex>
                <Flex ml={1} flexDirection="column">
                  <Text fontSize="sm">ETH</Text>
                  <Text fontSize="xs" color="gray.500">
                    Ethers
                  </Text>
                </Flex>
              </Flex>
            </StyledTd>
            <StyledTd p={2}>
              <SkeletonText isLoaded={ethPct !== undefined && activeDebt !== undefined}>
                {ethPct !== undefined && activeDebt !== undefined
                  ? formatNumberToUsd(ethPct * activeDebt)
                  : 0}
              </SkeletonText>
            </StyledTd>
            <StyledTd p={2}>
              <SkeletonText isLoaded={ethPct !== undefined}>
                {formatPercent(ethPct || 0)}
              </SkeletonText>
            </StyledTd>
          </Tr>
        </Tbody>
      </Table>
    </Flex>
  );
};

export const ManualHedging = () => {
  const { data: debtPoolData } = useDebtPoolData();
  const { data: debtData } = useDebtData();

  const ethData = debtPoolData?.find((x) => x.name === 'sETH');
  const usdData = debtPoolData?.find((x) => x.name === 'sUSD');
  return (
    <ManualHedgingUi
      ethData={ethData}
      usdData={usdData}
      activeDebt={debtData?.debtBalance.toNumber()}
    />
  );
};

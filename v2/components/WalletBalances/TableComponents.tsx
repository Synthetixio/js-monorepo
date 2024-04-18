import { ReactElement, useContext } from 'react';
import { Flex, Text, Skeleton, Progress, Tag } from '@chakra-ui/react';
import { formatNumber, formatNumberToUsd, formatPercent } from '@synthetixio/formatters';
import { StyledTd } from '@snx-v2/TableComponents';
import { ContractContext } from '@snx-v2/ContractContext';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';

export const AssetTd = ({
  description,
  currencyKey,
  icon,
  iconUrl,
  isSynth = false,
}: {
  currencyKey: string;
  description?: string;
  icon?: ReactElement;
  iconUrl?: string;
  isSynth?: boolean;
}) => {
  const { networkId } = useContext(ContractContext);

  const isL1 = networkId === NetworkIdByName.mainnet;
  return (
    <StyledTd>
      <Flex>
        <Flex alignItems="center">
          {icon ? icon : <img width="24px" height="24px" src={iconUrl} alt={currencyKey} />}
        </Flex>
        <Flex ml={1} flexDirection="column">
          <Text fontSize="sm">{currencyKey}</Text>
          {description && (
            <Text fontSize="xs" color="gray.500">
              {description}
            </Text>
          )}
        </Flex>
        {isL1 && isSynth && currencyKey !== 'sUSD' && (
          <Flex ml={4} alignItems="center">
            <Tag
              fontSize="xs"
              bg="transparent"
              color="white"
              borderColor="cyan.500"
              borderWidth="1px"
            >
              Redeemable
            </Tag>
          </Flex>
        )}
      </Flex>
    </StyledTd>
  );
};

export const BalanceTd = ({ balance, usdBalance }: { balance?: number; usdBalance?: number }) => (
  <StyledTd>
    <Flex flexDirection="column">
      <Text fontSize="sm">
        {balance ? formatNumber(balance) : <Skeleton as="span" w={8} height={4} />}
      </Text>
      <Text fontSize="xs" color="gray.500">
        {usdBalance ? (
          formatNumberToUsd(usdBalance)
        ) : (
          <Skeleton as="span" mt={2} w={8} height={4} />
        )}
      </Text>
    </Flex>
  </StyledTd>
);

export const PriceTd = ({ price }: { price?: number }) => (
  <StyledTd>
    <Flex flexDirection="column">
      <Text fontSize="sm">
        {price ? formatNumberToUsd(price) : <Skeleton as="span" w={8} height={6} />}
      </Text>
    </Flex>
  </StyledTd>
);

export const HoldingTd = ({ holdingPct }: { holdingPct?: number }) => (
  <StyledTd>
    <Flex flexDirection="column">
      <Progress height="1" variant="white" value={holdingPct ? holdingPct * 100 : 100} />
      <Text fontSize="xs" color="whiteAlpha.600">
        {holdingPct ? formatPercent(holdingPct) : <Skeleton as="span" w={8} height={6} />}
      </Text>
    </Flex>
  </StyledTd>
);

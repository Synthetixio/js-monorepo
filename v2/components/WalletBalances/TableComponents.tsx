import { ReactElement, useContext } from 'react';
import { Flex, Text, Skeleton, Progress, Tag, Tooltip } from '@chakra-ui/react';
import { formatNumber, formatPercent } from '@synthetixio/formatters';
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
        {isL1 && isSynth && (
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

export const BalanceTd = ({
  balance,
  usdBalance,

  isLoading,
}: {
  balance?: number;
  usdBalance?: number;
  isLoading: boolean;
  currencyKey?: string;
}) => {
  return (
    <StyledTd>
      <Flex flexDirection="column">
        <Skeleton isLoaded={!isLoading}>
          <Text fontSize="sm">{balance && formatNumber(balance)}</Text>
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
          <Text fontSize="xs" color="gray.500">
            {usdBalance && <>{`${usdBalance.toFixed(2)} sUSD`}</>}
          </Text>
        </Skeleton>
      </Flex>
    </StyledTd>
  );
};

export const PriceTd = ({ price }: { price?: number }) => (
  <StyledTd>
    <Flex flexDirection="column">
      <Text fontSize="sm">
        {price ? `${formatNumber(price.toFixed(2))} sUSD` : <Skeleton as="span" w={8} height={6} />}
      </Text>
    </Flex>
  </StyledTd>
);

export const RedemptionPriceTd = ({ price, label }: { price?: number; label?: string }) => (
  <StyledTd>
    <Flex flexDirection="column">
      <Tooltip label={label}>
        <Text fontSize="sm" color="orange.500">
          {price ? (
            `${formatNumber(price.toFixed(2))} sUSD`
          ) : (
            <Skeleton as="span" w={8} height={6} />
          )}
        </Text>
      </Tooltip>
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

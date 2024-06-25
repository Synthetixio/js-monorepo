import { ReactElement, useContext } from 'react';
import { Flex, Text, Skeleton, Progress, Tag, Tooltip } from '@chakra-ui/react';
import { formatNumber, formatPercent } from '@synthetixio/formatters';
import { StyledTd } from '@snx-v2/TableComponents';
import { ContractContext } from '@snx-v2/ContractContext';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import Wei from '@synthetixio/wei';

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

export const BalanceTd = ({
  balance,
  usdBalance,
  isRedemption,
  discount,
  isLoading,
}: {
  balance?: number;
  usdBalance?: number;
  isRedemption?: boolean;
  discount?: Wei;
  isLoading: boolean;
  currencyKey?: string;
}) => {
  const showRedemption = isRedemption && discount;

  return (
    <StyledTd>
      <Flex flexDirection="column">
        <Skeleton isLoaded={!isLoading}>
          <Text fontSize="sm">{balance && formatNumber(balance)}</Text>
        </Skeleton>
        <Tooltip
          label={
            showRedemption
              ? `Current discount rate for redeemable synths is ${discount?.toNumber() * 100}%`
              : ''
          }
        >
          <Skeleton isLoaded={!isLoading}>
            <Text fontSize="xs" color={showRedemption ? 'orange.500' : 'gray.500'}>
              {usdBalance && <>{`${usdBalance.toFixed(2)} sUSD`}</>}
            </Text>
          </Skeleton>
        </Tooltip>
      </Flex>
    </StyledTd>
  );
};

export const PriceTd = ({ price, discount = 1 }: { price?: number; discount?: number }) => (
  <StyledTd>
    <Flex flexDirection="column">
      <Tooltip
        label={
          discount !== 1 ? `Current discount rate for redeemable synths is ${discount * 100}%` : ''
        }
      >
        <Text fontSize="sm" color={discount !== 1 ? 'orange.500' : 'unset'}>
          {price ? (
            `${formatNumber((price * discount).toFixed(2))} sUSD`
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

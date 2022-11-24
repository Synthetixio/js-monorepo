import { PropsWithChildren, ReactElement } from 'react';
import { Flex, Td, Th, Tr, Text, Skeleton, Progress } from '@chakra-ui/react';
import { formatNumber, formatNumberToUsd, formatPercent } from '@snx-v2/formatters';

export const TbodyLoading = ({ numberOfCols }: { numberOfCols: number }) => (
  <Tr w="full">
    {Array.from({ length: numberOfCols }, (_x, i) => (
      <Td key={'skeleton=' + i} border="none">
        <Skeleton w="full" height={6} />
      </Td>
    ))}
  </Tr>
);

export const StyledTh = ({ children }: PropsWithChildren) => (
  <Th sx={{ paddingBottom: 1, paddingTop: 4, borderColor: 'gray.900' }}>{children}</Th>
);
const StyledTd = ({ children }: PropsWithChildren) => (
  <Td sx={{ borderBottomColor: 'gray.900' }}>{children}</Td>
);
export const AssetTd = ({
  description,
  currencyKey,
  icon,
  iconUrl,
}: {
  currencyKey: string;
  description?: string;
  icon?: ReactElement;
  iconUrl?: string;
}) => (
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
    </Flex>
  </StyledTd>
);

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

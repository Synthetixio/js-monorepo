import { Flex, Skeleton, Text } from '@chakra-ui/react';
import { wei } from '@synthetixio/wei';
import { SNXIcon, SUSDIcon } from '@snx-v2/icons';
import { useHeaderBalance } from '@snx-v2/useHeaderBalance';
import { formatFiatCurrency } from '../../ui/utils/formatters/number';

export const UserBalances = () => {
  const { data, isLoading } = useHeaderBalance();

  return (
    <>
      <Flex
        borderWidth="1px"
        borderRadius="4px"
        borderRightRadius="0px"
        borderBottomRightRadius="0px"
        borderRightWidth="0px"
        borderColor="gray.900"
        py="6px"
        px="9.5px"
        height={10}
        alignItems="center"
      >
        <SNXIcon />
        <Skeleton
          ml={2}
          isLoaded={!isLoading}
          color="gray.900"
          fadeDuration={2}
          width={isLoading ? '100px' : 'unset'}
        >
          <Text variant="nav" mr={2}>{`${formatFiatCurrency(data?.SNX || wei(0))}`}</Text>
        </Skeleton>
      </Flex>
      <Flex
        borderWidth="1px"
        borderRadius="4px"
        borderLeftWidth="1px"
        borderLeftRadius="0px"
        borderBottomLeftRadius="0px"
        borderColor="gray.900"
        py="6px"
        px="9.5px"
        height={10}
        alignItems="center"
      >
        <SUSDIcon />
        <Skeleton
          ml={2}
          isLoaded={!isLoading}
          color="gray.900"
          fadeDuration={2}
          width={isLoading ? '100px' : 'unset'}
        >
          <Text variant="nav" mr={2}>{`${formatFiatCurrency(data?.sUSD || wei(0))}`}</Text>
        </Skeleton>
      </Flex>
    </>
  );
};

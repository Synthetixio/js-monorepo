import { Flex, Skeleton, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Wei, { wei } from '@synthetixio/wei';
import { SNXIcon, SUSDIcon, SwitchIcon } from '@snx-v2/icons';

import { formatFiatCurrency } from '../../ui/utils/formatters/number';

interface UserBalancesProps {
  isLoading: boolean;
  snxBalance: Wei;
  sUSDBalance: Wei;
}

export const UserBalances = ({
  isLoading = false,
  snxBalance = wei(0),
  sUSDBalance = wei(0),
}: UserBalancesProps) => {
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
        _hover={{
          bg: 'blackAlpha.400',
        }}
      >
        <SNXIcon />
        <Skeleton
          ml={2}
          isLoaded={!isLoading}
          color="gray.900"
          fadeDuration={2}
          width={isLoading ? '100px' : 'unset'}
        >
          <Text variant="nav" mr={2}>{`${formatFiatCurrency(snxBalance)}`}</Text>
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
        _hover={{
          bg: 'blackAlpha.400',
        }}
      >
        <SUSDIcon />
        <Skeleton
          ml={2}
          isLoaded={!isLoading}
          color="gray.900"
          fadeDuration={2}
          width={isLoading ? '100px' : 'unset'}
        >
          <Text variant="nav" mr={2}>{`${formatFiatCurrency(sUSDBalance)}`}</Text>
        </Skeleton>
        <Link target="_blank" to="https://liquidity.synthetix.eth.limo/#/dashboard?migrate=susd">
          <SwitchIcon width="20px" height="20px" />
        </Link>
      </Flex>
    </>
  );
};

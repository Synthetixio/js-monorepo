import { ExternalLinkIcon, InfoIcon } from '@chakra-ui/icons';
import { Heading, Box, Text, Flex, Radio, Link, Tooltip } from '@chakra-ui/react';
import { Link as NavLink, generatePath } from 'react-router-dom';

type PropsType = {
  name: string;
  value: string;
  checked?: boolean;
};

export default function DepositrOption({ name, value, checked = false }: PropsType) {
  return (
    <Flex alignItems="center" mb="2.5" pb="2.5" borderBottom="1px solid rgba(255,255,255,0.3)">
      <Box>
        <Radio size="lg" name={name} colorScheme="orange" checked={checked} value={value} />
      </Box>
      <Box flex="1" pl="3">
        <Heading size="sm" mb="0.5">
          {name}
        </Heading>
        <Text fontSize="xs" display="block" color="gray.400">
          Pool #{value}{' '}
          {value == '0' ? (
            <Tooltip
              label="This is typically used to take out a loan of snxUSD against your collateral. Your
              C-Ratio is only subject to fluctuations based on the value of your collateral, but you
              receive no fees or rewards."
            >
              <InfoIcon fontSize="sm" ml={1} />
            </Tooltip>
          ) : (
            <Link
              as={NavLink}
              to={generatePath('/pools/:poolId', { poolId: value })}
              color="cyan.500"
              display="inline-block"
              transform="translateY(-1.5px)"
              target="_blank"
            >
              <ExternalLinkIcon />
            </Link>
          )}
        </Text>
      </Box>
      {/*
      <Box pl="4">
        <Text fontSize="xs">
          Projected Rewards: <strong>20% APY</strong> (SNX)
        </Text>
        <Text fontSize="xs">
          Projected Fees: <strong>20% APY</strong> (sUSD)
        </Text>
      </Box>
      */}
    </Flex>
  );
}

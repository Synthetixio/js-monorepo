import { ExternalLinkIcon, InfoIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Link, Radio, Text, Tooltip } from '@chakra-ui/react';
import { generatePath, Link as NavLink } from 'react-router-dom';

export function PoolItem({ name, value }: { name: string; value: string }) {
  return (
    <Flex alignItems="center" mb="2.5" pb="2.5" borderBottom="1px solid rgba(255,255,255,0.3)">
      <Box>
        <Radio size="lg" name={name} colorScheme="orange" value={value} />
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
    </Flex>
  );
}

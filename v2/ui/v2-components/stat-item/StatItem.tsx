import {
  Flex,
  StatLabel,
  StatNumber,
  Box,
  Stat,
  Menu,
  MenuItem,
  Text,
  MenuButton,
  MenuList,
  Tooltip,
} from '@chakra-ui/react';
import { InfoIcon, KebabMenuVertical } from 'v2-components/icons';

export const StatItem = () => {
  return (
    <Stat>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Flex alignItems="center">
            <StatLabel mt={0} fontSize="xs" fontWeight={700} lineHeight="16px" mr={2}>
              Active Debt
            </StatLabel>
            <Tooltip
              borderRadius="4px"
              color="white"
              hasArrow
              label="Soonthetix"
              bg="gray.900"
              p={2}
              mt={2}
            >
              <Flex>
                <InfoIcon width="12.5px" height="12.5px" />
              </Flex>
            </Tooltip>
          </Flex>
          <StatNumber fontSize="sm">$100,002,389.99</StatNumber>
        </Box>
        <Menu>
          <>
            <MenuButton>
              <KebabMenuVertical />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => console.log('Hello World')}>
                <Text variant="nav" ml={2}>
                  Ethereum Mainnet
                </Text>
              </MenuItem>
              <MenuItem onClick={() => console.log('Hello World 2')}>
                <Text variant="nav" ml={2}>
                  Optimism
                </Text>
              </MenuItem>
            </MenuList>
          </>
        </Menu>
      </Flex>
    </Stat>
  );
};

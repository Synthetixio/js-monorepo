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
            <StatLabel fontSize="xs" fontWeight={700} mr={2}>
              Active Debt
            </StatLabel>
            <Tooltip hasArrow label="Soonthetix" aria-label="A tooltip" bg="gray.900" p={2} mt={1}>
              <Flex>
                <InfoIcon width="12.5px" height="12.5px" />
              </Flex>
            </Tooltip>
          </Flex>
          <StatNumber>$100,002,389.99</StatNumber>
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

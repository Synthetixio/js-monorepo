import { FC, useEffect } from 'react';
import {
  Flex,
  Text,
  Menu,
  Button,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  useColorMode,
} from '@chakra-ui/react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { SNXIcon } from './Icons/';
import { PerpsStats } from './PerpsStats';
import { AddressInput } from './AddressInput';
import { HamburgerIcon } from '@chakra-ui/icons';
import { DropdownVersion } from './Shared/DropdownVersion';
import { RpcSwitcher } from './RpcSwitcher';

export const Header: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const location = useLocation();

  const activeStyle = {
    fontWeight: 'bold',
    fontSize: '14px',
  };

  const inactiveStyle = {
    fontWeight: 'bold',
    fontSize: '14px',
    color: 'gray',
  };

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  return (
    <>
      <Flex
        as="header"
        px={{ base: '16px', md: '40px' }}
        py={2}
        bg="navy.900"
        height="65px"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth="1px"
        borderBottomColor="gray.900"
        borderTopWidth="1px"
        borderTopColor="transparent"
      >
        <Flex alignItems="center" sx={{ gap: { base: '8px', md: '16px' } }}>
          <RouterLink to="/" style={{ whiteSpace: 'nowrap' }}>
            <Flex alignItems="center">
              <SNXIcon />
              <PerpsStats mt="2px" ml={3} display={{ base: 'none', c900: 'initial' }} />
            </Flex>
          </RouterLink>
          <DropdownVersion />
          {['/', '/trades', '/actions', '/markets', '/positions, /v3'].includes(
            location.pathname
          ) && (
            <Box px={{ base: '8px' }} display={{ base: 'none', md: 'flex', lg: 'flex' }}>
              <Flex as="nav" sx={{ gap: '24px' }}>
                <Box style={isActive('/') ? activeStyle : inactiveStyle}>
                  <RouterLink to="/">Dashboard</RouterLink>
                </Box>
                <Box style={isActive('/actions') ? activeStyle : inactiveStyle}>
                  <RouterLink to="/actions">Actions</RouterLink>
                </Box>
                <Box style={isActive('/markets') ? activeStyle : inactiveStyle}>
                  <RouterLink to="/markets">Markets</RouterLink>
                </Box>
                <Box style={isActive('/positions') ? activeStyle : inactiveStyle}>
                  <RouterLink to="/positions">Positions</RouterLink>
                </Box>
              </Flex>
            </Box>
          )}
          {!isActive('/v3') && (
            <Flex alignItems="center" display={{ base: 'flex', md: 'none' }}>
              <Menu>
                <MenuButton
                  as={Button}
                  border="none"
                  variant="outline"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  padding={{ base: '8px', md: '8px 16px' }}
                >
                  <HamburgerIcon width="20px" height="20px" color="white" />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <RouterLink to="/">
                      <Text fontSize="14px" fontWeight={700} fontFamily="heading" color="gray.400">
                        Dashboard
                      </Text>
                    </RouterLink>
                  </MenuItem>
                  <MenuItem>
                    <RouterLink to="/actions">
                      <Text fontSize="14px" fontWeight={700} fontFamily="heading" color="gray.400">
                        All Actions
                      </Text>
                    </RouterLink>
                  </MenuItem>
                  <MenuItem>
                    <RouterLink to="/markets">
                      <Text fontSize="14px" fontWeight={700} fontFamily="heading" color="gray.400">
                        Markets
                      </Text>
                    </RouterLink>
                  </MenuItem>
                  <MenuItem>
                    <RouterLink to="/positions">
                      <Text fontSize="14px" fontWeight={700} fontFamily="heading" color="gray.400">
                        Positions
                      </Text>
                    </RouterLink>
                  </MenuItem>
                  <MenuItem>
                    <RouterLink to="/stats-v3">
                      <Text fontSize="14px" fontWeight={700} fontFamily="heading" color="gray.400">
                        Stats V3
                      </Text>
                    </RouterLink>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          )}
        </Flex>
        <Flex justifyContent="flex-end">
          <AddressInput />
          <RpcSwitcher />
        </Flex>
      </Flex>
    </>
  );
};

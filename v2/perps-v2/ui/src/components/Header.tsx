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
  useColorModeValue,
} from '@chakra-ui/react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { SNXIcon } from './Icons/';
import { PerpsStats } from './PerpsStats';
import { AddressInput } from './AddressInput';
import { HamburgerIcon } from '@chakra-ui/icons';

export const Header: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const location = useLocation();

  const activeStyle = {
    fontWeight: 'bold',
    borderBottom: '3px solid',
    borderColor: useColorModeValue('blue.500', 'blue.200'),
  };

  const inactiveStyle = {
    fontWeight: 'bold',
    borderBottom: 'none',
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
        <Flex alignItems="center">
          <RouterLink to="/" style={{ whiteSpace: 'nowrap' }}>
            <SNXIcon />
            <PerpsStats mt="3px" ml={3} display={{ base: 'none', c900: 'initial' }} />
          </RouterLink>
          <Flex alignItems="center" ml={6} display={{ base: 'flex', md: 'none' }}>
            <Menu>
              <MenuButton
                as={Button}
                border="none"
                variant="outline"
                display="flex"
                justifyContent="center"
                alignItems="center"
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
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        <AddressInput />
      </Flex>
      {['/', '/trades', '/actions', '/markets'].includes(location.pathname) && (
        <Box px={{ base: '16px', md: '40px' }} display={{ base: 'none', md: 'flex', lg: 'flex' }}>
          <Flex as="nav" mt={16}>
            <Box style={isActive('/') ? activeStyle : inactiveStyle} pr={7} mr={16} width={120}>
              <RouterLink to="/">Dashboard</RouterLink>
            </Box>
            <Box
              style={isActive('/actions') ? activeStyle : inactiveStyle}
              pr={7}
              mr={16}
              width={120}
            >
              <RouterLink to="/actions">Actions</RouterLink>
            </Box>
            <Box
              style={isActive('/markets') ? activeStyle : inactiveStyle}
              pr={7}
              mr={16}
              width={120}
            >
              <RouterLink to="/markets">Markets</RouterLink>
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
};

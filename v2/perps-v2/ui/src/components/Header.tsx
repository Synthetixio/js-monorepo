import { FC, useEffect } from 'react';
import {
  Flex,
  Text,
  Menu,
  Button,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from '@chakra-ui/react';
import { NavLink as RouterLink } from 'react-router-dom';
import { SNXIcon } from './Icons/';
import { PerpsStats } from './PerpsStats';
import { AddressInput } from './AddressInput';
import { HamburgerIcon } from '@chakra-ui/icons';

export const Header: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  return (
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
        <RouterLink to="/">
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
        <Flex alignItems="center" mt="3px" ml={16} display={{ base: 'none', md: 'flex' }}>
          <RouterLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'active' : ''
            }
          >
            {({ isActive }) => (
              <Text
                fontSize="14px"
                fontWeight={700}
                fontFamily="heading"
                color={isActive ? 'white' : 'gray.400'}
              >
                Dashboard
              </Text>
            )}
          </RouterLink>
          <RouterLink to="/actions">
            {({ isActive }) => (
              <Text
                ml={10}
                fontSize="14px"
                fontWeight={700}
                fontFamily="heading"
                color={isActive ? 'white' : 'gray.400'}
              >
                Actions
              </Text>
            )}
          </RouterLink>
          <RouterLink to="/markets">
            {({ isActive }) => (
              <Text
                ml={10}
                fontSize="14px"
                fontWeight={700}
                fontFamily="heading"
                color={isActive ? 'white' : 'gray.400'}
              >
                Markets
              </Text>
            )}
          </RouterLink>
        </Flex>
      </Flex>
      <AddressInput />
    </Flex>
  );
};

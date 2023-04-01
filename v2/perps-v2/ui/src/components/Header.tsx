import { FC, useEffect } from 'react';
import { Flex, useColorMode, Text } from '@chakra-ui/react';
import { NavLink as RouterLink } from 'react-router-dom';
import { SNXIcon } from './Icons/';
import { PerpsStats } from './PerpsStats';
import { AddressInput } from './AddressInput';

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
      px="40px"
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
          <PerpsStats mt="3px" ml={3} />
        </RouterLink>
        <Flex alignItems="center" mt="3px" ml={16}>
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
        </Flex>
      </Flex>
      <AddressInput />
    </Flex>
  );
};

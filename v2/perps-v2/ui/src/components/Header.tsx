import { FC, useEffect } from 'react';
import { Flex, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
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
      </Flex>
      <AddressInput />
    </Flex>
  );
};

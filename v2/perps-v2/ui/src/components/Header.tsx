import { FC, useEffect } from 'react';
import { Flex, Button, Link, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { SNXIcon } from './Icons/';
import { PerpsStats } from './PerpsStats';
import { RightUpIcon } from './Icons/RightUpIcon';

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
    >
      <Flex alignItems="center">
        <RouterLink to="/">
          <SNXIcon />
          <PerpsStats mt="3px" ml={3} />
        </RouterLink>
      </Flex>
      <Button
        as={Link}
        variant="outline"
        href="https://synthetix.io/perps"
        target="_blank"
        rel="noopener"
        _hover={{ textDecoration: 'none' }}
        rightIcon={<RightUpIcon />}
        fontFamily="inter"
        fontWeight="700"
      >
        Trade
      </Button>
    </Flex>
  );
};

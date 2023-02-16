import { Divider, Flex, Heading } from '@chakra-ui/react';
import { FC } from 'react';

export const Header: FC = () => {
  return (
    <>
      <Flex as="header" p="2">
        <Heading>Perps V2 Dashboard</Heading>
      </Flex>
      <Divider color="cyan.500" mb="2" />
    </>
  );
};

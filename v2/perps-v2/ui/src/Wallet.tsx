import { ArrowBackIcon } from '@chakra-ui/icons';
import { Divider, Flex, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PositionsTable } from './components/PositionsTable';

export const Wallet: FC = () => {
  const params = useParams();
  return (
    <Flex flexDir="column" p="2" justifyContent="center" alignItems="center">
      <Link to="/">
        <Flex gap="2" alignItems="center" mb="4">
          <ArrowBackIcon />
          <Heading size="md">Back</Heading>
        </Flex>
      </Link>
      <Heading size="sm">{params?.walletAddress}</Heading>
      <Divider m="4" />
      <PositionsTable />
    </Flex>
  );
};

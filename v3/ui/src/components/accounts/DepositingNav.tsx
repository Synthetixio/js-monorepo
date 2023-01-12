import { ChevronLeftIcon, SettingsIcon } from '@chakra-ui/icons';
import { Flex, Link } from '@chakra-ui/react';
import { useParams } from '@snx-v3/useParams';
import { generatePath, Link as RouterLink, useMatch } from 'react-router-dom';

export function DepositingNav() {
  const params = useParams();
  const innerPage = !useMatch('/');

  return (
    <Flex alignItems="center" mb="10">
      {innerPage ? (
        <Link
          as={RouterLink}
          to={generatePath('/?accountId=:accountId', { accountId: params.accountId })}
          fontSize="xs"
          fontWeight="normal"
          color="cyan.500"
          _hover={{ textDecoration: 'none' }}
        >
          <ChevronLeftIcon transform="translateY(-1px)" /> Account Overview
        </Link>
      ) : (
        <Link
          as={RouterLink}
          to={generatePath('/accounts/:accountId/settings', { accountId: params.accountId })}
          ml="auto"
          fontSize="xs"
          fontWeight="normal"
          color="cyan.500"
          _hover={{ textDecoration: 'none' }}
        >
          <SettingsIcon transform="translateY(-1px)" />
          &nbsp;&nbsp;Account Settings
        </Link>
      )}
    </Flex>
  );
}

import { ChevronLeftIcon, SettingsIcon } from '@chakra-ui/icons';
import { Flex, Link } from '@chakra-ui/react';
import {
  generatePath,
  Link as RouterLink,
  useMatch,
  useParams,
  useSearchParams,
} from 'react-router-dom';

export function DepositingNav() {
  const { id } = useParams();
  const [search] = useSearchParams();
  const routingSearchParams = `?chain=${search.get('chain')}`;

  const innerPage = !useMatch('/accounts/:id');

  return (
    <Flex alignItems="center" mb="10">
      {innerPage ? (
        <Link
          as={RouterLink}
          to={generatePath('/accounts/:id/*', {
            id,
            '*': routingSearchParams,
          })}
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
          to={generatePath('/accounts/:id/settings/*', {
            id,
            '*': routingSearchParams,
          })}
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

      {/* {false && router.route.split('/').length == 3 && (
        <NextLink href={`/accounts/${id}/settings`} passHref>
          <Link
            ml="auto"
            fontSize="xs"
            fontWeight="normal"
            color="cyan.500"
            _hover={{ textDecoration: 'none' }}
          >
            <SettingsIcon transform="translateY(-1px)" />
            &nbsp;&nbsp;Account Settings
          </Link>
        </NextLink>
      )}
      {false && (
        <NextLink href={`/accounts/${id}`} passHref>
          <Link
            ml="auto"
            fontSize="xs"
            fontWeight="normal"
            color="cyan.500"
            _hover={{ textDecoration: 'none' }}
          >
            <ChevronLeftIcon transform="translateY(-1px)" /> Return to overview
          </Link>
        </NextLink>
      )} */}
    </Flex>
  );
}

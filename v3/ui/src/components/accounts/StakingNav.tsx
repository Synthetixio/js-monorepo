import { CheckIcon, ChevronDownIcon, ChevronLeftIcon, SettingsIcon } from '@chakra-ui/icons';
import { Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import {
  generatePath,
  Link as RouterLink,
  useMatch,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { accountsState } from '../../utils/state';

export function StakingNav() {
  const [{ accounts: userAccounts }] = useRecoilState(accountsState);
  const { id } = useParams();
  const [search] = useSearchParams();
  const routingSearchParams = `?chain=${search.get('chain')}`;

  const innerPage = !useMatch('/accounts/:id');

  return (
    <Flex alignItems="center" mb="10">
      <Menu>
        <MenuButton size="sm" as={Button} variant="outline" rightIcon={<ChevronDownIcon />}>
          {id ? `Account #${id}` : 'Create Account'}
        </MenuButton>
        <MenuList fontSize="xs" px="2" bg="black" border="1px solid rgba(255,255,255,0.33)">
          {userAccounts.map((account) => {
            const isCurrentAccount = id === account.toString();
            const menuItem = (
              <MenuItem
                key={account}
                _hover={{ bg: 'whiteAlpha.200' }}
                _focus={{ bg: 'whiteAlpha.200' }}
                _active={{ bg: 'whiteAlpha.200' }}
              >
                <Flex width="100%" alignItems="center">
                  {isCurrentAccount && <CheckIcon marginRight={1} />}

                  {account}
                </Flex>
              </MenuItem>
            );

            return isCurrentAccount ? (
              menuItem
            ) : (
              <RouterLink key={account} to={`/accounts/${account}${routingSearchParams}`}>
                {menuItem}
              </RouterLink>
            );
          })}
          <MenuItem
            _hover={{ bg: 'whiteAlpha.200' }}
            _focus={{ bg: 'whiteAlpha.200' }}
            _active={{ bg: 'whiteAlpha.200' }}
          >
            <Link
              as={RouterLink}
              to={`/accounts/create${routingSearchParams}`}
              _focus={{ boxShadow: 'none' }}
              _hover={{ textDecoration: 'none' }}
              fontWeight="semibold"
            >
              Create new account
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
      {Boolean(innerPage) ? (
        <Link
          as={RouterLink}
          to={generatePath('/accounts/:id/*', {
            id,
            '*': routingSearchParams,
          })}
          ml="auto"
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

import { FC } from 'react';
import { accountsState } from '../../../utils/state';
import { ChevronDownIcon, CheckIcon } from '@chakra-ui/icons';
import { Flex, Link, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Link as NavLink, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

interface Props {
  id: string;
}
export const Subnav: FC<Props> = ({ id }) => {
  const [searchParams] = useSearchParams();
  const [{ accounts: userAccounts }] = useRecoilState(accountsState);

  return (
    <Flex mb="6" alignItems="center">
      <div style={{ fontWeight: 'semibold', fontSize: 'md' }}>
        {id ? `Account #${id}` : `Create Account`}
        <Menu>
          <MenuButton ml="1" transform="translateY(-1px)">
            <ChevronDownIcon />
          </MenuButton>
          <MenuList fontSize="xs" px="2" bg="black" border="1px solid rgba(255,255,255,0.33)">
            {userAccounts.map((account) => {
              const isCurrentAccount = id === account.toString();
              const menuItem = (
                <MenuItem
                  key={account}
                  _hover={{ bg: 'gray.800' }}
                  _focus={{ bg: 'gray.800' }}
                  _active={{ bg: 'gray.800' }}
                >
                  <Flex alignItems="center">
                    {isCurrentAccount && <CheckIcon marginRight={1} />}

                    {account}
                  </Flex>
                </MenuItem>
              );

              return isCurrentAccount ? (
                menuItem
              ) : (
                <NavLink
                  to={{
                    pathname: `/accounts/${account}`,
                    query: {
                      chain: router.query.chain,
                    },
                  }}
                  key={account}
                >
                  {menuItem}
                </NavLink>
              );
            })}
            <MenuItem
              _hover={{ bg: 'gray.800' }}
              _focus={{ bg: 'gray.800' }}
              _active={{ bg: 'gray.800' }}
            >
              <NavLink
                to={{
                  pathname: '/accounts/create',
                  search: '?chain=' + searchParams.get('chain'),
                }}
              >
                <Link
                  _focus={{ boxShadow: 'none' }}
                  _hover={{ textDecoration: 'none' }}
                  fontWeight="semibold"
                >
                  Create new account
                </Link>
              </NavLink>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>

      {/* {false && router.route.split('/').length == 3 && (
        <NavLink to={`/accounts/${id}/settings`}>
          <Link
            ml="auto"
            fontSize="xs"
            fontWeight="normal"
            color="blue.400"
            _hover={{ textDecoration: 'none' }}
          >
            <SettingsIcon transform="translateY(-1px)" />
            &nbsp;&nbsp;Account Settings
          </Link>
        </NavLink>
      )}
      {false && (
        <NavLink to={`/accounts/${id}`}>
          <Link
            ml="auto"
            fontSize="xs"
            fontWeight="normal"
            color="blue.400"
            _hover={{ textDecoration: 'none' }}
          >
            <ChevronLeftIcon transform="translateY(-1px)" /> Return to overview
          </Link>
        </NavLink>
      )} */}
    </Flex>
  );
};

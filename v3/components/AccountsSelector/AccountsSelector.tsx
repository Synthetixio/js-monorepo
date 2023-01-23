// import { CheckIcon } from '@chakra-ui/icons';
import { Button, Fade } from '@chakra-ui/react';
// import { createSearchParams, generatePath, Link as RouterLink } from 'react-router-dom';
import { prettyString } from '@snx-v3/format';
import { useParams } from '@snx-v3/useParams';
// import { useAccounts } from '@snx-v3/useAccounts';

// function AccountMenuItem({ accountId }: { accountId: string }) {
//   const params = useParams();

//   return (
//     <RouterLink
//       to={{
//         pathname: generatePath('/'),
//         search: accountId ? createSearchParams({ accountId }).toString() : '',
//       }}
//     >
//       <MenuItem
//         _hover={{ bg: 'whiteAlpha.200' }}
//         _focus={{ bg: 'whiteAlpha.200' }}
//         _active={{ bg: 'whiteAlpha.200' }}
//       >
//         <Flex width="100%" alignItems="center">
//           {params.accountId === accountId && <CheckIcon marginRight={1} />}
//           {accountId}
//         </Flex>
//       </MenuItem>
//     </RouterLink>
//   );
// }

export function AccountsSelector() {
  const params = useParams();
  // const { data: accounts = [] } = useAccounts();

  if (!params.accountId) {
    return null;
  }

  return (
    <Fade in={true}>
      <Button size="sm" height="40px" as={Button} variant="outline" w="100%" maxW="180px" h="36px">
        {`Account #${prettyString(params.accountId, 3, 3)}`}
      </Button>
    </Fade>
    // Temporarily disable account selector menu
    // <Menu>
    //   <MenuList fontSize="xs" bg="black" h="36px" py={0} border="1px solid rgba(255,255,255,0.33)">
    //       <Button size="sm" as={Button} variant="outline" w="100%" maxW="180px" h="36px">
    //     {`Account #${prettyString(params.accountId, 3, 3)}`}
    //   </Button>
    //     {accounts.map((accountId) => (
    //       <AccountMenuItem key={accountId} accountId={accountId} />
    //     ))}
    //     <Link
    //       as={RouterLink}
    //       to="/accounts/create"
    //       _focus={{ boxShadow: 'none' }}
    //       _hover={{ textDecoration: 'none' }}
    //     >
    //       <MenuItem
    //         _hover={{ bg: 'whiteAlpha.200' }}
    //         _focus={{ bg: 'whiteAlpha.200' }}
    //         _active={{ bg: 'whiteAlpha.200' }}
    //         height="100%"
    //       >
    //         <Text fontWeight="semibold" px="2">
    //           Create new account
    //         </Text>
    //       </MenuItem>
    //     </Link>
    //   </MenuList>
    // </Menu>
  );
}

import { Box, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useAccount, useContractWrite } from 'wagmi';
import { useAccountRead } from '../../hooks/useDeploymentRead';
import { useContract } from '../../hooks/useContract';
import { contracts } from '../../utils/constants';

export const AcceptNomination = () => {
  const { id: accountId } = useParams();
  const { address } = useAccount();

  const { data: nominatedOwner } = useAccountRead({
    functionName: 'getApproved',
    args: [accountId],
  });

  const { data: accountOwner } = useAccountRead({
    functionName: 'ownerOf',
    args: [accountId],
    enabled: Boolean(accountId),
  });

  const accountProxy = useContract(contracts.ACCOUNT_PROXY);
  const { isLoading, write } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: accountProxy?.address,
    contractInterface: accountProxy?.abi || '',
    functionName: 'transferFrom',
    args: [accountOwner, address, accountId],
  });

  return (
    <Box>
      {address === nominatedOwner && (
        <Button isLoading={isLoading} size="lg" ml="4" px="8" onClick={() => write()}>
          Accept Ownership of {accountId}
        </Button>
      )}
    </Box>
  );
};

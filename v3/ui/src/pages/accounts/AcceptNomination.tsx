import { Box, Button } from '@chakra-ui/react';
import { useContractWrite } from 'wagmi';
import { useCallback } from 'react';
import { useAccount } from '@snx-v3/useBlockchain';
import { useAccountRead } from '../../hooks/useDeploymentRead';
import { useContract } from '../../hooks/useContract';
import { contracts } from '../../utils/constants';
import { useParams } from '@snx-v3/useParams';

export const AcceptNomination = () => {
  const params = useParams();
  const account = useAccount();

  const { data: nominatedOwner } = useAccountRead({
    functionName: 'getApproved',
    args: [params.accountId],
  });

  const { data: accountOwner } = useAccountRead({
    functionName: 'ownerOf',
    args: [params.accountId],
    enabled: Boolean(params.accountId),
  });

  const accountProxy = useContract(contracts.ACCOUNT_PROXY);
  const { isLoading, write } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: accountProxy?.address,
    abi: accountProxy?.abi,
    functionName: 'transferFrom',
    args: [accountOwner, account?.address, params.accountId],
  });

  const onClick = useCallback(() => {
    if (write) {
      write();
    }
  }, [write]);

  return (
    <Box>
      {account?.address === nominatedOwner && (
        <Button isLoading={isLoading} size="lg" ml="4" px="8" onClick={onClick}>
          Accept Ownership of {params.accountId}
        </Button>
      )}
    </Box>
  );
};

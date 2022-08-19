import { Box, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useAccount, useContractWrite } from 'wagmi';
import { useContract, useSynthetixRead } from '../../hooks';
import { contracts } from '../../utils/constants';

export const AcceptNomination = () => {
  const { id: accountId } = useParams();
  const { address } = useAccount();

  const { data: nominatedOwner } = useSynthetixRead({
    functionName: 'nominatedAccountOwnerOf',
    args: [accountId],
  });

  const snxContract = useContract(contracts.SYNTHETIX_PROXY);
  const { isLoading, write } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: snxContract?.address,
    contractInterface: snxContract?.abi,
    functionName: 'acceptAccountOwnership',
    args: [accountId],
    onError: (e) => console.log(e),
  });

  return (
    <Box>
      {address === nominatedOwner && (
        <Button
          isLoading={isLoading}
          size="lg"
          colorScheme="blue"
          ml="4"
          px="8"
          onClick={() => write()}
        >
          {/* @ts-ignore */}
          Accept Ownership of {accountId}
        </Button>
      )}
    </Box>
  );
};

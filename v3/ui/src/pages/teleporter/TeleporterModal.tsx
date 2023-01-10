import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useCallback, useMemo, useState } from 'react';
import { useContractWrite, useNetwork } from 'wagmi';
import { useAccount } from '@snx-v3/useBlockchain';
import { useContract } from '../../hooks/useContract';
import { useApprove } from '@snx-v3/useApprove';
import { useTokenBalance } from '../../hooks/useTokenBalance';
import { contracts } from '../../utils/constants';
import { parseUnits } from '@snx-v3/format';
import testnetIcon from './testnet.png';
import { TransactionReview, TransactionStatus } from '@snx-v3/TransactionReview';

const chains = [
  {
    id: 5,
    logo: testnetIcon,
    label: 'Goerli',
  },
  {
    id: 420,
    logo: testnetIcon,
    label: 'Optimism Goerli',
  },
];

const encodeAddress = (address: string | undefined) => {
  return address ? ethers.utils.defaultAbiCoder.encode(['address'], [address]) : undefined;
};

export function TeleporterModal({
  amount,
  isOpen,
  setIsOpen,
}: {
  amount: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { address } = useAccount();
  const toast = useToast();

  const { chain: activeChain } = useNetwork();

  const teleportChains = chains.sort((chain) => (chain.id === activeChain?.id ? -1 : 1));

  const CCIP = useContract(contracts.CCIP);
  const snxUsdProxy = useContract(contracts.SNX_USD_PROXY);
  const balance = useTokenBalance(snxUsdProxy?.address, teleportChains[0].id);

  const toChain = useMemo(
    () => chains.find((chain) => chain.id === teleportChains[1].id),
    [teleportChains]
  );

  const { writeAsync: ccipSend, isLoading: teleportingLoading } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: CCIP?.address,
    abi: CCIP?.abi,
    functionName: 'ccipSend',
    args: [
      teleportChains[1].id,
      [encodeAddress(address), '0x', [snxUsdProxy!.address], [parseUnits(amount)], 100000],
    ],
  });

  const {
    approve,
    requireApproval,
    refetchAllowance,
    isLoading: approvalLoading,
  } = useApprove({
    contractAddress: snxUsdProxy?.address,
    amount: parseUnits(amount),
    spender: CCIP!.address,
  });

  const [status, setStatus] = useState<TransactionStatus>('idle');

  const [infiniteApproval, setInfiniteApproval] = useState(false);
  const onSubmit = useCallback(async () => {
    if (status === 'completed') {
      // Close window
      setIsOpen(false);
      return;
    }

    setStatus('processing');

    // Step 1
    if (requireApproval) {
      try {
        await approve(infiniteApproval);
        await refetchAllowance();
      } catch (e) {
        console.error(e);
        setStatus('failed');
        return;
      }
    }

    // Step 2
    try {
      if (!ccipSend) throw new Error('CCIP contract not ready');
      if (!(amount > 0)) throw new Error('Amount must be greater than zero');

      const txReceipt = await ccipSend();
      toast.closeAll();
      toast({
        title: 'Teleportation initiated',
        description: 'Your balance on the destination chain will be updated in a few minutes.',
        status: 'info',
        isClosable: true,
        duration: 9000,
      });
      await txReceipt.wait();
      await balance.refetch();
    } catch (e) {
      console.error(e);
      setStatus('failed');
      return;
    }

    setStatus('completed');
  }, [
    amount,
    approve,
    balance,
    ccipSend,
    infiniteApproval,
    refetchAllowance,
    requireApproval,
    setIsOpen,
    status,
    toast,
  ]);

  return (
    <Modal size="lg" isOpen={isOpen} onClose={() => setIsOpen(false)} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="black" color="white">
        <ModalHeader>Complete this action</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2">Please execute the following transactions:</Text>

          <TransactionReview
            step={1}
            title="Approve snxUSD transfer"
            status={requireApproval ? status : 'completed'}
            checkbox={{
              label: 'Approve unlimited snxUSD transfers to Synthetix',
              isChecked: infiniteApproval,
              onChange: (e) => setInfiniteApproval(e.target.checked),
            }}
            isLoading={approvalLoading}
          />

          <TransactionReview
            step={2}
            title="Teleport snxUSD"
            status={requireApproval ? 'idle' : status}
            subtitle={`This will transfer your snxUSD to the ${toChain?.label} network.`}
            isLoading={teleportingLoading}
          />

          <Button disabled={status === 'processing'} onClick={onSubmit} width="100%" my="4">
            {status === 'idle' ? 'Start' : null}
            {status === 'completed' ? 'Done' : null}
            {status === 'failed' ? 'Retry' : null}
            {status === 'processing' ? 'Processing...' : null}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

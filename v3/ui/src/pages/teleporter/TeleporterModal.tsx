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
import { TransactionReview } from '@snx-v3/TransactionReview';

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

  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [failed, setFailed] = useState(false);

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

  const [step, setStep] = useState<0 | 1 | 2>(0);

  const [infiniteApproval, setInfiniteApproval] = useState(false);
  const onSubmit = useCallback(async () => {
    if (completed) {
      // Reset state and close the window
      setStep(0);
      setFailed(false);
      setIsOpen(false);
      return;
    }

    setFailed(false);
    setProcessing(true);

    setStep(1);
    if (requireApproval) {
      try {
        await approve(infiniteApproval);
        await refetchAllowance();
      } catch (e) {
        console.error(e);
        setFailed(true);
        return;
      }
    }

    // Step 2
    setStep(2);
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
      setFailed(true);
      return;
    }

    setProcessing(false);
    setCompleted(true);
  }, [
    amount,
    approve,
    balance,
    ccipSend,
    completed,
    infiniteApproval,
    refetchAllowance,
    requireApproval,
    setIsOpen,
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
            status={{
              failed: step === 1 && failed,
              success: !requireApproval,
              loading: approvalLoading,
            }}
            checkboxLabel="Approve unlimited snxUSD transfers to Synthetix"
            checkboxProps={{
              isChecked: infiniteApproval,
              onChange: (e) => setInfiniteApproval(e.target.checked),
            }}
          />

          <TransactionReview
            step={2}
            title="Teleport snxUSD"
            subtitle={`This will transfer your snxUSD to the ${toChain?.label} network.`}
            status={{
              failed: step === 2 && failed,
              success: completed,
              loading: teleportingLoading,
              disabled: requireApproval,
            }}
          />

          <Button disabled={processing} onClick={onSubmit} width="100%" my="4">
            {(() => {
              switch (true) {
                case failed:
                  return 'Retry';
                case processing:
                  return 'Processing...';
                case completed:
                  return 'Done';
                default:
                  return 'Start';
              }
            })()}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

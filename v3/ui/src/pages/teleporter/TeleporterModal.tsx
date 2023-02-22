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
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { contracts } from '../../utils/constants';
import { parseUnits } from '@snx-v3/format';
import testnetIcon from './testnet.png';
import { Multistep } from '@snx-v3/Multistep';
import { Wei } from '@synthetixio/wei';

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
  amount: Wei;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const account = useAccount();
  const toast = useToast();

  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [failed, setFailed] = useState(false);

  const { chain: activeChain } = useNetwork();

  const teleportChains = chains.sort((chain) => (chain.id === activeChain?.id ? -1 : 1));

  const CCIP = useContract(contracts.CCIP);
  const snxUsdProxy = useContract(contracts.SNX_USD_PROXY);
  const tokenBalance = useTokenBalance(snxUsdProxy?.address, teleportChains[0].id);

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
      [encodeAddress(account?.address), '0x', [snxUsdProxy!.address], [parseUnits(amount)], 100000],
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

  const [step, setStep] = useState<'idle' | 'approve' | 'transfer'>('idle');

  const [infiniteApproval, setInfiniteApproval] = useState(false);

  const onClose = useCallback(() => {
    setStep('idle');
    setCompleted(false);
    setFailed(false);
    setProcessing(false);
    setIsOpen(false);
  }, [setIsOpen]);

  const onSubmit = useCallback(async () => {
    if (completed) {
      onClose();
      return;
    }

    setFailed(false);
    setProcessing(true);

    setStep('approve');
    if (requireApproval) {
      try {
        await approve(infiniteApproval);
        await refetchAllowance();
      } catch (e) {
        console.error(e);
        setFailed(true);
        setProcessing(false);
        return;
      }
    }

    setStep('transfer');
    try {
      if (!ccipSend) throw new Error('CCIP contract not ready');
      if (amount.lte(0)) throw new Error('Amount must be greater than zero');

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
      await tokenBalance.refetch();
    } catch (e) {
      console.error(e);
      setFailed(true);
      setProcessing(false);
      return;
    }

    setProcessing(false);
    setCompleted(true);
  }, [
    amount,
    approve,
    tokenBalance,
    ccipSend,
    completed,
    infiniteApproval,
    onClose,
    refetchAllowance,
    requireApproval,
    toast,
  ]);

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="black" color="white">
        <ModalHeader>Complete this action</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2">Please execute the following transactions:</Text>

          <Multistep
            step={1}
            title="Approve snxUSD transfer"
            status={{
              failed: step === 'approve' && failed,
              success: !requireApproval,
              loading: approvalLoading,
            }}
            checkboxLabel="Approve unlimited snxUSD transfers to Synthetix"
            checkboxProps={{
              isChecked: infiniteApproval,
              onChange: (e) => setInfiniteApproval(e.target.checked),
            }}
          />

          <Multistep
            step={2}
            title="Teleport snxUSD"
            subtitle={`This will transfer your snxUSD to the ${toChain?.label} network.`}
            status={{
              failed: step === 'transfer' && failed,
              success: completed,
              loading: teleportingLoading,
              disabled: requireApproval,
            }}
          />

          <Button isDisabled={processing} onClick={onSubmit} width="100%" my="4">
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

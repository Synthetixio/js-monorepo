import { useRef, useState } from 'react';
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { CloseIcon, SettingsIcon } from '@chakra-ui/icons';
import { ethers } from 'ethers';
import { useEthersProvider } from '../../utils/ProviderContext';

export const RpcSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setProvider } = useEthersProvider();

  const ref = useRef<HTMLInputElement>(null);

  const switchRpc = async () => {
    const rpcUrl = ref?.current?.value;

    if (!rpcUrl) {
      setError('Please enter a valid RPC');
      return;
    }
    setError(null);
    setLoading(true);
    const testConnection = new ethers.providers.JsonRpcProvider(rpcUrl);

    try {
      await testConnection.getBlockNumber();
      setProvider(rpcUrl);
      setLoading(false);
      setError(null);
      setIsOpen(false);
      window.location.reload();
    } catch (e) {
      console.log('Error', e);
      setLoading(false);
      setError('Invalid RPC');
      return;
    }
  };

  const onClose = () => {
    setIsOpen(false);
    setError(null);
    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="navy.700" border="1px" borderColor="gray.900" borderRadius="5px" p={2}>
          <Flex
            _hover={{ cursor: 'pointer' }}
            justifyContent="flex-end"
            pr={1}
            pt={1}
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon />
          </Flex>
          <ModalHeader>Update RPC Connection</ModalHeader>
          <ModalBody>
            <Flex flexDirection="column">
              <Input placeholder="Enter RPC" ref={ref} />
              {error && (
                <Flex mt={1} fontSize="12px" color="red.500">
                  {error}
                </Flex>
              )}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={switchRpc} disabled={!loading}>
              {loading ? 'Switching' : 'Switch'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button
        variant="unstyled"
        ml={3}
        borderWidth="1px"
        borderColor="gray.900"
        py="7px"
        px="12px"
        borderRadius="7px"
        onClick={() => setIsOpen(true)}
      >
        <SettingsIcon mb="2px" color="gray.100" />
      </Button>
    </>
  );
};

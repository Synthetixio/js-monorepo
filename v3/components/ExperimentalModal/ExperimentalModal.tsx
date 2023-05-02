import {
  Box,
  Button,
  Checkbox,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

export const ExperimentalModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(!window.location.host.includes('localhost'));
  const [accepted, setAccepted] = useState(false);
  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <Modal size="lg" isOpen={isOpen} onClose={() => {}} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent p={4} bg="gray.900" color="white">
        <ModalHeader>EXPERIMENTAL</ModalHeader>
        <ModalBody display="flex" flexDir="column" gap={4}>
          <Box>
            <Text>You do not want to be here.</Text>
            <Text>
              Please go to{' '}
              <Link color="cyan.500" boxShadow="none" href="https://staking.synthetix.io">
                staking.synthetix.io
              </Link>
              .
            </Text>
          </Box>
          <Checkbox onChange={() => setAccepted((x) => !x)}>I want to proceed</Checkbox>
          <Button onClick={() => setIsOpen(false)} isDisabled={!accepted}>
            Proceed
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

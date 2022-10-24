import {
  Flex,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

enum StepStatus {
  Complete,
  Current,
  Upcoming,
}

interface StepProps {
  address?: string;
  callFunc?: string;
  callArgs?: any[];
  status: StepStatus;
}

const stepOverrides = {};

export const MultistepModalTransaction: FC<StepProps> = ({
  address = '0x0000',
  callFunc = 'blah',
  callArgs = ['asd', 123],
}) => {
  return (
    <Flex alignItems="center" rounded="sm" mt="4" p="4" border="1px solid gray">
      <Box>
        <Text>
          {callFunc + (callArgs?.length && `(${callArgs.map((v) => v.toString()).join(', ')})`)}
        </Text>
        <Text fontSize="xs" opacity="0.66" mt="1'">
          {address}
        </Text>
      </Box>
      <Button ml="auto" size="sm" variant="outline">
        Submit
      </Button>
    </Flex>
  );
};

interface Props {
  title?: string;
  subtitle?: string;
}

export const MultistepModal: FC<Props> = ({
  title = 'Complete this action',
  subtitle = 'Please execute the following transactions:',
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentStep] = useState(0);

  useEffect(() => {
    onOpen();
  }, []);

  // useEffect if currentStep > number of steps, close modal

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="black" color="white">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2">{subtitle}</Text>
          <MultistepModalTransaction status={0} />
          <MultistepModalTransaction status={1} />
          <MultistepModalTransaction status={2} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

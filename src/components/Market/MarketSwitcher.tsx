import {
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { ArrowUpDownIcon } from "@chakra-ui/icons";

export function MarketSwitcher() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        width="180px"
        p="4"
        align="center"
        height="100%"
        bg="whiteAlpha.100"
        borderRadius="0"
      >
        <Heading size="md">ETH</Heading>
        <ArrowUpDownIcon ml="auto" />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Markets</ModalHeader>
          <ModalCloseButton />
          <ModalBody>List here</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

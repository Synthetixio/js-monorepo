import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowUpDownIcon } from "@chakra-ui/icons";

export function MarketSwitcher() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex onClick={onOpen} width="220px" p="4" align="center">
        Market Selector
        <ArrowUpDownIcon ml="auto" />
      </Flex>

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

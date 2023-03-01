import {
  Button,
  Flex,
  Heading,
  Box,
  Alert,
  AlertIcon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { Collateral } from "./Collateral";

export function AccountOverview() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p="4" borderBottom="1px solid rgba(255,255,255,0.2)">
      <Flex align="center" mb="2">
        <Heading size="sm">Account Overview</Heading>
        <Button onClick={onOpen} ml="auto" size="xs" colorScheme="purple">
          Deposit / Withdraw
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Deposit / Withdraw Collateral</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Collateral />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>

      {/* Need the before/after component */}
      <Box mb="1">Buying Power: $10,000</Box>
      <Box mb="1">Free Collateral: $1,000</Box>
      <Box mb="1">Margin Usage: 15%</Box>
      <Box mb="1">PnL</Box>
      <Alert status="warning" fontSize="sm">
        <AlertIcon />
        If margin usage exceeds 100% or free collateral goes below $0, you will
        be liquidated and lose everything you deposited.
      </Alert>
    </Box>
  );
}

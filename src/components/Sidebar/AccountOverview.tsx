import { ArrowForwardIcon } from "@chakra-ui/icons";
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
  Text,
} from "@chakra-ui/react";
import { Collateral } from "./Collateral";

export function AccountOverview() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p="4" borderBottom="1px solid rgba(255,255,255,0.2)">
      <Flex align="center" mb="2">
        <Heading size="sm">Account Overview</Heading>
        <Button onClick={onOpen} ml="auto" size="xs" colorScheme="blue">
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
      <Box mb="1">
        Buying Power:{" "}
        <Text display="inline" fontFamily="mono">
          $10,000
        </Text>{" "}
        <ArrowForwardIcon />{" "}
        <Text display="inline" fontFamily="mono">
          $10,000
        </Text>
      </Box>
      <Box mb="1">
        Free Collateral:{" "}
        <Text display="inline" fontFamily="mono">
          $1,000
        </Text>{" "}
        <ArrowForwardIcon />{" "}
        <Text display="inline" fontFamily="mono">
          $1,000
        </Text>
      </Box>
      <Box mb="1">
        Margin Usage:{" "}
        <Text display="inline" fontFamily="mono">
          15%
        </Text>{" "}
        <ArrowForwardIcon />{" "}
        <Text display="inline" fontFamily="mono">
          15%
        </Text>
      </Box>
      <Box mb="1">
        Profit/Loss:{" "}
        <Text display="inline" fontFamily="mono">
          $0
        </Text>
      </Box>
      <Alert status="warning" fontSize="sm" mt="3" fontWeight="medium">
        <AlertIcon />
        If Margin Usage exceeds 100%, you will be liquidated and lose everything
        you deposited.
      </Alert>
    </Box>
  );
}

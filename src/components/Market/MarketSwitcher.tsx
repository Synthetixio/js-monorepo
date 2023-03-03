import {
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
import { useNavigate } from "react-router-dom";

import markets from "../../markets";

export function MarketSwitcher() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const marketIds = Object.keys(markets);

  const navigate = useNavigate();

  const handleMarketClick = (marketId: string) => {
    onClose();
    navigate(`/markets/${marketId}`);
  };

  return (
    <>
      <Button
        onClick={onOpen}
        width="140px"
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
          <ModalBody>
            {marketIds?.map((marketId) => (
              <Button
                key={marketId}
                mb="4"
                bg="whiteAlpha.100"
                width="100%"
                onClick={() => handleMarketClick(marketId)}
              >
                {marketId}
              </Button>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

import {
  Button,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Flex,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { formatNumber } from '@snx-v2/formatters';
import { InfoIcon } from '@snx-v2/icons';
import { useNavigate } from 'react-router-dom';

interface TradingFeesModalProps {
  feesBurned: number;
  isOpen: boolean;
  onClose: () => void;
  sUSDBalance: string;
  currentCRatioPercentage: number;
  activeDebt: number;
  totalBalance: number;
}

export const TradingFeesModal = ({
  isOpen,
  onClose,
  feesBurned,
  sUSDBalance,
  currentCRatioPercentage,
  activeDebt,
  totalBalance,
}: TradingFeesModalProps) => {
  const navigate = useNavigate();

  const previousCratio = (100 * totalBalance) / (activeDebt + feesBurned);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          mt="20vh"
          p={6}
          bgGradient="linear(75deg, #171923, blackAlpha.900)"
          borderWidth="1px"
          borderColor="gray.900"
          maxW="538px"
          mx={4}
        >
          <ModalCloseButton />
          <Heading fontFamily="heading" fontSize="2xl" textAlign="center" my={2}>
            Trading Fees Burning
          </Heading>
          <Text textAlign="center" color="gray.600" my={2} fontSize="12px" lineHeight="18px">
            Trading fees no longer need to be claimed, they now automatically pay down your debt and
            increase your c-ratio. Below you can see the estimated impact to your position.
          </Text>
          <Flex
            bg="black"
            borderRadius="10px"
            my={2}
            flexDir="column"
            borderColor="gray.900"
            borderWidth="1px"
          >
            <Flex justifyContent="center" alignItems="center" flexDir="column" py={3}>
              <Text fontWeight="700" fontSize="14px" lineHeight="20px" fontFamily="heading">
                FEES EARNED LAST EPOCH
              </Text>
              <Text fontWeight="700" fontSize="36px" lineHeight="40px" fontFamily="heading">
                {formatNumber(feesBurned)} sUSD
              </Text>
            </Flex>
          </Flex>
          <Flex bg="whiteAlpha.200" borderRadius="10px" my={3} flexDir="column" p={3}>
            <Flex justifyContent="space-between" mb={2}>
              <Text width="33%" color="transparent" fontSize="14px" lineHeight="20px">
                1
              </Text>
              <Text
                width="33%"
                color="gray.500"
                fontWeight="700"
                fontSize="14px"
                textAlign="center"
                lineHeight="20px"
              >
                Before burning
              </Text>
              <Text
                width="33%"
                color="gray.500"
                fontWeight="700"
                lineHeight="20px"
                fontSize="14px"
                textAlign="end"
              >
                After burning
              </Text>
            </Flex>
            <Flex mb={3} justifyContent="space-between">
              <Text fontWeight="700" fontSize="12px" lineHeight="16px" as="span" width="33%">
                C-ratio
                <Tooltip label="Your current C-ratio">
                  <span>
                    <InfoIcon ml={1} />
                  </span>
                </Tooltip>
              </Text>
              <Text
                fontWeight="700"
                fontSize="12px"
                lineHeight="16px"
                as="span"
                width="33%"
                textAlign="center"
              >
                {`${formatNumber(previousCratio)}%`}
              </Text>
              <Text
                fontWeight="700"
                fontSize="12px"
                lineHeight="16px"
                as="span"
                width="33%"
                textAlign="end"
              >
                {`${formatNumber(currentCRatioPercentage)}%`}
              </Text>
            </Flex>
            <Flex mb={2} justifyContent="space-between">
              <Text fontWeight="700" fontSize="12px" lineHeight="16px" as="span" width="33%">
                Active Debt
                <Tooltip label="Your current active debt in sUSD">
                  <span>
                    <InfoIcon ml={1} />
                  </span>
                </Tooltip>
              </Text>
              <Text
                fontWeight="700"
                fontSize="12px"
                lineHeight="16px"
                as="span"
                width="33%"
                textAlign="center"
              >
                {`$${formatNumber(activeDebt - feesBurned)}`}
              </Text>
              <Text
                fontWeight="700"
                fontSize="12px"
                lineHeight="16px"
                as="span"
                width="33%"
                textAlign="end"
              >
                {`$${formatNumber(activeDebt)}`}
              </Text>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" mt={1}>
              <Text fontWeight="700" fontSize="12px" lineHeight="16px" as="span" width="33%">
                sUSD Balance
                <Tooltip label="Your current sUSD balance">
                  <span>
                    <InfoIcon ml={1} />
                  </span>
                </Tooltip>
              </Text>
              <Text
                fontWeight="700"
                fontSize="12px"
                lineHeight="16px"
                as="span"
                width="33%"
                textAlign="center"
              >
                ${sUSDBalance}
              </Text>
              <Text
                fontWeight="700"
                fontSize="12px"
                lineHeight="16px"
                as="span"
                width="33%"
                textAlign="end"
              >
                ${sUSDBalance}
              </Text>
            </Flex>
          </Flex>
          <Button
            width="100%"
            variant="outline"
            mt={2}
            mr={3}
            onClick={() => navigate('/staking/mint')}
          >
            Stake More
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
};

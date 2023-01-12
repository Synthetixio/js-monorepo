import {
  Button,
  Heading,
  Link,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Flex,
  Text,
} from '@chakra-ui/react';
import { ArrowRight, InfoIcon } from '@snx-v2/icons';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface TradingFeesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TradingFeesModal = ({ isOpen, onClose }: TradingFeesModalProps) => {
  const navigate = useNavigate();
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
            <Trans
              i18nKey="staking-v2.earn.trading-fees.modal.description"
              components={[
                <Link target="_blank" color="cyan.400" href={EXTERNAL_LINKS.Synthetix.SIP255} />,
              ]}
            />
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
                EPOCH FEES
              </Text>
              <Text fontWeight="700" fontSize="36px" lineHeight="40px" fontFamily="heading">
                89.90 sUSD
              </Text>
            </Flex>
            <Flex
              borderTopColor="gray.900"
              width="100%"
              justifyContent="center"
              borderTopWidth="1px"
            >
              <Text
                width="50%"
                textAlign="center"
                borderRightColor="gray.900"
                borderRightWidth="0.5px"
                py="6px"
                fontFamily="heading"
                fontSize="12px"
                lineHeight="18px"
              >
                New C-ratio
              </Text>
              <Text
                borderLeftColor="gray.900"
                borderLeftWidth="0.5px"
                width="50%"
                textAlign="center"
                py="6px"
                fontFamily="heading"
                fontSize="12px"
                lineHeight="18px"
              >
                431%
              </Text>
            </Flex>
          </Flex>
          <Flex bg="whiteAlpha.200" borderRadius="10px" my={2} flexDir="column" p={3}>
            <Flex mb={2} justifyContent="space-between">
              <span>
                <Text fontWeight="700" fontSize="12px" lineHeight="16px" as="span">
                  C-ratio
                </Text>
                <InfoIcon ml={1} />
              </span>
              <span>
                <Text fontWeight="700" fontSize="12px" lineHeight="16px" as="span">
                  401%
                </Text>
                <ArrowRight mx={1} color="white" />
                <Text fontWeight="700" fontSize="12px" lineHeight="16px" as="span">
                  402%
                </Text>
              </span>
            </Flex>
            <Flex mb={2} justifyContent="space-between">
              <span>
                <Text fontWeight="700" fontSize="12px" lineHeight="16px" as="span">
                  sUSD Balance
                </Text>
                <InfoIcon ml={1} />
              </span>
              <span>
                <Text fontWeight="700" fontSize="12px" lineHeight="16px" as="span">
                  1,000
                </Text>
                <ArrowRight mx={1} color="white" />
                <Text fontWeight="700" fontSize="12px" lineHeight="16px" as="span">
                  1,000
                </Text>
              </span>
            </Flex>
            <Flex justifyContent="space-between">
              <span>
                <Text fontWeight="700" fontSize="12px" lineHeight="16px" as="span">
                  Active Debt
                </Text>
                <InfoIcon ml={1} />
              </span>
              <span>
                <Text fontWeight="700" fontSize="12px" lineHeight="16px" as="span">
                  $2,504
                </Text>
                <ArrowRight mx={1} color="white" />
                <Text fontWeight="700" fontSize="12px" lineHeight="16px" as="span">
                  $1,987
                </Text>
              </span>
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

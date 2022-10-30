import {
  Text,
  Modal,
  ModalContent,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Flex,
} from '@chakra-ui/react';
import { CloseIcon, ChevronDown, ChevronUp } from '@snx-v2/icons';
import { useTranslation } from 'react-i18next';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Settings = ({ isOpen, onClose }: SettingsProps) => {
  console.log(isOpen, onClose);
  const { t } = useTranslation();

  return (
    <Modal isOpen={true} onClose={() => {}}>
      <ModalContent
        width="384px"
        // height="280px"
        bg="gray.900"
        bgGradient="linear(to-bl, #141414, #141923)"
        p={3}
        pb={6}
        borderRadius="xl"
        borderWidth={1}
        borderColor="gray.900"
      >
        <Flex justifyContent="end" onClick={() => console.log('Close')}>
          <CloseIcon color="white" _hover={{ cursor: 'pointer' }} />
        </Flex>
        <Flex direction="column" alignItems="center">
          <Text
            textAlign="center"
            fontFamily="heading"
            color="white"
            fontSize="xl"
            fontWeight="black"
            lineHeight="6"
            fontStyle="normal"
            mb={2}
          >
            {t('staking-v2.settings.title')}
          </Text>
          <Text
            ml={6}
            width="100%"
            textAlign="start"
            color="gray.600"
            fontFamily="heading"
            fontSize="xs"
            lineHeight="4"
            mb={2}
          >
            {t('staking-v2.settings.language')}
          </Text>
          <Menu matchWidth>
            {({ isOpen }) => (
              <>
                <MenuButton
                  mt={1}
                  width="95%"
                  borderRadius="6px"
                  bg="blackAlpha.300"
                  _hover={{
                    bg: 'blackAlpha.400',
                  }}
                >
                  <Flex
                    width="100%"
                    justifyContent="space-between"
                    py={3}
                    px={2}
                    alignItems="center"
                    borderWidth={1}
                    borderColor="gray.900"
                    borderRadius="lg"
                  >
                    <Text fontWeight={700} ml={1.5} mr={2}>
                      {/* TODO Connect with Existing Settings */}
                      English
                    </Text>
                    {isOpen ? <ChevronUp color="cyan" /> : <ChevronDown color="cyan.500" />}
                  </Flex>
                </MenuButton>
                <MenuList mt={0} bg="gray.900">
                  <MenuItem width="100%" onClick={() => console.log('English')}>
                    <Text width="100%">English</Text>
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
          <Text
            ml={6}
            width="100%"
            textAlign="start"
            color="gray.600"
            fontFamily="heading"
            fontSize="xs"
            lineHeight="4"
            mt={2}
            mb={2}
          >
            {t('staking-v2.settings.currency')}
          </Text>
          <Menu matchWidth>
            {({ isOpen }) => (
              <>
                <MenuButton
                  mt={2}
                  width="95%"
                  borderRadius="6px"
                  bg="blackAlpha.300"
                  _hover={{
                    bg: 'blackAlpha.400',
                  }}
                >
                  <Flex
                    width="100%"
                    justifyContent="space-between"
                    py={3}
                    px={2}
                    alignItems="center"
                    borderWidth={1}
                    borderColor="gray.900"
                    borderRadius="lg"
                  >
                    <Text fontWeight={700} ml={1.5} mr={2}>
                      {/* TODO Connect with Existing Currency */}
                      sUSD
                    </Text>
                    {isOpen ? <ChevronUp color="cyan" /> : <ChevronDown color="cyan.500" />}
                  </Flex>
                </MenuButton>
                <MenuList mt={0} bg="gray.900">
                  <MenuItem width="100%" onClick={() => console.log('sUSD')}>
                    <Text width="100%">sUSD</Text>
                  </MenuItem>
                  <MenuItem width="100%" onClick={() => console.log('ETH')}>
                    <Text width="100%">ETH</Text>
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

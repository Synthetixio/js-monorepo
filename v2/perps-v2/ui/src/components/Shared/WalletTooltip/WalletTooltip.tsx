import { Td, useDisclosure, Flex, Popover, PopoverContent, Text, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { WalletIcon } from '../../Icons';

interface WalletTooltipProps {
  address: string;
}

export const WalletTooltip = ({ address }: WalletTooltipProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Td border="none" onMouseEnter={onOpen} onMouseLeave={onClose} position="relative">
      <Flex height="100%">
        <WalletIcon />
      </Flex>
      <Popover isOpen={isOpen}>
        <PopoverContent
          position="absolute"
          left={-375}
          top={-5}
          bg="none"
          _focus={{ outline: 'none', boxShadow: 'none' }}
        >
          <RouterLink to={`/${address}`}>
            <Box
              borderRadius="4px"
              bg="gray.900"
              width="fit-content"
              _focus={{ outline: 'none', boxShadow: 'none' }}
              px={4}
              py={3}
              _hover={{
                textDecoration: 'underline',
              }}
            >
              <Text color="gray.50" fontSize="14px" fontWeight={400}>
                {address}
              </Text>
            </Box>
          </RouterLink>
        </PopoverContent>
      </Popover>
    </Td>
  );
};

import { Td, useDisclosure, Flex, Popover, PopoverContent, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { WalletIcon } from '../../Icons';

interface WalletTooltipProps {
  address: string;
}

export const WalletTooltip = ({ address }: WalletTooltipProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <Td border="none" onMouseEnter={onOpen} onMouseLeave={onClose} position="relative">
      <Flex height="100%">
        <WalletIcon />
      </Flex>
      <Popover isOpen={isOpen}>
        <PopoverContent
          position="absolute"
          left={-300}
          top={-5}
          bg="none"
          _focus={{ outline: 'none', boxShadow: 'none' }}
        >
          <Button
            onClick={() => navigate(`/${address}`)}
            borderRadius="4px"
            bg="gray.900"
            variant="none"
            width="fit-content"
            _focus={{ outline: 'none', boxShadow: 'none' }}
            p={4}
            _hover={{
              textDecoration: 'underline',
            }}
            color="gray.50"
            fontSize="14px"
            fontWeight={400}
          >
            {address}
          </Button>
        </PopoverContent>
      </Popover>
    </Td>
  );
};

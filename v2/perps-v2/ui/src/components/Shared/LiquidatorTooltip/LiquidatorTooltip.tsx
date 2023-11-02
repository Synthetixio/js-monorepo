import { Td, useDisclosure, Flex, Popover, PopoverContent, Text, Box } from '@chakra-ui/react';
import { WreckedIcon } from '../../Icons';
import { Link as RouterLink } from 'react-router-dom';
import { optimisticEthercanLink } from '../../../utils';

interface LiquidatorTooltipProps {
  address: string;
}

export const LiquidatorTooltip = ({ address }: LiquidatorTooltipProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Td border="none" onMouseEnter={onOpen} onMouseLeave={onClose} position="relative">
      <Flex height="100%">
        <WreckedIcon width="20px" />
      </Flex>
      <Popover isOpen={isOpen}>
        <PopoverContent
          position="absolute"
          left={-375}
          top={-5}
          bg="none"
          _focus={{ outline: 'none', boxShadow: 'none' }}
        >
          <RouterLink to={optimisticEthercanLink(address)} target="_blank">
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

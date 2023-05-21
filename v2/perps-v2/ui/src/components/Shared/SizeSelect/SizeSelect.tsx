import { useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Flex, Menu, MenuButton, MenuList, Input, Text } from '@chakra-ui/react';

interface SizeState {
  min: string;
  max: string;
}

export const SizeSelect = () => {
  const [size, setSize] = useState<SizeState>({ min: '', max: '' });

  const update = (input: 'min' | 'max', value: number) => {
    const newSize = { ...size, [input]: value };
    setSize(newSize);
  };

  // useEffect(() => {

  //   re
  // },[size])

  return (
    <Menu>
      <MenuButton
        marginLeft={4}
        color="gray.500"
        fontSize="16px"
        lineHeight="24px"
        fontWeight={400}
        width="25%"
        _hover={{
          background: 'none',
        }}
        _active={{
          background: 'none',
        }}
        textAlign="start"
        bg="none"
        borderWidth="1px"
        borderColor="gray.900"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        Size
      </MenuButton>
      <MenuList>
        <Flex
          bg="navy.900"
          borderColor="gray.900"
          borderWidth="1px"
          borderRadius="md"
          p={4}
          flexDirection="column"
          alignItems="flex-start"
        >
          <Flex alignItems="center">
            <Input
              mr={2}
              _placeholder={{
                color: 'whiteAlpha.600',
                fontSize: '14px',
                lineHeight: '20px',
                fontFamily: 'heading',
              }}
              placeholder="$ Min"
              type="number"
              onChange={(e) => update('min', e.target.valueAsNumber)}
              value={size.min}
            />
            <Text fontFamily="heading" fontSize="16px" lineHeight="24px" color="gray.50">
              to
            </Text>
            <Input
              _placeholder={{
                color: 'whiteAlpha.600',
                fontSize: '14px',
                lineHeight: '20px',
                fontFamily: 'heading',
              }}
              ml={2}
              placeholder="$ Max"
              type="number"
              onChange={(e) => update('max', e.target.valueAsNumber)}
              value={size.max}
            />
          </Flex>
          <Button mt={2} variant="link" onClick={() => setSize({ min: '', max: '' })}>
            Clear
          </Button>
        </Flex>
      </MenuList>
    </Menu>
  );
};

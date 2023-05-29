import { useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Flex, Menu, MenuButton, MenuList, Input, Text } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface SizeState {
  min: string;
  max: string;
}

export const SizeSelect = () => {
  const [size, setSize] = useState<SizeState>({ min: '', max: '' });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const update = (input: 'min' | 'max', value: number) => {
    const newSize = { ...size, [input]: value || '' };
    setSize(newSize);
  };

  const onClose = (updateSize: SizeState) => {
    if (updateSize.min !== '' || updateSize.max !== '') {
      const params: string[][] = [];

      const markets = searchParams.get('markets') || '';

      if (updateSize.min !== '') {
        params.push(['min', updateSize.min]);
      }

      if (updateSize.max !== '') {
        params.push(['max', updateSize.max]);
      }

      if (markets !== '') {
        params.push(['markets', markets]);
      }

      const newParams = new URLSearchParams(params);

      navigate({
        pathname: '/actions',
        search: `?${newParams.toString()}`,
      });
    } else {
      const params: string[][] = [];
      const markets = searchParams.get('markets') || '';
      if (markets !== '') {
        params.push(['markets', markets]);
      }
      const newParams = new URLSearchParams(params);
      navigate({
        pathname: '/actions',
        search: `?${newParams.toString()}`,
      });
    }
  };

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
        {size.min === '' && size.max == '' && 'Size'}
        {size.min !== '' && `${size.min} - `}
        {size.max !== '' && `${size.max}`}
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
              placeholder="Min"
              type="number"
              onChange={(e) => update('min', e.target.valueAsNumber)}
              value={size.min}
              onBlur={() => onClose(size)}
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
              placeholder="Max"
              type="number"
              onChange={(e) => update('max', e.target.valueAsNumber)}
              value={size.max}
              onBlur={() => onClose(size)}
            />
          </Flex>
          <Button
            color="cyan.500"
            mt={2}
            variant="link"
            onClick={() => {
              setSize({ min: '', max: '' });
              onClose({ min: '', max: '' });
            }}
          >
            Clear
          </Button>
        </Flex>
      </MenuList>
    </Menu>
  );
};

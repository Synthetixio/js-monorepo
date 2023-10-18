import { useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuList, Flex } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DropdownCheckbox } from '../DropdownFilter/DropdownCheckbox';

interface DropdownOption {
  value: string;
  display: string;
}

const VERSION_OPTIONS: DropdownOption[] = [
  { value: '', display: 'Perps V2' },
  { value: 'v3', display: 'Core V3' },
];

export const DropdownVersion = () => {
  const location = useLocation();
  const initialOptionValue =
    location.pathname === '/v3' ? VERSION_OPTIONS[1].value : VERSION_OPTIONS[0].value;

  const [activeOptionValue, setActiveOptionValue] = useState<string>(initialOptionValue);

  const navigate = useNavigate();

  const onClick = (optionValue: string) => {
    navigate({
      pathname: `/${optionValue}`,
    });
    setActiveOptionValue(optionValue);
  };

  return (
    <Menu>
      <MenuButton
        padding="8px 12px"
        color="white"
        fontSize="16px"
        lineHeight="24px"
        fontWeight={700}
        width="fit-content"
        _hover={{ background: 'none' }}
        _active={{ background: 'none' }}
        textAlign="start"
        bg="none"
        borderWidth="1px"
        borderColor="gray.900"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        {VERSION_OPTIONS.find((option) => option.value === activeOptionValue)?.display}
      </MenuButton>
      <MenuList boxShadow="none">
        <Flex
          bg="navy.900"
          p={1}
          borderColor="gray.900"
          borderWidth="1px"
          borderRadius="md"
          flexDirection="column"
          width="128px"
        >
          {VERSION_OPTIONS.map((option) => (
            <DropdownCheckbox
              key={option.value}
              label={option.display}
              onChange={() => onClick(option.value)}
              isChecked={activeOptionValue === option.value}
            />
          ))}
        </Flex>
      </MenuList>
    </Menu>
  );
};

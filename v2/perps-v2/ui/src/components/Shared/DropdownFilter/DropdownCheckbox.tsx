import { Text, Flex, useCheckbox, UseCheckboxProps, chakra } from '@chakra-ui/react';
import { Tick } from '../../Icons';

interface CheckboxProps extends UseCheckboxProps {
  label: string;
  icon?: JSX.Element;
}

export const DropdownCheckbox = ({ label, icon, ...props }: CheckboxProps) => {
  const { 
    state, 
    getCheckboxProps, 
    getInputProps, 
    getLabelProps, 
    htmlProps,
  } = useCheckbox(props);

  return (
    <chakra.label
      display="flex"
      flexDirection="row"
      alignItems="center"
      gridColumnGap={2}
      px={3}
      py={1}
      my={1}
      cursor="pointer"
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Flex justifyContent="space-between" width="100%" alignItems="center">
        <Flex alignItems="center">
          {icon}
          <Text
            ml={icon ? 2 : 0}
            color="whiteAlpha.900"
            fontFamily="heading"
            fontSize="16px"
            lineHeight="24px"
            {...getLabelProps()}
          >
            {label}
          </Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center" w={4} h={4} {...getCheckboxProps()}>
          {state.isChecked ? (
            <Flex
              borderRadius="sm"
              w="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
              bg="cyan.500"
            >
              <Tick color="black" />
            </Flex>
          ) : (
            <Flex
              border="1px"
              borderColor="gray.900"
              w="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
              borderRadius="sm"
            />
          )}
        </Flex>
      </Flex>
    </chakra.label>
  );
};

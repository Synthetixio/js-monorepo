import { Box, Flex, ThemeTypings, Text, FlexProps } from '@chakra-ui/react';

interface KeyColourProps extends FlexProps {
  colour: ThemeTypings['colors'];
  label: string;
}

export const KeyColour = ({ colour, label, ...props }: KeyColourProps) => {
  return (
    <Flex alignItems="center" {...props}>
      <Box width="8px" height="8px" bg={colour} borderRadius="full" />
      <Text ml={2} fontSize="12px" lineHeight="16px" fontFamily="heading" color="gray.500">
        {label}
      </Text>
    </Flex>
  );
};

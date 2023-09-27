import { Flex, Text } from '@chakra-ui/react';
import { KeyColour } from '../KeyColour';

type OITooltipsProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

export const OITooltips = ({ payload }: OITooltipsProps) => {
  const openInterestInfo = payload?.[0]?.payload as any;

  if (!openInterestInfo) {
    return null;
  }

  return (
    <Flex
      flexDirection="column"
      bg="navy.900"
      padding={4}
      minWidth="190px"
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.900"
    >
      <Text mb={2} fontFamily="heading" color="gray.500" fontSize="12px" lineHeight="16px">
        {new Date(openInterestInfo.day).toISOString().slice(0, 10)}
      </Text>
      <Flex mt={2} justifyContent="space-between" w="100%">
        <KeyColour label="Long" colour="whiteAlpha.400" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          $
          {openInterestInfo.long.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </Flex>
      <Flex mt={2} justifyContent="space-between" w="100%">
        <KeyColour label="Short" colour="pink.300" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          $
          {openInterestInfo.short.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </Flex>
    </Flex>
  );
};

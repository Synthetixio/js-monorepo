import { Button, Text } from '@chakra-ui/react';

interface TimeBadgeProps {
  onPress: () => void;
  title: string;
  isActive: boolean;
}

export const TimeBadge = ({ onPress, title, isActive }: TimeBadgeProps) => {
  return (
    <Button
      variant="unstyled"
      onClick={onPress}
      bg={isActive ? 'whiteAlpha.400' : 'navy.700'}
      width="50px"
      height="30px"
      borderRadius="full"
    >
      <Text
        fontSize="12px"
        lineHeight="16px"
        color={isActive ? 'gray.50' : 'gray.500'}
        fontWeight={isActive ? 700 : 400}
      >
        {title}
      </Text>
    </Button>
  );
};

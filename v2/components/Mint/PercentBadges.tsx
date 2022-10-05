import { FC } from 'react';
import { Flex, Badge } from '@chakra-ui/react';
export const PercentBadges: FC<{ onBadgePress: (num: number) => void; activeBadge: number }> = ({
  onBadgePress,
  activeBadge,
}) => {
  return (
    <Flex w="100%" justifyContent="space-between" mt={1}>
      <Badge
        variant="mint"
        sx={{
          bg: activeBadge >= 0.25 ? 'cyan.500' : 'whiteAlpha.300',
          color: activeBadge >= 0.25 ? 'black' : 'cyan.500',
        }}
        mr={1}
        onClick={() => onBadgePress(0.25)}
      >
        25%
      </Badge>
      <Badge
        variant="mint"
        sx={{
          bg: activeBadge >= 0.5 ? 'cyan.500' : 'whiteAlpha.300',
          color: activeBadge >= 0.5 ? 'black' : 'cyan.500',
        }}
        mx={1}
        onClick={() => onBadgePress(0.5)}
      >
        50%
      </Badge>
      <Badge
        variant="mint"
        sx={{
          bg: activeBadge >= 0.75 ? 'cyan.500' : 'whiteAlpha.300',
          color: activeBadge >= 0.75 ? 'black' : 'cyan.500',
        }}
        mx={1}
        onClick={() => onBadgePress(0.75)}
      >
        75%
      </Badge>
      <Badge
        variant="mint"
        sx={{
          bg: activeBadge === 1 ? 'cyan.500' : 'whiteAlpha.300',
          color: activeBadge === 1 ? 'black' : 'cyan.500',
        }}
        ml={1}
        onClick={() => onBadgePress(1)}
      >
        100%
      </Badge>
    </Flex>
  );
};

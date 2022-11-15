import { FC } from 'react';
import { Box, Text, Flex, Button, Progress } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface RewardsItemProps {
  isLoading: boolean;
  Icon: FC;
  title: string;
  description: string;
  apyReturn: string;
  stakedBalance: string;
}

export const RewardsItem = ({
  isLoading,
  Icon,
  title,
  description,
  apyReturn,
  stakedBalance,
}: RewardsItemProps) => {
  console.log(isLoading, Icon);
  const { t } = useTranslation();
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderWidth="1px"
      borderColor="gray.400"
    >
      <Box
        w="44px"
        height="44px"
        bgGradient="linear(to-b, pink.500, cyan.500)"
        borderRadius="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Icon />
      </Box>
      <Flex direction="column">
        <Text
          fontFamily="heading"
          fontSize="sm"
          fontWeight="black"
          lineHeight="5"
          color="whiteAlpha.900"
        >
          {title}
        </Text>
        <Text fontFamily="heading" fontSize="xs" lineHeight="4" color="whiteAlpha.600">
          {description}
        </Text>
      </Flex>
      <Flex direction="column">
        <Text
          fontFamily="heading"
          fontSize="sm"
          fontWeight="black"
          lineHeight="5"
          color="whiteAlpha.900"
        >
          {apyReturn}
        </Text>
        <Text fontFamily="heading" fontSize="xs" lineHeight="4" color="whiteAlpha.600">
          {t('staking-v2.earn.apy')}
        </Text>
      </Flex>
      <Flex direction="column">
        <Text
          fontFamily="heading"
          fontSize="sm"
          fontWeight="black"
          lineHeight="5"
          color="whiteAlpha.900"
        >
          {stakedBalance}
        </Text>
        <Text fontFamily="heading" fontSize="xs" lineHeight="4" color="whiteAlpha.600">
          {t('staking-v2.earn.staked')}
        </Text>
      </Flex>
      <Flex>
        <Progress />
        <Text>{apyReturn}</Text>
        <Text>Est. APY</Text>
      </Flex>
      <Flex>
        <Text>{apyReturn}</Text>
        <Text>Est. APY</Text>
      </Flex>
      <Flex>
        <Button>Claim</Button>
      </Flex>
    </Flex>
  );
};

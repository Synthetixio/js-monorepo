import { FC } from 'react';
import { Box, Text, Flex, Button, Progress } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { CountDown } from '@snx-v2/CountDown';

interface RewardsItemProps {
  isLoading: boolean;
  Icon: FC;
  title: string;
  description: string;
  apyReturn: string;
  stakedBalance: string;
  endDate: Date;
}

export const RewardsItem = ({
  isLoading,
  Icon,
  title,
  description,
  apyReturn,
  stakedBalance,
  endDate,
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
          fontWeight="700"
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
          fontWeight="700"
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
          fontWeight="700"
          lineHeight="5"
          color="whiteAlpha.900"
        >
          {stakedBalance}
        </Text>
        <Text fontFamily="heading" fontSize="xs" lineHeight="4" color="whiteAlpha.600">
          {t('staking-v2.earn.staked')}
        </Text>
      </Flex>
      <Flex direction="column">
        <Progress w="208px" variant="white" height="5px" min={0} max={100} value={50} />
        <Flex justifyContent="space-between" alignItems="center" mt="3px">
          <Text fontFamily="heading" fontWeight="700" fontSize="xs" color="whiteAlpha.600">
            {t('staking-v2.earn.remaining')}
          </Text>
          <CountDown
            sx={{
              color: 'green.400',
              fontWeight: '700',
              fontFamily: 'heading',
              fontSize: 'xs',
              lineHeight: '4',
            }}
            toDate={endDate}
          />
        </Flex>
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

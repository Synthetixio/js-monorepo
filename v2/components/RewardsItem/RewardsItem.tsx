import { FC } from 'react';
import { Box, Text, Flex, Button, Progress, FlexProps } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { CountDown } from '@snx-v2/CountDown';

interface RewardsItemProps extends FlexProps {
  isLoading: boolean;
  Icon: FC;
  title: string;
  description: string;
  apyReturn: string | null;
  stakedBalance: string | null;
  endDate: Date | null;
  rewardBalance: string;
  RewardsBadge?: FC;
  onClick?: () => void;
}

export const RewardsItem = ({
  isLoading,
  Icon,
  title,
  description,
  apyReturn,
  stakedBalance,
  endDate,
  rewardBalance,
  RewardsBadge,
  onClick,
  ...props
}: RewardsItemProps) => {
  const { t } = useTranslation();
  console.log('isLoading', isLoading);

  return (
    <Flex alignItems="center" {...props} flexDirection={['column', 'column', 'column', 'row']}>
      <Flex width={['100%', '100%', '100%', 'initial']}>
        <Box
          minW="44px"
          minH="44px"
          bgGradient="linear(to-b, pink.500, cyan.500)"
          borderRadius="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mr={4}
        >
          <Icon />
        </Box>
      </Flex>
      {/* First Group */}
      <Flex width={['100%', '100%', '100%', 'initial']} mt={[4, 4, 4, 0]}>
        <Flex
          direction="column"
          minWidth={['182px', '182px', '182px', '120px']}
          mr={[0, 10, 10, 4]}
        >
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
        <Flex direction="column" minWidth="80px" ml={[6, 6, 6, 0]}>
          <Text
            fontFamily="heading"
            fontSize="sm"
            fontWeight="700"
            lineHeight="5"
            color="whiteAlpha.900"
          >
            {apyReturn || '—'}
          </Text>
          <Text fontFamily="heading" fontSize="xs" lineHeight="4" color="whiteAlpha.600">
            {apyReturn ? t('staking-v2.earn.apy') : '—'}
          </Text>
        </Flex>
      </Flex>
      {/* Second Group */}
      <Flex alignItems="center" width={['100%', '100%', '100%', 'initial']} mt={[4, 4, 4, 0]}>
        <Flex
          direction="column"
          minWidth={['182px', '182px', '182px', '120px']}
          mr={[0, 10, 10, 4]}
        >
          <Text
            fontFamily="heading"
            fontSize="sm"
            fontWeight="700"
            lineHeight="5"
            color="whiteAlpha.900"
          >
            {stakedBalance || '—'}
          </Text>
          <Text fontFamily="heading" fontSize="xs" lineHeight="4" color="whiteAlpha.600">
            {stakedBalance ? t('staking-v2.earn.staked') : '—'}
          </Text>
        </Flex>
        {endDate ? (
          <Flex direction="column" justifyContent="space-between" w="210px" mx={[6, 6, 6, 5]}>
            <Progress w="100%" variant="white" height="5px" min={0} max={100} value={50} />
            <Flex justifyContent="space-between" alignItems="center" mt={2.25}>
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
        ) : (
          <Flex direction="column" minW="210px" mx={[6, 6, 6, 5]}>
            <Text
              fontFamily="heading"
              fontSize="xs"
              fontWeight={700}
              lineHeight="4"
              color="whiteAlpha.600"
            >
              {t('staking-v2.earn.does-not-expire')}
            </Text>
          </Flex>
        )}
      </Flex>
      {/* Final Group */}
      <Flex
        alignItems="center"
        width={['100%', '100%', '100%', 'initial']}
        mt={[4, 4, 4, 0]}
        justifyContent="space-between"
        flexGrow={1}
      >
        <Flex
          direction="column"
          minW="182px"
          mx={[0, 0, 0, 5]}
          mr={[0, 10, 10, 0]}
          width={['150px', '150px', 'initial', 'initial']}
        >
          <Text
            fontFamily="heading"
            fontSize="sm"
            fontWeight="700"
            lineHeight="5"
            color="whiteAlpha.900"
          >
            {rewardBalance}
          </Text>
          {RewardsBadge && <RewardsBadge />}
        </Flex>
        <Button w={['100%', '100%', '100%', '80px']} ml={[6, 6, 6, 4]} onClick={onClick}>
          Claim
        </Button>
      </Flex>
    </Flex>
  );
};

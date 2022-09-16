import { Badge, Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import React, { PropsWithChildren, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { getHealthVariant } from '@snx-v2/getHealthVariant';
import { CollectIcon, InfoIcon, MaintainIcon, StakeIcon } from '@snx-v2/icons';
import { useDebtData } from '@snx-v2/useDebtData';

const CardHeader = ({
  step,
  headingText,
  bodyText,
  icon,
}: PropsWithChildren<{ step: number; headingText: string; bodyText: string; icon: ReactNode }>) => {
  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="4xl" fontFamily="mono">
          {step}
        </Text>
        {icon}
      </Flex>
      <Heading fontSize="sm">{headingText}</Heading>
      <Text color="whiteAlpha.700" fontSize="xs">
        {bodyText}
      </Text>
    </Box>
  );
};

const Container = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      width="full"
      maxWidth={['full', '70%', '72']}
      height={['auto', 'auto', '56']}
      alignItems="space-between"
      border="1px"
      borderColor="gray.800"
      padding="2"
      borderRadius="sm"
    >
      {children}
    </Flex>
  );
};

const StakeActionCard: React.FC<UiProps> = ({ currentCRatioPercentage }) => {
  const isStaking = currentCRatioPercentage > 0;

  const { t } = useTranslation();
  return (
    <Container>
      <CardHeader
        step={1}
        headingText={t('staking-v2.main-action-cards.stake-headline')}
        bodyText={t('staking-v2.main-action-cards.stake-body')}
        icon={<StakeIcon />}
      />
      {isStaking ? (
        <Button
          onClick={() => {
            console.log('navigate to stake and borrow more');
          }}
          mb="2"
          variant="link"
        >
          {t('staking-v2.main-action-cards.stake-link-button')}
        </Button>
      ) : (
        <Button
          onClick={() => {
            console.log('navigate to stake and borrow more');
          }}
          variant="solid"
        >
          {t('staking-v2.main-action-cards.stake-main-button')}
        </Button>
      )}
    </Container>
  );
};
const MaintainActionCard: React.FC<UiProps> = ({
  liquidationCratioPercentage,
  targetCratioPercentage,
  currentCRatioPercentage,
  isFlagged,
}) => {
  const { t } = useTranslation();
  const variant = getHealthVariant({
    liquidationCratioPercentage,
    targetCratioPercentage,
    currentCRatioPercentage,
  });
  const isStaking = currentCRatioPercentage > 0;

  return (
    <Container>
      <CardHeader
        step={2}
        headingText={t('staking-v2.main-action-cards.maintain-headline')}
        bodyText={t('staking-v2.main-action-cards.maintain-body')}
        icon={<MaintainIcon />}
      />
      {isStaking && (
        <Badge
          color={variant}
          bg="blackAlpha.600"
          border="1px"
          borderColor={variant}
          display="flex"
          alignItems="center"
          width="fit-content"
          margin="0 auto"
          fontSize="x-small"
          borderRadius="base"
          fontWeight="700"
        >
          <InfoIcon color={variant} width="10px" height="10px" />
          <Text ml="0.5">
            {variant !== 'success'
              ? 'Adjust to collect weekly rewards'
              : 'Your ratio is looking healthy!'}
          </Text>
        </Badge>
      )}
      {!isStaking || variant === 'success' ? (
        <Button
          mb="2"
          variant="link"
          onClick={() => {
            isStaking ? console.log('navigate to maintain page') : console.log('C-Ratio explained');
          }}
        >
          {isStaking
            ? t('staking-v2.main-action-cards.maintain-main-button')
            : t('staking-v2.main-action-cards.maintain-explanation-link')}
        </Button>
      ) : (
        <Button
          onClick={() => {
            console.log('navigate to maintain page');
          }}
          variant={variant}
        >
          {isFlagged
            ? t('staking-v2.main-action-cards.maintain-flag-button')
            : t('staking-v2.main-action-cards.maintain-main-button')}
        </Button>
      )}
    </Container>
  );
};
const CollectActionCard: React.FC<UiProps> = ({
  liquidationCratioPercentage,
  targetCratioPercentage,
  currentCRatioPercentage,

  epoch,
  hasClaimed,
}) => {
  const { t } = useTranslation();
  const variant = getHealthVariant({
    liquidationCratioPercentage,
    targetCratioPercentage,
    currentCRatioPercentage,
  });
  const isStaking = currentCRatioPercentage > 0;
  const canClaim = !hasClaimed && variant === 'success';
  return (
    <Container>
      <CardHeader
        step={3}
        headingText={t('staking-v2.main-action-cards.collect-headline')}
        bodyText={t('staking-v2.main-action-cards.collect-body')}
        icon={<CollectIcon />}
      />
      {isStaking && (
        <Flex justifyContent="space-between">
          <Flex flexDirection="column">
            <Flex alignItems="center">
              <Text
                textTransform="uppercase"
                color="whiteAlpha.700"
                fontSize="xs"
                mr="1"
                fontWeight="700"
              >
                {t('staking-v2.main-action-cards.collect-epoch')}
              </Text>
              <InfoIcon width="10px" height="10px" />
            </Flex>
            <Text color="success" fontSize="md" fontFamily="mono">
              {epoch}
            </Text>
          </Flex>
          {canClaim && (
            <Flex flexDirection="column">
              <Text color="whiteAlpha.700" fontSize="xs" mr="1" fontWeight="700">
                {t('staking-v2.main-action-cards.collect-price')}
              </Text>

              <Text color="success" fontSize="md" fontFamily="mono">
                $6.00
              </Text>
            </Flex>
          )}
        </Flex>
      )}
      {isStaking ? (
        <Button
          onClick={() => {
            console.log('navigate to claim page');
          }}
          variant={canClaim ? variant : 'disabled'}
          disabled={!canClaim}
        >
          {t('staking-v2.main-action-cards.collect-main-button')}
        </Button>
      ) : (
        <Button
          onClick={() => {
            console.log('navigate to Rewards explained');
          }}
          mb="2"
          variant="link"
        >
          {t('staking-v2.main-action-cards.collect-explanation-link')}
        </Button>
      )}
    </Container>
  );
};

type UiProps = {
  liquidationCratioPercentage: number;
  targetCratioPercentage: number;
  currentCRatioPercentage: number;
  isFlagged: boolean;
  epoch: string;
  hasClaimed: boolean;
};
export const MainActionCardsUi: React.FC<UiProps> = (props) => {
  return (
    <Stack direction={['column', 'column', 'row']} align="center" spacing="14px">
      <StakeActionCard {...props}></StakeActionCard>
      <MaintainActionCard {...props}></MaintainActionCard>
      <CollectActionCard {...props}></CollectActionCard>
    </Stack>
  );
};

export const MainActionCards: React.FC = () => {
  const { data: debtData } = useDebtData();
  if (!debtData) return <p>Skeleton</p>;

  return (
    <MainActionCardsUi
      currentCRatioPercentage={debtData.currentCRatioPercentage.mul(100).toNumber()}
      targetCratioPercentage={debtData.targetCRatioPercentage.mul(100).toNumber()}
      liquidationCratioPercentage={debtData.liquidationRatioPercentage.mul(100).toNumber()}
      isFlagged={debtData.liquidationDeadlineForAccount.gt(0)}
      hasClaimed={false} // TODO
      epoch="TODO"
    />
  );
};

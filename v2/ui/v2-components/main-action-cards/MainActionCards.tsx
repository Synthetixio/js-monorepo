import { Badge, Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import React, { PropsWithChildren, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { getHealthVariant } from '../../v2-modules/getHealthVariant';
import { InfoIcon } from '../icons';
import { CollectIcon } from '../icons/CollectIcon';
import { MaintainIcon } from '../icons/MaintainIcon';
import { StakeIcon } from '../icons/StakeIcon';

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
      width={['full', '70%', '72']}
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

const StakeActionCard: React.FC<Props> = ({ isStaking }) => {
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
const MaintainActionCard: React.FC<Props & { isFlagged: boolean }> = ({
  liquidationCratioPercentage,
  targetCratioPercentage,
  currentCRatioPercentage,
  isStaking,
  isFlagged,
}) => {
  const { t } = useTranslation();
  const variant = getHealthVariant({
    liquidationCratioPercentage,
    targetCratioPercentage,
    currentCRatioPercentage,
  });

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
const CollectActionCard: React.FC<Props> = ({
  liquidationCratioPercentage,
  targetCratioPercentage,
  currentCRatioPercentage,
  isStaking,
  epoch,
  hasClaimed,
}) => {
  const { t } = useTranslation();
  const variant = getHealthVariant({
    liquidationCratioPercentage,
    targetCratioPercentage,
    currentCRatioPercentage,
  });
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

type Props = {
  liquidationCratioPercentage: number;
  targetCratioPercentage: number;
  currentCRatioPercentage: number;
  isStaking: boolean;
  isFlagged: boolean;
  epoch: string;
  hasClaimed: boolean;
};
export const MainActionCards: React.FC<Props> = (props) => {
  return (
    <Stack direction={['column', 'column', 'row']} align="center" spacing="14px">
      <StakeActionCard {...props}></StakeActionCard>
      <MaintainActionCard {...props}></MaintainActionCard>
      <CollectActionCard {...props}></CollectActionCard>
    </Stack>
  );
};

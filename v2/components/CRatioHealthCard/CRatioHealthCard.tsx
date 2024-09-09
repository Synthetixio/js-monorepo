import React, { ReactElement, useState } from 'react';
import { Box, Flex, Link, Heading, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { getHealthVariant } from '@snx-v2/getHealthVariant';
import { useDebtData } from '@snx-v2/useDebtData';
import { CRatioHealthPercentage } from '@snx-v2/CRatioHealthPercentage';
import { useTranslation } from 'react-i18next';
import { CRatioProgressBar } from '@snx-v2/CRatioProgressBar';
import { NetworkIdByName, NetworkId } from '@synthetixio/contracts-interface';
import Connector from 'containers/Connector';

type UiProps = {
  liquidationCratioPercentage?: number;
  targetCratioPercentage?: number;
  currentCRatioPercentage?: number;
  targetThreshold?: number;
  isLoading: boolean;
  networkId: number;
  CRatioProgressBar: ReactElement;
};

export const CRatioHealthCardUi: React.FC<UiProps> = ({
  targetCratioPercentage,
  liquidationCratioPercentage,
  currentCRatioPercentage,
  targetThreshold,
  isLoading,
  networkId,
  CRatioProgressBar,
}) => {
  const { t } = useTranslation();

  const variant = getHealthVariant({
    targetCratioPercentage,
    liquidationCratioPercentage,
    currentCRatioPercentage,
    targetThreshold,
    isFlagged: undefined,
  });

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" marginBottom="2">
        <Box>
          <Heading size="md" mb={1} fontWeight="bold" color="whiteAlpha.900" lineHeight="6">
            {t('staking-v2.cratio-health-card.heading')}
          </Heading>
          <Text fontSize="sm" color="whiteAlpha.600">
            {t('staking-v2.cratio-health-card.sub-heading')}
          </Text>
        </Box>

        <CRatioHealthPercentage
          variant={variant}
          currentCRatioPercentage={currentCRatioPercentage}
          isLoading={isLoading}
        />
      </Flex>

      {CRatioProgressBar}
      {networkId === 1 && (
        <Alert status="info" fontWeight="500" fontSize="14px" mb="20px">
          <AlertIcon />
          <Text>
            Target C-ratio looking crazy? Don’t worry, this is a temporary measure. Read more about{' '}
            <Link
              href="https://blog.synthetix.io/synthetix-v3-migration/"
              target="_blank"
              color="cyan.500"
            >
              why the target c-ratio was temporarily increased for the migration
            </Link>{' '}
            and make sure that your c-ratio doesn’t fall under the liquidation ratio.
          </Text>
        </Alert>
      )}
    </Box>
  );
};

export const CRatioHealthCard: React.FC = () => {
  const { data: debtData, isLoading } = useDebtData();

  const { network } = Connector.useContainer();

  const [localNetwork] = useState<NetworkId>(
    network?.id ? (network.id as NetworkId) : (NetworkIdByName.mainnet as NetworkId)
  );

  return (
    <CRatioHealthCardUi
      CRatioProgressBar={<CRatioProgressBar />}
      currentCRatioPercentage={debtData?.currentCRatioPercentage.toNumber()}
      targetCratioPercentage={debtData?.targetCRatioPercentage.toNumber()}
      liquidationCratioPercentage={debtData?.liquidationRatioPercentage.toNumber()}
      targetThreshold={debtData?.targetThreshold.toNumber()}
      networkId={localNetwork}
      isLoading={isLoading}
    />
  );
};

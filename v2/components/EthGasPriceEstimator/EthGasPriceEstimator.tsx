import { Dispatch, FC, SetStateAction, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Wei from '@synthetixio/wei';
import {
  Flex,
  Text,
  Box,
  Skeleton,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Tooltip,
  FlexProps,
} from '@chakra-ui/react';
import { formatNumberToUsd } from '@synthetixio/formatters';

import { GasSpeedContext, GasSpeed } from '@snx-v2/GasSpeedContext';
import { ChevronDown, InfoIcon } from '@snx-v2/icons';

interface EthGasPriceEstimatorUiProps extends FlexProps {
  transactionFee?: Wei | null;
  setGasSpeed: Dispatch<SetStateAction<GasSpeed>>;
  gasSpeed: GasSpeed;
}

export const EthGasPriceEstimatorUi: FC<EthGasPriceEstimatorUiProps> = ({
  transactionFee,
  setGasSpeed,
  gasSpeed,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <Flex width="full" justifyContent="space-between" alignItems="center" {...props}>
      <Flex>
        <Text mr={1}>{t('staking-v2.eth-gas-price-estimator.gas-price-label')}</Text>
        <Tooltip label={t('staking-v2.eth-gas-price-estimator.gas-price-tooltip')} hasArrow>
          <Flex alignItems="center">
            <InfoIcon />
          </Flex>
        </Tooltip>
      </Flex>
      <Box>
        <Menu closeOnSelect={true}>
          {() => (
            <>
              <MenuButton data-testid="transaction price">
                {transactionFee ? (
                  formatNumberToUsd(transactionFee.toString(), { maximumFractionDigits: 4 })
                ) : (
                  <Skeleton width={8} height={3} />
                )}
                <ChevronDown />
              </MenuButton>
              <MenuList>
                <MenuItem
                  color={gasSpeed === 'average' ? 'cyan' : 'white'}
                  onClick={() => setGasSpeed('average')}
                >
                  {t('staking-v2.eth-gas-price-estimator.gas-speed.average')}
                </MenuItem>
                <MenuItem
                  color={gasSpeed === 'fast' ? 'cyan' : 'white'}
                  onClick={() => setGasSpeed('fast')}
                >
                  {t('staking-v2.eth-gas-price-estimator.gas-speed.fast')}
                </MenuItem>
                <MenuItem
                  color={gasSpeed === 'fastest' ? 'cyan' : 'white'}
                  onClick={() => setGasSpeed('fastest')}
                >
                  {t('staking-v2.eth-gas-price-estimator.gas-speed.fastest')}
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Box>
    </Flex>
  );
};

interface EthGasPriceEstimatorProps extends FlexProps {
  transactionFee?: Wei | null;
}

export const EthGasPriceEstimator: FC<EthGasPriceEstimatorProps> = ({
  transactionFee,
  ...props
}) => {
  const { setGasSpeed, gasSpeed } = useContext(GasSpeedContext);

  return (
    <EthGasPriceEstimatorUi
      {...props}
      transactionFee={transactionFee}
      gasSpeed={gasSpeed}
      setGasSpeed={setGasSpeed}
    />
  );
};

import { Dispatch, SetStateAction, useContext } from 'react';
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
} from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v2/formatters';

import { GasSpeedContext, GasSpeed } from '@snx-v2/GasSpeedContext';
import { ChevronDown, InfoIcon } from '@snx-v2/icons';

export const EthGasPriceEstimatorUi: React.FC<{
  gasSpeed: GasSpeed;
  transactionFee?: Wei | null;
  setGasSpeed: Dispatch<SetStateAction<GasSpeed>>;
}> = ({ transactionFee, setGasSpeed, gasSpeed }) => {
  const { t } = useTranslation();

  return (
    <Flex width="full" justifyContent="space-between" alignItems="center">
      <Flex>
        <Text mr={1}>{t('staking-v2.eth-gas-price-estimator.gas-price-label')}</Text>
        <Tooltip label={t('staking-v2.eth-gas-price-estimator.gas-price-tooltip')} hasArrow>
          <Flex alignItems="center">
            <InfoIcon width="16px" height="16px" />
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

export const EthGasPriceEstimator: React.FC<{
  transactionFee?: Wei | null;
}> = ({ transactionFee }) => {
  const { setGasSpeed, gasSpeed } = useContext(GasSpeedContext);

  return (
    <EthGasPriceEstimatorUi
      transactionFee={transactionFee}
      gasSpeed={gasSpeed}
      setGasSpeed={setGasSpeed}
    />
  );
};

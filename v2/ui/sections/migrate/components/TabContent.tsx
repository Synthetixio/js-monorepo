import { Image } from '@chakra-ui/react';
import { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { formatCurrency } from 'utils/formatters/number';
import { CurrencyKey } from 'constants/currency';
import { GasLimitEstimate } from 'constants/network';
import { InputContainer, InputBox } from './common';
import { getPngSynthIconUrl } from '@snx-v2/SynthIcons';
import ROUTES from 'constants/routes';

import GasSelector from 'components/GasSelector';
import TxConfirmationModal from 'sections/shared/modals/TxConfirmationModal';
import { ActionCompleted, ActionInProgress } from './TxSent';

import SNXLogo from 'assets/svg/currencies/crypto/SNX.svg';
import { StyledCTA } from './common';
import {
  ModalContent,
  ModalItem,
  ModalItemTitle,
  ModalItemText,
  ErrorMessage,
} from '@snx-v1/styles';
import Wei from '@synthetixio/wei';
import { GasPrice } from '@synthetixio/queries';

type TabContentProps = {
  amountToMigrate: Wei;
  migrateCurrencyKey: CurrencyKey;
  onSubmit: any;
  transactionError: string | null;
  gasEstimateError: string | null;
  txModalOpen: boolean;
  setTxModalOpen: Function;
  gasLimitEstimate: GasLimitEstimate;
  setGasPrice: (gasPrice: GasPrice) => void;
  txHash: string | null;
  transactionState: 'unsent' | string;
  isVestNeeded: boolean;
  resetTransaction: () => void;
  optimismLayerOneFee: Wei | null;
  type: 'escrow' | 'debt';
};

const TabContent: FC<TabContentProps> = ({
  amountToMigrate,
  migrateCurrencyKey,
  onSubmit,
  transactionError,
  txModalOpen,
  setTxModalOpen,
  gasLimitEstimate,
  gasEstimateError,
  setGasPrice,
  txHash,
  transactionState,
  resetTransaction,
  isVestNeeded,
  optimismLayerOneFee,
  type,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const renderButton = () => {
    if (isVestNeeded) {
      return (
        <StyledCTA
          onClick={() => navigate(ROUTES.Escrow.Home)}
          blue={true}
          variant="primary"
          size="lg"
          disabled={false}
        >
          {t(`migrate-${type}.actions.migrate.action.go-to-escrow-page`)}
        </StyledCTA>
      );
    } else if (amountToMigrate && amountToMigrate.gt(0)) {
      return (
        <StyledCTA
          blue={true}
          onClick={onSubmit}
          variant="primary"
          size="lg"
          disabled={transactionState !== 'unsent' || !!gasEstimateError}
        >
          {t(`migrate-${type}.actions.migrate.action.migrate-button`, {
            amountToMigrate: formatCurrency(migrateCurrencyKey, amountToMigrate, {
              currencyKey: migrateCurrencyKey,
              minDecimals: 2,
            }),
          })}
        </StyledCTA>
      );
    } else {
      return (
        <StyledCTA blue={true} variant="primary" size="lg" disabled={true}>
          {t(`migrate-${type}.actions.migrate.action.disabled`)}
        </StyledCTA>
      );
    }
  };

  if (transactionState === 'pending') {
    return (
      <ActionInProgress
        action="migrate"
        type={type}
        amount={amountToMigrate.toString()}
        currencyKey={migrateCurrencyKey}
        hash={txHash as string}
      />
    );
  }

  if (transactionState === 'confirmed') {
    return (
      <ActionCompleted
        action="migrate"
        type={type}
        currencyKey={migrateCurrencyKey}
        hash={txHash as string}
        amount={amountToMigrate.toString()}
        resetTransaction={resetTransaction}
      />
    );
  }

  return (
    <>
      <SubHeadline>{t(`migrate-${type}.actions.migrate.subtitle`)}</SubHeadline>
      <InputContainer>
        <InputBox>
          {migrateCurrencyKey === 'SNX' ? (
            <SNXLogo width="64" />
          ) : (
            <Image src={getPngSynthIconUrl('sUSD')} width="52px" height="52px" alt="USD icon" />
          )}
          <Data>
            {formatCurrency(migrateCurrencyKey, amountToMigrate, {
              currencyKey: migrateCurrencyKey,
              minDecimals: 2,
              maxDecimals: 2,
            })}
          </Data>
        </InputBox>
        <SettingsContainer>
          <GasSelector
            gasLimitEstimate={gasLimitEstimate}
            onGasPriceChange={setGasPrice}
            optimismLayerOneFee={optimismLayerOneFee}
          />
        </SettingsContainer>
      </InputContainer>
      {renderButton()}
      {isVestNeeded ? (
        <SpacedErrorMessage>
          {t(`migrate-${type}.actions.migrate.action.vest-needed`)}
        </SpacedErrorMessage>
      ) : (
        <SpacedErrorMessage>{transactionError || gasEstimateError}</SpacedErrorMessage>
      )}

      {txModalOpen && (
        <TxConfirmationModal
          onDismiss={() => setTxModalOpen(false)}
          txError={transactionError}
          attemptRetry={onSubmit}
          content={
            <ModalContent>
              <ModalItem>
                <ModalItemTitle>{t('modals.confirm-transaction.migration.title')}</ModalItemTitle>
                <ModalItemText>
                  {formatCurrency(migrateCurrencyKey, amountToMigrate, {
                    currencyKey: migrateCurrencyKey,
                    minDecimals: 4,
                    maxDecimals: 4,
                  })}
                </ModalItemText>
              </ModalItem>
            </ModalContent>
          }
        />
      )}
    </>
  );
};

const SubHeadline = styled.h4`
  margin-top: 0;
`;
const Data = styled.p`
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.extended};
  font-size: 24px;
`;

const SpacedErrorMessage = styled(ErrorMessage)`
  margin-top: 16px;
`;

const SettingsContainer = styled.div`
  width: 100%;
  border-bottom: ${(props) => `1px solid ${props.theme.colors.grayBlue}`};
  margin-bottom: 16px;
`;

export default TabContent;

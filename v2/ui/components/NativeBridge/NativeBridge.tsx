import { NetworkIdByName, useProxyERC20sUSD } from '@snx-v2/useSynthetixContracts';
import Connector from 'containers/Connector';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Center,
  Flex,
  Input,
  InputProps,
  Link,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { ArrowLeft, FailedIcon, SUSDIcon } from '@snx-v2/icons';
import { Trans, useTranslation } from 'react-i18next';
import { formatNumber, numberWithCommas, parseFloatWithCommas } from '@synthetixio/formatters';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';
import { wei } from '@synthetixio/wei';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import { useBridgeMutation } from '@snx-v2/useBridgeMutation';
import { BridgeTransactionModal } from './BridgeTransactionModal';
import { parseTxnError } from '@snx-v2/parseTxnError';
import { EthGasPriceEstimator } from '@snx-v2/EthGasPriceEstimator';
import SelectNetwork from './SelectNetwork';
import useGetNeedsApproval from '../../hooks/useGetNeedsApproval';
import { useSynthetixBridge } from '@snx-v2/useSynthetixContracts/useSynthetixBridge';
import ApproveAction from './ApproveAction';
import useBridgingHistoryStore from '../../hooks/useBridgingHistoryStore';
import BridgingHistories from './BridgingHistories';

const isTestnet = (networkId: null | number) => {
  if (networkId === NetworkIdByName['mainnet-ovm'] || networkId === NetworkIdByName['mainnet']) {
    return false;
  }
  return true;
};
function NativeBridge({ onBack }: { onBack: () => void }) {
  const {
    network,
    connectWallet,
    walletConnectedToUnsupportedNetwork,
    isWalletConnected,
    walletAddress,
    switchNetwork,
  } = Connector.useContainer();

  const {
    data: synthsData,
    isLoading: isSynthsLoading,
    refetch: refetchBalances,
  } = useSynthsBalances();

  const { bridgingHistory, saveBridgingHistory } = useBridgingHistoryStore({
    networkId: network?.id,
    walletAddress,
  });
  const { data: SynthetixBridge } = useSynthetixBridge();
  const { data: sUSD } = useProxyERC20sUSD();
  const { data: needsApproval, refetch: refetchApproval } = useGetNeedsApproval(
    SynthetixBridge?.address ?? '',
    sUSD,
    walletAddress
  );

  const isMainnet = !isTestnet(network?.id);
  const isL2 =
    network?.id === NetworkIdByName['mainnet-ovm'] || network?.id === NetworkIdByName['goerli-ovm'];

  const susdBalance = (synthsData?.balancesMap['sUSD']?.balance || wei(0)).toNumber();
  const [bridgeAmountsUSD, setBridgeAmountsUSD] = useState('');
  const notEnoughBalance = susdBalance < parseFloatWithCommas(bridgeAmountsUSD);

  const {
    mutate,
    transactionFee,
    modalOpen,
    txnStatus,
    error,
    gasError,
    settle,
    isGasEnabledAndNotFetched,
    txnHash,
  } = useBridgeMutation({
    amount: wei(bridgeAmountsUSD || 0).toBN(),
    destination: walletAddress ?? '',
    currencyKey: 'sUSD',
  });

  useEffect(() => {
    if (!!walletAddress && !!bridgeAmountsUSD && !!network?.id && !!txnHash) {
      saveBridgingHistory({
        walletAddress,
        networkId: network.id,
        amount: parseFloatWithCommas(bridgeAmountsUSD),
        date: new Date().toISOString(),
        status: txnStatus,
        txHash: txnHash,
      });
    }
  }, [bridgeAmountsUSD, network?.id, saveBridgingHistory, txnHash, txnStatus, walletAddress]);

  const handleSubmit = () => {
    mutate(undefined, {
      onSuccess: () => {
        refetchBalances();
      },
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(',', '');
    if (/^[0-9]*(\.[0-9]{0,2})?$/.test(value)) {
      onMintAmountSUSDChange(value);
    }
  };

  const onMintAmountSUSDChange = (mintAmount: string) => {
    if (mintAmount === '') {
      setBridgeAmountsUSD('');
      return;
    }
    const parsedMintAmount = parseFloatWithCommas(mintAmount);
    if (isNaN(parsedMintAmount)) return undefined;
    setBridgeAmountsUSD(mintAmount);
  };

  const { t } = useTranslation();
  return (
    <Flex gap="24px" flexDir={{ base: 'column', md: 'row' }}>
      <Flex
        flex={1}
        flexDir="column"
        py="14px"
        px={{ base: '20px', sm: '12px' }}
        borderRadius="base"
        borderWidth="1px"
        borderColor="gray.900"
        bg="navy.700"
      >
        <Flex alignItems="center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft color="white" width="16px" height="16px" />}
            color="white"
            p={0}
            onClick={() => onBack()}
          ></Button>
          <Text fontSize="16px" lineHeight="20px" fontWeight={700}>
            <Trans i18nKey="bridge.native-bridge-title" />
          </Text>
        </Flex>
        <SelectNetwork
          isMainnet={isMainnet}
          isL2={isL2}
          isWalletConnected={isWalletConnected}
          networkId={network?.id}
          switchNetwork={switchNetwork}
        />
        <Box borderWidth="1px" borderColor="gray.900" borderRadius="base" p={2} mt={5}>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              <SUSDIcon width="34px" height="34px" />
              <Text ml={2} fontFamily="heading" fontSize="lg" fontWeight="black">
                sUSD
              </Text>
            </Flex>
            <Flex flexDir="column" alignItems="flex-end">
              <StyledInput
                data-testid="mint susd amount input"
                placeholder={t('staking-v2.mint.enter-amount')}
                onChange={(e) => onChange(e)}
                value={numberWithCommas(bridgeAmountsUSD)}
                onKeyDown={(e) => {
                  const oldVal = parseFloatWithCommas(bridgeAmountsUSD);
                  if (e.key === 'ArrowUp') {
                    onMintAmountSUSDChange(numberWithCommas(String(oldVal + 1)));
                  }
                  if (e.key === 'ArrowDown') {
                    onMintAmountSUSDChange(numberWithCommas(String(Math.max(0, oldVal - 1))));
                  }
                }}
              />
              <Skeleton isLoaded={!isSynthsLoading} startColor="gray.900" endColor="gray.700">
                <Text color="whiteAlpha.700" fontSize="xs" fontFamily="heading">
                  {t('staking-v2.mint.susd-balance', { susdBalance: formatNumber(susdBalance) })}
                </Text>
              </Skeleton>
            </Flex>
          </Flex>
        </Box>
        {isL2 && (
          <Alert mt={5} status="info" variant="left-accent" py={2} px={3}>
            <AlertIcon width="20px" height="20px" />
            <AlertDescription pl={2} pr={0} fontSize="sm" fontFamily="heading">
              <Trans
                i18nKey="bridge.bridge-warning"
                components={[
                  <Link
                    color="cyan.400"
                    target="_blank"
                    href={EXTERNAL_LINKS.Synthetix.NativeBridge}
                  />,
                ]}
              />
            </AlertDescription>
          </Alert>
        )}

        {needsApproval &&
          (gasError || notEnoughBalance ? (
            <Center mt={3}>
              <FailedIcon width="40px" height="40px" />
              <Text>
                {notEnoughBalance
                  ? t('staking-v2.burn.balance-error')
                  : `${t('staking-v2.mint.gas-estimation-error')}: ${parseTxnError(gasError)}`}
              </Text>
            </Center>
          ) : (
            <Flex alignItems="center" justifyContent="space-between">
              <EthGasPriceEstimator
                mt={3}
                transactionFee={bridgeAmountsUSD === '' ? wei(0) : transactionFee}
              />
            </Flex>
          ))}

        {Boolean(walletConnectedToUnsupportedNetwork || isWalletConnected) ? (
          needsApproval ? (
            <Button
              variant="solid"
              data-testid="bridge submit"
              fontFamily="heading"
              fontWeight="black"
              mt={5}
              w="100%"
              onClick={handleSubmit}
              isDisabled={
                bridgeAmountsUSD === '' ||
                bridgeAmountsUSD === '0.00' ||
                Boolean(gasError) ||
                isGasEnabledAndNotFetched ||
                notEnoughBalance
              }
            >
              Bridge
            </Button>
          ) : (
            <ApproveAction
              bridgeAmountsUSD={bridgeAmountsUSD}
              bridgeContractAddress={SynthetixBridge?.address ?? ''}
              onSuccess={refetchApproval}
            />
          )
        ) : (
          <Button
            variant="solid"
            data-testid="connect submit"
            fontFamily="heading"
            fontWeight="black"
            mt={5}
            w="100%"
            onClick={() => connectWallet()}
          >
            {t('bridge.connect-wallet-text')}
          </Button>
        )}
        {modalOpen && (
          <BridgeTransactionModal
            title={t('bridge.txn-modal.bridging')}
            txnHash={txnHash}
            settle={settle}
            error={error}
            gasError={gasError}
            onClose={() => {
              setBridgeAmountsUSD('');
              settle();
            }}
            onSubmit={handleSubmit}
            txnStatus={txnStatus}
            modalOpen={modalOpen}
            bridgeAmountSusd={bridgeAmountsUSD}
          />
        )}
      </Flex>
      <BridgingHistories bridgingHistory={bridgingHistory} />
    </Flex>
  );
}

export default NativeBridge;

const StyledInput: FC<InputProps> = (props) => {
  return (
    <Input
      {...props}
      borderWidth="0px"
      type="text"
      inputMode="decimal"
      maxLength={14}
      textAlign="end"
      p={0}
      outline="none"
      fontFamily="heading"
      fontSize="xl"
      fontWeight="black"
      lineHeight="2xl"
      color="white"
      height="unset"
      _focus={{ boxShadow: 'none !important' }}
      _placeholder={{ color: 'whiteAlpha.700' }}
    />
  );
};

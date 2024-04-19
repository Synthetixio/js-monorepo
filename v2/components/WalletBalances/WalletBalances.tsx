import { ReactElement, useContext } from 'react';
import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  Text,
  Heading,
  Button,
  Alert,
  AlertDescription,
  AlertIcon,
  Link,
} from '@chakra-ui/react';
import { getPngSynthIconUrl } from '@snx-v2/SynthIcons';
import { useGetSynthsByName } from '@snx-v2/synthsByName';
import { useEthBalance } from '@snx-v2/useEthBalance';
import { useDebtData } from '@snx-v2/useDebtData';
import { useGetDSnxBalance } from '@snx-v2/useDSnxBalance';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { SynthBalance, useSynthsBalances } from '@snx-v2/useSynthsBalances';
import Wei from '@synthetixio/wei';
import { formatNumberToUsd } from '@synthetixio/formatters';
import { StatBox } from '@snx-v2/StatBox';
import { useTranslation } from 'react-i18next';
import { ContractContext } from '@snx-v2/ContractContext';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import {
  SNXIcon,
  DSNXIcon,
  EthereumIcon,
  TransactionCompleted,
  TransactionPending,
  FailedIcon,
} from '@snx-v2/icons';
import { AssetTd, BalanceTd, HoldingTd, PriceTd } from './TableComponents';
import { StyledTd, StyledTh, TbodyLoading } from '@snx-v2/TableComponents';
import { useSynthRedeemerMutation, useSynthRedeemerActive } from '@snx-v2/useSynthsRedeemer';
import { TransactionModal } from '@snx-v2/TransactionModal';
import { useGetTxnLink } from '@snx-v2/txnLink';
import { ExternalLink } from '@snx-v2/ExternalLink';

const WalletBalancesUi: React.FC<{
  totalSynthUSDBalance?: number;
  dSNXUSDBalance?: number;
  debtBalance?: number;
  synthData?: {
    currencyKey: string;
    description?: string;
    iconUrl: string;
    price?: number;
    balance: number;
    usdBalance: number;
    holdingPct?: number;
  }[];
  nonSynthData: {
    currencyKey: string;
    description: string;
    icon: ReactElement;
    price?: number;
    balance?: number;
    usdBalance?: number;
  }[];
  isLoading: boolean;
  isRedeemerActive?: boolean;
}> = ({
  totalSynthUSDBalance,
  dSNXUSDBalance,
  debtBalance,
  synthData,
  nonSynthData,
  isLoading,
  isRedeemerActive,
}) => {
  const { t } = useTranslation();
  const { networkId } = useContext(ContractContext);

  const redeemableSynths = synthData
    ?.filter((x) => x.currencyKey !== 'sUSD')
    .map((x) => x.currencyKey);

  const {
    mutate,
    modalOpen,
    txnHash,
    error,
    isLoading: isMutationLoading,
    settle,
  } = useSynthRedeemerMutation(redeemableSynths);

  const txnLink = useGetTxnLink(txnHash);

  const isL1 = networkId === NetworkIdByName.mainnet;

  return (
    <>
      <TransactionModal
        isOpen={modalOpen}
        title={
          error
            ? 'Error Redeeming Synths'
            : isMutationLoading
            ? 'Redeeming Synths'
            : 'Synths Redeemed'
        }
        onClose={settle}
        icon={
          error ? (
            <FailedIcon />
          ) : isMutationLoading ? (
            <TransactionPending />
          ) : (
            <TransactionCompleted />
          )
        }
      >
        {txnLink && (
          <Flex justifyContent="center">
            <ExternalLink href={txnLink} fontSize="sm">
              View Transaction
            </ExternalLink>
          </Flex>
        )}
      </TransactionModal>
      <Box>
        <Flex>
          <StatBox
            label={t('staking-v2.wallet-balances.active-debt')}
            amount={debtBalance === undefined ? undefined : formatNumberToUsd(debtBalance)}
            alignItems="start"
          />
          <StatBox
            label={t('staking-v2.wallet-balances.d-snx-value')}
            amount={dSNXUSDBalance === undefined ? undefined : formatNumberToUsd(dSNXUSDBalance)}
            mx={2}
            alignItems="center"
          />
          <StatBox
            label={t('staking-v2.wallet-balances.total-synth-value')}
            amount={
              totalSynthUSDBalance === undefined
                ? undefined
                : formatNumberToUsd(totalSynthUSDBalance)
            }
            alignItems="end"
          />
        </Flex>
        {isL1 && !isLoading && (
          <Alert my={4} status="info" variant="left-accent" py={2} px={3}>
            <AlertIcon width="20px" height="20px" />
            <AlertDescription pl={2} pr={0} fontSize="sm" fontFamily="heading">
              <Text color="white" fontSize="16px" fontFamily="heading">
                Effective Apr 15th, SIP-2059 deprecates exchange of non sUSD synths. Users may only
                redeem spot synths for sUSD.{' '}
                <Link
                  href="https://blog.synthetix.io/legacy-spot-synth-exchange-deprecation-migration/"
                  isExternal
                  target="_blank"
                  color="cyan.500"
                  textDecoration="underline"
                >
                  Read our blog for more details.
                </Link>
                {!isRedeemerActive && ' Redemptions are not currently active.'}
              </Text>
            </AlertDescription>
          </Alert>
        )}
        <Box borderWidth="1px" borderColor="gray.900" borderRadius="base" mt={4} py={4} px={2}>
          <Heading size="md" mb={4}>
            Synths
          </Heading>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <StyledTh width="40%">
                    {t('staking-v2.wallet-balances.table-columns.asset')}
                  </StyledTh>
                  <StyledTh>{t('staking-v2.wallet-balances.table-columns.balance')}</StyledTh>
                  <StyledTh>{t('staking-v2.wallet-balances.table-columns.price')}</StyledTh>
                  <StyledTh>{t('staking-v2.wallet-balances.table-columns.holdings')}</StyledTh>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading ? (
                  <TbodyLoading numberOfCols={4} />
                ) : synthData?.length === 0 ? (
                  <Tr w="full">
                    <Td colSpan={4} border="none">
                      <Text textAlign="center" mt={4}>
                        {t('staking-v2.wallet.no-synths')}
                      </Text>
                    </Td>
                  </Tr>
                ) : (
                  synthData?.map(
                    ({
                      iconUrl,
                      currencyKey,
                      description,
                      balance,
                      usdBalance,
                      price,
                      holdingPct,
                    }) => (
                      <Tr key={currencyKey}>
                        <AssetTd
                          currencyKey={currencyKey}
                          description={description}
                          iconUrl={iconUrl}
                          isSynth
                        />
                        <BalanceTd balance={balance} usdBalance={usdBalance} />
                        <PriceTd price={price} />
                        <HoldingTd holdingPct={holdingPct} />
                      </Tr>
                    )
                  )
                )}
              </Tbody>
            </Table>
            {isRedeemerActive &&
              networkId === NetworkIdByName.mainnet &&
              redeemableSynths &&
              redeemableSynths?.length > 0 && (
                <Flex mt={4} width="100%" justifyContent="flex-end">
                  <Button
                    onClick={() => {
                      mutate();
                    }}
                    variant="outline"
                  >
                    Redeem
                  </Button>
                </Flex>
              )}
          </TableContainer>
        </Box>
        <Box borderWidth="1px" borderColor="gray.900" borderRadius="base" mt={4} py={4} px={2}>
          <Heading size="md" mb={4}>
            Non Synths
          </Heading>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <StyledTh width="40%">
                    {t('staking-v2.wallet-balances.table-columns.asset')}
                  </StyledTh>
                  <StyledTh>{t('staking-v2.wallet-balances.table-columns.balance')}</StyledTh>
                  <StyledTh>{t('staking-v2.wallet-balances.table-columns.price')}</StyledTh>
                  <StyledTh visibility="hidden">
                    {t('staking-v2.wallet-balances.table-columns.holdings')}
                  </StyledTh>
                </Tr>
              </Thead>
              <Tbody>
                {nonSynthData === undefined ? (
                  <TbodyLoading numberOfCols={3} />
                ) : nonSynthData.length === 0 ? (
                  <Tr w="full">
                    <Td colSpan={4} border="none">
                      <Text textAlign="center" mt={4}>
                        {t('staking-v2.wallet.no-synths')}
                      </Text>
                    </Td>
                  </Tr>
                ) : (
                  nonSynthData.map(
                    ({ icon, currencyKey, description, balance, usdBalance, price }) => (
                      <Tr key={currencyKey}>
                        <AssetTd currencyKey={currencyKey} description={description} icon={icon} />
                        <BalanceTd balance={balance} usdBalance={usdBalance} />
                        <PriceTd price={price} />
                        <StyledTd />
                      </Tr>
                    )
                  )
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

const getSynthDataForTable = (
  synthsBalanceData?: SynthBalance[],
  synthsByName?: Partial<Record<string, { description: string }>>,
  totalSynthBalance?: Wei,
  exchangeRateData?: Record<string, Wei | undefined>
) => {
  return synthsBalanceData?.map((x) => {
    const assetDescription = synthsByName?.[x.currencyKey]?.description;
    const iconUrl = getPngSynthIconUrl(x.currencyKey);
    const description = assetDescription ? `Synthetic ${assetDescription}` : undefined;
    const holdingsPct = totalSynthBalance ? x.balance.div(totalSynthBalance) : undefined;

    return {
      currencyKey: x.currencyKey,
      description,
      iconUrl,
      price: exchangeRateData?.[x.currencyKey]?.toNumber(),
      balance: x.balance.toNumber(),
      usdBalance: x.usdBalance.toNumber(),
      holdingPct: holdingsPct?.toNumber(),
    };
  });
};

const getNonSynthDataForTable = (
  collateral?: Wei,
  dSNXBalanceData?: {
    balance: Wei;
    price: Wei;
    balanceUsd: Wei;
  },
  ethBalance?: Wei,
  exchangeRateData?: Record<string, Wei | undefined>
) => {
  const ethRate = exchangeRateData?.ETH;
  const snxRate = exchangeRateData?.SNX;
  return [
    {
      icon: <SNXIcon />,
      currencyKey: 'SNX',
      description: 'Synthetix Network Token',
      balance: collateral?.toNumber(),
      price: snxRate?.toNumber(),
      usdBalance: snxRate && collateral ? snxRate?.mul(collateral).toNumber() : undefined,
    },
    {
      icon: <DSNXIcon />,
      currencyKey: 'dSNX',
      description: 'dSNX token',
      balance: dSNXBalanceData?.balance.toNumber(),
      price: dSNXBalanceData?.price.toNumber(),
      usdBalance: dSNXBalanceData?.balanceUsd.toNumber(),
    },
    {
      icon: <EthereumIcon />,
      currencyKey: 'ETH',
      description: 'Ether',
      balance: ethBalance?.toNumber(),
      price: ethRate?.toNumber(),
      usdBalance: ethBalance && ethRate ? ethBalance.mul(ethRate).toNumber() : undefined,
    },
  ];
};

export const WalletBalances = () => {
  const { data: debtData, isLoading: isDebtDataLoading } = useDebtData();
  const { data: synthsBalanceData, isLoading: isSynthBalancesDataLoading } = useSynthsBalances();
  const { data: dSNXBalanceData } = useGetDSnxBalance();
  const { data: exchangeRateData, isLoading: isExchangeRateDataLoading } = useExchangeRatesData();
  const { data: synthByNameData, isLoading: isSynthDataByNameLoading } = useGetSynthsByName();
  const { data: ethBalance, isLoading: isEthBalanceLoading } = useEthBalance();
  const { data: isRedeemerActive, isLoading: isSynthRedeemerActiveLoading } =
    useSynthRedeemerActive();
  const { networkId } = useContext(ContractContext);

  const isLoading =
    isSynthRedeemerActiveLoading ||
    isDebtDataLoading ||
    isSynthBalancesDataLoading ||
    isExchangeRateDataLoading ||
    isSynthDataByNameLoading ||
    isEthBalanceLoading;

  return (
    <WalletBalancesUi
      debtBalance={debtData?.debtBalance.toNumber()}
      dSNXUSDBalance={
        networkId !== NetworkIdByName['mainnet-ovm'] ? 0 : dSNXBalanceData?.balanceUsd.toNumber()
      }
      totalSynthUSDBalance={synthsBalanceData?.totalUSDBalance.toNumber()}
      synthData={getSynthDataForTable(
        synthsBalanceData?.balances,
        synthByNameData?.SynthsByName,
        synthsBalanceData?.totalUSDBalance,
        exchangeRateData
      )}
      nonSynthData={getNonSynthDataForTable(
        debtData?.collateral,
        dSNXBalanceData,
        ethBalance,
        exchangeRateData
      )}
      isLoading={isLoading}
      isRedeemerActive={isRedeemerActive}
    />
  );
};

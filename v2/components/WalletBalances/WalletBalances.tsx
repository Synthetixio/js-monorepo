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
} from '@chakra-ui/react';
import { getPngSynthIconUrl } from '@snx-v2/SynthIcons';
import { useGetSynthsByName } from '@snx-v2/synthsByName';
import { useEthBalance } from '@snx-v2/useEthBalance';
import { useDebtData } from '@snx-v2/useDebtData';
import { useGetDSnxBalance } from '@snx-v2/useDSnxBalance';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { SynthBalance, useSynthsBalances } from '@snx-v2/useSynthsBalances';
import Wei from '@synthetixio/wei';
import { formatNumberToUsd } from '@snx-v2/formatters';
import { StatBox } from '@snx-v2/StatBox';
import { useTranslation } from 'react-i18next';
import { ContractContext } from '@snx-v2/ContractContext';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import { SNXIcon, DSNXIcon, EthereumIcon } from '@snx-v2/icons';
import {
  AssetTd,
  BalanceTd,
  HoldingTd,
  PriceTd,
  StyledTd,
  StyledTh,
  TbodyLoading,
} from './TableComponents';

const WalletBalancesUi: React.FC<{
  totalSynthBalance?: number;
  dSNXBalance?: number;
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
}> = ({ totalSynthBalance, dSNXBalance, debtBalance, synthData, nonSynthData }) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Flex>
        <StatBox
          label={t('staking-v2.wallet-balances.active-debt')}
          amount={debtBalance === undefined ? undefined : formatNumberToUsd(debtBalance)}
          containerStyles={{ alignItems: 'start' }}
        />
        <StatBox
          label={t('staking-v2.wallet-balances.d-snx-value')}
          amount={dSNXBalance === undefined ? undefined : formatNumberToUsd(dSNXBalance)}
          containerStyles={{ marginX: 2, alignItems: 'center' }}
        />
        <StatBox
          label={t('staking-v2.wallet-balances.total-synth-value')}
          amount={
            totalSynthBalance === undefined ? undefined : formatNumberToUsd(totalSynthBalance)
          }
          containerStyles={{ alignItems: 'end' }}
        />
      </Flex>
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
              {synthData === undefined ? (
                <TbodyLoading numberOfCols={4} />
              ) : synthData.length === 0 ? (
                <Tr w="full">
                  <Td colSpan={4} border="none">
                    <Text textAlign="center" mt={4}>
                      {t('staking-v2.wallet.no-synths')}
                    </Text>
                  </Td>
                </Tr>
              ) : (
                synthData.map(
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
  const { data: debtData } = useDebtData();
  const { data: synthsBalanceData } = useSynthsBalances();
  const { data: dSNXBalanceData } = useGetDSnxBalance();
  const { data: exchangeRateData } = useExchangeRatesData();
  const { data: synthByNameData } = useGetSynthsByName();
  const { data: ethBalance } = useEthBalance();
  const { networkId } = useContext(ContractContext);

  return (
    <WalletBalancesUi
      debtBalance={debtData?.debtBalance.toNumber()}
      dSNXBalance={
        networkId !== NetworkIdByName['mainnet-ovm'] ? 0 : dSNXBalanceData?.balance.toNumber()
      }
      totalSynthBalance={synthsBalanceData?.totalUSDBalance.toNumber()}
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
    />
  );
};

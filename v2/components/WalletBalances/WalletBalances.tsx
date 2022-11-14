import { useContext } from 'react';
import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Heading,
  Progress,
  Skeleton,
} from '@chakra-ui/react';
import { formatNumber } from '@snx-v2/formatters';
import { getPngSynthIconUrl } from '@snx-v2/SynthIcons';
import { useGetSynthsByName } from '@snx-v2/synthsByName';
import { useDebtData } from '@snx-v2/useDebtData';
import { useGetDSnxBalance } from '@snx-v2/useDSnxBalance';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { SynthBalance, useSynthsBalances } from '@snx-v2/useSynthsBalances';
import Wei from '@synthetixio/wei';
import { formatPercent, formatNumberToUsd } from '@snx-v2/formatters';
import { StatBox } from '@snx-v2/StatBox';
import { useTranslation } from 'react-i18next';
import { ContractContext } from '@snx-v2/ContractContext';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';

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
}> = ({ totalSynthBalance, dSNXBalance, debtBalance, synthData }) => {
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
                <Th sx={{ paddingBottom: 1, paddingTop: 4, borderColor: 'gray.900' }}>
                  {t('staking-v2.wallet-balances.table-columns.asset')}
                </Th>
                <Th sx={{ paddingBottom: 1, paddingTop: 4, borderColor: 'gray.900' }}>
                  {t('staking-v2.wallet-balances.table-columns.balance')}{' '}
                </Th>
                <Th sx={{ paddingBottom: 1, paddingTop: 4, borderColor: 'gray.900' }}>
                  {t('staking-v2.wallet-balances.table-columns.price')}
                </Th>
                <Th sx={{ paddingBottom: 1, paddingTop: 4, borderColor: 'gray.900' }}>
                  {t('staking-v2.wallet-balances.table-columns.holdings')}{' '}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {synthData?.map(
                ({ iconUrl, currencyKey, description, balance, usdBalance, price, holdingPct }) => {
                  return (
                    <Tr key={currencyKey}>
                      <Td sx={{ borderBottomColor: 'gray.900' }}>
                        <Flex>
                          <Flex display="flex" alignItems="center">
                            <img width="24px" height="24px" src={iconUrl} alt={currencyKey} />
                          </Flex>
                          <Flex ml={1} flexDirection="column">
                            <Text fontSize="sm">{currencyKey}</Text>
                            {description && (
                              <Text fontSize="xs" color="gray.500">
                                {description}
                              </Text>
                            )}
                          </Flex>
                        </Flex>
                      </Td>
                      <Td sx={{ borderBottomColor: 'gray.900' }}>
                        <Flex flexDirection="column">
                          <Text fontSize="sm">{formatNumber(balance)}</Text>
                          <Text fontSize="xs" color="gray.500">
                            {formatNumber(usdBalance)}
                          </Text>
                        </Flex>
                      </Td>
                      <Td sx={{ borderBottomColor: 'gray.900' }}>
                        <Flex flexDirection="column">
                          <Text fontSize="sm">{price ? formatNumber(price) : '-'}</Text>
                        </Flex>
                      </Td>
                      <Td sx={{ borderBottomColor: 'gray.900' }}>
                        <Flex flexDirection="column">
                          <Progress
                            height="1"
                            variant="white"
                            value={holdingPct ? holdingPct * 100 : 100}
                          />
                          <Text fontSize="xs" color="whiteAlpha.600">
                            {holdingPct ? formatPercent(holdingPct) : ''}
                          </Text>
                        </Flex>
                      </Td>
                    </Tr>
                  );
                }
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
export const WalletBalances = () => {
  const { data: debtData } = useDebtData();
  const { data: synthsBalanceData } = useSynthsBalances();
  const { data: dSNXBalanceData } = useGetDSnxBalance();
  const { data: exchangeRateData } = useExchangeRatesData();
  const { data: synthByNameData } = useGetSynthsByName();
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
    />
  );
};

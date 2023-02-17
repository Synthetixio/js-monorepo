import { FC, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import useGetPositions from '../queries/positions';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useGetMarkets } from '../queries/markets';
import { ChevronDownIcon, ChevronUpIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { numberWithCommas } from '../utils/numbers';
import ReactPaginate from 'react-paginate';
import './PositionTable.css';

export type SortConfig = [
  (
    | 'account'
    | 'asset'
    | 'market'
    | 'entryPrice'
    | 'exitPrice'
    | 'isLiquidated'
    | 'isOpen'
    | 'openTimestamp'
    | 'closeTimestamp'
    | 'long'
    | 'size'
    | 'margin'
    | 'feesPaidToSynthetix'
    | 'leverage'
    | 'pnl'
  ),
  boolean
];

export const PositionsTable: FC = () => {
  const params = useParams();
  const toast = useToast();
  const { data } = useGetMarkets();
  const [isRefetchLoading, setRefetchLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>(['openTimestamp', false]);
  const { register, getValues, setValue, watch } = useForm({
    defaultValues: {
      asset: 'all',
      liquidated: false,
      deactivateLiquidated: true,
      open: false,
      deactivateOpen: true,
      deactivateOpenedAt: false,
      deactivateClosedAt: false,
      openedAt: monthAgo(),
      closedAt: new Date(),
      walletAddress: '',
    },
  });
  const { data: positions, isLoading } = useGetPositions({
    address: params.walletAddress,
    filterOptions: {
      ...watch(),
      openedAt: Math.round(watch('openedAt').getTime() / 1000),
      closedAt: Math.round(watch('closedAt').getTime() / 1000),
    },
    sortConfig,
  });
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 50;
  const currentItems = positions?.futuresPositions?.slice(itemOffset, endOffset) || [];
  const pageCount = positions?.futuresPositions
    ? Math.ceil(positions?.futuresPositions.length / 50)
    : 1;

  const handlePageClick = ({ selected }: { selected: number }) => {
    if (positions?.futuresPositions) {
      const newOffset = (selected * 100) % positions?.futuresPositions.length;
      setItemOffset(newOffset);
    }
  };

  return (
    <>
      <Flex py="2" gap="2" justifyContent="space-around" w="100%">
        <RadioGroup
          onChange={(e) => {
            setValue('asset', e);
          }}
          value={watch('asset')}
        >
          <Flex flexWrap="wrap" w="150px" gap="2" justifyContent="space-between">
            {data &&
              data.map((market, index) => (
                <Radio value={market.asset} key={market.asset.concat(index.toString())}>
                  {market.asset}
                </Radio>
              ))}
            <Radio value="all">All</Radio>
          </Flex>
        </RadioGroup>
        <Stack gap="2">
          <Switch
            disabled={watch('deactivateLiquidated')}
            onChange={() => {
              setValue('liquidated', !getValues('liquidated'));
              if (getValues('liquidated')) {
                setValue('open', false);
              }
            }}
            isChecked={watch('liquidated')}
          >
            Liquidated
          </Switch>
          <Checkbox
            onChange={() => {
              setValue('deactivateLiquidated', !getValues('deactivateLiquidated'));
            }}
            isChecked={watch('deactivateLiquidated')}
          >
            Deactivate liquidated option
          </Checkbox>
          <Switch
            disabled={watch('deactivateOpen')}
            onChange={() => {
              setValue('open', !getValues('open'));
              if (getValues('open')) {
                setValue('liquidated', false);
              }
            }}
            isChecked={watch('open')}
          >
            Open
          </Switch>
          <Checkbox
            onChange={() => {
              setValue('deactivateOpen', !getValues('deactivateOpen'));
            }}
            isChecked={watch('deactivateOpen')}
          >
            Deactivate open option
          </Checkbox>
          <Text>Search by address</Text>
          <Input {...register('walletAddress')} placeholder="Address" />
        </Stack>
        <Stack gap="2">
          <Text>Opened At (default: one month ago)</Text>
          <Input
            type="date"
            {...register('openedAt', { valueAsDate: true })}
            disabled={watch('deactivateOpenedAt')}
          />
          <Checkbox
            onChange={() => {
              setValue('deactivateOpenedAt', !getValues('deactivateOpenedAt'));
            }}
            isChecked={watch('deactivateOpenedAt')}
          >
            Deactivate opened at
          </Checkbox>
          <Text>Closed At (default: now)</Text>
          <Input
            type="date"
            {...register('closedAt', { valueAsDate: true })}
            disabled={watch('deactivateClosedAt')}
          />
          <Checkbox
            onChange={() => {
              setValue('deactivateClosedAt', !getValues('deactivateClosedAt'));
            }}
            isChecked={watch('deactivateClosedAt')}
          >
            Deactivate open option
          </Checkbox>
        </Stack>
      </Flex>
      {isLoading || isRefetchLoading ? (
        <Spinner color="cyan.500" />
      ) : (
        <>
          {params?.walletAddress && (
            <>
              <Divider m="2" />
              <Heading>Stats from Trader</Heading>
              <Box
                borderWidth="1px"
                borderStyle="solid"
                borderColor="cyan.500"
                boxShadow="2xl"
                borderRadius="base"
                p="2"
                m="2"
              >
                {positions?.futuresStats.map((stats) => {
                  return (
                    <Flex flexDir="column" key="only-one">
                      <Text>
                        Fees Paid: ${(Number(stats.feesPaidToSynthetix) / 1e18).toFixed(2)}
                      </Text>
                      <Text>Liquidations: {stats.totalLiquidations}</Text>
                      <Text>PNL: ${(Number(stats.pnl) / 1e18).toFixed(2)}</Text>
                      <Text>Total trades: {stats.trades.length}</Text>
                    </Flex>
                  );
                })}
              </Box>
            </>
          )}
          <TableContainer w="100%">
            <Table>
              <Thead>
                <Tr>
                  <Th
                    cursor="pointer"
                    onClick={() => {
                      setSortConfig((state) => ['account', !state[1]]);
                    }}
                    border={sortConfig[0] === 'account' ? '1px solid' : ''}
                    borderColor={sortConfig[0] === 'account' ? 'cyan.500' : ''}
                  >
                    Address
                    {sortConfig[0] === 'account' &&
                      (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => {
                      setSortConfig((state) => ['asset', !state[1]]);
                    }}
                    border={sortConfig[0] === 'asset' ? '1px solid' : ''}
                    borderColor={sortConfig[0] === 'asset' ? 'cyan.500' : ''}
                  >
                    Asset
                    {sortConfig[0] === 'asset' &&
                      (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => {
                      setSortConfig((state) => ['market', !state[1]]);
                    }}
                    border={sortConfig[0] === 'market' ? '1px solid' : ''}
                    borderColor={sortConfig[0] === 'market' ? 'cyan.500' : ''}
                  >
                    Market
                    {sortConfig[0] === 'market' &&
                      (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => {
                      setSortConfig((state) => ['entryPrice', !state[1]]);
                    }}
                    border={sortConfig[0] === 'entryPrice' ? '1px solid' : ''}
                    borderColor={sortConfig[0] === 'entryPrice' ? 'cyan.500' : ''}
                  >
                    Entry Price
                    {sortConfig[0] === 'entryPrice' &&
                      (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => {
                      setSortConfig((state) => ['exitPrice', !state[1]]);
                    }}
                    border={sortConfig[0] === 'exitPrice' ? '1px solid' : ''}
                    borderColor={sortConfig[0] === 'exitPrice' ? 'cyan.500' : ''}
                  >
                    Exit Price
                    {sortConfig[0] === 'exitPrice' &&
                      (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => {
                      setSortConfig((state) => ['leverage', !state[1]]);
                    }}
                    border={sortConfig[0] === 'leverage' ? '1px solid' : ''}
                    borderColor={sortConfig[0] === 'leverage' ? 'cyan.500' : ''}
                  >
                    Leverage
                    {sortConfig[0] === 'leverage' &&
                      (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => {
                      setSortConfig((state) => ['pnl', !state[1]]);
                    }}
                    border={sortConfig[0] === 'pnl' ? '1px solid' : ''}
                    borderColor={sortConfig[0] === 'pnl' ? 'cyan.500' : ''}
                  >
                    PNL
                    {sortConfig[0] === 'pnl' &&
                      (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => {
                      setSortConfig((state) => ['margin', !state[1]]);
                    }}
                    border={sortConfig[0] === 'margin' ? '1px solid' : ''}
                    borderColor={sortConfig[0] === 'margin' ? 'cyan.500' : ''}
                  >
                    Margin
                    {sortConfig[0] === 'margin' &&
                      (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => {
                      setSortConfig((state) => ['size', !state[1]]);
                    }}
                    border={sortConfig[0] === 'size' ? '1px solid' : ''}
                    borderColor={sortConfig[0] === 'size' ? 'cyan.500' : ''}
                  >
                    Size
                    {sortConfig[0] === 'size' &&
                      (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => {
                      setSortConfig((state) => ['feesPaidToSynthetix', !state[1]]);
                    }}
                    border={sortConfig[0] === 'feesPaidToSynthetix' ? '1px solid' : ''}
                    borderColor={sortConfig[0] === 'feesPaidToSynthetix' ? 'cyan.500' : ''}
                  >
                    Fees for Synthetix
                    {sortConfig[0] === 'feesPaidToSynthetix' &&
                      (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => {
                      setSortConfig((state) => ['long', !state[1]]);
                    }}
                    border={sortConfig[0] === 'long' ? '1px solid' : ''}
                    borderColor={sortConfig[0] === 'long' ? 'cyan.500' : ''}
                  >
                    Side
                    {sortConfig[0] === 'long' &&
                      (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => {
                      setSortConfig((state) => ['isLiquidated', !state[1]]);
                    }}
                    border={sortConfig[0] === 'isLiquidated' ? '1px solid' : ''}
                    borderColor={sortConfig[0] === 'isLiquidated' ? 'cyan.500' : ''}
                  >
                    Liquidated
                    {sortConfig[0] === 'isLiquidated' &&
                      (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => {
                      setSortConfig((state) => ['isOpen', !state[1]]);
                    }}
                    border={sortConfig[0] === 'isOpen' ? '1px solid' : ''}
                    borderColor={sortConfig[0] === 'isOpen' ? 'cyan.500' : ''}
                  >
                    Open
                    {sortConfig[0] === 'isOpen' &&
                      (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => {
                      setSortConfig((state) => ['openTimestamp', !state[1]]);
                    }}
                    border={sortConfig[0] === 'openTimestamp' ? '1px solid' : ''}
                    borderColor={sortConfig[0] === 'openTimestamp' ? 'cyan.500' : ''}
                  >
                    Opened at
                    {sortConfig[0] === 'openTimestamp' &&
                      (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
                  </Th>
                  <Th
                    cursor="pointer"
                    onClick={() => {
                      setSortConfig((state) => ['closeTimestamp', !state[1]]);
                    }}
                    border={sortConfig[0] === 'closeTimestamp' ? '1px solid' : ''}
                    borderColor={sortConfig[0] === 'closeTimestamp' ? 'cyan.500' : ''}
                  >
                    Closed at
                    {sortConfig[0] === 'closeTimestamp' &&
                      (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {!!currentItems &&
                  currentItems.map((position, index) => {
                    return (
                      <Tr key={position.account.concat(index.toString())}>
                        <Td
                          cursor="pointer"
                          onClick={() => {
                            toast({
                              title: 'Copy to clipboard',
                              status: 'success',
                              isClosable: true,
                              duration: 5000,
                            });
                            navigator.clipboard.writeText(position.account);
                          }}
                        >
                          {position.account
                            .substring(0, 5)
                            .concat('...')
                            .concat(position.account.substring(position.account.length - 5))}
                          <IconButton
                            marginLeft="2"
                            variant="ghost"
                            aria-label="link to optimisim etherscan"
                            icon={<ExternalLinkIcon />}
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(
                                'https://optimistic.etherscan.io/address/' + position.account
                              );
                            }}
                          />
                        </Td>
                        <Td>{position.asset}</Td>
                        <Td>{position.market}</Td>
                        <Td>
                          ${numberWithCommas((Number(position.entryPrice) / 1e18).toFixed(2))}
                        </Td>
                        <Td>
                          {position.isOpen
                            ? '-'
                            : `$${numberWithCommas(
                                (Number(position.exitPrice) / 1e18).toFixed(2)
                              )}`}
                        </Td>
                        <Td>
                          {Math.abs(Number(position.leverage) / 1e18)
                            .toFixed(2)
                            .concat('x')}
                        </Td>
                        <Td>
                          {numberWithCommas((Number(position.pnl) / 1e18).toFixed(2)).concat('%')}
                        </Td>
                        <Td>${numberWithCommas((Number(position.margin) / 1e18).toFixed(2))}</Td>
                        <Td>${numberWithCommas((Number(position.size) / 1e18).toFixed(2))}</Td>
                        <Td>
                          $
                          {numberWithCommas(
                            (Number(position.feesPaidToSynthetix) / 1e18).toFixed(2)
                          )}
                        </Td>
                        <Td>{position.long ? 'Long' : 'Short'}</Td>
                        <Td>{position.isLiquidated ? `💀` : `NO`}</Td>
                        <Td>{position.isOpen ? `✅` : `❌`}</Td>
                        <Td>{position?.openTimestamp}</Td>
                        <Td>{position?.closeTimestamp}</Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>

          <ReactPaginate
            className="paginator"
            pageClassName="pageItems"
            nextClassName="nextButton"
            previousClassName="previousButton"
            breakClassName="breakSpacer"
            activeClassName="activePage"
            breakLabel="..."
            nextLabel="Next =>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<= Previous"
          />
        </>
      )}
    </>
  );
};

function monthAgo() {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date;
}

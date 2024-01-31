import {
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  Tbody,
  Text,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { Trans, useTranslation } from 'react-i18next';
import { StyledTd, StyledTh } from '@snx-v2/TableComponents';
import { BridgingHistory } from '../../hooks/useBridgingHistoryStore';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TickIcon, ClockIcon, FailedIcon } from '@snx-v2/icons';
import { formatShortDate } from '../../utils/formatters/date';
import { formatNumber } from '../../utils/formatters/number';
import { getTxnLink } from '@snx-v2/txnLink';
import React, { useState } from 'react';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import { addDays, isAfter } from 'date-fns';
import { useGlobalProvidersWithFallback } from '@synthetixio/use-global-providers';
import { CrossChainMessenger } from '@eth-optimism/sdk';
import Connector from '../../containers/Connector';
import { ReviewWithdrawModal } from './ReviewWithdrawModal';

function BridgingHistories({
  bridgingHistories,
  isMainnet,
  isL2,
}: {
  bridgingHistories: BridgingHistory[];
  isMainnet: boolean;
  isL2: boolean;
}) {
  const { t } = useTranslation();
  const { signer } = Connector.useContainer();
  const { globalProviders } = useGlobalProvidersWithFallback();
  const crossChainMessenger = new CrossChainMessenger({
    l1ChainId: isMainnet ? NetworkIdByName['mainnet'] : NetworkIdByName['goerli'],
    l2ChainId: isMainnet ? NetworkIdByName['mainnet-ovm'] : NetworkIdByName['goerli-ovm'],
    l1SignerOrProvider: signer ?? globalProviders.mainnet,
    l2SignerOrProvider: globalProviders.optimism,
  });

  const [currentHistory, setCurrentHistory] = useState<BridgingHistory | undefined>();

  const sortedBridgingHistories = bridgingHistories.sort((a: BridgingHistory, b: BridgingHistory) =>
    new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1
  );

  const columnHelper = createColumnHelper<BridgingHistory>();

  const columns = [
    columnHelper.accessor('date', {
      header: () => (
        <Flex flex={2} p={3} px={4}>
          <Trans i18nKey="bridge.bridging-history.date" />
        </Flex>
      ),
      cell: (info) => {
        const date = info.getValue();
        return <Text>{formatShortDate(new Date(date))}</Text>;
      },
    }),
    columnHelper.accessor('amount', {
      header: () => (
        <Flex flex={2} p={3} px={4}>
          <Trans i18nKey="bridge.bridging-history.amount" />
        </Flex>
      ),
      cell: (info) => formatNumber(info.getValue()),
    }),
    columnHelper.accessor('txnHash', {
      header: () => (
        <Flex flex={1} p={3} px={4} justifyContent="center" textAlign="right">
          <Trans i18nKey="bridge.bridging-history.status" />
        </Flex>
      ),
      cell: (info) => {
        const txHash = info.getValue();
        const networkId = info.row.original.networkId;
        const isL2 =
          networkId === NetworkIdByName['mainnet-ovm'] ||
          networkId === NetworkIdByName['goerli-ovm'];
        const txnLink = getTxnLink(networkId, txHash ?? '');
        let status = info.row.original.status;

        if (isL2) {
          const now = new Date();
          const delayTime = addDays(new Date(info.row.original.date), 7);
          if (isAfter(delayTime, now)) {
            status = 'pending';
          }
        }

        return (
          <Flex alignItems="center" justifyContent="center" gap={2}>
            <Popover isLazy trigger="hover">
              <PopoverTrigger>
                <Flex alignItems="center">
                  {status === 'success' ? (
                    <TickIcon color="cyan.500" />
                  ) : status === 'error' ? (
                    <FailedIcon width="16px" height="16px" />
                  ) : (
                    <ClockIcon color="white" />
                  )}
                </Flex>
              </PopoverTrigger>
              <PopoverContent p={2} color="white" bg="gray.800" width="fit-content" maxWidth={300}>
                <a href={txnLink ?? ''} target="_blank" rel="noreferrer">
                  {t('bridge.bridging-history.view-tx')}
                </a>
              </PopoverContent>
            </Popover>
            {isL2 && !!txHash && (
              <Button
                px={2}
                size="sx"
                variant="solid"
                onClick={() => setCurrentHistory(info.row.original)}
              >
                Details
              </Button>
            )}
          </Flex>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: sortedBridgingHistories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Flex
      width={['100%', '100%', '382px', '382px']}
      minHeight="140px"
      height="fit-content"
      flexDir="column"
      borderRadius="base"
      borderWidth="1px"
      borderColor="gray.900"
      bg="navy.700"
    >
      <Text p={4} fontSize="16px" lineHeight="20px" fontWeight={700}>
        <Trans i18nKey="bridge.bridging-history.title" />
      </Text>
      <Table width="100%" height="fit-content">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <StyledTh p={0} fontSize="xs" whiteSpace="nowrap" key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </StyledTh>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <StyledTd p={3} px={4} fontSize="xs" whiteSpace="nowrap" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </StyledTd>
              ))}
            </Tr>
          ))}
          {table.getRowModel().rows.length === 0 && (
            <StyledTd px={4} color="gray.500" fontSize="xs" whiteSpace="nowrap" border="none">
              {t('bridge.bridging-history.no-transactions')}
            </StyledTd>
          )}
        </Tbody>
      </Table>
      {bridgingHistories.length > 0 && (
        <Flex p={4} justifyContent="flex-end">
          <Flex color="gray.700" fontSize="14px" align="center">
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
          </Flex>
          <Button
            bg="none"
            height="auto"
            width="auto"
            color="white"
            _hover={{ bg: 'none' }}
            _disabled={{ bg: 'none', color: 'gray.600', cursor: 'not-allowed' }}
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </Button>
          <Button
            bg="none"
            height="auto"
            width="auto"
            color="white"
            _hover={{ bg: 'none' }}
            _disabled={{ bg: 'none', color: 'gray.600', cursor: 'not-allowed' }}
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          >
            {'>'}
          </Button>
        </Flex>
      )}
      {!!currentHistory && !!currentHistory.txnHash && (
        <ReviewWithdrawModal
          modalOpen
          title={t('bridge.txn-modal.withdrawal')}
          amount={currentHistory.amount}
          txnHash={currentHistory.txnHash}
          networkId={currentHistory.networkId}
          crossChainMessenger={crossChainMessenger}
          onClose={() => setCurrentHistory(undefined)}
          isL2={isL2}
          isMainnet={isMainnet}
        />
      )}
    </Flex>
  );
}

export default BridgingHistories;

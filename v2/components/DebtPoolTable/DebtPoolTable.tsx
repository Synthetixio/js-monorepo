import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Table,
  Tbody,
  Thead,
  Tr,
  Text,
  Tooltip,
  Image,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useDebtPoolData } from '@snx-v2/useDebtPoolData';

import { formatNumberToUsd, formatPercent } from '@synthetixio/formatters';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { getPngSynthIconUrl } from '@snx-v2/SynthIcons';
import { useGetSynthsByName, SynthsByName } from '@snx-v2/synthsByName';
import { InfoIcon } from '@snx-v2/icons';
import { StyledTd, StyledTh } from '@snx-v2/TableComponents';

type DebtPoolData = { name: string; positionInUsd: number; poolProportion: number };

export const DebtPoolTableUi: FC<{
  data: DebtPoolData[];
  synthsByName?: SynthsByName;
}> = ({ data, synthsByName }) => {
  const columnHelper = createColumnHelper<DebtPoolData>();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Asset',
      cell: (info) => {
        const asset = info.getValue();

        const assetDescription = synthsByName?.[asset]?.description;

        const iconUrl = getPngSynthIconUrl(asset);
        const description = assetDescription
          ? `Synthetic ${assetDescription}`
          : `Synthetic ${asset.slice(1)}`;

        return (
          <Flex>
            <Flex flexShrink={0} alignItems="center">
              <Image width="24px" height="24px" src={iconUrl} alt={asset} />
            </Flex>
            <Flex ml={1} flexDirection="column">
              <Text fontSize="sm">{asset}</Text>
              {description && (
                <Text fontSize="xs" color="gray.500">
                  {description}
                </Text>
              )}
            </Flex>
          </Flex>
        );
      },
    }),
    columnHelper.accessor('positionInUsd', {
      header: () => (
        <Flex align="center" gap={1}>
          Pool Exposure
          <Tooltip label="This value is an aggregated value of all synthetic markets">
            <Flex>
              <InfoIcon />
            </Flex>
          </Tooltip>
        </Flex>
      ),
      cell: (info) => formatNumberToUsd(info.getValue()),
    }),
    columnHelper.accessor('poolProportion', {
      header: '% of Pool',
      cell: (info) => formatPercent(info.getValue()),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Box>
      <Heading fontSize="md" fontWeight="700" display="flex" alignItems="center" gap={1}>
        Debt Pool{' '}
        <Tooltip label="All assets composing the debt pool">
          <Flex>
            <InfoIcon />
          </Flex>
        </Tooltip>
      </Heading>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <StyledTh fontSize="xs" whiteSpace="nowrap" key={header.id}>
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
                <StyledTd key={cell.id} fontSize="sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </StyledTd>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
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
    </Box>
  );
};

export const DebtPoolTable = () => {
  const { data } = useDebtPoolData();
  const { data: synthByNameData } = useGetSynthsByName();

  if (!data)
    return (
      <Box mt={2} width="full">
        <Skeleton h={8} mt={2} w="full" />
        <Skeleton h={8} mt={2} w="full" />
        <Skeleton h={8} mt={2} w="full" />
      </Box>
    );
  return <DebtPoolTableUi data={data} synthsByName={synthByNameData?.SynthsByName} />;
};

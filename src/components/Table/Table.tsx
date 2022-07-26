/* eslint-disable react/jsx-key */
import clsx from 'clsx';
import { Icon } from 'components/Icon/Icon';
import { Pagination, PaginationLocalization } from 'components/Pagination/Pagination';
import { Skeleton } from 'components/Skeleton/Skeleton';
import React, { ReactElement, ReactNode, useMemo } from 'react';
import {
  Row,
  TableHeaderProps,
  TableOptions,
  useFlexLayout,
  usePagination,
  useSortBy,
  useTable
} from 'react-table';

export interface TableProps<T extends Record<string, unknown>> extends TableOptions<T> {
  className?: string;
  paginationLocalization?: PaginationLocalization;
  onClick?: (row: Row<T>) => void;
  loading?: boolean;
}

export const Table = <T extends Record<string, unknown>>(props: TableProps<T>): ReactElement => {
  const { className, paginationLocalization, onClick, loading, ...rest } = props;

  const defaultColumn = useMemo(
    () => ({
      width: 150,
      minWidth: 100
    }),
    []
  );

  const tableInstance = useTable(
    { ...rest, defaultColumn },
    useSortBy,
    useFlexLayout,
    usePagination
  );

  const {
    headerGroups,
    prepareRow,
    getTableProps,
    getTableBodyProps,
    page,
    state,
    gotoPage,
    rows
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  return (
    <>
      <div className={clsx('ui-overflow-auto', className)}>
        <table {...getTableProps()} className='ui-w-full'>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableHeader
                    className={clsx(
                      'ui-text-gray-500 ui-select-none ui-p-2 ui-tg-caption-bold lg:ui-tg-content-bold ui-transition-colors',
                      column.columnClass || 'ui-text-right',
                      {
                        'hover:ui-text-primary': column.canSort
                      }
                    )}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <>
                      {column.render('Header')}
                      <span>
                        {column.isSorted && (
                          <Icon
                            className='ui-text-xs ui-ml-1'
                            name={column.isSortedDesc ? 'Top-3' : 'Bottom-3'}
                          />
                        )}
                      </span>
                    </>
                  </TableHeader>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  onClick={() => onClick?.(row)}
                  {...row.getRowProps()}
                  className={clsx(
                    'ui-text-white ui-border-t last:ui-border-b ui-border-solid ui-border-gray-700',
                    {
                      'ui-cursor-pointer': !!onClick
                    }
                  )}
                >
                  {row.cells.map((cell) => (
                    <td
                      className={clsx(
                        'ui-p-2 ui-tg-caption lg:ui-tg-content',
                        cell.column.cellClass || 'ui-text-right'
                      )}
                      {...cell.getCellProps()}
                    >
                      <span className='ui-inline-flex ui-items-center ui-h-full'>
                        {cell.render('Cell') as ReactNode}
                      </span>
                    </td>
                  ))}
                </tr>
              );
            })}

            {!page.length && !loading && (
              <tr className='ui-text-center ui-text-gray-500 ui-border-t last:ui-border-b ui-border-solid ui-border-gray-700'>
                <td className='ui-p-4 ui-tg-caption ui-lg:tg-content ui-opacity-75'>No Result</td>
              </tr>
            )}
            {!page.length &&
              loading &&
              Array.from(Array(4), (_, i) => i + 1).map((i) => (
                <tr
                  key={i}
                  className='ui-text-center ui-border-t last:ui-border-b ui-border-solid ui-border-gray-700'
                >
                  {headerGroups[0].headers.map(() => (
                    <td className='ui-p-2 ui-tg-caption lg:ui-tg-content ui-opacity-75'>
                      <Skeleton />
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        className='ui-mt-6 ui-w-full'
        gotoPage={gotoPage}
        length={rows.length}
        localization={paginationLocalization}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
    </>
  );
};

interface HeaderProps extends TableHeaderProps {
  children: React.ReactNode;
}

const TableHeader: React.FC<HeaderProps> = ({ children, ...props }) => {
  return <th {...props}>{children}</th>;
};

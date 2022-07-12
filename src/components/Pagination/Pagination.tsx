import clsx from 'clsx';
import { Icon } from 'components/Icon/Icon';

export interface PaginationLocalization {
  of?: string;
}

export interface PaginationProps {
  pageSize?: number;
  pageIndex: number;
  length: number;
  gotoPage: (page: number) => void;
  localization?: PaginationLocalization;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  pageIndex,
  gotoPage,
  length,
  pageSize = 8,
  localization = {
    of: 'of'
  },
  className = 'ui-max-w-[350px]'
}) => {
  const pageCount = Math.ceil(length / pageSize);

  if (pageCount < 2) return null;

  const canNextPage = pageCount > pageIndex + 1;
  const startIndex = pageIndex * pageSize;
  const endIndex = Math.min(startIndex + pageSize, length);

  return (
    <div
      className={clsx(
        'ui-flex ui-text-xl ui-text-gray-650 ui-justify-between ui-items-center ui-gap-5',
        className
      )}
    >
      <div>
        <Icon
          className={clsx('ui-mr-3', {
            'ui-cursor-pointer ui-text-primary hover:ui-text-blue-light-2': pageIndex !== 0
          })}
          name='Left-3'
          onClick={() => gotoPage(0)}
        />

        <Icon
          className={clsx({
            'ui-cursor-pointer ui-text-primary hover:ui-text-blue-light-2': pageIndex !== 0
          })}
          name='Left-4'
          onClick={() => gotoPage(Math.max(pageIndex - 1, 0))}
        />
      </div>

      <h6 className='ui-tg-caption ui-text-gray-500 ui-select-none'>
        {startIndex + 1}-{endIndex}
        &nbsp;
        {localization.of}&nbsp;
        {length}
      </h6>

      <div>
        <Icon
          className={clsx({
            'ui-cursor-pointer ui-text-primary hover:ui-text-blue-light-2': canNextPage
          })}
          name='Right-4'
          onClick={() => canNextPage && gotoPage(pageIndex + 1)}
        />

        <Icon
          className={clsx({
            'ui-cursor-pointer ui-text-primary hover:ui-text-blue-light-2': canNextPage
          })}
          name='Right-3'
          onClick={() => gotoPage(pageCount - 1)}
        />
      </div>
    </div>
  );
};
